import React, { FC } from "react"
import mStyle from './DialogsList.module.css'
import DialogItem from "./DialogItem/DialogItem"
import { InitialStateDialogsType } from "../../../redux/dialogsReducer"

type PropsType = {
    dialogs: Array<InitialStateDialogsType>
}

const DialogsList: FC<PropsType> = (props) => {
    const { dialogs } = props

    let dialogsElements = dialogs
        .map(dialog => <DialogItem key={dialog.id} id={dialog.id} name={dialog.name} />)

    return (
        <div>
            <div className={mStyle.dialogs_item}>
                {dialogsElements}
            </div>
        </div>
    );
}
export default DialogsList