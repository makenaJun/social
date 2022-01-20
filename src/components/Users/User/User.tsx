import React, { FC } from "react";
import mStyle from "./User.module.css";
import noavatar from "../../../assets/images/noavatar.png"
import { NavLink } from "react-router-dom";
import { Button } from "antd";

type PropsType = {
    id: number
    fullName: string
    status: string
    avatarUrl: string | null
    follow: (id: number) => void
    unfollow: (id: number) => void
    followingInProgress: Array<number>
    followed: boolean
}

const User: FC<PropsType> = (props) => {
    const { id, fullName, status, avatarUrl, follow, unfollow, followingInProgress, followed } = props
    return (
        <div>
            <div className={mStyle.wrapper}>
                <div className={mStyle.leftSide}>
                    <div className={mStyle.avatar}>
                        <NavLink to={`/profile/${id}`} > <img src={(avatarUrl !== null) ? avatarUrl : noavatar} alt={fullName} /> </NavLink>
                    </div>
                    <div>
                        {(followed) ?
                            <Button type="primary" disabled={followingInProgress.some((userId: number) => userId === id)}
                                onClick={() => { unfollow(id) }}>Unfollow</Button>
                            : <Button type="primary" disabled={followingInProgress.some((userId: number) => userId === id)}
                                onClick={() => { follow(id) }}>Follow</Button>
                        }
                    </div>
                </div>

                <div className={mStyle.wrapFullInfo}>

                    <div className={mStyle.topInfo}>
                        <span className={mStyle.fullName}>{fullName}</span>
                        <span className={mStyle.from}>Solar system,<br /> Planet Earth</span>
                    </div>

                    <div className={mStyle.status}>
                        {status}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default User;