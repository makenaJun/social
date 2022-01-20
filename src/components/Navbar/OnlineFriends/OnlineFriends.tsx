import React, { FC } from "react";
import mStyle from './OnlineFriends.module.css';

type PropsType = {
  avatarSrc: string
  name: string
}

const OnlineFriends: FC<PropsType> = (props) => {
  const { avatarSrc, name } = props
  return (
    <div>
      <div className={mStyle.avatarFriend}>
        <img src={avatarSrc} alt={name}/>
      </div>
    </div>
  )
}

export default OnlineFriends;