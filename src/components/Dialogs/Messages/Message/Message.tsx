import React, { FC } from "react";
import mStyle from './Message.module.css';

type PropsType = {
    message: string
}

const Message: FC<PropsType> = (props) => {
    const { message } = props
    return (
        <div>
            <div className={mStyle.wrapper}>
            <div className={mStyle.avatar}>
                <img src="https://i.pinimg.com/originals/0c/a9/e2/0ca9e28dcb12dc698cfd2beda6d6fa64.jpg" alt="avatar"/>
                </div>

            <div className={mStyle.message}>
                {message}
            </div>
            </div>
        </div>
    );
}
export default Message;