import { useCommonStore } from "@/stores/common"
import type { AuthCredentials, AuthResponse, SignupRequest } from "@/types/auth"
import { apiGateway } from "@/utils/apiGateway"

export const useAuthentication = () => {
    const { post } = apiGateway()
    const commonStore = useCommonStore()

    const authenticateUser = async (email: string, password: string): Promise<AuthResponse | null> => {
        const endpoint = '/auth/login'
        const body: AuthCredentials = { email, password }

        const response = await post(endpoint,
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        )

        if (response.token) {
            localStorage.setItem('token', response.token)
            commonStore.user = response.user
            return response
        } else {
            return null
        }
    }

    const registerUser = async (user: SignupRequest): Promise<AuthResponse | null> => {
        const endpoint = '/auth/signup'
        const body: SignupRequest = user

        const response = await post(endpoint,
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        )

        if (response.token) {
            localStorage.setItem('token', response.token)
            commonStore.user = response.user
            return response
        } else {
            return null
        }
    }

    const logoutUser = (): void => { localStorage.removeItem('token') }

    const getAuthToken = (): string | null => localStorage.getItem('token')

    const isAuthenticated = () => (): boolean => getAuthToken() !== null

    return { isAuthenticated, authenticateUser, registerUser, logoutUser, getAuthToken }
}