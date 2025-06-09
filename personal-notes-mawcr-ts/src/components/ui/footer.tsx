import React from 'react'

const Footer: React.FC = () => {
    return (
        <footer className="mt-12 border-t py-6 text-center text-sm text-muted-foreground">
            <p>
                @2025. Dibuat dengan ❤️ oleh{" "}
                <a
                    href="https://github.com/hildanku"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-primary"
                >
                    Hildan K. Utomo
                </a>
            </p>
        </footer>
    )
}

export default Footer
