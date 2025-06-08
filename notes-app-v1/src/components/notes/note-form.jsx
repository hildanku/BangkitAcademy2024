import React, { useState } from 'react'
import PropTypes from 'prop-types'

function NoteForm({ onSubmit }) {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit({ title, body })
        setTitle('')
        setBody('')
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="">
                <input
                    type="text"
                    className=""
                    placeholder="Judul"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    className=""
                    placeholder="Isi catatan"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                />
                <div className="">
                    <button type="submit" className="action">✔</button>
                </div>
            </form>

        </div>
    )
}

NoteForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

export default NoteForm
