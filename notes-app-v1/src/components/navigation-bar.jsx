import React from "react"
import { Link } from "react-router-dom"

function NavigationBar() {
    return (
        <nav>
            <Link to="/notes">Daftar Catatan</Link>
            <Link to="/notes/new">Tambah</Link>
        </nav>
    )
}

export default NavigationBar
