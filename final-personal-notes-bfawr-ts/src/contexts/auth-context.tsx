import React, { createContext, useEffect, useState } from 'react'
import type { AuthContextType, User } from '../types'
import { useQueryClient } from '@tanstack/react-query'
import { getAccessToken, getUserLogged, putAccessToken, login as apiLogin } from '../lib/network'

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const queryClient = useQueryClient()

    const isAuthenticated = !!user

    useEffect(() => {
        const fetchUser = async () => {
            if (getAccessToken()) {
                const { error, data} = await getUserLogged()
                if(!error) {
                    setUser(data)
                } else {
                    logout()
                }
            }
        }
        fetchUser()
    }, [])

    const login = async (email: string, password: string) => {
        const { error, data } = await apiLogin({ email, password })
        if (!error && data) {
          putAccessToken(data.accessToken)
          const userInfo = await getUserLogged()
          if (!userInfo.error) {
            setUser(userInfo.data)
            queryClient.invalidateQueries()
            return true
          }
        }
        return false
      }
    
      const logout = () => {
        localStorage.removeItem("accessToken")
        setUser(null)
        queryClient.clear()
      }
    
      return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
          {children}
        </AuthContext.Provider>
      )
}