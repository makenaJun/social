import { authAPI } from './../api/authApi';
import { ThunkAction } from 'redux-thunk';
import { FormAction, stopSubmit } from "redux-form";
import { ResultCodeEnum } from "../api/api";
import { profileAPI } from "../api/profileApi"
import { PhotosProfileType, ProfileType } from "../types/types";
import { AppStateType, InferActionsTypes } from './reduxStore';
import { getAuthUserData } from './authReducer';

export type PostsType = {
    id: number
    message: string
    likesCount: number
}

let initialState = {
    posts: [
        { id: 1, message: 'My first post!', likesCount: 29 },
        { id: 2, message: '“All I know is that the first step is to create a vision, because when you see the vision – the beautiful vision – that creates the want power.“', likesCount: 21 },
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: ''
}

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {

        case 'UN/PROFILE/ADD_POST': {

            const calcId = (array: Array<PostsType>) => {
                let lastId = array[array.length - 1].id
                return ++lastId;
            };

            let newPost = {
                id: calcId(state.posts),
                message: action.text,
                likesCount: 0
            };

            return {
                ...state,
                posts: [...state.posts, newPost]
            };
        }
        case 'UN/PROFILE/DELETE_POST': {
            return {
                ...state,
                posts: state.posts.filter((post) => post.id !== action.postId)
            }
        }

        case 'UN/PROFILE/SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile
            }
        }

        case 'UN/PROFILE/SET_PHOTO': {
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileType
            }
        }

        case 'UN/PROFILE/SET_USER_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }

        default:
            return state;
    }
}


type ActionsTypes = InferActionsTypes<typeof actions>


export const actions = {
    addPost: (text: string) => ({ type: 'UN/PROFILE/ADD_POST', text } as const),
    deletePost: (postId: number) => ({ type: 'UN/PROFILE/DELETE_POST', postId } as const),
    setUserProfile: (profile: ProfileType) => ({ type: 'UN/PROFILE/SET_USER_PROFILE', profile } as const),
    setUserStatus: (status: string) => ({ type: 'UN/PROFILE/SET_USER_STATUS', status } as const),
    setPhoto: (photos: PhotosProfileType) => ({ type: 'UN/PROFILE/SET_PHOTO', photos } as const)
}



type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>


export const addProfilePost = (text: string): ThunkType => (dispatch) => {
    dispatch(actions.addPost(text));
};

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data))
};

export const getUserStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(actions.setUserStatus(data));
};

export const updateUserStatus = (status: string): ThunkType => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(actions.setUserStatus(status));
    }
};

export const savePhoto = (filePhoto: File): ThunkType => async (dispatch) => {
    let response = await profileAPI.savePhoto(filePhoto)
    if (response.resultCode === ResultCodeEnum.Success) {
        await dispatch(actions.setPhoto(response.data))
    let responseMe = await authAPI.me()
    if(responseMe.resultCode === ResultCodeEnum.Success){
        let id = responseMe.data.id 
        dispatch(getAuthUserData())
        dispatch(getUserProfile(id))
    }
    }
}


type ThunkSaveProfileInfoType = ThunkAction<void, AppStateType, unknown, ActionsTypes | FormAction>

export const saveProfileInfo = (profile: ProfileType): ThunkSaveProfileInfoType => async (dispatch) => {
    let response = await profileAPI.saveProfileInfo(profile)
    if (response.data.resultCode === ResultCodeEnum.Success) {
        dispatch(getUserProfile(profile.userId))
    } else if (response.data.resultCode === ResultCodeEnum.Error) {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error!';
        dispatch(stopSubmit('profileDescription', { _error: message }))
    }
}


export default profileReducer