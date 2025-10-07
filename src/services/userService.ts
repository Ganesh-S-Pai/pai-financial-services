import { useAuthStore } from "@/stores/auth"
import { apiGateway } from "@/utils/apiGateway"
import { useAuthentication } from "./authService"
import type { User } from "@/types/auth"


export const useUsers = () => {
    const { get, put, del } = apiGateway()
    const { getAuthToken } = useAuthentication()
    const authStore = useAuthStore()

    const userId = authStore.userId
    const baseEndpoint = '/admin/users'
    const endpoint = `${baseEndpoint}/${userId}`

    const getUsers = async () => {
        try {
            const response = await get(baseEndpoint, {
                headers: {
                    'Authorization': `Bearer ${getAuthToken() || ''}`,
                },
            })

            const { data } = response
            if (data.length) {
                return data
            } else {
                return []
            }
        }
        catch (error) {
            console.error('Error fetching users data:', error)
            throw error
        }
    }

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
            let url = endpoint
            if (updatedUser.id) {
                url = baseEndpoint + "/" + updatedUser.id
            }

            const response = await put(url, updatedUser, {
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
            console.error('Error updating user data:', error)
            throw error
        }
    }

    const deleteUser = async (userId: string) => {
        try {
            let url = endpoint
            if (userId) {
                url = baseEndpoint + "/" + userId
            }

            const response = await del(url, {
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
            console.error('Error deleting user data:', error)
            throw error
        }
    }

    return { getUsers, getUser, updateUser, deleteUser }
}