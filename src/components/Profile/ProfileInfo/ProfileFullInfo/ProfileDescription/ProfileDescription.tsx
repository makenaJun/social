import React, { FC } from "react";
import { ContactsProfileType, ProfileType } from "../../../../../types/types";
import mStyle from "./ProfileDescription.module.css"

type PropsType = {
    profile: ProfileType
}

const ProfileDescription: FC<PropsType> = (props) => {

    const {aboutMe, lookingForAJob, lookingForAJobDescription, contacts} = props.profile

    return (
        <div className={mStyle.wrapper}>
            
            <div>
                <b>About me</b>: {aboutMe}
            </div>
            <div>
                <b>Looking for a job</b>:  {(lookingForAJob) ? "Yes" : "No"}
            </div>
            {lookingForAJob &&
                <div>
                    <b>My professional skills</b>: {(lookingForAJobDescription) ? lookingForAJobDescription : "No Description"}
                </div>}
            <div>
                <b>Contacts</b>: <div className={mStyle.contacts}>{Object.keys(contacts).map((key) => {
                    return <Contact key={key} contactKey={key} contactValue={contacts[key as keyof ContactsProfileType]} />
                })
                }
                </div>
            </div>
        </div>
    )
}

type ContactsPropsType = {
    contactKey: string
    contactValue: string
}

const Contact: FC<ContactsPropsType> = (props) => {
    const { contactKey, contactValue } = props
    return <div><i><b>{contactKey}</b></i>: {contactValue}</div>
}

export default ProfileDescription