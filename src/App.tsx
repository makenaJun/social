import React, { ComponentType, FC } from "react"
import './App.css'
import 'antd/dist/antd.css';
import { Link, Redirect, Route, Switch, withRouter } from "react-router-dom"
import ProfileContainer from "./components/Profile/ProfileContainer"
import Navbar from "./components/Navbar/Navbar"
import News from "./components/News/News"
import Music from "./components/Music/Music"
import Settings from "./components/Settings/Settings"
import DialogsContainer from "./components/Dialogs/DialogsContainer"
import { connect } from "react-redux"
import { compose } from "redux"
import Preloader from "./components/common/Preloader/Preloader"
import { initializeApp } from "./redux/appReducer"
import store, { AppStateType } from "./redux/reduxStore"
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { lazyLoader } from "./hoc/lazyLoader"
import { Login } from "./components/Login/Login"
import { Button, Result } from "antd";
import { Layout, Menu, Breadcrumb } from 'antd';
import { AppHeader } from "./components/AppHeader/AppHeader";
import { Footer } from "antd/lib/layout/layout";

const { Content, Sider } = Layout;


const UsersPage = React.lazy(() => import("./components/Users/UsersPage"))
const SuspendedUsers = lazyLoader(UsersPage)

const ChatPage = React.lazy(() => import("./pages/chat/ChatPage"))
const SuspendedChat = lazyLoader(ChatPage)


type PropsType = MapStateToProps & MapDispatchToProps

class App extends React.Component<PropsType> {

  catchAllUnhandledError = (promiseRejectionEvent: PromiseRejectionEvent) => {
    alert('Some error')
  }

  componentDidMount() {
    this.props.initializeApp()
    window.addEventListener('unhandledrejection', this.catchAllUnhandledError)
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledError)
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <Layout>
        <AppHeader />
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Navbar />
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item><Link to={'/profile'}>Home</Link></Breadcrumb.Item>
              <Breadcrumb.Item><Link to={'/developers'}>Developers</Link></Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Switch>

                <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
                <Route path='/dialogs' render={() => <DialogsContainer />} />
                <Route path='/news' component={News} />
                <Route path='/music' component={Music} />
                <Route path='/developers' render={() => <SuspendedUsers />} />
                <Route path='/settings' component={Settings} />
                <Route path='/login' render={() => <Login />} />
                <Route path='/chat' render={() => <SuspendedChat />} />
                
                <Redirect exact from='/' to='/profile' />
                <Route path='*' render={() => <Result
                  status="404"
                  title="404"
                  subTitle="Sorry, the page you visited does not exist."
                  extra={<Button type="primary"><Link to='/'>Back Home</Link></Button>}
                />} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
        <Footer style={{ background: '#303030', color: '#cccccc', textAlign: 'center' }}>Unity Network ©2021 Created by Makena</Footer>
      </Layout>

      // <div className='app-wrapper'>
      //   <Header />
      //   <Navbar />
      //   <div className='app-wrapper-content'>
      //     <Switch>

      //       <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
      //       <Route path='/dialogs' render={() => <DialogsContainer />} />
      //       <Route path='/news' component={News} />
      //       <Route path='/music' component={Music} />
      //       <Route path='/users' render={ () => <SuspendedUsers /> } />
      //       <Route path='/settings' component={Settings} />
      //       <Route path='/login' render={() => <Login />} />

      //       <Redirect exact from='/' to='/profile' />
      //       <Route path='*' render={() => <div>
      //       <h1>Oops!</h1>
      //       <h2>404</h2>
      //       <h2>PAGE NOT FOUND</h2>
      //       <Button>Ok</Button>
      //       </div>} />
      //     </Switch>
      //   </div>
      // </div>
    );
  }
}

type MapStateToProps = {
  initialized: boolean
}

type MapDispatchToProps = {
  initializeApp: () => void
}

const mapStateToProps = (state: AppStateType): MapStateToProps => ({
  initialized: state.app.initialized
})

const AppContainer = compose<ComponentType>(
  withRouter,
  connect<MapStateToProps, MapDispatchToProps, {}, AppStateType>(mapStateToProps, { initializeApp })
)(App);

const UnityNetworkApp: FC = () => {
  return (<BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
  )
}

export default UnityNetworkApp