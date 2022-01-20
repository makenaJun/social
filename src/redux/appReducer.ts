import { ThunkAction } from "redux-thunk";
import { getAuthUserData } from "./authReducer";
import { AppStateType, InferActionsTypes } from "./reduxStore";


let initialState = {
    initialized: false
}

export type InitialStateType = typeof initialState


const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {

        case 'UN/APP/INITIALIZED_SUCCESS': {
            return {
                ...state,
                initialized: true
            };
        }

        default:
            return state;
    }
};

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    initializedSuccess: () => ({ type: 'UN/APP/INITIALIZED_SUCCESS' } as const)
}


export const initializeApp = (): ThunkAction<void, AppStateType, unknown, ActionsTypes> => async (dispatch) => {
    await dispatch(getAuthUserData());
    dispatch(actions.initializedSuccess());
};

export default appReducer;