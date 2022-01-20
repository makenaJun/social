import { AppStateType } from './reduxStore';

export const selectMessages = (state: AppStateType) => {
    return state.chat.messages
}

export const selectStatus = (state: AppStateType) => {
    return state.chat.status
}