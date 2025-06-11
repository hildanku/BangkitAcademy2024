import { Input } from "../components/ui/input"
import { Search as SearchIcon } from "lucide-react"

interface SearchProps {
    value: string
    onChange: (value: string) => void
}

export function Search({ value, onChange }: SearchProps) {
    return (
        <div className="relative w-full sm:w-80">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
                type="text"
                placeholder="Cari catatan..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="pl-10"
            />
        </div>
    )
}
