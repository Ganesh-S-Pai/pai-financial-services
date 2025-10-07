import { useAuthStore } from "@/stores/auth"
import { apiGateway } from "@/utils/apiGateway"
import { useAuthentication } from "./authService"
import type { User } from "@/types/auth"


export const useUsers = () => {
    const { get, put } = apiGateway()
    const { getAuthToken } = useAuthentication()
    const authStore = useAuthStore()

    const userId = authStore.userId
    const endpoint = `/admin/users/${userId}`

    const getUser = async () => {
        try {
            const response = await get(endpoint, {
                headers: {
                    'Authorization': `Bearer ${getAuthToken() || ''}`,
                },
            })

            const { data } = response
            if (data) {
                return data
            } else {
                return []
            }
        }
        catch (error) {
            console.error('Error fetching user data:', error)
            throw error
        }
    }

    const updateUser = async (updatedUser: User) => {
        try {
            const response = await put(endpoint, updatedUser, {
                headers: {
                    'Authorization': `Bearer ${getAuthToken() || ''}`,
                },
            })

            const { data } = response
            if (data) {
                return data
            } else {
                return []
            }
        }
        catch (error) {
            console.error('Error fetching user data:', error)
            throw error
        }
    }

    return { getUser, updateUser }
}