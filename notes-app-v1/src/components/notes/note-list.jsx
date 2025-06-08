import React from 'react'
import PropTypes from 'prop-types'
import NoteItem from './note-item'

function NoteList({ notes }) {
    if (notes.length === 0) {
        return <p>Tidak ada catatan</p>
    }

    return (
        <>
            {notes.map(note => (
                <NoteItem key={note.id} {...note} />
            ))}
        </>
    )
}

NoteList.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default NoteList
