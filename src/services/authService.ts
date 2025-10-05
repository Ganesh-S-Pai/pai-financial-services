import type { AuthCredentials, AuthResponse } from "@/types/auth"
import { apiGateway } from "@/utils/apiGateway"

export const useAuthentication = () => {
    const { post } = apiGateway()

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
            return response
        } else {
            return null
        }
    }

    const logoutUser = (): void => { localStorage.removeItem('token') }

    const getAuthToken = (): string | null => localStorage.getItem('token')

    const isAuthenticated = () => (): boolean => getAuthToken() !== null

    return { isAuthenticated, authenticateUser, logoutUser, getAuthToken }
}