import { useEffect, useState } from 'react'
import Header from '../components/ui/header'
import SearchBar from '../components/ui/search-bar'
import NoteInput from '../components/notes/note-input'
import NoteList from '../components/notes/note-list'
import Footer from '../components/ui/footer'
import type { Note } from '../types/notes'
import { getFilteredNotes } from '../lib/utils'
import { getInitialData } from '../utils/data'

const HomePage: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        setNotes(getInitialData)
    }, [])

    const handleAddNote = (title: string, body: string) => {
        const newNote: Note = {
            id: Date.now(),
            title,
            body,
            archived: false,
            createdAt: new Date().toISOString(),
        }
        setNotes([newNote, ...notes])
    }

    const handleDeleteNote = (id: number) => {
        setNotes(notes.filter((note) => note.id !== id))
    }

    const handleToggleArchive = (id: number) => {
        setNotes(
            notes.map((note) =>
                note.id === id ? { ...note, archived: !note.archived } : note
            )
        )
    }

    const { active: activeNotes, archived: archivedNotes } = getFilteredNotes(notes, search)

    return (
        <div className="max-w-2xl mx-auto p-4">
            <Header />
            <SearchBar search={search} setSearch={setSearch} />
            <NoteInput onAdd={handleAddNote} />
            <h2 className="font-bold text-lg mb-2">Catatan Aktif</h2>
            <NoteList
                notes={activeNotes}
                onDelete={handleDeleteNote}
                onToggleArchive={handleToggleArchive}
                isArchivedList={false}
            />
            <h2 className="font-bold text-lg mt-4 mb-2">Arsip</h2>
            <NoteList
                notes={archivedNotes}
                onDelete={handleDeleteNote}
                onToggleArchive={handleToggleArchive}
                isArchivedList={true}
            />
            <Footer />
        </div>
    )
}

export default HomePage

