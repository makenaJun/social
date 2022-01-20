import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import Users from './Users'
import Preloader from '../common/Preloader/Preloader'
import mStyle from './Users.module.css'
import { getIsFetching } from '../../redux/usersSelectors'



const UsersPage: FC = React.memo(() => {

    const isFetching = useSelector(getIsFetching)

   return (<>
            <div className={mStyle.titlePage}>
                Developers
             </div>
            {isFetching ? <Preloader /> : null}
            <Users />
        </>)
})


export default UsersPage