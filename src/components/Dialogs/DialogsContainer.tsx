import React, { ComponentType } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { withAuthRedirect } from "../../hoc/withAuthRedirect"
import { AppStateType } from "../../redux/reduxStore"
import mStyle from './Dialogs.module.css'
import DialogsList from "./DialogsList/DialogsList"
import {InitialStateDialogsType, InitialStateMessagesType, sendNewMessageDialog} from "../../redux/dialogsReducer"
import Messages from "./Messages/Messages"

type MapStateToPropsType = {
  dialogs: Array<InitialStateDialogsType>
  messages: Array<InitialStateMessagesType>
}
type MapDispatchToPropsType = {
  sendNewMessageDialog: (newMessageBody: string) => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType

class DialogsContainer extends React.Component<PropsType> {
  render() {
    return (<div className={mStyle.dialogs}>
    <DialogsList dialogs={this.props.dialogs} />
    <Messages messages={this.props.messages} sendNewMessageDialog={this.props.sendNewMessageDialog} />
  </div>)
  }
  
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
  dialogs: state.dialogsPage.dialogs,
  messages: state.dialogsPage.messages
  }
}

export default compose<ComponentType>(
  connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {sendNewMessageDialog}),
  withAuthRedirect
)(DialogsContainer)