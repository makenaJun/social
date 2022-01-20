import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import mStyle from './DialogItem.module.css';

type PropsType = {
    id: number
    name: string
}

const DialogItem: FC<PropsType> = (props) => {
    const { id, name } = props

    let path = `/dialogs/${id}`;
    return (
        <div>
            <div className={`${mStyle.dialog}`}>
                <NavLink to={path}>{name}</NavLink>
            </div>
        </div>
    );
}
export default DialogItem;