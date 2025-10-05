import type { AuthCredentials, AuthResponse } from "@/types/auth"


export const authenticateUser = async (email: string, password: string): Promise<AuthResponse | null> => {
    // const baseUrl = import.meta.env.VITE_API_URL
    const baseUrl = import.meta.env.VITE_API_LOCAL_URL
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

export const logoutUser = (): void => {
    localStorage.removeItem('token')
}

export const isAuthenticated = (): boolean => {
    return getAuthToken() !== null
}

export const getAuthToken = (): string | null => {
    return localStorage.getItem('token')
}