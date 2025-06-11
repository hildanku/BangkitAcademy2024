import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ProtectedRoute } from '../../components/protected-route'
import { useAuth } from '../../hooks/use-auth'
import { NoteForm } from '../../components/notes/note-form'
import { Header } from '../../components/header'

export const Route = createFileRoute('/notes/new')({
    component: CreateNotePage,
})

function CreateNotePage() {
    return (
        <ProtectedRoute>
            <CreateNoteContent />
        </ProtectedRoute>
    )
}

function CreateNoteContent() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate({ to: '/login' })
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Header userName={user?.name} onLogout={handleLogout} />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <NoteForm />
            </div>
        </div>
    )
}
