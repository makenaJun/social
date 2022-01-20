import React, { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectMessages } from "../../redux/chatSelector";
import { ChatMessage } from "./ChatMessage";




export const ChatMessages: FC = () => {
    const messageAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    const messages = useSelector(selectMessages)

    useEffect(() => {
        if(isAutoScroll){
        messageAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (Math.abs( (element.scrollHeight - element.scrollTop) - element.clientHeight) < 200){
            !isAutoScroll && setIsAutoScroll(true) 
        }else{
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    const chatMessages = messages.map((m, index) => <ChatMessage key={m.id} message={m.message} userId={m.userId} userName={m.userName} photo={m.photo} />)
    return (
        <div style={{ height: '360px', overflowY: 'auto' }} onScroll={scrollHandler}>
            {chatMessages}
            <div ref={messageAnchorRef}></div>
        </div>
    )
}