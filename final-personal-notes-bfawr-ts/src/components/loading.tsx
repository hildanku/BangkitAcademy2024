import { Card, CardContent } from "../components/ui/card"
import { Loader2 } from "lucide-react"

export function Loading({ message = "Memuat catatan..." }: { message?: string }) {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <Card className="w-full max-w-md">
                <CardContent className="flex items-center justify-center p-6">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    <span>{message}</span>
                </CardContent>
            </Card>
        </div>
    )
}
