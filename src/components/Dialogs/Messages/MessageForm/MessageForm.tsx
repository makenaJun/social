import React, { FC } from "react";
import { Field, InjectedFormProps } from "redux-form";
import { testForEmptiness } from "../../../../utils/validators/validators";
import { Textarea } from "../../../common/FormsControl/FormsControls";
import { MessageFormDataType } from "../Messages";
import mStyle from './MessageForm.module.css';

const fieldEmpty = testForEmptiness('fieldEmpty');


const MessageForm: FC<InjectedFormProps<MessageFormDataType>> = (props) => {
    return (
            <form onSubmit={props.handleSubmit} >
            <div className={mStyle.wrapper}>
            <Field  component={Textarea}   validate={[fieldEmpty]} name='newMessageBody' className={mStyle.addArea}  placeholder='Enter your message'/>
            <button className={mStyle.addButton}>Send</button>
            </div>
            </form>
    );
}
export default MessageForm;