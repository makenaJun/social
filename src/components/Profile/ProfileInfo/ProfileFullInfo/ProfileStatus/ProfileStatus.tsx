import React, { ChangeEvent } from "react"

type PropsType = {
    status: string

    updateUserStatus: (newStatus: string) => void

}

type StateType = {
    editMode: boolean
    status: string
}

class ProfileStatus extends React.Component<PropsType, StateType> {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true,
            status: this.props.status
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateUserStatus(this.state.status)
    }

    onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        let statusText = event.target.value;
        this.setState({
            status: statusText
        })
    }

    componentDidUpdate (prevProps: PropsType, prevState: StateType) {
        if(prevProps.status !== this.props.status){
            this.setState({
                status: this.props.status
            })
        }

    }


    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || 'No status'}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input autoFocus onChange={this.onStatusChange}
                            onBlur={this.deactivateEditMode}
                            value={this.state.status} />
                    </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;