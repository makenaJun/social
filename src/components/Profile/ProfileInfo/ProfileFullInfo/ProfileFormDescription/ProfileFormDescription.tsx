import React, { FC } from "react"
import { InjectedFormProps, reduxForm } from "redux-form"
import { Field } from "redux-form"
import { ProfileType } from "../../../../../types/types"
import { maxLengthCreator } from "../../../../../utils/validators/validators"
import { Input } from "../../../../common/FormsControl/FormsControls"
import mStyle from "./ProfileFormDescription.module.css"

const maxLength100 = maxLengthCreator(100)


const ProfileFormDescription: FC<InjectedFormProps<ProfileType>> = (props) => {
    const { handleSubmit, error } = props

    {error && console.log(error)}
    return (
        <div className={mStyle.wrapper}>
            <form onSubmit={handleSubmit}>
                <div>Full name: <Field name={'fullName'} component={'input'} /></div>
                <div>About me: <Field name={'aboutMe'} component={Input} validate={[maxLength100]} placeholder={'Max 100 symbols'} /></div>
                <div> Looking for a job?
                <Field name={'lookingForAJob'} component={'input'} type={'checkbox'} />
                </div>
                <div>
                    My professional skills: <Field name={'lookingForAJobDescription'} component={'textarea'} />
                </div>
                <div>
                    <b>Contacts</b>:
                <div><i>facebook</i>: <Field name={'contacts.facebook'} component={'input'} /></div>
                    <div> <i>website</i>: <Field name={'contacts.website'} component={'input'} /></div>
                    <div> <i>vk</i>: <Field name={'contacts.vk'} component={'input'} /></div>
                    <div> <i>twitter</i>: <Field name={'contacts.twitter'} component={'input'} /></div>
                    <div> <i>instagram</i>: <Field name={'contacts.instagram'} component={'input'} /></div>
                    <div> <i>youtube</i>: <Field name={'contacts.youtube'} component={'input'} /></div>
                    <div> <i>github</i>: <Field name={'contacts.github'} component={'input'} /></div>
                    <div> <i>mainLink</i>: <Field name={'contacts.mainLink'} component={'input'} /></div>
                    <button>save</button>
                    
                </div>
            </form>
        </div>
    )
}

const ProfileReduxFormDescription = reduxForm<ProfileType>({
    form: 'profileDescription'
}
)(ProfileFormDescription)

export default ProfileReduxFormDescription