import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { register as apiRegister } from '../lib/network'
import { Button } from '../components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../components/ui/card'
import { Input } from '../components/ui/input'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../components/ui/form'
import { Alert, AlertDescription } from '../components/ui/alert'
import { AlertCircle, CheckCircle } from 'lucide-react'
import { registerSchema } from '../lib/zod'
import { useState } from 'react'
import { useLanguage } from '../hooks/use-language'

type RegisterFormValues = z.infer<typeof registerSchema>

export const Route = createFileRoute('/register')({
    component: RegisterPage,
})

function RegisterPage() {
    const navigate = useNavigate()
    const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
    const { t } = useLanguage()

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    })

    const onSubmit = async (values: RegisterFormValues) => {
        try {
            const { error } = await apiRegister({
                name: values.name,
                email: values.email,
                password: values.password,
            })

            if (error) {
                setStatusMessage({
                    type: 'error',
                    message: 'Registrasi gagal. Email mungkin sudah digunakan.',
                })
            } else {
                setStatusMessage({
                    type: 'success',
                    message: 'Registrasi berhasil! Silakan login.',
                })
                form.reset()
                setTimeout(() => navigate({ to: '/login' }), 5000) // after 5sec
            }
        } catch (error) {
            setStatusMessage({
                type: 'error',
                message: 'Terjadi kesalahan. Silakan coba lagi.',
            })
        }
    }


    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">
                        {t('register_title')}
                    </CardTitle>
                    <CardDescription className="text-center">
                        {t('register_description')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {statusMessage && (
                        <Alert
                            variant={statusMessage.type === 'success' ? 'default' : 'destructive'}
                            className="mb-4"
                        >
                            {statusMessage.type === 'success' ? (
                                <CheckCircle className="h-4 w-4" />
                            ) : (
                                <AlertCircle className="h-4 w-4" />
                            )}
                            <AlertDescription>{statusMessage.message}</AlertDescription>
                        </Alert>
                    )}

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('register_name_label')}</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder={t('register_name_placeholder')}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('register_email_label')}</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder={t('register_email_placeholder')}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('register_password_label')}</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder={t('register_password_placeholder')}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('register_confirm_password_label')}</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder={t('register_confirm_password_placeholder')}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={form.formState.isSubmitting}
                            >
                                {form.formState.isSubmitting
                                    ? t('registering_button')
                                    : t('register_button')}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
