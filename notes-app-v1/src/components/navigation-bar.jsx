import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function NavigationBar() {

    const [isOpen, setIsOpen] = useState(false)
    const toggleMenu = () => {
        setIsOpen(prev => !prev)
    }

    return (
        <>
            <button className="hamburger" onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </button>
            <nav className={`navigation-bar ${isOpen ? 'open' : ''}`}>
                <Link to="/">Daftar Catatan</Link>
                <Link to="/archives">Arsip</Link>
                <Link to="/notes/new">Tambah</Link>
            </nav>
        </>
    )
}

export default NavigationBar
