import React from 'react'
import type { Note } from '../../types/notes'
import { Button } from '../ui/button'

type NoteItemProps = {
    note: Note
    onDelete: (id: number) => void
    onToggleArchive: (id: number) => void
    isArchived: boolean
}

const NoteItem: React.FC<NoteItemProps> = ({
    note,
    onDelete,
    onToggleArchive,
    isArchived,
}) => {
    return (
        <div className="rounded-2xl border bg-white p-4 shadow-sm mb-4">
            <h3 className="text-lg font-semibold">{note.title}</h3>
            <p className="text-sm text-gray-700 mt-2">{note.body}</p>
            <p className="text-xs text-muted-foreground mt-2">
                Dibuat: {new Date(note.createdAt).toLocaleString()}
            </p>
            <div className="mt-4 flex gap-2">
                <Button
                    variant="outline"
                    onClick={() => onToggleArchive(note.id)}
                >
                    {isArchived ? "Keluarkan dari Arsip" : "Arsipkan"}
                </Button>
                <Button
                    variant="destructive"
                    onClick={() => onDelete(note.id)}
                >
                    Hapus
                </Button>
            </div>
        </div>
    )
}

export default NoteItem
