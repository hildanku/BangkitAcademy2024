import React, { useState } from 'react'
import PropTypes from 'prop-types'

function NoteForm({ onSubmit }) {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const handleBodyInput = (e) => {
        setBody(e.target.innerHTML)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit({ title, body })
        setTitle('')
        setBody('')
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="note-form">
                <h4 style={{ marginBottom: '10px' }}>Tambah Catatan</h4>
                <input
                    type="text"
                    className="note-input"
                    placeholder="Judul catatan..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <div
                    className="note-textarea"
                    placeholder="Tulis isi catatan di sini..."
                    data-placeholder="Deskripsi...."
                    contentEditable
                    onInput={handleBodyInput}
                    suppressContentEditableWarning={true}
                    style={{
                        border: '1px solid #ccc',
                        minHeight: '150px',
                        padding: '8px',
                        marginTop: '12px',
                    }}
                    required
                />
                <p style={{ fontSize: '12px', color: '#999' }}>
                    * Gunakan <strong>Ctrl+B</strong> untuk bold, <em>Ctrl+I</em> untuk italic, Enter untuk baris baru.
                </p>
                <div className="note-action">
                    <button type="submit" className="note-submit">Simpan</button>
                </div>
            </form>
        </div>
    )
}

NoteForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

export default NoteForm
