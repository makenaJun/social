import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import mStyle from './Navbar.module.css';
import OnlineFriends from "./OnlineFriends/OnlineFriends";
import { Menu } from 'antd';
import profileIcon from '../../assets/images/icon/profile.png'
import emailIcon from '../../assets/images/icon/email.png'
import newsIcon from '../../assets/images/icon/newspaper.png'
import musicIcon from '../../assets/images/icon/music.png'
import searchDevsIcon from '../../assets/images/icon/search.png'
import settingsIcon from '../../assets/images/icon/settings.png'
import chatIcon from '../../assets/images/icon/chat.png'


const Navbar: FC = () => {

    const friendsAvatar = [
      'https://i.pinimg.com/236x/69/5e/04/695e042228525c5125200f6ff91a2bbe.jpg',
      'https://i.pinimg.com/736x/3f/af/8c/3faf8cc35e636ce9fb37cef096f08853.jpg',
      'https://i.pinimg.com/originals/9a/da/3b/9ada3bc305a1f45eab527f60da172d53.png'
    ];
    const OnlineFriend = friendsAvatar.map(friendImg => <OnlineFriends key={Math.random()} avatarSrc={friendImg} name='myFriend' />)

  return (
    <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              style={{ height: '100%', borderRight: 0 }}
            >
                <Menu.Item key="1" icon={<img src={profileIcon} alt='Profile' />}><NavLink to='/profile' >Profile</NavLink></Menu.Item>
                <Menu.Item key="2" icon={<img src={emailIcon} alt='Message' /> }><NavLink to='/dialogs'>Messages</NavLink></Menu.Item>
                <Menu.Item key="7" icon={<img src={chatIcon} alt='Chat' /> } ><NavLink to='/chat'>Chat</NavLink></Menu.Item>
                <Menu.Item key="3" icon={<img src={newsIcon} alt='News' /> } danger={true}><NavLink to='/news'>News</NavLink></Menu.Item>
                <Menu.Item key="4" icon={<img src={musicIcon} alt='Music' />} danger={true}><NavLink to='/music'>Music</NavLink></Menu.Item>
                <div className={mStyle.separator}></div>
                <Menu.Item key="5" icon={<img src={searchDevsIcon} alt='Developers' /> }><NavLink to='/developers'>Find Developers</NavLink></Menu.Item>
                <Menu.Item key="6" icon={<img src={settingsIcon} alt='Settings' /> } danger={true}><NavLink to='/settings'>Settings</NavLink></Menu.Item>
                
                
            </Menu>
    // <nav className={mStyle.navigation}>
    //   <div className={`${mStyle.item} ${mStyle.profile}`}><NavLink to='/profile' activeClassName={mStyle.activeLink}>Profile</NavLink></div>
    //   <div className={`${mStyle.item} ${mStyle.messages}`}><NavLink to='/dialogs' activeClassName={mStyle.activeLink}>Messages</NavLink></div>
    //   <div className={`${mStyle.item} ${mStyle.news}`}><NavLink to='/news' activeClassName={mStyle.activeLink}>News</NavLink></div>
    //   <div className={`${mStyle.item} ${mStyle.music}`}><NavLink to='/music' activeClassName={mStyle.activeLink}>Music</NavLink></div>

    //   <div className={mStyle.separator}></div>
    //   <div className={`${mStyle.item} ${mStyle.findUser}`}><NavLink to='/users' activeClassName={mStyle.activeLink}>Find Users</NavLink></div>
    //   <div className={`${mStyle.item} ${mStyle.settings}`}><NavLink to='/settings' activeClassName={mStyle.activeLink}>Settings</NavLink></div>
    //   <div className={mStyle.separator}></div>
    //   <div className={mStyle.friends}>
    //     Friend online:
    //     <div className={mStyle.wrapperAvaOnline}>
    //    {OnlineFriend}
    //    </div>
    //     </div>
    // </nav>
  );
}

export default Navbar;
