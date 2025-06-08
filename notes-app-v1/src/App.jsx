import React from 'react'
import Header from './components/header'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home-page'
import DetailPage from './pages/detail-page'
import AddNotePage from './pages/create-note'
import NotFound from './pages/not-found'
import ArchivePage from './pages/archive-page'

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/notes/:id" element={<DetailPage />} />
                <Route path="/notes/new" element={<AddNotePage />} />
                <Route path="/archives" element={<ArchivePage />}
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </>
    )
}

export default App
