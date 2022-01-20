import React, { FC, ComponentType } from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfileInfo } from "../../redux/profileReducer";
import { RouteComponentProps, useParams, withRouter } from "react-router-dom";
import { compose } from "redux";
import { AppStateType } from "../../redux/reduxStore";
import { ProfileType } from "../../types/types";

// type ParamsType = {
//   userId: string
// }

// export const ProfilePage: FC = () => {
//   let { userId } = useParams<ParamsType>()

//   return (
//     <Profile {...this.props as MapStateToPropsType & MapDispatchToPropsType}
//       isOwner={!userId}
//     />
//   )
// }

class ProfileContainer extends React.Component<OwnPropsType & MapDispatchToPropsType> {

  refreshProfile = () => {
    let userId: number | null = +this.props.match.params.userId;
    if (!userId) {
      (this.props.authUserId) ?
        userId = this.props.authUserId
        : this.props.history.push('/login')
    }
    this.props.getUserProfile(userId)
    this.props.getUserStatus(userId)
  }

  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps: OwnPropsType) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) this.refreshProfile();
  }

  render() {
    return (
      <Profile {...this.props as MapStateToPropsType & MapDispatchToPropsType}
        isOwner={!this.props.match.params.userId}
      />
    )
  }
}
type Params = {
  userId: string
}

type OwnPropsType = RouteComponentProps<Params> & MapStateToPropsType
type MapStateToPropsType = {
  profile: ProfileType | null
  status: string
  authUserId: number | null
  isAuth: boolean
}
type MapDispatchToPropsType = {
  getUserProfile: (userId: number) => void
  getUserStatus: (userId: number) => void
  updateUserStatus: (status: string) => void
  savePhoto: (photo: File) => void
  saveProfileInfo: (profile: ProfileType) => void
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authUserId: state.auth.id,
    isAuth: state.auth.isAuth
  }
}

export default compose<ComponentType>(
  withRouter,
  connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfileInfo })
)(ProfileContainer);
