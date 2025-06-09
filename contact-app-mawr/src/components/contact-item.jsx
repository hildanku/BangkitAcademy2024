import React from 'react'
import ContactItemImage from './contact-item-image'
import ContactItemBody from './contact-item-body'
import DeleteButton from './ui/delete-button'

function ContactItem({ imageUrl, name, tag, id, onDelete }) {

    return (
        <div className="contact-item">
            <ContactItemImage imageUrl={imageUrl} />
            <ContactItemBody name={name} tag={tag} />
            <DeleteButton id={id} onDelete={onDelete} />
        </div>

    )
}
export default ContactItem
