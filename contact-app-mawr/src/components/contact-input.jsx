import React from 'react'

class ContactInput extends React.Component {

    // 3. constructors
    constructor(props) {
        super(props)

        // 4. init state
        this.state = {
            name: '',
            tag: '',
        }

        // 5. bind
        this.onNameChangeEventHandler = this.onNameChangeEventHandler.bind(this)
        this.onTagChangeEventHandler = this.onTagChangeEventHandler.bind(this)
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this)
    }


    // 2. create handler
    onNameChangeEventHandler(event) {
        this.setState(() => {
            return {
                name: event.target.value
            }
        })
    }

    onTagChangeEventHandler(event) {
        this.setState(() => {
            return {
                tag: event.target.value
            }
        })
    }

    onSubmitEventHandler(event) {
        event.preventDefault()
        this.props.addContact(this.state)
    }

    // 1. create user interface
    render() {
        return (
            // 6. give state & event handler to html
            <form className="contact-input" onSubmit={this.onSubmitEventHandler}>
                <input type="text" placeholder="Nama" value={this.state.name} onChange={this.onNameChangeEventHandler} />
                <input type="text" placeholder="Tag" value={this.state.tag} onChange={this.onTagChangeEventHandler} />
                <button type="submit">Tambah</button>
            </form>
        )
    }
}

export default ContactInput
