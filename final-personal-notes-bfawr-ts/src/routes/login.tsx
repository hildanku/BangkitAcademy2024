
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useAuth } from '../hooks/use-auth'
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
import { AlertCircle } from 'lucide-react'
import { loginSchema } from '../lib/zod'
import { useLanguage } from '../hooks/use-language'
import { Link } from '@tanstack/react-router'

type LoginFormValues = z.infer<typeof loginSchema>

export const Route = createFileRoute('/login')({
    component: LoginPage,
})

function LoginPage() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const { t } = useLanguage()

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const onSubmit = async (values: LoginFormValues) => {
        try {
            const success = await login(values.email, values.password)
            if (success) {
                navigate({ to: '/notes' })
            } else {
                form.setError('root', {
                    message: 'Email atau password salah.',
                })
            }
        } catch (error) {
            form.setError('root', {
                message: 'Terjadi kesalahan. Silakan coba lagi.',
            })
        }
    }


    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">
                        {t('login_title')}
                    </CardTitle>
                    <CardDescription className="text-center">
                        {t('login_description')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {form.formState.errors.root && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                {form.formState.errors.root.message}
                            </AlertDescription>
                        </Alert>
                    )}

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('login_email_label')}</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder={t('login_email_placeholder')}
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
                                        <FormLabel>{t('login_password_label')}</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder={t('login_password_placeholder')}
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
                                    ? t('logging_in_button')
                                    : t('login_button')}
                            </Button>
                        </form>
                    </Form>
                    <div className="mt-4 text-center text-sm text-muted-foreground">
                        {t('dont_have_account')}{" "}
                        <Link
                            to="/register"
                            className="font-medium text-primary hover:underline"
                        >
                            {t('register_button')}
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
