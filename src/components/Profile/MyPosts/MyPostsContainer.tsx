import React from "react";
import MyPosts from "./MyPosts";
import { addProfilePost, PostsType } from "../../../redux/profileReducer";
import { connect } from "react-redux";
import { AppStateType } from "../../../redux/reduxStore";
import { ProfileType } from "../../../types/types";

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
        profile: state.profilePage.profile,
    }
}

type MapStateToPropsType = {
    posts: Array<PostsType>
    profile: ProfileType | null
}

type MapDispatchToPropsType = {
    addProfilePost: (text: string) => void
}

const MyPostsContainer = connect<MapStateToPropsType, MapDispatchToPropsType,
    {}, AppStateType>(mapStateToProps, {
        addProfilePost
    })(MyPosts)

export default MyPostsContainer;
