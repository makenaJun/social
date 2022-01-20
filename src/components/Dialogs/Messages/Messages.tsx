import React, { Dispatch, FC } from "react";
import mStyle from './Messages.module.css';
import Message from "./Message/Message";
import MessageForm from "./MessageForm/MessageForm";
import { FormAction, reduxForm, reset } from "redux-form";
import { InitialStateMessagesType } from "../../../redux/dialogsReducer";

export type MessageFormDataType = {
  newMessageBody: string
}

type PropsType = {
  messages: Array<InitialStateMessagesType>
  sendNewMessageDialog: ( newMessageBody: string ) => void
}



const Messages: FC<PropsType> = (props) => {
  const { messages, sendNewMessageDialog } = props

  let messagesElements = messages.map(item => <Message key={item.id} message={item.message} />);

  const sendNewMessage = (formData: MessageFormDataType, dispatch: Dispatch<FormAction>) => {
    sendNewMessageDialog(formData.newMessageBody);
    dispatch(reset('dialogMessageForm'));
  }

  return (
      <div className={mStyle.messages}>
        {messagesElements}
        <MessageReduxForm onSubmit={sendNewMessage}/>
      </div>
  );
}

const MessageReduxForm = reduxForm<MessageFormDataType>({
  form: 'dialogMessageForm'
})(MessageForm)

export default Messages;