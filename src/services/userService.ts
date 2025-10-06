import { useAuthStore } from "@/stores/auth"
import { apiGateway } from "@/utils/apiGateway"
import { useAuthentication } from "./authService"


export const useUsers = () => {
    const { get } = apiGateway()
    const { getAuthToken } = useAuthentication()
    const authStore = useAuthStore()

    const getUser = async () => {
        const userId = authStore.userId
        const endpoint = `/admin/users/${userId}`

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

    return { getUser }
}