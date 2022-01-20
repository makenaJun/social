import React, { FC, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startMessagesListening, stopMessagesListening } from "../../redux/chatReducer"
import { selectStatus } from "../../redux/chatSelector"
import { AddChatMessagesForm } from "./AddChatMessageForm"
import { ChatMessages } from "./ChatMessages"

export const Chat: FC = () => {

    const readyStatus = useSelector(selectStatus)

    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <div>
            {(readyStatus === 'error') && <div> Some error occurred - please refresh the page </div>}
            <ChatMessages />
            <AddChatMessagesForm /> 
        </div>
    )
}