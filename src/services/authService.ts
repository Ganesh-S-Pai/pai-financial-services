import type { AuthCredentials, AuthResponse } from "@/types/auth"
import { computed } from "vue"

export const useAuthentication = () => {
    const isAuthenticated = computed((): boolean => getAuthToken() !== null)

    const authenticateUser = async (email: string, password: string): Promise<AuthResponse | null> => {
        const baseUrl = import.meta.env.VITE_API_URL
        const body: AuthCredentials = { email, password }

        const response = await fetch(`${baseUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
        if (response.ok) {
            const data = await response.json()
            localStorage.setItem('token', data.token)
            return data
        } else {
            return null
        }
    }

    const logoutUser = (): void => { localStorage.removeItem('token') }

    const getAuthToken = (): string | null => localStorage.getItem('token')

    return { isAuthenticated, authenticateUser, logoutUser, getAuthToken }
}