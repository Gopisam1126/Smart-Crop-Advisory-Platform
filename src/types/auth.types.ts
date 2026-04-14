export interface User {
    id: string,
    username: string,
    email: string,
    role: string
}

export interface AuthTokens {
    accessToken: string,
    refreshToken: string,
}

export interface loginCredentials {
    email: string,
    password: string,
}

export interface AuthState {
    user: User | null,
    isAuthenticated: boolean,
    isLoading: boolean
}

export interface AuthContextType extends AuthState {
    login: (Credentials: loginCredentials) => Promise<void>;
    logout: () => void;
}