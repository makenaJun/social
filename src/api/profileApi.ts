import { PhotosProfileType, ProfileType } from '../types/types';
import { instance, APIResponseType } from "./api"

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`).then(response => response.data)
    },

    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then(response => response.data)
    },

    updateStatus(statusValue: string) {
        return instance.put<APIResponseType>(`profile/status/`, {
            status: statusValue
        })
    },

    savePhoto(filePhoto: File) {
        const formData = new FormData();
        formData.append('image', filePhoto)
        return instance.put<APIResponseType<PhotosProfileType>>(`profile/photo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(response => response.data)
    },

    saveProfileInfo(profile: ProfileType) {
        return instance.put<APIResponseType>(`profile`, { ...profile }
        )
    }
}