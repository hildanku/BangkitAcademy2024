import React, { useEffect, useState } from 'react'

function ToggleTheme() {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')

    useEffect(() => {
        document.body.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
    }

    return (
        <button className="toggle-theme" onClick={toggleTheme}>
            {theme === 'dark' ? '🌞' : '🌙'}
        </button>
    )
}

export default ToggleTheme
