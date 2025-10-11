import { useAuthStore } from "@/stores/auth"
import type { AuthCredentials, AuthResponse, SignupRequest } from "@/types/auth"
import { apiGateway } from "@/utils/apiGateway"

export const useAuthentication = () => {
    const { post } = apiGateway()
    const authStore = useAuthStore()

    const authenticateUser = async (email: string, password: string): Promise<AuthResponse | null> => {
        const endpoint = '/auth/login'
        const body: AuthCredentials = { email, password }

        const response = await post(endpoint,
            {},
            body
        )

        const { data } = response
        if (data.token) {
            authStore.userId = data.user.id
            authStore.token = data.token
            return data
        } else {
            return null
        }
    }

    const registerUser = async (user: SignupRequest): Promise<AuthResponse | null> => {
        const endpoint = '/auth/signup'
        const body: SignupRequest = user

        const response = await post(endpoint,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
            body
        )

        const { data } = response
        if (data.token) {
            authStore.userId = data.user.id
            authStore.token = data.token
            return data
        } else {
            return null
        }
    }

    const logoutUser = (): void => { authStore.token = undefined }

    const getAuthToken = (): string | undefined => authStore.token  

    const isAuthenticated = () => (): boolean => getAuthToken() !== null

    return { isAuthenticated, authenticateUser, registerUser, logoutUser, getAuthToken }
}