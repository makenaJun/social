import React, { FC } from "react";
import mStyle from './Post.module.css';
import noavatar from '../../../../assets/images/noavatar.png'
import { ProfileType } from "../../../../types/types";

type PostPropsType = {
    profile: ProfileType | null
    message: string
    likesCount: number
}

const Post: FC<PostPropsType> = (props) => {
    const { message, likesCount, profile } = props

    let photoUrl = noavatar;

    if(profile){
        photoUrl = (profile.photos.small)? profile.photos.small : noavatar
    }

    return (
        <div className={mStyle.post}>
            <div className={mStyle.avatar}>
                <img src={photoUrl} alt='avatar' />
                </div>
            <div className={mStyle.message}>{message}</div>
            <div className={mStyle.likesCount}> {likesCount}</div>
        </div>
    );
}

export default Post;
