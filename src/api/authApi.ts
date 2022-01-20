import { instance, APIResponseType, ResultCodeEnum, ResultCodeForCaptcha } from "./api"

type MeDataType = {
        id: number,
        email: string,
        login: string
}
type LoginDataType = {
        userId: number
}
type CaptchaResponseType = {
    url: string
}

export const authAPI = {
    me() {
        return instance.get<APIResponseType<MeDataType>>('auth/me')
            .then(response => response.data)
    },

    login(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        return instance.post<APIResponseType<LoginDataType, ResultCodeEnum | ResultCodeForCaptcha>>('auth/login', {
            email,
            password,
            rememberMe,
            captcha
        }).then(response => response.data)
    },

    logout() {
        return instance.post<APIResponseType>('auth/logout').then(response => response.data)
    },

    getCaptcha() {
        return instance.get<CaptchaResponseType>('security/get-captcha-url').then(response => response.data)
    }
}