import React, {FC} from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import mStyle from './Profile.module.css';
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import { ProfileType } from "../../types/types";

type PropsType = {
  profile: ProfileType | null
  status: string
  isOwner: boolean

  updateUserStatus: (status: string) => void
  savePhoto: (photo: File) => void
  saveProfileInfo: (profile: ProfileType) => void
}

const Profile: FC<PropsType> = (props) => {
  const { profile, status, updateUserStatus, isOwner, savePhoto, saveProfileInfo } = props
  return (
    <div className={mStyle.wrapperProfile}>
      <ProfileInfo profile={profile} status={status}
        updateUserStatus={updateUserStatus} isOwner={isOwner} savePhoto={savePhoto} saveProfileInfo={saveProfileInfo} />
      <MyPostsContainer />
    </div>
  );
}

export default Profile;