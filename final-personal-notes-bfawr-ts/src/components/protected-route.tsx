import { type ReactNode, useEffect, useState } from 'react'
import { Navigate } from '@tanstack/react-router'
import { useAuth } from '../hooks/use-auth'
import { Card, CardContent } from '../components/ui/card'
import { Loader2 } from 'lucide-react'
import { getAccessToken } from '../lib/network'
import { useLanguage } from '../hooks/use-language'

interface ProtectedRouteProps {
    children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated, user } = useAuth()
    const [isInitialLoading, setIsInitialLoading] = useState(true)
    const { t } = useLanguage()

    useEffect(() => {
        const token = getAccessToken()
        if (token) {
            const timer = setTimeout(() => {
                setIsInitialLoading(false)
            }, 1000)
            return () => clearTimeout(timer)
        } else {
            setIsInitialLoading(false)
        }
    }, [])

    if (isInitialLoading && getAccessToken()) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardContent className="flex items-center justify-center p-6">
                        <Loader2 className="h-6 w-6 animate-spin mr-2" />
                        <span>{t("loading")}</span>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    return <>{children}</>
}
