'use client'

import { useState } from 'react'
import { Search, Mic, TimerIcon as Tune, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { useTheme } from 'next-themes'

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { theme } = useTheme()

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div className="max-w-4xl mx-auto p-2">
          <div className="flex items-center space-x-2 bg-background border-2 border-primary shadow-md rounded-full px-4 py-1 cursor-pointer">
          <Search className="text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Search and chat with your data"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow border-none focus:ring-0 text-sm bg-transparent"
              autoFocus
            />
            <div className="flex items-center space-x-2">
              <Mic className="h-5 w-5 text-muted-foreground" />
              <Tune className="h-5 w-5 text-muted-foreground" />
              <HelpCircle className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-4xl h-[80vh]">
        <div className="w-full h-full flex flex-col">
          <div className="flex items-center space-x-2 p-4">
            <Search className="text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Search and chat with your data"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow border-none focus:ring-0 text-sm bg-transparent"
              autoFocus
            />
            <div className="flex items-center space-x-2">
              <Mic className="h-5 w-5 text-muted-foreground" />
              <Tune className="h-5 w-5 text-muted-foreground" />
              <HelpCircle className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
          <div className="flex-grow">
            <iframe 
              src="YOUR_STREAMLIT_APP_URL"
              width="100%"
              height="100%"
              style={{ border: 'none' }}
              allow="camera;microphone"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SearchBar;