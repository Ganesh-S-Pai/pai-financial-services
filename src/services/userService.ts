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
            throw error
        }
    }

    const getUser = async (userIdentity?: string) => {
        const id = userIdentity ?? userId
        const endpoint = `${baseEndpoint}/${id}`

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
            throw error
        }
    }

    const updateUser = async (updatedUser: User) => {
        try {
            let url = baseEndpoint
            if (updatedUser.id) {
                url += "/" + updatedUser.id
            }

            const response = await put(url, {
                headers: {
                    'Authorization': `Bearer ${getAuthToken() || ''}`,
                },
            }, updatedUser)

            const { data } = response
            if (data) {
                return data
            } else {
                return []
            }
        }
        catch (error) {
            throw error
        }
    }

    const deleteUser = async (userId: string) => {
        try {
            let url = baseEndpoint
            if (userId) {
                url += "/" + userId
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
            throw error
        }
    }

    return { getUsers, getUser, updateUser, deleteUser }
}