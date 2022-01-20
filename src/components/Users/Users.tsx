import React, { FC, useEffect } from "react";
import mStyle from "./Users.module.css";
import User from "./User/User";
import { UserType } from "../../types/types";
import UserSearchForm from "./UsersSearchForm";
import { FilterType, getUsers, follow, unfollow } from "../../redux/usersReducer";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPage, getPageSize, getTotalUsersCount, getFollowingInProgress, getUsersFilter, receiveUsers } from "../../redux/usersSelectors";
import { useHistory } from "react-router-dom";
import queryString from 'querystring'
import { Pagination } from "antd";

type PropsType = {

}

type QueryParamsType = {
   term?: string
   friend?: string
   page?: string
}

const Users: FC<PropsType> = React.memo((props) => {

   const users = useSelector(receiveUsers)
   const totalUsersCount = useSelector(getTotalUsersCount)
   const currentPage = useSelector(getCurrentPage)
   const pageSize = useSelector(getPageSize)
   const followingInProgress = useSelector(getFollowingInProgress)
   const filter = useSelector(getUsersFilter)

   const dispatch = useDispatch()
   const history = useHistory()

   useEffect(() => {
      const parsed = queryString.parse(history.location.search.substr(1))as QueryParamsType

      let actualPage = currentPage
      let actualFilter = filter

      if (!!parsed.page) actualPage = Number(parsed.page)

      if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term as string }

      switch (parsed.friend) {
         case 'null':
            actualFilter = { ...actualFilter, friend: null }
            break
         case 'true':
            actualFilter = { ...actualFilter, friend: true }
            break
         case 'false':
            actualFilter = { ...actualFilter, friend: false }
            break
      }

      dispatch(getUsers(pageSize, actualPage, actualFilter))
   }, [])

   useEffect(() => {

      const query: QueryParamsType = {}
      if (!!filter.term) query.term = filter.term
      if (filter.friend !== null) query.friend = String(filter.friend)
      if (currentPage > 1) query.page =  String(currentPage)

      history.push({
         pathname: '/developers',
         search: queryString.stringify(query)
      })
   }, [filter, currentPage])

   const onPageChanged = (current: number, size: number = 10 ) => {
      dispatch(getUsers(size, current, filter))
   }

   const onFilterChanged = (filter: FilterType) => {
      dispatch(getUsers(pageSize, 1, filter))
   }

   const onFollow = (id: number) => {
      dispatch(follow(id))
   }
   const onUnFollow = (id: number) => {
      dispatch(unfollow(id))
   }

   let Users = users.map((user: UserType) => <User
      key={user.id}
      id={user.id}
      avatarUrl={user.photos.small}
      followed={user.followed}
      fullName={user.name}
      status={user.status}
      followingInProgress={followingInProgress}
      follow={onFollow}
      unfollow={onUnFollow}
   />);


   return (<div>
      <div>
         <UserSearchForm onFilterChanged={onFilterChanged} />
      </div>
      <div className={mStyle.wrapperUsers}>
         {Users}
      </div>
      <div className={mStyle.paginator}>
      <Pagination defaultCurrent={1} total={totalUsersCount} onChange={onPageChanged} 
      onShowSizeChange={onPageChanged}/>
      </div>
   </div>
   )
})

export default Users;