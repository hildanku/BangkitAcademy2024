import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { addNote } from '../../lib/network'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../ui/card'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form'
import { Button } from '../ui/button'
import { Alert, AlertDescription } from '../ui/alert'
import { Save, AlertCircle, CheckCircle } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { createNoteSchema } from '../../lib/zod'

export type CreateNoteFormValues = z.infer<typeof createNoteSchema>

export function NoteForm() {
    const navigate = useNavigate()

    const form = useForm<CreateNoteFormValues>({
        resolver: zodResolver(createNoteSchema),
        defaultValues: {
            title: '',
            body: '',
        },
    })

    const onSubmit = async (values: CreateNoteFormValues) => {
        try {
            const { error, data } = await addNote(values)

            if (!error && data) {
                form.setError('root', {
                    message: 'Catatan berhasil dibuat!',
                })
                setTimeout(() => {
                    navigate({ to: '/notes' })
                }, 1500)
            } else {
                form.setError('root', {
                    message: 'Gagal membuat catatan. Silakan coba lagi.',
                })
            }
        } catch (error) {
            form.setError('root', {
                message: 'Terjadi kesalahan. Silakan coba lagi.',
            })
        }
    }

    const isSuccess = form.formState.errors.root?.message?.includes('berhasil')
    const showAlert = form.formState.errors.root?.message

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Catatan Baru</CardTitle>
                    <CardDescription>
                        Buat catatan baru dengan judul dan isi yang menarik
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {showAlert && (
                        <Alert variant={isSuccess ? 'default' : 'destructive'} className="mb-6">
                            {isSuccess ? (
                                <CheckCircle className="h-4 w-4" />
                            ) : (
                                <AlertCircle className="h-4 w-4" />
                            )}
                            <AlertDescription>{form.formState.errors.root!.message}</AlertDescription>
                        </Alert>
                    )}

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Judul Catatan</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Masukkan judul catatan..."
                                                className="text-lg font-medium"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        <div className="text-sm text-gray-500">
                                            {field.value.length}/100 karakter
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="body"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Isi Catatan</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Tulis isi catatan di sini..."
                                                className="min-h-[300px] resize-y"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        <div className="text-sm text-gray-500">
                                            {field.value.length}/5000 karakter
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Button
                                    type="submit"
                                    className="sm:order-2"
                                    disabled={form.formState.isSubmitting}
                                >
                                    <Save className="h-4 w-4 mr-2" />
                                    {form.formState.isSubmitting ? 'Menyimpan...' : 'Simpan Catatan'}
                                </Button>

                                <Button type="button" variant="outline" className="sm:order-1" asChild>
                                    <Link to="/notes">Batal</Link>
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Preview</CardTitle>
                    <CardDescription>Pratinjau catatan yang akan dibuat</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {form.watch('title') || 'Judul catatan akan muncul di sini'}
                            </h3>
                        </div>
                        <div className="prose prose-sm max-w-none dark:prose-invert">
                            <div className="whitespace-pre-wrap text-gray-600 dark:text-gray-300">
                                {form.watch('body') || 'Isi catatan akan muncul di sini...'}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
