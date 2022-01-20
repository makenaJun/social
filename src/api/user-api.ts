import { FilterType } from '../redux/usersReducer';
import { UserType } from '../types/types';
import { GetItemsType, instance, APIResponseType } from "./api"


export const userAPI = {
    getUsers(pageSize = 10, currentPage = 1, filter: FilterType) {
        const termStr = filter.term ? `&term=${filter.term}` : ''
        const friends = filter.friend === null ?  '' : `&friend=${filter.friend}`

        return instance.get<GetItemsType<UserType>>(`users?count=${pageSize}&page=${currentPage}${termStr}${friends}`)
            .then(response => response.data)
    },

    follow(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`)
            .then(response => response.data)
    },

    unfollow(userId: number) {
        return instance.delete<APIResponseType>(`follow/${userId}`)
            .then(response => response.data)
    }
}