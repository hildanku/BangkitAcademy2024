import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/use-auth'
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../../lib/network'
import { ProtectedRoute } from '../../components/protected-route'
import { Button } from '../../components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '../../components/ui/alert-dialog'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu'
import { Alert, AlertDescription } from '../../components/ui/alert'
import {
    ArrowLeft,
    MoreVertical,
    Archive,
    ArchiveRestore,
    Trash2,
    User,
    LogOut,
    AlertCircle,
    Loader2
} from 'lucide-react'
import { formatDate } from '../../lib/utils'
import { Header } from '../../components/header'
import { Loading } from '../../components/loading'

interface Note {
    id: string
    title: string
    body: string
    archived: boolean
    createdAt: string
    owner: string
}

export const Route = createFileRoute('/notes/$id')({
    component: NoteDetailPage,
})

function NoteDetailPage() {
    return (
        <ProtectedRoute>
            <NoteDetailContent />
        </ProtectedRoute>
    )
}

function NoteDetailContent() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const { id } = Route.useParams()
    const [note, setNote] = useState<Note | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const [actionLoading, setActionLoading] = useState(false)

    useEffect(() => {
        loadNote()
    }, [id])

    const loadNote = async () => {
        setIsLoading(true)
        setError('')

        try {
            const result = await getNote(id)

            if (result.error) {
                setError('Gagal memuat catatan')
            } else {
                setNote(result.data)
            }
        } catch (error) {
            setError('Terjadi kesalahan saat memuat catatan')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!note) return

        setActionLoading(true)
        try {
            const { error } = await deleteNote(note.id)
            if (!error) {
                navigate({ to: '/notes' })
            } else {
                setError('Gagal menghapus catatan')
            }
        } catch (error) {
            setError('Terjadi kesalahan saat menghapus catatan')
        } finally {
            setActionLoading(false)
        }
    }

    const handleArchive = async () => {
        if (!note) return

        setActionLoading(true)
        try {
            const { error } = await archiveNote(note.id)
            if (!error) {
                await loadNote() // Reload to get updated data
            } else {
                setError('Gagal mengarsipkan catatan')
            }
        } catch (error) {
            setError('Terjadi kesalahan saat mengarsipkan catatan')
        } finally {
            setActionLoading(false)
        }
    }

    const handleUnarchive = async () => {
        if (!note) return

        setActionLoading(true)
        try {
            const { error } = await unarchiveNote(note.id)
            if (!error) {
                await loadNote() // Reload to get updated data
            } else {
                setError('Gagal membatalkan arsip catatan')
            }
        } catch (error) {
            setError('Terjadi kesalahan saat membatalkan arsip catatan')
        } finally {
            setActionLoading(false)
        }
    }

    const handleLogout = () => {
        logout()
        navigate({ to: '/login' })
    }

    if (isLoading) {
        return (
            <Loading />
        )
    }

    if (!note) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <Header userName={user?.name} onLogout={handleLogout} />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center p-12">
                            <AlertCircle className="h-12 w-12 text-red-400 mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                Catatan tidak ditemukan
                            </h3>
                            <p className="text-gray-500 text-center mb-4">
                                Catatan yang Anda cari tidak ada atau telah dihapus.
                            </p>
                            <Button asChild>
                                <Link to="/notes">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Kembali ke Daftar Catatan
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Header userName={user?.name} onLogout={handleLogout} />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Navigation & Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <Button variant="outline" asChild>
                        <Link to="/notes">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Kembali ke Daftar Catatan
                        </Link>
                    </Button>

                    <div className="flex items-center space-x-2">
                        {/* <Button variant="outline" asChild>
              <Link to={`/notes/${note.id}/edit`}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Link>
            </Button> */}

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" disabled={actionLoading}>
                                    {actionLoading ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <MoreVertical className="h-4 w-4" />
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {note.archived ? (
                                    <DropdownMenuItem onClick={handleUnarchive}>
                                        <ArchiveRestore className="h-4 w-4 mr-2" />
                                        Batalkan Arsip
                                    </DropdownMenuItem>
                                ) : (
                                    <DropdownMenuItem onClick={handleArchive}>
                                        <Archive className="h-4 w-4 mr-2" />
                                        Arsipkan
                                    </DropdownMenuItem>
                                )}

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <DropdownMenuItem
                                            className="text-red-600 focus:text-red-600"
                                            onSelect={(e) => e.preventDefault()}
                                        >
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            Hapus
                                        </DropdownMenuItem>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Hapus Catatan</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Apakah Anda yakin ingin menghapus catatan "{note.title}"?
                                                Tindakan ini tidak dapat dibatalkan.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Batal</AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={handleDelete}
                                                className="bg-red-600 hover:bg-red-700"
                                            >
                                                Hapus
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Error Alert */}
                {error && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {/* Note Detail */}
                <Card>
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <CardTitle className="text-2xl mb-2">{note.title}</CardTitle>
                                <CardDescription className="flex items-center gap-4">
                                    <span>Dibuat pada {formatDate(note.createdAt)}</span>
                                    {note.archived && <Badge variant="secondary">Arsip</Badge>}
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <div className="prose dark:prose-invert max-w-none">
                            <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
                                {note.body}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle className="text-lg">Informasi Catatan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="font-medium text-gray-500 dark:text-gray-400">ID:</span>
                                <p className="font-mono text-xs mt-1 break-all">{note.id}</p>
                            </div>
                            <div>
                                <span className="font-medium text-gray-500 dark:text-gray-400">Pemilik:</span>
                                <p className="mt-1">{note.owner}</p>
                            </div>
                            <div>
                                <span className="font-medium text-gray-500 dark:text-gray-400">Status:</span>
                                <p className="mt-1">{note.archived ? 'Diarsipkan' : 'Aktif'}</p>
                            </div>
                            <div>
                                <span className="font-medium text-gray-500 dark:text-gray-400">Tanggal Dibuat:</span>
                                <p className="mt-1">{formatDate(note.createdAt)}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
