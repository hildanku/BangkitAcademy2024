import { Button } from "../components/ui/button"
import { User, LogOut } from "lucide-react"

interface HeaderProps {
    userName?: string
    onLogout: () => void
}

export function Header({ userName, onLogout }: HeaderProps) {
    return (
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-4">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Notes App
                        </h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span className="text-sm font-medium">{userName}</span>
                        </div>

                        <Button variant="outline" size="sm" onClick={onLogout}>
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}
