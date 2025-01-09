
"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Mail, Inbox, Send, Star, Archive, Trash, Flag, Badge } from 'lucide-react'
import { Card } from './ui/card'
import { EmailDialog } from './email-dialog'

interface Email {
  id: string
  subject: string
  sender: string
  preview: string
  date: string
  isStarred: boolean
  isArchived: boolean
  isFlagged: boolean
  isDeleted: boolean
  folder: 'inbox' | 'sent' | 'archived' | 'deleted'
}

const dummyEmails: Email[] = [
  {
    id: "1",
    subject: "Welcome to our platform",
    sender: "support@example.com",
    preview: "Thank you for joining our platform! We're excited to have you...",
    date: "2024-02-15",
    isStarred: false,
    isArchived: false,
    isFlagged: true,
    isDeleted: false,
    folder: 'inbox'
  },
  {
    id: "2", 
    subject: "Meeting Follow-up",
    sender: "manager@company.com",
    preview: "Here are the action items from today's meeting...",
    date: "2024-02-14",
    isStarred: true,
    isArchived: false,
    isFlagged: false,
    isDeleted: false,
    folder: 'inbox'
  }
]

export default function EmailInbox() {
  const [emails, setEmails] = useState<Email[]>(dummyEmails)
  const [selectedView, setSelectedView] = useState<string>('inbox')
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)

  const filterEmails = () => {
    switch(selectedView) {
      case 'inbox':
        return emails.filter(e => !e.isArchived && !e.isDeleted && e.folder === 'inbox')
      case 'sent':
        return emails.filter(e => e.folder === 'sent')
      case 'starred':
        return emails.filter(e => e.isStarred)
      case 'archived':
        return emails.filter(e => e.isArchived)
      case 'deleted':
        return emails.filter(e => e.isDeleted)
      case 'flagged':
        return emails.filter(e => e.isFlagged)
      default:
        return emails
    }
  }

  const views = [
    { id: 'inbox', label: 'Inbox', icon: Inbox },
    { id: 'sent', label: 'Sent', icon: Send },
    { id: 'starred', label: 'Starred', icon: Star },
    { id: 'archived', label: 'Archived', icon: Archive },
    { id: 'deleted', label: 'Deleted', icon: Trash },
    { id: 'flagged', label: 'Flagged', icon: Flag }
  ]

  return (
    <div className="fixed h-[calc(100vh-3.5rem)] w-[calc(100vw-16rem)] left-64 top-14 p-4 overflow-hidden">
      <Card className="h-full w-full border-2 border-primary">
        <div className="flex h-full">
          {/* Email Sidebar */}
          <div className="w-64 border-r bg-background">
            <div className="p-4 space-y-2">
              <Button className="w-full" variant="default" onClick={() => EmailDialog()}>
                Compose
              </Button>
              
              {views.map((view) => (
                <Button
                  key={view.id}
                  variant={selectedView === view.id ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedView(view.id)}
                >
                  <view.icon className="mr-2 h-4 w-4" />
                  {view.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Email Content */}
          <div className="flex-1 flex flex-col bg-background">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">
                {views.find(v => v.id === selectedView)?.label}
              </h2>
            </div>
            
            <ScrollArea className="flex-1">
              <div className="divide-y">
                {filterEmails().map((email) => (
                  <div
                    key={email.id}
                    className="p-4 hover:bg-muted cursor-pointer"
                    onClick={() => setSelectedEmail(email)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{email.sender}</span>
                      <span className="text-sm text-muted-foreground">{email.date}</span>
                    </div>
                    <div className="text-sm font-medium mt-1">{email.subject}</div>
                    <div className="text-sm text-muted-foreground truncate mt-1">
                      {email.preview}
                    </div>
                    <div className="flex gap-2 mt-2">
                      {email.isStarred && (
                        <Badge variant="secondary">
                          <Star className="h-3 w-3 mr-1" />
                          Starred
                        </Badge>
                      )}
                      {email.isFlagged && (
                        <Badge variant="secondary">
                          <Flag className="h-3 w-3 mr-1" />
                          Flagged
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Selected Email View */}
          {selectedEmail && (
            <div className="w-1/2 border-l bg-background">
              <div className="p-4 border-b">
                <h3 className="text-xl font-semibold">{selectedEmail.subject}</h3>
                <div className="text-sm text-muted-foreground mt-1">
                  From: {selectedEmail.sender}
                </div>
                <div className="text-sm text-muted-foreground">
                  Date: {selectedEmail.date}
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm">{selectedEmail.preview}</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
