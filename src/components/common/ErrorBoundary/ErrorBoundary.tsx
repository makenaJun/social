import React, { ErrorInfo, ReactNode } from "react";

let log = (error: Error, errorInfo: ErrorInfo) => {
    console.log('My error', error, errorInfo)
}

type PropsType = {
    children: ReactNode
}
type StateType = {
    hasError: boolean
}

class ErrorBoundary extends React.Component<PropsType, StateType> {

    constructor(props: PropsType){
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error){
        return (
        <h1>Oops... Something went wrong!</h1>
        )
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo){
        log(error, errorInfo)
    }

    render(){
        return this.props.children
    }
}

export default ErrorBoundary;