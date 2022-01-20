import React, { FC, useState } from "react"
import { ProfileType } from "../../../../types/types";
import ProfileDescription from "./ProfileDescription/ProfileDescription";
import ProfileReduxFormDescription from "./ProfileFormDescription/ProfileFormDescription";
import mStyle from './ProfileFullInfo.module.css';
import ProfileStatusHook from "./ProfileStatus/ProfileStatusHook";

type PropsType = {
    profile: ProfileType
    isOwner: boolean
    status: string
    updateUserStatus: (status: string) => void
    saveProfileInfo: (formData: ProfileType) => void
}

const ProfileFullInfo: FC<PropsType> = (props) => {

    const {profile, isOwner, status, updateUserStatus, saveProfileInfo} = props

    const [editMode, setEditMode] = useState<boolean>(false);

    const onEditMode = () => {
        setEditMode(true);
    }

    const onSubmit = (formData: ProfileType) => {
        saveProfileInfo(formData);
        setEditMode(false)
    }

    return (
        <div>
            <div className={mStyle.wrapperInfo}>
                <div className={mStyle.headerInfo}>
                    <h3>Full name: {profile.fullName}</h3>
                    <ProfileStatusHook isOwner={isOwner} status={status} updateUserStatus={updateUserStatus} />
                </div>
                {(editMode)
                ? <ProfileReduxFormDescription initialValues={profile} onSubmit={onSubmit} /> 
                : <ProfileDescription profile={profile} /> }
                
                {isOwner && !editMode && <button onClick={onEditMode} className={mStyle.editButton}>edit</button>}
            </div>
        </div>
    )
}

export default ProfileFullInfo