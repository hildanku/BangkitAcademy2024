export interface User {
    id: string
    name: string
    email: string
}

export interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    login: (email: string, password: string) => void
    logout: () => void
}