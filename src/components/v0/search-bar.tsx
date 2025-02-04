'use client'

import { useState, useRef } from 'react'
import { Search, Mic, TimerIcon as Tune, HelpCircle, Loader2, ImagePlus, ChevronRight, Paperclip, ChevronLeft, MessageSquare, Share, Trash2, PenSquare, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { useTheme } from 'next-themes'
import { useChat } from 'ai/react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'


// Mock data for conversation history
const mockConversations = [
  {
    id: 1,
    title: "Project Brainstorm",
    date: "2023-04-15",
    messages: [
      {
        role: "user",
        content: "Let's brainstorm some ideas for the new project",
        timestamp: "09:00 AM"
      },
      {
        role: "assistant", 
        content: "I'd be happy to help brainstorm. What's the main goal of the project?",
        timestamp: "09:01 AM"
      },
      {
        role: "user",
        content: "We need to create a new collaboration tool for remote teams",
        timestamp: "09:03 AM"
      }
    ]
  },
  {
    id: 2,
    title: "Client Meeting",
    date: "2023-04-16",
    messages: [
      {
        role: "user",
        content: "Can you help me prepare for tomorrow's client meeting?",
        timestamp: "02:30 PM"
      },
      {
        role: "assistant",
        content: "Of course! What aspects would you like to focus on?",
        timestamp: "02:31 PM"
      }
    ]
  },
  {
    id: 3,
    title: "Bug Fix Investigation",
    date: "2023-04-17", 
    messages: [
      {
        role: "user",
        content: "There's a critical bug in the authentication system",
        timestamp: "11:15 AM"
      },
      {
        role: "assistant",
        content: "Let's analyze the issue. Can you share the error logs?",
        timestamp: "11:16 AM"
      }
    ]
  },
  {
    id: 4,
    title: "Team Standup",
    date: "2023-04-18",
    messages: [
      {
        role: "user",
        content: "Help me summarize today's standup points",
        timestamp: "10:00 AM"
      },
      {
        role: "assistant",
        content: "I'll help organize the key points from the meeting",
        timestamp: "10:01 AM"
      }
    ]
  },
  {
    id: 5,
    title: "Product Review",
    date: "2023-04-19",
    messages: [
      {
        role: "user",
        content: "Let's review the new product features",
        timestamp: "03:45 PM"
      },
      {
        role: "assistant",
        content: "I'll help analyze each feature. Which one should we start with?",
        timestamp: "03:46 PM"
      }
    ]
  },
  {
    id: 6,
    title: "Design Feedback",
    date: "2023-04-20",
    messages: [
      {
        role: "user",
        content: "Need feedback on the new UI design",
        timestamp: "01:20 PM"
      },
      {
        role: "assistant",
        content: "I'll review the design from both usability and aesthetic perspectives",
        timestamp: "01:21 PM"
      }
    ]
  },
  {
    id: 7,
    title: "Code Review",
    date: "2023-04-21",
    messages: [
      {
        role: "user",
        content: "Can you review this pull request?",
        timestamp: "04:30 PM"
      },
      {
        role: "assistant",
        content: "I'll examine the code changes and provide detailed feedback",
        timestamp: "04:31 PM"
      }
    ]
  }
]



export function SearchBar() {
  const [query, setQuery] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { theme } = useTheme()
  const [files, setFiles] = useState<FileList | undefined>(undefined)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const [selectedConversation, setSelectedConversation] = useState<number | null>(null)

  const { messages, input, handleSubmit, handleInputChange, isLoading, setMessages } = useChat({
    api: '/api/chat',
    onFinish: () => {
      setTimeout(scrollToBottom, 100)
    }
  })

  const handleConversationClick = (id: number) => {
    setSelectedConversation(id)
    
    // Find the selected conversation
    const conversation = mockConversations.find(conv => conv.id === id)
    if (!conversation) return

    // Set the messages from the selected conversation
    const conversationMessages = conversation.messages.map(msg => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
      id: msg.timestamp // Using timestamp as id since original messages don't have id
    }))

    // Update messages with conversation history
    setMessages(conversationMessages)

    // Update input field with empty string for new conversation
    handleInputChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)
  }

  const handleShare = (id: number) => {
    // Share conversation logic
    const conversation = mockConversations.find(conv => conv.id === id)
    if (!conversation) return
    
    // For now just copy conversation text to clipboard
    const conversationText = conversation.messages
      .map(msg => `${msg.role}: ${msg.content}`)
      .join('\n')
    navigator.clipboard.writeText(conversationText)
  }

  const handleDelete = (id: number) => {
    setSelectedConversation(null)
    // Clear input when deleting conversation
    handleInputChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)
  }

  const handleNewConversation = () => {
    setSelectedConversation(null)
    // Clear messages and input when starting new conversation
    setMessages([])
    handleInputChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)
  }

  const toggleSidebar = () => {
    setIsCollapsed(prev => !prev)
  }

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
                <Card className="w-[80%] max-w-sm border-2">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle></CardTitle>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          handleNewConversation();
                        }}
                      >
                        <PenSquare className="h-4 w-4" />
                      </Button>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px] pr-2">
                      {mockConversations.map((conversation) => (
                        <Card key={conversation.id} className="mb-2 border-2 border-neutral-900 dark:border-neutral-50">
                          <CardContent className="p-1">
                            <div className="flex items-center justify-between">
                              <Button
                                variant={selectedConversation === conversation.id ? "secondary" : "ghost"}
                                className="w-full justify-start mr-2"
                                onClick={() => {
                                  handleConversationClick(conversation.id);
                                }}
                              >
                              <MessageCircle className="h-4 w-4" />
                                <div className="flex flex-col items-start">
                                  <span className="font-medium" title={conversation.title}>
                                  {conversation.title}
                                  </span>
                                  <span className="text-[10px] text-neutral-500 dark:text-neutral-400">{conversation.date}</span>
                                </div>
                                <div className="flex items-end ml-auto">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="cursor-pointer"
                                    onClick={() => handleShare(conversation.id)}
                                    >
                                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                                    <polyline points="16 6 12 2 8 6"/>
                                    <line x1="12" y1="2" x2="12" y2="15"/>
                                  </svg>
                                </div>
                                </Button>
                              </div>
                          </CardContent>
                        </Card>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>
            )}
          </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col h-full relative">
          <ScrollArea className="flex-1 p-4 h-[calc(90vh-2rem)]" >
            {messages.map((message, index) => (
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
                        <AvatarImage src="/default-avatar.png" alt="AI Assistant" />
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
            <div />
          </ScrollArea>

          <div className="p-4 bg-background">
            <form
              onSubmit={async (event) => {
                event.preventDefault()
                if (!input.trim()) return
                
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