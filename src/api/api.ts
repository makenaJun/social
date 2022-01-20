import axios from "axios"

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "8fe373c6-ac19-4fc4-baf6-f60952b5767c"
    }
})

export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

export type GetItemsType<T> = {
    items: Array<T>
    totalCount: number
    error: string
}

export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}