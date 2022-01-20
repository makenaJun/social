import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunkMiddleware from "redux-thunk"
import { reducer as formReducer } from "redux-form"
import appReducer from "./appReducer";
import chatReducer from "./chatReducer";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer,
    chat: chatReducer
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

type PropertiesTypes<T> = T extends {[key: string]: infer U}? U : never
export type InferActionsTypes<T extends {[key: string]: (...arg: any) => any}> = ReturnType<PropertiesTypes<T>>



//@ts-ignore
 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

 const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store