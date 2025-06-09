import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getNote, deleteNote, unarchiveNote, archiveNote } from '../utils/local-data'

export default function DetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const note = getNote(id)

    if (!note) {
        return <p>Catatan tidak ditemukan</p>
    }

    const handleDelete = () => {
        deleteNote(id)
        navigate('/')
    }

    const handleArchiveToggle = () => {
        if (note.archived) {
            unarchiveNote(note.id)
        } else {
            archiveNote(note.id)
        }
        navigate('/')
    }

    return (
        <div className="container">
            <div className="note-header">
                <h2>{note.title}</h2>
                <p className="note-date">{new Date(note.createdAt).toLocaleString()}</p>
            </div>
            <br />
            <p>{note.body}</p>
            <div className="detail-page__action">
                <button className="delete-button" onClick={handleDelete}>Hapus</button>
                <button className="archive-button" onClick={handleArchiveToggle}>
                    {note.archived ? 'Batal Arsip' : 'Arsipkan'}
                </button>

            </div>
        </div>
    )
}
