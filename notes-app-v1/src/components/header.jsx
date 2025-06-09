import React from 'react'
import NavigationBar from './navigation-bar'
import ToggleTheme from './toggle-theme'

function Header() {
    return (
        <header className="main-header">
            <h1>
                Daily Notes
            </h1>
            <NavigationBar />
            <ToggleTheme />
        </header>
    )
}

export default Header
