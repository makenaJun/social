import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../redux/chatReducer";
import { selectStatus } from "../../redux/chatSelector"

export const AddChatMessagesForm: FC = () => {

    const [message, setMessage] = useState('')
    const readyStatus = useSelector(selectStatus)

    const dispatch = useDispatch()

    const SendMessageHandler = () => {
        if (!message) return
        dispatch(sendMessage(message))
        setMessage('')
    }
    const sendMessageCtrlEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
       if(e.ctrlKey && e.code === "Enter" && readyStatus === 'ready'){
        SendMessageHandler()
       }
    }
    return (
        <div>
            <div>
                <textarea onKeyDown={sendMessageCtrlEnter} onChange={(e) => {
                    setMessage(e.target.value)
                }} value={message} />
            </div>
            <div>
                <button className="ant-btn ant-btn-primary"  disabled={readyStatus !== 'ready'} onClick={SendMessageHandler}>Send</button>
            </div>
        </div>
    )
}