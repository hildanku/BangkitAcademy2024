import React from 'react'
import ContactItem from './contact-item'

function ContactList({ contacts }) {
    return (
        <div className="contact-list">
            {
                contacts.map((item) => (
                    <ContactItem key={item.id} {...item} />
                ))
            }
        </div>

    )
}

export default ContactList
