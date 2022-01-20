import React, { FC } from "react";
import { Link, NavLink } from "react-router-dom";
import mStyle from './LoginPanel.module.css';
import noavatar from '../../../assets/images/noavatar.png'
import { Button } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth, selectLogin, selectPhotoUrl } from "../../../redux/authSelector"
import { logout } from "../../../redux/authReducer";


export const LoginPanel: FC = React.memo(() => {
    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectLogin)
    const photoUrl = useSelector(selectPhotoUrl)

    const dispatch = useDispatch()

    const logoutCallback = () => {
        dispatch(logout())
    }



    if (!isAuth) {
        return (<div>
            <NavLink to={'/login'}>
                <Button type="primary">Login</Button>
            </NavLink>
        </div>)
    }
    return (
        <div className={mStyle.greeting}>
            <span>{login}</span>
            <Link title={login} to={`/profile`}>
                <Avatar src={(photoUrl) ? photoUrl : noavatar} />
            </Link>
            <div>
                <Button onClick={logoutCallback} type="primary" >Log out</Button>
            </div>
        </div>
    )
})
