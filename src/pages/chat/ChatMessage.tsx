import Avatar from "antd/lib/avatar/avatar";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { ChatMessageApiType } from "../../api/chat-api";

export const ChatMessage: FC<ChatMessageApiType> = React.memo((props) => {
    
    const { message, userName, photo, userId } = props
    return (
        <div style={{padding: '10px'}}>
            <Avatar src={photo} size={50}/><b><Link to={`profile/${userId}`}>{userName}</Link></b>{message}
            <hr />
        </div>
    )
})