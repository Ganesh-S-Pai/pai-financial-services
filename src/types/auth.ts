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
    gender: string,
    phone: string
}

export interface AuthCredentials {
    email: string,
    password: string
}

export interface SignupRequest {
    first_name: string,
    last_name: string,
    email: string,
    dob: string
    gender: string,
    phone: string,
    password: string
}