import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Note } from '../types/notes'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const formattedDate = (date: string | Date): string => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' }
    return new Date(date).toLocaleDateString('id-ID', options)
}

export function getFilteredNotes(notes: Note[], query: string) {
    const lowerQuery = query.toLowerCase()
    const filtered = notes.filter((note) =>
        note.title.toLowerCase().includes(lowerQuery)
    )
    return {
        active: filtered.filter((note) => !note.archived),
        archived: filtered.filter((note) => note.archived),
    }
}
