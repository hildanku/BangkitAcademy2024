export const formattedDate = (date: string | Date): string => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' }
    return new Date(date).toLocaleDateString('id-ID', options)
}
