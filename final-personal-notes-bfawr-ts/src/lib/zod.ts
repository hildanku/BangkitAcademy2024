import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string().email('Format email tidak valid'),
    password: z.string().min(1, 'Password wajib diisi'),
})

export const registerSchema = z.object({
    name: z.string().min(2, 'Nama minimal 2 karakter'),
    email: z.string().email('Format email tidak valid'),
    password: z.string().min(6, 'Password minimal 6 karakter'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Password dan konfirmasi tidak sama',
    path: ['confirmPassword'],
})

export const createNoteSchema = z.object({
    title: z.string()
        .min(1, 'Judul catatan wajib diisi')
        .max(100, 'Judul maksimal 100 karakter'),
    body: z.string()
        .min(1, 'Isi catatan wajib diisi')
        .max(5000, 'Isi catatan maksimal 5000 karakter'),
})
