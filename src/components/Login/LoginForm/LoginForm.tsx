import React, { FC } from "react";
import { Field, InjectedFormProps } from "redux-form";
import { testForEmptiness } from "../../../utils/validators/validators";
import { Input } from "../../common/FormsControl/FormsControls";
import mStyle from "./LoginForm.module.css"
import styles from "../../common/FormsControl/FormsControls.module.css";
import {LoginFormDataType} from "../Login"

const required = testForEmptiness('required');

export type LoginFormOwnPropsType = {
    captchaUrl: string | null
}


const LoginForm: FC<InjectedFormProps<LoginFormDataType, LoginFormOwnPropsType> & LoginFormOwnPropsType> = (props) => {
    const {handleSubmit, error, captchaUrl} = props
    return (
        <form onSubmit={handleSubmit} className={mStyle.wrapper} >
            <div><Field component={Input} validate={[required]} name={'email'} type={'text'} placeholder={'Email'}  className={mStyle.input}/></div>
            <div><Field component={Input} validate={[required]} name={'password'} type={'password'} placeholder={'Password'}  className={mStyle.input}/></div>
            <div><Field component={'input'} name={'rememberMe'} type={'checkbox'} id={'rememberMe'} />remember me</div>
            {error && <div className={styles.formSummaryError}>{error}</div>}
            {captchaUrl && <div>
            <img src={captchaUrl} alt='captcha' />
            <div><Field component={Input} validate={[required]} name={'captcha'} type={'text'} /></div>            
            </div>}
            <div><button className={mStyle.loginButton}>Log in</button></div>
        </form>
    )
}

export default LoginForm