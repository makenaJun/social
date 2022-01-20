import React, { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { reduxForm } from "redux-form"
import { login } from "../../redux/authReducer"
import { selectCaptchaUrl, selectIsAuth } from "../../redux/authSelector"
import LoginForm, { LoginFormOwnPropsType } from "./LoginForm/LoginForm"

export type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}

export const Login: FC = () => {

    const isAuth = useSelector(selectIsAuth)
    const captchaUrl = useSelector(selectCaptchaUrl)

    const dispatch = useDispatch()

    const onSubmit = (formData: LoginFormDataType) => {
        let { email, password, rememberMe, captcha } = formData
        dispatch(login(email, password, rememberMe, captcha))
    }



    if (isAuth) {
        return <Redirect to={"/profile"} />
    }
    return <div>
        <h2>Login</h2>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>
}

const LoginReduxForm = reduxForm<LoginFormDataType, LoginFormOwnPropsType, string>({
    form: 'login'
})(LoginForm)