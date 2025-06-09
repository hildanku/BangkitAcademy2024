import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContactApp from './components/contact.jsx'
import ContactAppC from './components/contact.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ContactAppC />
    </StrictMode>,
)
