export interface AuthResponse {
    token: string,
    user: User
}

export interface User {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    dob: string
    gender: string
}

export interface AuthCredentials {
    email: string,
    password: string
}