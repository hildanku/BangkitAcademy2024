import { Github, ExternalLink } from "lucide-react"

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-600 dark:text-gray-400">
            <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-center sm:text-left">
                    © {currentYear} Notes App. Hildan K. Utomo ❤︎
                </p>

                <div className="flex space-x-4 items-center">
                    <a
                        href="https://notes-api.dicoding.dev/v1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-500 transition-colors"
                    >
                        <ExternalLink className="h-4 w-4" />
                    </a>
                    <a
                        href="https://github.com/hildanku"
                        className="hover:text-blue-500 transition-colors"
                    >
                        <Github className="h-4 w-4" />
                    </a>
                </div>
            </div>
        </footer>
    )
}

