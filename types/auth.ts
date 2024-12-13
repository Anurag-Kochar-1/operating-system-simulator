export interface RegisterRequest {
    name: string
    email: string
    password: string
}

export interface LoginRequest {
    email: string
    password: string
}

export interface AuthResponse {
    token: string;

}