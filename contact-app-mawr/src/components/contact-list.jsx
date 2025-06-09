import React from 'react'
import ContactItem from './contact-item'

function ContactList({ contacts, onDelete }) {
    return (
        <div className="contact-list">
            {
                contacts.map((item) => (
                    <ContactItem
                        key={item.id}
                        id={item.id}
                        onDelete={onDelete}
                        {...item} />
                ))
            }
        </div>

    )
}

export default ContactList
