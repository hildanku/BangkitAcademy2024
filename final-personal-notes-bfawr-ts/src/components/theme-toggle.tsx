import { useTheme } from '../hooks/use-theme'
import { Button } from './ui/button'

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    return (
        <Button onClick={toggleTheme} variant="outline">
            {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
        </Button>
    )
}
