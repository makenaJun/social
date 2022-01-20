import { Header } from "antd/lib/layout/layout"
import React, { FC } from "react"
import mStyle from './AppHeader.module.css'
import { LoginPanel } from "./LoginPanel/LoginPanel"

export const AppHeader: FC = React.memo(() => {
    return (
        <Header className="header">
            <div className={mStyle.wrapper}>
                <div className={mStyle.logo} />
                <LoginPanel />
            </div>
        </Header>
    )
})
