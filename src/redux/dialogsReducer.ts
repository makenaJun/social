import { ThunkAction } from "redux-thunk";
import { AppStateType, InferActionsTypes } from "./reduxStore";


export type InitialStateDialogsType = {
    id: number
    name: string
}

export type InitialStateMessagesType = {
    id: number
    message: string
}

export type InitialStateType = typeof initialState

let initialState = {
    dialogs: [
        { id: 1, name: 'Marshall Mathers' },
        { id: 2, name: 'Shawn Carter' },
        { id: 3, name: 'Mark Zuckerberg' },
        { id: 4, name: 'Bruce Willis' },
        { id: 5, name: 'Jordan Valke' },
        { id: 6, name: 'Brendan Eich' }
    ] as  Array<InitialStateDialogsType>,

    messages: [
        { id: 1, message: 'Hello)' },
        { id: 2, message: 'How a you?' },
        { id: 3, message: 'My name Egor!' },
        { id: 4, message: 'Did you watch the news program on television yesterday evening?' },
        { id: 5, message: 'What was on?' },
        { id: 6, message: 'I like a musical or a love story. Historical films are my favourite ones. I like adventure films too.' },
        { id: 7, message: 'I\'m not sure yet. Is there something you want to see?' },
        { id: 8, message: 'Do you know what you\'re going to do this weekend?' },
        { id: 9, message: 'Thank you for inviting me, but I think I\'ll pass.' }
    ] as Array<InitialStateMessagesType>
}

export const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {

        case 'UN/DIALOGS/SEND_MESSAGE': {

            const calcId = (array: Array<InitialStateMessagesType>) => {
                let lastId = array[array.length - 1].id
                return ++lastId;
            };

            let newMessage = {
                id: calcId(state.messages),
                message: action.newMessageBody
            };

            return {
                ...state,
                messages: [...state.messages, newMessage]
            };
        }
        default:
            return state;
    }
};

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    sendMessage: (newMessageBody: string) => ({ type: 'UN/DIALOGS/SEND_MESSAGE', newMessageBody } as const)
}


export const sendNewMessageDialog = (newMessageBody: string): ThunkAction<void, AppStateType, unknown, ActionsTypes> => (dispatch) => {
    dispatch(actions.sendMessage(newMessageBody));
};

export default dialogsReducer;