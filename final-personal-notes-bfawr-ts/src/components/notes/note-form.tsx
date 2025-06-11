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
import { useLanguage } from '../../hooks/use-language'

export type CreateNoteFormValues = z.infer<typeof createNoteSchema>

export function NoteForm() {
    const navigate = useNavigate()
    const { t } = useLanguage()

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
                    <CardTitle>{t('new_note_title')}</CardTitle>
                    <CardDescription>{t('new_note_description')}</CardDescription>
                </CardHeader>

                <CardContent>
                    {showAlert && (
                        <Alert variant={isSuccess ? 'default' : 'destructive'} className="mb-6">
                            {isSuccess ? (
                                <CheckCircle className="h-4 w-4" />
                            ) : (
                                <AlertCircle className="h-4 w-4" />
                            )}
                            <AlertDescription>{showAlert}</AlertDescription>
                        </Alert>
                    )}

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('form_title_label')}</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={t('form_title_placeholder')}
                                                className="text-lg font-medium"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        <div className="text-sm text-gray-500">
                                            {field.value.length}/100 {t('character_count')}
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="body"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('form_body_label')}</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder={t('form_body_placeholder')}
                                                className="min-h-[300px] resize-y"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        <div className="text-sm text-gray-500">
                                            {field.value.length}/5000 {t('character_count')}
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
                                    {form.formState.isSubmitting ? t('saving_button') : t('save_button')}
                                </Button>

                                <Button type="button" variant="outline" className="sm:order-1" asChild>
                                    <Link to="/notes">{t('cancel_button')}</Link>
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>{t('preview_title')}</CardTitle>
                    <CardDescription>{t('preview_description')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {form.watch('title') || t('preview_default_title')}
                            </h3>
                        </div>
                        <div className="prose prose-sm max-w-none dark:prose-invert">
                            <div className="whitespace-pre-wrap text-gray-600 dark:text-gray-300">
                                {form.watch('body') || t('preview_default_body')}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
