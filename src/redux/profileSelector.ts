import { AppStateType } from './reduxStore';

export const getAuthUserId = (state: AppStateType) => {
    return state.auth.id
}

export const getStatus = (state: AppStateType) => {
    return state.profilePage.status
}

export const getProfile = (state: AppStateType) => {
    return state.profilePage.profile
}