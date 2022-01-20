import React, { FC } from "react"
import { AppStateType } from './../redux/reduxStore'
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

export function withAuthRedirect<WCP>(Component: React.ComponentType<WCP>) {

    const RedirectComponent: FC<MapStateToPropsType> = (props) => {
        const { isAuth, ...restProps } = props
          if(!isAuth) return <Redirect to='/login' />

            return <Component {...restProps as WCP}/>
        }

    const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
        isAuth: state.auth.isAuth
    })
    return connect<MapStateToPropsType, {}, WCP, AppStateType>(mapStateToProps)(RedirectComponent)
}

type MapStateToPropsType = {
    isAuth: boolean
}
