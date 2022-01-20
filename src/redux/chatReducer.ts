import { chatApi, ConnectStatusType } from './../api/chat-api';
import { ThunkAction } from "redux-thunk";
import { ChatMessageApiType } from "../api/chat-api";
import { AppStateType, InferActionsTypes } from "./reduxStore";
import { Dispatch } from 'redux';
import { v1 } from 'uuid';

let initialState = {
    messages: [] as Array<ChatMessageType>,
    status: 'pending' as ConnectStatusType
}

export type ChatMessageType = ChatMessageApiType & {id: string}

export type InitialStateType = typeof initialState

const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'UN/CHAT/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map((m) => ({...m, id: v1() }))]
                .filter((m, index, array) => index >= array.length - 10)
            }
        case 'UN/CHAT/STATUS_CHANGED':
            return {
                ...state,
                status: action.payload.status
            }
        case 'UN/CHAT/REMOVE_MESSAGE':
            return {
                ...state,
                messages: []
            }

        default:
            return state;
    };
};

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    messagesReceived: (messages: Array<ChatMessageType>) => (
        { type: 'UN/CHAT/MESSAGES_RECEIVED', payload: { messages } } as const),
    statusChanged: (status: ConnectStatusType) => (
        { type: "UN/CHAT/STATUS_CHANGED", payload: { status } } as const
    ),
    removeMessage: () => (
        { type: "UN/CHAT/REMOVE_MESSAGE" } as const
    )
}

let _newMessagesHandler: ((messages: Array<ChatMessageType>) => void) | null = null
const newMessagesHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessagesHandler === null) {
        _newMessagesHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessagesHandler
}

let _statusChangedHandler: ((status: ConnectStatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangedHandler
}

type ThinkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>

export const startMessagesListening = (): ThinkType => async (dispatch) => {
    chatApi.start()
    chatApi.subscribe('messages-received' , newMessagesHandlerCreator(dispatch))
    chatApi.subscribe('status-changed' , statusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThinkType => async (dispatch) => {
    chatApi.unsubscribe('messages-received' , newMessagesHandlerCreator(dispatch))
    chatApi.unsubscribe('status-changed' , statusChangedHandlerCreator(dispatch))
    dispatch(actions.removeMessage())
    dispatch(actions.statusChanged('pending'))
    chatApi.stop()
}

export const sendMessage = (message: string): ThinkType => async (dispatch) => {
    chatApi.sendMessage(message)
}

export default chatReducer;