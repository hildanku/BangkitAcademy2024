import React from 'react'
import ContactList from './contact-list'
import { getData } from '../utils/local-data'
import ContactInput from './contact-input'

function ContactApp() {
    const contacts = getData()

    return (
        <div className="contact-app">
            <h1>Daftar Kontak</h1>
            <ContactList contacts={contacts} />
        </div>
    )
}

class ContactAppC extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            contacts: getData()
        }
        this.onDeleteHandler = this.onDeleteHandler.bind(this)
        // 8. bind
        this.onAddContactHandler = this.onAddContactHandler.bind(this)
    }

    onDeleteHandler(id) {
        const contacts = this.state.contacts.filter(contact => contact.id !== id)
        this.setState({ contacts })
    }

    // 7. make addContact handler
    onAddContactHandler({ name, tag }) {
        this.setState((prevState) => {
            return {
                contacts: [
                    ...prevState.contacts,
                    {
                        id: +new Date(),
                        name,
                        tag,
                        imageUrl: 'images/default.jpg',
                    }
                ],
            }
        })
    }

    render() {
        // 9. adjust html
        return (
            <div className="contact-app">
                <h1>Daftar Kontak</h1>
                <h2>Tambah Kontak</h2>
                <ContactInput addContact={this.onAddContactHandler} />
                <ContactList contacts={this.state.contacts} onDelete={this.onDeleteHandler} />
            </div>
        );
    }
}

export default ContactAppC
