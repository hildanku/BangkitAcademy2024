import React from 'react'
import ContactList from './contact-list'
import { getData } from '../utils/local-data'

function ContactApp() {
    const contacts = getData()

    return (
        <div className="contact-app">
            <h1>Daftar Kontak</h1>
            <ContactList contacts={contacts} />
        </div>
    )
}

export default ContactApp
