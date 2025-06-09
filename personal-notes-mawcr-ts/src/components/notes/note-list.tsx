import React from 'react'
import NoteItem from './note-item'
import type { Note } from '../../types/notes'

type NoteListProps = {
    notes: Note[]
    onDelete: (id: number) => void
    onToggleArchive: (id: number) => void
    isArchivedList: boolean
}

const NoteList: React.FC<NoteListProps> = ({
    notes,
    onDelete,
    onToggleArchive,
    isArchivedList,
}) => {
    if (notes.length === 0) {
        return <p>{isArchivedList ? "Tidak ada catatan arsip." : "Tidak ada catatan."}</p>
    }

    return (
        <>
            {notes.map((note) => (
                <NoteItem
                    key={note.id}
                    note={note}
                    onDelete={onDelete}
                    onToggleArchive={onToggleArchive}
                    isArchived={isArchivedList}
                />
            ))}
        </>
    )
}

export default NoteList
