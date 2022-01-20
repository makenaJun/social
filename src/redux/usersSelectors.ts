import { createSelector } from "reselect";
import { AppStateType } from "./reduxStore";

const receiveUsersSelect = (state: AppStateType) => {
    return state.usersPage.users
}

export const receiveUsers = createSelector([receiveUsersSelect], (users) => {
    return users.filter(user => true)
})

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress
}

export const getPortionSize = (state: AppStateType) => {
    return state.usersPage.portionSize
}

export const getUsersFilter = (state: AppStateType) => {
    return state.usersPage.filter
}