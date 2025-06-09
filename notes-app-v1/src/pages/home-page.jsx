import React, { useState, useEffect } from 'react'
import { getActiveNotes, deleteNote, archiveNote } from '../utils/local-data'
import NoteList from '../components/notes/note-list'
import { Link } from 'react-router-dom'

function HomePage() {
    const [notes, setNotes] = useState([])

    useEffect(() => {
        setNotes(getActiveNotes())
    }, [])

    const handleDelete = (id) => {
        deleteNote(id)
        setNotes(getActiveNotes())
    }

    const handleArchive = (id) => {
        archiveNote(id)
        setNotes(getActiveNotes())
    }

    return (
        <main>
            <h1>Daftar Catatan</h1>

            <div className="homepage__action">
                <Link to="/notes/new" className="action">+</Link>
            </div>

            {notes.length === 0 ? (
                <div className="notes-list-empty">
                    <p>Tidak ada catatan</p>
                </div>
            ) : (
                <div className="notes-list">
                    <NoteList notes={notes} onDelete={handleDelete} onToggleArchive={handleArchive} />
                </div>
            )}
        </main>
    )
}

export default HomePage
