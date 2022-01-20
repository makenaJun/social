import { AppStateType } from './reduxStore';

export const selectIsAuth = (state: AppStateType) => {
    return state.auth.isAuth
}

export const selectCaptchaUrl = (state: AppStateType) => {
    return state.auth.captchaUrl
}

export const selectLogin = (state: AppStateType) => {
    return state.auth.login
}

export const selectPhotoUrl = (state: AppStateType) => {
    return state.auth.photoUrl
}