import React, { useState, useEffect } from 'react'
import { getActiveNotes, deleteNote, archiveNote } from '../utils/local-data'
import NoteList from '../components/notes/note-list'
import { Link, useSearchParams } from 'react-router-dom'
import SearchBar from '../components/search-bar'

function HomePage() {
    const [notes, setNotes] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const keyword = searchParams.get('keyword') || ''

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

    const handleKeywordChange = (keyword) => {
        setSearchParams({ keyword })
    }

    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(keyword.toLowerCase())
    )

    return (
        <main>
            <h1>Daftar Catatan</h1>
            <SearchBar keyword={keyword} onKeywordChange={handleKeywordChange} />
            <div className="homepage__action">
                <Link to="/notes/new" className="action">+</Link>
            </div>

            {filteredNotes.length === 0 ? (
                <div className="notes-list-empty">
                    <p>Tidak ada catatan</p>
                </div>
            ) : (
                <div className="notes-list">
                    <NoteList
                        notes={filteredNotes}
                        onDelete={handleDelete}
                        onToggleArchive={handleArchive}
                    />
                </div>
            )}
        </main>
    )
}

export default HomePage
