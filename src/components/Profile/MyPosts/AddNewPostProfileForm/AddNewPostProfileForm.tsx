import React, { FC } from "react";
import { Field, InjectedFormProps } from "redux-form";
import mStyle from "./AddNewPostProfileForm.module.css"
import { testForEmptiness, maxLengthCreator} from "../../../../utils/validators/validators"
import { Textarea } from "../../../common/FormsControl/FormsControls";
import { PostFormDataType } from "../MyPosts"

const fieldEmpty = testForEmptiness('fieldEmpty');
const maxLength3000 = maxLengthCreator(3000);

const AddNewPostProfileForm: FC<InjectedFormProps<PostFormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={mStyle.addPostArea}>
            <div>
                <Field component={Textarea} name={'text'} validate={[fieldEmpty, maxLength3000]} className={mStyle.addArea} placeholder='Enter your think' />
            </div>
            <div>
                <button className="ant-btn ant-btn-primary" >Add post</button>
            </div>
        </form>
    )
}

export default AddNewPostProfileForm;