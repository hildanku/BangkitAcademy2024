export interface User {
    id: string
    name: string
    email: string
}

export type Language = 'id' | 'en'

export type Theme = 'light' | 'dark'

export interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    login: (email: string, password: string) => void
    logout: () => void
}

export interface LanguageContextType {
    language: Language
    toggleLanguage: () => void
    t: (id: string) => string
}


export interface ThemeContextType {
    theme: Theme
    toggleTheme: () => void
}
