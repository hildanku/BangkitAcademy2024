import React from 'react'

const Header: React.FC = () => {
    return (
        <header className="sticky top-0 z-40 w-full border-b bg-white">
            <div className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
                <h1 className="text-lg font-semibold">My Daily Notes</h1>
                <nav className="ml-auto flex space-x-4">
                    <a
                        href="/"
                        className="text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                        Home
                    </a>
                </nav>
            </div>
        </header>
    )
}

export default Header
