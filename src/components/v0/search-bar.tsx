'use client'

import { useState, useRef } from 'react'
import { Search, Mic, TimerIcon as Tune, HelpCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { useTheme } from 'next-themes'
import { useChat } from 'ai/react'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { theme } = useTheme()
  const [messageHistory, setMessageHistory] = useState<any[]>([])
  const [files, setFiles] = useState<FileList | undefined>(undefined)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const { messages, input, handleSubmit, handleInputChange, isLoading } = useChat({
    api: '/api/chat',
    onResponse: (response) => {
      if (response.ok) {
        setMessageHistory(prevMessages => [
          ...prevMessages,
          { role: 'assistant', content: response.text() }
        ])
        scrollToBottom()
      }
    },
    onFinish: () => {
      setTimeout(scrollToBottom, 100)
    }
  })

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }

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
        <div className="flex flex-col h-full">
            <div className="space-y-4 p-4">
            <ScrollArea className="flex-1 p-2 h-[calc(80vh-8rem)] border-2 rounded-lg" ref={scrollAreaRef}>
              {messageHistory.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === 'assistant' ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div className={`flex gap-3 max-w-[80%] ${
                    message.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'
                  }`}>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {message.role === 'assistant' ? 'AI' : 'You'}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className={`rounded-lg p-4 ${
                      message.role === 'assistant' 
                        ? 'bg-secondary' 
                        : 'bg-primary text-primary-foreground'
                    }`}>
                      <div className="whitespace-pre-wrap break-words">
                        {message.content}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[80%]">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg p-4 bg-secondary">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
              </ScrollArea>
            </div>

          <form
            onSubmit={async (event) => {
              event.preventDefault()
              if (!input.trim()) return
              
              setMessageHistory(prev => [...prev, {
                role: 'user',
                content: input,
                experimental_attachments: files
              }])
              
              handleSubmit(event, {
                experimental_attachments: files,
              })
              
              setFiles(undefined)
              if (fileInputRef.current) {
                fileInputRef.current.value = ''
              }
            }}
            className="flex gap-4 p-2 border-none"
          >
            <Input
              type="file"
              onChange={event => {
                if (event.target.files) {
                  setFiles(event.target.files)
                }
              }}
              multiple
              ref={fileInputRef}
              className="hidden"
              id="file-upload"
            />
            <div className="flex-1 flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="shrink-0"
              >
                Attach
              </Button>
              <Input
                value={input}
                placeholder="Type your message..."
                onChange={handleInputChange}
                disabled={isLoading}
                className="flex-1"
              />
              <Button 
                type="submit" 
                disabled={isLoading || !input.trim()}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Send'
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SearchBar