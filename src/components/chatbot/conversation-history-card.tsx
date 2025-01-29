"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/v0/ui/card"
import { Button } from "@/components/v0/ui/button"
import { ScrollArea } from "@/components/v0/ui/scroll-area"
import { MessageCircle, Share2, Trash2, PlusCircle, MessageSquare, PenSquare } from "lucide-react"

// Mock data for conversation history
const mockConversations = [
  { id: 1, title: "Project Brainstorm", date: "2023-04-15" },
  { id: 2, title: "Client Meeting", date: "2023-04-16" },
  { id: 3, title: "Bug Fix Investigation", date: "2023-04-17" },
  { id: 4, title: "Team Standup", date: "2023-04-18" },
  { id: 5, title: "Product Review", date: "2023-04-19" },
  { id: 6, title: "Design Feedback", date: "2023-04-20" },
  { id: 7, title: "Code Review", date: "2023-04-21" },
]

export default function ConversationHistoryCard() {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null)

  const handleConversationClick = (id: number) => {
    setSelectedConversation(id)
    // Here you would typically load the selected conversation or navigate to it
    console.log(`Loading conversation ${id}`)
  }

  const handleShare = (id: number) => {
    console.log(`Sharing conversation ${id}`)
    // Implement share functionality here
  }

  const handleDelete = (id: number) => {
    console.log(`Deleting conversation ${id}`)
    // Implement delete functionality here
  }

  const handleNewConversation = () => {
    console.log("Starting new conversation")
    // Implement new conversation functionality here
  }

  return (
    <Card className="w-[80%] max-w-sm border-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle></CardTitle>
        <Button variant="ghost" size="sm" onClick={handleNewConversation}>
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
                    onClick={() => handleConversationClick(conversation.id)}
                  >
                    <MessageCircle className=" h-4 w-4" />
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
  )
}



