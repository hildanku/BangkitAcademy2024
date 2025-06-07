import React from "react"
import NavigationBar from "./navigation-bar"
import { Link } from "react-router-dom"

function Header() {
    return (
        <header className="main-header">
            <h1>
                Daily Notes
            </h1>
            <NavigationBar />
        </header>
    )
}

export default Header
