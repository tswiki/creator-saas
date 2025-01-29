'use client'

import { useState, useRef } from 'react'
import { Search, Mic, TimerIcon as Tune, HelpCircle, Loader2, ImagePlus, ChevronRight, Paperclip, ChevronLeft, MessageSquare, Share, Trash2 } from 'lucide-react'
import { Button } from '@/components/v0/ui/button'
import { Input } from '@/components/v0/ui/input'
import { Dialog, DialogContent, DialogTrigger } from '@/components/v0/ui/dialog'
import { useTheme } from 'next-themes'
import { useChat } from 'ai/react'
import { ScrollArea } from '@/components/v0/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/v0/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import ConversationHistoryCard from '../chatbot/conversation-history-card'

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { theme } = useTheme()
  const [messageHistory, setMessageHistory] = useState<any[]>([])
  const [files, setFiles] = useState<FileList | undefined>(undefined)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsCollapsed(prev => !prev)
  }

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
        <div className="max-w-[467px] w-full mx-auto p-4">
          <div className="flex items-center w-full bg-background hover:bg-background/90 border rounded-full px-3 cursor-text transition-all duration-200 border-2">
            <Search className="h-4 w-4 mr-2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search and chat with your data"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm bg-transparent text-foreground placeholder:text-muted-foreground"
              autoFocus
            />
            <div className="flex items-center space-x-3 ml-2">
              <Mic className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-5xl h-[90vh] flex border-4 border-neutral-50">

        {/* Collapsible Sidebar */}
        <div className={`transition-all duration-200 flex flex-col ${isCollapsed ? 'w-16' : 'w-96'}`}>
          <div className="p-2 flex justify-between items-center">
              <div className="border-neutral-900 dark:border-neutral-50 flex justify-center items-center w-full pr-10">
                <h2 className={`font-semibold text-foreground text-center ${isCollapsed ? 'hidden' : 'block'}`}>
                  Chat History
                </h2>
              </div>
              <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="ml-auto"
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>

          {!isCollapsed && (
            <div className="flex-1 h-full overflow-y-auto">
              <div className="h-full w-full px-2">
                <ConversationHistoryCard />
              </div>
            </div>
          )}
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col h-full relative">
          <ScrollArea className="flex-1 p-4 h-[calc(90vh-2rem)]" ref={scrollAreaRef}>
            {messageHistory.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'assistant' ? 'justify-start' : 'justify-end'
                } mb-4`}
              >
                <Card className={`max-w-[80%] border-2 ${
                  message.role === 'assistant' 
                    ? 'border-neutral-900 dark:border-neutral-50' 
                    : 'border-primary'
                }`}>
                  <CardContent className="p-3">
                    <div className={`flex items-start gap-3 ${
                      message.role === 'assistant' ? 'flex-row' : ''
                    }`}>
                      {message.role === 'assistant' && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/default-avatar.png" alt="AI Assistant" />
                          <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                      )}
                      <div className="text-sm whitespace-pre-wrap break-words">
                        {message.content}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <Card className="max-w-[80%] border-2 border-neutral-900 dark:border-neutral-50">
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="@default-avatar.png" alt="AI Assistant" />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                      <div className="flex items-center">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            <div ref={messagesEndRef} />
          </ScrollArea>

          <div className="p-4 bg-background">
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
              <Card className="border-2 border-neutral-900 dark:border-neutral-50 rounded-full">
                <CardContent className="p-2">
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="ghost" 
                      size="icon"
                      onClick={() => fileInputRef.current?.click()}
                      className="hover:bg-secondary rounded-full"
                    >
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Input
                      value={input}
                      placeholder="Type your message..."
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent rounded-full"
                    />
                    <Button 
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      size="icon"
                      variant="ghost"
                      className="hover:bg-secondary rounded-full"
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SearchBar