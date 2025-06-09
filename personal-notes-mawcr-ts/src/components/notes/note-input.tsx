import React, { useState } from 'react'
import { MAX_NOTE_TITLE_LENGTH } from '../../utils/constant'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { Input } from '../ui/input'

type NoteInputProps = {
    onAdd: (title: string, body: string) => void
}

const NoteInput: React.FC<NoteInputProps> = ({ onAdd }) => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onAdd(title, body)
        setTitle('')
        setBody('')
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mb-6 border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Tambah Catatan Baru</h2>
            <div>
                <label className="block text-sm font-medium mb-1">
                    Judul ({MAX_NOTE_TITLE_LENGTH - title.length} karakter tersisa)
                </label>
                <Input
                    value={title}
                    onChange={(e) =>
                        e.target.value.length <= MAX_NOTE_TITLE_LENGTH &&
                        setTitle(e.target.value)
                    }
                    placeholder="Masukkan judul catatan"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Isi Catatan</label>
                <Textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={4}
                    placeholder="Masukkan isi catatan"
                    required
                />
            </div>
            <Button type="submit">Tambah Catatan</Button>
        </form>
    )
}

export default NoteInput
