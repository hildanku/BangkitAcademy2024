import { Button } from '../components/ui/button'
import { User, LogOut, FileText } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'
import { LanguageToggle } from './language-toggle'
import { useLanguage } from '../hooks/use-language'

interface HeaderProps {
    userName?: string
    onLogout: () => void
}

export function Header({ userName, onLogout }: HeaderProps) {

    const { t } = useLanguage()

    return (
        <header className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 border-b border-blue-100 dark:border-gray-700 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-md">
                            <FileText className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
                                Notes App
                            </h1>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Your second brain.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="hidden sm:flex items-center space-x-3 px-3 py-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg border border-gray-200/50 dark:border-gray-600/50">
                            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full">
                                <User className="h-4 w-4 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                    {userName || 'User'}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {t('online')}
                                </span>
                            </div>
                        </div>
                        <div className="sm:hidden flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full">
                            <User className="h-4 w-4 text-white" />
                        </div>
                        <ThemeToggle />
                        <LanguageToggle />
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onLogout}
                            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-gray-200/50 dark:border-gray-600/50 hover:bg-red-50 hover:border-red-200 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:border-red-800 dark:hover:text-red-400 transition-all duration-200"
                        >
                            <LogOut className="h-4 w-4 mr-2" />
                            <span className="hidden sm:inline">Logout</span>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}
