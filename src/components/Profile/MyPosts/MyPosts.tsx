import React, { Dispatch, FC } from "react";
import { FormAction, reduxForm, reset } from "redux-form";
import { ProfileType } from "../../../types/types";
import AddNewPostProfileForm from "./AddNewPostProfileForm/AddNewPostProfileForm";
import mStyle from './MyPosts.module.css';
import Post from "./Post/Post";
import { PostsType } from "../../../redux/profileReducer"

type PropsType = {
    profile: ProfileType | null
    posts: Array<PostsType>

    addProfilePost: (text: string) => void
}

export type PostFormDataType = {
    text: string
}

const MyPosts: FC<PropsType> = (props) => {
    const { profile,} = props

    let postsElements = [...props.posts]
        .reverse()
        .map(post => <Post key={post.id} profile={profile} message={post.message} likesCount={post.likesCount} />);

    const onSubmit = (formData: PostFormDataType, dispatch: Dispatch<FormAction>) => {
        props.addProfilePost(formData.text);
        dispatch(reset('addPostProfile'));
    }

    return (
        <div className={mStyle.wrapperPosts}>
            <h3>My post</h3>
            <AddNewPostProfileReduxForm onSubmit={onSubmit} />
            <div>
                {postsElements}
            </div>
        </div>
    );
}

const AddNewPostProfileReduxForm = reduxForm<PostFormDataType>({
    form: 'addPostProfile'
})(AddNewPostProfileForm)

export default MyPosts;
