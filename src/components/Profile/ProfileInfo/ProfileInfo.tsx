import React, { FC } from "react";
import ProfileAvatar from "./ProfileAvatar/ProfileAvatar";
import ProfileFullInfo from "./ProfileFullInfo/ProfileFullInfo";
import mStyle from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import { ProfileType } from "../../../types/types";

type PropsType = {
    profile: ProfileType | null
    isOwner: boolean
    status: string
    
    updateUserStatus: (status: string) => void
    saveProfileInfo: (formData: ProfileType) => void
    savePhoto: (file: File) => void
}

const ProfileInfo: FC<PropsType> = (props) => {
    const {profile, isOwner, status, updateUserStatus, saveProfileInfo, savePhoto} = props

    if (!profile) {
        return <Preloader />
    }
    return (

        <div>
            <div className={mStyle.descriptionProfile}>
                <ProfileAvatar isOwner={isOwner} savePhoto={savePhoto} photo={profile.photos.large} fullName={profile.fullName} />
                <ProfileFullInfo isOwner={isOwner} status={status} 
                updateUserStatus={updateUserStatus} saveProfileInfo={saveProfileInfo}
                 profile={profile} />
            </div>
        </div>
    );
}

export default ProfileInfo;