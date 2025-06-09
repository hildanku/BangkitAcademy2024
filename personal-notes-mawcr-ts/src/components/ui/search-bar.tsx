import React from 'react'
import { Input } from './input'

type SearchBarProps = {
    search: string
    setSearch: (search: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch }) => {
    return (
        <div className="mb-4">
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari catatan..."
        />
      </div>
    )
}

export default SearchBar