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
import { Archive, ArchiveRestore, Eye, MoreVertical, Trash2 } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { useLanguage } from '../../hooks/use-language'

interface Note {
    id: string
    title: string
    body: string
    archived: boolean
    createdAt: string
}

interface NotesListProps {
    notes: Note[]
    onDelete: (id: string) => void
    onArchive: (id: string) => void
    onUnarchive: (id: string) => void
    isArchived: boolean
    formatDate: (date: string) => string
}

export function NotesList({ notes, onDelete, onArchive, onUnarchive, isArchived, formatDate }: NotesListProps) {

    const { t } = useLanguage()

    if (notes.length === 0) {
        return (
            <Card>
                <CardContent className="flex flex-col items-center justify-center p-12">
                    <Archive className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {isArchived ? t('not_found_archive_notes') : t('not_found_active_notes')}
                    </h3>
                    <p className="text-gray-500 text-center">
                        {isArchived ? t('archive_notes_descriptions') : t('active_notes_descriptions')}
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
                <Card key={note.id} className="relative">
                    <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                            <CardTitle className="text-lg line-clamp-2">{note.title}</CardTitle>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                        <Link to={`/notes/${note.id}`}>
                                            <Eye className="h-4 w-4 mr-2" />
                                            {t('detail_dropdown_button')}
                                        </Link>
                                    </DropdownMenuItem>
                                    {isArchived ? (
                                        <DropdownMenuItem onClick={() => onUnarchive(note.id)}>
                                            <ArchiveRestore className="h-4 w-4 mr-2" />
                                            {t('cancel_dropdown_button')}
                                        </DropdownMenuItem>
                                    ) : (
                                        <DropdownMenuItem onClick={() => onArchive(note.id)}>
                                            <Archive className="h-4 w-4 mr-2" />
                                            {t('archive_dropdown_button')}
                                        </DropdownMenuItem>
                                    )}
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <DropdownMenuItem
                                                className="text-red-600 focus:text-red-600"
                                                onSelect={(e) => e.preventDefault()}
                                            >
                                                <Trash2 className="h-4 w-4 mr-2" />
                                                {t('delete_dropdown_button')}
                                            </DropdownMenuItem>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>{t('delete_note_title')}</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    {t('delete_note_description').replace('{title}', note.title)}
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() => onDelete(note.id)}
                                                    className="bg-red-600 hover:bg-red-700"
                                                >
                                                    {t('delete')}
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <CardDescription className="flex items-center justify-between">
                            <span>{formatDate(note.createdAt)}</span>
                            {isArchived && <Badge variant="secondary">{t('archived')}</Badge>}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600 dark:text-gray-300 line-clamp-3">{note.body}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
