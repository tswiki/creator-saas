'use client'

import { useState } from 'react'
import { Search, Mic, TimerIcon as Tune, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTheme } from 'next-themes'

export function SearchBar() {
  const [query, setQuery] = useState('')
  const { theme } = useTheme()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality here
    console.log('Searching for:', query)
  }

  return (
    <div className="max-w-4xl mx-auto p-2">
      <form onSubmit={handleSearch} className="flex items-center space-x-2 bg-background border-2 border-primary shadow-md rounded-full px-4 py-1">
        <Search className="text-muted-foreground h-5 w-5" />
        <Input
          type="text"
          placeholder="Search in Drive"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow border-none focus:ring-0 text-sm bg-transparent"
        />
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" type="button" className="text-muted-foreground hover:bg-accent rounded-full">
            <Mic className="h-5 w-5" />
            <span className="sr-only">Voice search</span>
          </Button>
          <Button variant="ghost" size="icon" type="button" className="text-muted-foreground hover:bg-accent rounded-full">
            <Tune className="h-5 w-5" />
            <span className="sr-only">Search options</span>
          </Button>
          <Button variant="ghost" size="icon" type="button" className="text-muted-foreground hover:bg-accent rounded-full">
            <HelpCircle className="h-5 w-5" />
            <span className="sr-only">Search help</span>
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SearchBar;
