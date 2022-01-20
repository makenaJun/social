import { ResultCodeEnum, ResultCodeForCaptcha } from './../api/api';
import { FormAction, stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { authAPI } from "../api/authApi";
import {profileAPI} from "../api/profileApi"
import { AppStateType, InferActionsTypes } from "./reduxStore";


let initialState = {
    id: null as number | null,
    login: undefined as string | undefined,
    email: null as string | null,
    photoUrl: null as string | null,
    isAuth: false as boolean,
    isFetching: false as boolean,
    captchaUrl: null as string | null
}

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {

        case 'UN/AUTH/SET_USER_DATA': {
            return {
                ...state,
                ...action.payload,
                captchaUrl: null
            }
        };

        case 'UN/AUTH/SET_PROFILE_PHOTO': {
            return {
                ...state,
                photoUrl: action.photoUrl
            }
        };

        case 'UN/AUTH/SET_CAPTCHA_URL': {
            return {
                ...state,
                captchaUrl: action.url
            }
        };

        default:
            return state;
    };
};

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    setAuthUserData: (id: number | null, login: string | undefined, email: string | null, isAuth: boolean) => (
        { type: 'UN/AUTH/SET_USER_DATA', payload: { id, login, email, isAuth } } as const),
    setProfilePhoto: (photoUrl: string | null) => ({ type: 'UN/AUTH/SET_PROFILE_PHOTO', photoUrl } as const),
    setCaptcha: (url: string) => ({ type: 'UN/AUTH/SET_CAPTCHA_URL', url } as const)
}




type ThinkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>

export const getAuthUserData = (): ThinkType => async (dispatch) => {

    let meData = await authAPI.me();
    if (meData.resultCode === ResultCodeEnum.Success) {
        let { id, login, email } = meData.data;
        dispatch(actions.setAuthUserData(id, login, email, true));

        let data = await profileAPI.getProfile(id);
        dispatch(actions.setProfilePhoto(data.photos.large));
    }
};

type LoginThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes | FormAction>

export const login = (email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null): LoginThunkType => async (dispatch) => {
        let data = await authAPI.login(email, password, rememberMe, captcha);

        if (data.resultCode === ResultCodeEnum.Success) {
            dispatch(getAuthUserData());
        } else if (data.resultCode === ResultCodeEnum.Error) {
            let message = data.messages.length > 0 ? data.messages[0] : 'Some error!';
            dispatch(stopSubmit('login', { _error: message }));
        } else if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {

            let message = data.messages.length > 0 ? data.messages[0] : 'Some error!';

            let dataCaptcha = await (await authAPI.getCaptcha())
            dispatch(actions.setCaptcha(dataCaptcha.url))
            dispatch(stopSubmit('login', { _error: message }))
        }
    };

export const logout = (): ThinkType => async (dispatch) => {
    let data = await authAPI.logout();

    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setAuthUserData(null, undefined, null, false));
    } else {
        alert('Failed LOGOUT');
    }
};

export default authReducer;