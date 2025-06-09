import React from 'react'
import ContactItemImage from './contact-item-image'
import ContactItemBody from './contact-item-body'

function ContactItem({ imageUrl, name, tag }) {

    return (
        <div className="contact-item">
            <ContactItemImage imageUrl={imageUrl} />
            <ContactItemBody name={name} tag={tag} />
        </div>

    )
}
export default ContactItem
