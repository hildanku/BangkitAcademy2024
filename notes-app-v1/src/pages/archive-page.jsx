import React, { useEffect, useState } from 'react'
import NoteList from '../components/notes/note-list'

function ArchivePage() {
    const [notes, setNotes] = useState([])
    useEffect(() => {
        setNotes(getArchivedNotes())
    }, [])

    const handleDelete = (id) => {
        deleteNote(id)
        setNotes(getArchivedNotes())
    }

    return (
        <main>
            <h1>ARsip</h1>
            {notes.length === 0 ? (
                <div className="notes-list-empty">
                    <p>Arsip kosong</p>
                </div>
            ) : (
                <div className="notes-list">
                    <NoteList notes={notes} onDelete={handleDelete} />
                </div>
            )
            }
        </main>
    )
}

export default ArchivePage
