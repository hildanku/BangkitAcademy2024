import React from 'react'
import { useNavigate } from 'react-router-dom'
import NoteForm from '../components/notes/note-form'
import { addNote } from '../utils/local-data'

export default function AddNotePage() {
    const navigate = useNavigate()

    const handleAddNote = (note) => {
        addNote(note)
        navigate('/')
    }

    return (
        <div className="container">
            <h2>Tambah Catatan</h2>
            <NoteForm onSubmit={handleAddNote} />
        </div>
    );
}
