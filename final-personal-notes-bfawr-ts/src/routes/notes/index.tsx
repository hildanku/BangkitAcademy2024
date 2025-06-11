import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/use-auth'
import { getActiveNotes, getArchivedNotes, deleteNote, archiveNote, unarchiveNote } from '../../lib/network'
import { ProtectedRoute } from '../../components/protected-route'
import { Button } from '../../components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { Alert, AlertDescription } from '../../components/ui/alert'
import {
    Plus,
    AlertCircle,
} from 'lucide-react'
import { formatDate } from '../../lib/utils'
import { NotesList } from '../../components/notes/note-list'
import { Search as SearchComponent } from '../../components/search'
import { Header } from '../../components/header'
import { Loading } from '../../components/loading'
import { useLanguage } from '../../hooks/use-language'

interface Note {
    id: string
    title: string
    body: string
    archived: boolean
    createdAt: string
    owner: string
}

export const Route = createFileRoute('/notes/')({
    component: NotesPage,
})

function NotesPage() {
    return (
        <ProtectedRoute>
            <NotesContent />
        </ProtectedRoute>
    )
}

function NotesContent() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [activeNotes, setActiveNotes] = useState<Note[]>([])
    const [archivedNotes, setArchivedNotes] = useState<Note[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const { t } = useLanguage()

    useEffect(() => {
        loadNotes()
    }, [])

    const loadNotes = async () => {
        setIsLoading(true)
        setError('')

        try {
            const [activeResult, archivedResult] = await Promise.all([
                getActiveNotes(),
                getArchivedNotes()
            ])

            if (activeResult.error || archivedResult.error) {
                setError('Gagal memuat catatan')
            } else {
                setActiveNotes(activeResult.data || [])
                setArchivedNotes(archivedResult.data || [])
            }
        } catch (error) {
            setError('Terjadi kesalahan saat memuat catatan')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            const { error } = await deleteNote(id)
            if (!error) {
                await loadNotes()
            } else {
                setError('Gagal menghapus catatan')
            }
        } catch (error) {
            setError('Terjadi kesalahan saat menghapus catatan')
        }
    }

    const handleArchive = async (id: string) => {
        try {
            const { error } = await archiveNote(id)
            if (!error) {
                await loadNotes()
            } else {
                setError('Gagal mengarsipkan catatan')
            }
        } catch (error) {
            setError('Terjadi kesalahan saat mengarsipkan catatan')
        }
    }

    const handleUnarchive = async (id: string) => {
        try {
            const { error } = await unarchiveNote(id)
            if (!error) {
                await loadNotes()
            } else {
                setError('Gagal membatalkan arsip catatan')
            }
        } catch (error) {
            setError('Terjadi kesalahan saat membatalkan arsip catatan')
        }
    }

    const handleLogout = () => {
        logout()
        navigate({ to: '/login' })
    }

    const filterNotes = (notes: Note[]) => {
        if (!searchTerm) return notes
        return notes.filter(note =>
            note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.body.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }

    if (isLoading) {
        return (
            <Loading />
        )
    }


    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Header userName={user?.name} onLogout={handleLogout} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div className="flex items-center space-x-4">
                        <Button asChild>
                            <Link to="/notes/new">
                                <Plus className="h-4 w-4 mr-2" />
                                {t('create_note_button')}
                            </Link>
                        </Button>
                    </div>

                    <SearchComponent value={searchTerm} onChange={setSearchTerm} />
                </div>

                {error && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <Tabs defaultValue="active" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 max-w-md">
                        <TabsTrigger value="active">
                            {t('active')} ({filterNotes(activeNotes).length})
                        </TabsTrigger>
                        <TabsTrigger value="archived">
                            {t('archive')} ({filterNotes(archivedNotes).length})
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="active" className="mt-6">
                        <NotesList
                            notes={filterNotes(activeNotes)}
                            onDelete={handleDelete}
                            onArchive={handleArchive}
                            onUnarchive={handleUnarchive}
                            isArchived={false}
                            formatDate={formatDate}
                        />
                    </TabsContent>

                    <TabsContent value="archived" className="mt-6">
                        <NotesList
                            notes={filterNotes(archivedNotes)}
                            onDelete={handleDelete}
                            onArchive={handleArchive}
                            onUnarchive={handleUnarchive}
                            isArchived={true}
                            formatDate={formatDate}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )

}
