import React, { FC, ChangeEvent, useState } from "react";
import { PhotosProfileType } from "../../../../types/types";
import mStyle from './ProfileAvatar.module.css';
import noavatar from '../../../../assets/images/noavatar.png'

type PropsType = {
    photo: string | null
    fullName: string
    isOwner: boolean

    savePhoto: (file: File) => void
}

const ProfileAvatar: FC<PropsType> = (props) => {

    const { photo, fullName, isOwner, savePhoto } = props
    
    let avatarLink = photo ? photo : noavatar

    const [editMode, setEditMode] = useState<boolean>(false);

    const onMainPhotoSelected = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            let file = event.target.files[0];
            savePhoto(file)
        }
    }

    const onEditMode = () => {
        setEditMode(!editMode)
    }


    return (
        <div>
            <div className={mStyle.wrapper}>
                <img className={mStyle.imageMin} src={avatarLink} alt={fullName} />
            </div>
            <div className={mStyle.loaderPhoto}>
                {isOwner && <button className={`${mStyle.buttonChangePhoto} ${editMode && mStyle.buttonChangePhotoActive}`}
                    onClick={onEditMode}></button>}
                {editMode && <input type="file" onChange={onMainPhotoSelected} />}
            </div>
        </div>
    );
}

export default ProfileAvatar;