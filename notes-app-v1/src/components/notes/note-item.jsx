import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function NoteItem({ id, title, body, createdAt }) {
    return (
        <div className="note-item">
            <h3 className="note-item__title">
                <Link to={`/notes/${id}`}>s{title}</Link>
            </h3>
            <small className="note-item__createdAt">
                {new Date(createdAt).toLocaleString()}
            </small>
            <p className="note-item__body">{body}</p>
        </div>
    )
}


NoteItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
}

export default NoteItem
