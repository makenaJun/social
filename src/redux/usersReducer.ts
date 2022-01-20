import { APIResponseType, ResultCodeEnum } from './../api/api';
import { Dispatch } from "react";
import { ThunkAction } from "redux-thunk";
import { userAPI } from "../api/user-api";
import { UserType } from "../types/types";
import { AppStateType, InferActionsTypes } from "./reduxStore";

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    portionSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, // Array of users ID
    filter: {
        term: '',
        friend: null as null | boolean
    }
}

export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter

export const usersReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {

    const manageFollowing = (boolean: boolean, actionUserId: number) => {
        return {
            ...state,
            users: state.users.map(user => {
                if (user.id === actionUserId) {
                    return {
                        ...user,
                        followed: boolean
                    };
                };
                return user;
            })
        }
    }

    switch (action.type) {

        case 'UN/USERS/FOLLOW':
            return manageFollowing(true, action.userId);

        case 'UN/USERS/UNFOLLOW':
            return manageFollowing(false, action.userId);

        case 'UN/USERS/SET_USERS':
            return {
                ...state,
                users: [...action.users],
            }

        case 'UN/USERS/SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }

        case 'UN/USERS/SET_FILTER':
            return {
                ...state,
                filter: action.payload.filter
            }

        case 'UN/USERS/SET_TOTAL_USERS_COUNT':
            return {
                ...state,
                totalUsersCount: action.totalCount
            }

        case 'UN/USERS/TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        case 'UN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS': {
            return {
                ...state,
                followingInProgress: action.FollowingProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }

        case 'RESET_FILTERS': {
            return {
                ...state,
                currentPage: 1,
                filter: { term: '', friend: null }
            }
        }

        default:
            return state;
    }
};

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {

    followSuccess: (userId: number) => ({ type: 'UN/USERS/FOLLOW', userId } as const),

    unfollowSuccess: (userId: number) => ({ type: 'UN/USERS/UNFOLLOW', userId } as const),

    setUsers: (users: Array<UserType>) => ({ type: 'UN/USERS/SET_USERS', users } as const),

    setCurrentPage: (currentPage: number) => ({ type: 'UN/USERS/SET_CURRENT_PAGE', currentPage } as const),

    setFilter: (filter: FilterType) => ({ type: 'UN/USERS/SET_FILTER', payload: {filter} } as const),

    setTotalUsersCount: (totalCount: number) => ({ type: 'UN/USERS/SET_TOTAL_USERS_COUNT', totalCount } as const),

    toggleIsFetching: (isFetching: boolean) => ({ type: 'UN/USERS/TOGGLE_IS_FETCHING', isFetching } as const),

    toggleFollowingProgress: (userId: number, FollowingProgress: boolean) => (
        { type: 'UN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS', userId, FollowingProgress } as const
    ),

    resetFilters: () => ( { type: 'RESET_FILTERS' } as const)
}


type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>

export const getUsers = (pageSize: number, currentPage: number, filter: FilterType): ThunkType =>
    async (dispatch) => {

        dispatch(actions.toggleIsFetching(true))

        let data = await userAPI.getUsers(pageSize, currentPage, filter)
        dispatch(actions.setCurrentPage(currentPage))
        dispatch(actions.setFilter(filter))
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setTotalUsersCount(data.totalCount))
    };




const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>,
    apiMethod: (userId: number) => Promise<APIResponseType>,
    actionCreator: (userId: number) => ReturnType<typeof actions.followSuccess> | ReturnType<typeof actions.unfollowSuccess>,
    userId: number) => {
    dispatch(actions.toggleFollowingProgress(userId, true))

    let response = await apiMethod(userId)

    if (response.resultCode === ResultCodeEnum.Success) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingProgress(userId, false))
};

export const follow = (userId: number): ThunkType => async (dispatch) => {
    let apiMethod = userAPI.follow.bind(userAPI)
    await _followUnfollowFlow(dispatch, apiMethod, actions.followSuccess, userId);
};

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    let apiMethod = userAPI.unfollow.bind(userAPI)
    await _followUnfollowFlow(dispatch, apiMethod, actions.unfollowSuccess, userId);
};

export const resetFilters = (): ThunkType => (dispatch) => {
    dispatch(actions.resetFilters())
}



export default usersReducer;