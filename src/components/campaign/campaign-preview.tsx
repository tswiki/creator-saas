"use client"

import { useEffect, useState } from "react"
import { format, addHours } from "date-fns"
import { Button } from "@/components/v0/ui/button"
import { Input } from "@/components/v0/ui/input"
import { Textarea } from "@/components/v0/ui/textarea"
import { Label } from "@/components/v0/ui/label"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/v0/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/v0/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/v0/ui/tabs"
import { ScrollArea } from "@/components/v0/ui/scroll-area"
import { ChevronLeft, ChevronRight, Eye, FileIcon, Mail, MessageSquare, Paperclip, Plus } from "lucide-react"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "../v0/ui/drawer"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../v0/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "../v0/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../v0/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../v0/ui/select"
import { toast } from "@/hooks/use-toast"

interface Message {
  id: string;
  subject: string;
  body: string;
  type: "email" | "sms";
  sendAfter: number;
  attachments: string[];
}

interface Campaign {
  id: string;
  createdAt: Date;
  type: string;
  status: "draft" | "active" | "completed";
  messages: Message[];
}


export default function CampaignPreview({ campaignID }: { campaignID: string }) {
  const defaultCampaign: Campaign = {
    createdAt: new Date(),
    id: "Welcome Series",
    type: "email", 
    status: "draft",
    messages: [
      {
        id: "msg1",
        subject: "Welcome to Our Service!",
        body: "Thank you for joining us. We're excited to have you on board!",
        type: "email",
        sendAfter: 0,
        attachments: ["welcome-guide.pdf"]
      },
      {
        id: "msg2", 
        subject: "Getting Started Guide",
        body: "Here are some tips to help you get started with our platform...",
        type: "email",
        sendAfter: 24,
        attachments: []
      },
      {
        id: "msg3",
        subject: "Check out these features",
        body: "Have you tried these awesome features yet?",
        type: "email",
        sendAfter: 48,
        attachments: ["feature-overview.pdf"]
      }
    ]
  };

  const [campaign, setCampaign] = useState<Campaign>(defaultCampaign);

  // const [campaigns, setCampaigns] = useState<{ campaigns: Campaign[], index: number }>({ campaigns: [], index: 0 });

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('/api/campaign');
        if (!response.ok) {
          throw new Error('Failed to fetch campaigns');
        }
        const data = await response.json();
        const matchingCampaign = data.find((campaign: Campaign) => campaign.id === campaignID);
        if (matchingCampaign) {
          // Ensure messages array exists and has items before setting state
          if (matchingCampaign.messages && matchingCampaign.messages.length > 0) {
            // Sort messages by sendAfter in ascending order
            const sortedMessages = [...matchingCampaign.messages].sort((a, b) => a.sendAfter - b.sendAfter);
            setCampaign({...matchingCampaign, messages: sortedMessages});
          } else {
            console.error(`Campaign ${campaignID}: has no messages`);
            // Set default campaign if no messages found
            setCampaign(defaultCampaign);
          }
        } else {
          console.error('Campaign not found');
          // Set default campaign if no matching campaign found
          setCampaign(defaultCampaign);
        }
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        // Set default campaign on error
        setCampaign(defaultCampaign);
      }
    };

    fetchCampaigns();
  }, [campaignID, defaultCampaign]);
  

  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(campaign.messages[0]?.id || null)

  const updateMessage = (messageId: string, updates: Partial<Message>) => {
    setCampaign((prev) => ({
      ...prev,
      messages: prev.messages.map((msg) => (msg.id === messageId ? { ...msg, ...updates } : msg)),
    }))
  }

  const addAttachment = (messageId: string, attachment: string) => {
    updateMessage(messageId, {
      attachments: [...(campaign.messages.find((m) => m.id === messageId)?.attachments || []), attachment],
    })
  }

  const removeAttachment = (messageId: string, attachmentIndex: number) => {
    const message = campaign.messages.find((m) => m.id === messageId)
    if (message && message.attachments) {
      updateMessage(messageId, {
        attachments: message.attachments.filter((_, index) => index !== attachmentIndex),
      })
    }
  }

  const [previewOpen, setPreviewOpen] = useState(false)

  const calculateSendDate = (index: number): Date => {
    let totalHours = 0
    for (let i = 0; i < index; i++) {
      totalHours += campaign.messages[i].sendAfter
    }
    return addHours(new Date(), totalHours)
  }

  

  return (
    <div className="fixed h-[calc(100vh-3.5rem)] w-[calc(100vw-16rem)] left-64 top-14 p-4">
      <Card className="w-full border-8 border-primary">
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <CardTitle>Campaign Editor</CardTitle>
            <CardDescription>
              Create and customize your outbound campaign
            </CardDescription>
          </div>
          <Button onClick={() => console.log(JSON.stringify(campaign, null, 2))}>Save Campaign</Button>
        </div>
      </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
            <Card className="md:col-span-1">
              <CardHeader className="text-center">
                Timeline
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100vh-20rem)] pr-4 overflow-hidden">
                  <div className="relative flex flex-col items-center space-y-12">
                    <div className="absolute h-full w-px bg-neutral-100 left-1/2 top-0 dark:bg-neutral-800" />
                    {campaign.messages.map((message, index) => (
                      <div key={message.id} className="relative w-full max-w-sm">
                        <div
                          className={`absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center text-primary`}
                        >
                          {message.type === "email" ? <Mail size={16} /> : <MessageSquare size={16} />}
                        </div>
                        <div className="mt-12">
                          <Button
                            variant={selectedMessageId === message.id ? "default" : "ghost"}
                            className="w-full justify-center py-6 h-auto"
                            onClick={() => setSelectedMessageId(message.id)}
                          >
                            <div className="text-center space-y-2">
                              <p className="font-semibold">
                                {message.type === "email" ? `Email:` : "SMS"}
                              </p>
                              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                {index === 0 ? "Immediately" : `After ${message.sendAfter} hours`}
                              </p>
                              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                {format(calculateSendDate(index), "PPpp")}
                              </p>
                            </div>
                          </Button>
                        </div>
                        {index === campaign.messages.length - 1 && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <div
                                className={`absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-background transition-colors mt-8 cursor-pointer`}
                              >
                                <Plus size={16} />
                              </div>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Add New Message</DialogTitle>
                                <DialogDescription>
                                  Add a new message to your campaign sequence
                                </DialogDescription>
                              </DialogHeader>
                              <form onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                const newMessage = {
                                  id: crypto.randomUUID(),
                                  type: formData.get('type') as 'email' | 'sms',
                                  sendAfter: Number(formData.get('sendAfter')),
                                  subject: formData.get('subject') as string,
                                  body: formData.get('body') as string,
                                  attachments: []
                                };
                                setCampaign(prev => ({
                                  ...prev,
                                  messages: [...prev.messages, newMessage]
                                }));
                              }}>
                                <div className="space-y-4 py-4">
                                  <Select name="type" defaultValue="email">
                                    <SelectTrigger>
                                      <SelectValue placeholder="Message Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="email">Email</SelectItem>
                                      <SelectItem value="sms">SMS</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <Input 
                                    name="sendAfter"
                                    type="number"
                                    placeholder="Send after (hours)"
                                  />
                                  <Input 
                                    name="subject"
                                    placeholder="Subject"
                                  />
                                  <Textarea 
                                    name="body"
                                    placeholder="Message body"
                                  />
                                </div>
                                <DialogFooter>
                                  <Button type="submit">Add Message</Button>
                                </DialogFooter>
                              </form>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Message Editor</CardTitle>
                  <CardDescription>Edit your campaign message</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      const currentIndex = campaign.messages.findIndex(m => m.id === selectedMessageId);
                      if (currentIndex > 0) {
                        setSelectedMessageId(campaign.messages[currentIndex - 1].id);
                      }
                    }}
                    disabled={campaign.messages.findIndex(m => m.id === selectedMessageId) === 0}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const currentIndex = campaign.messages.findIndex(m => m.id === selectedMessageId);
                      if (currentIndex < campaign.messages.length - 1) {
                        setSelectedMessageId(campaign.messages[currentIndex + 1].id);
                      }
                    }}
                    disabled={campaign.messages.findIndex(m => m.id === selectedMessageId) === campaign.messages.length - 1}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                  <Button onClick={() => setPreviewOpen(true)}>
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100vh-22rem)] pr-4 overflow-hidden">
                  <Card className="border-2 p-2">
                    {selectedMessageId && (
                      <MessageEditor
                        message={campaign.messages.find(m => m.id === selectedMessageId)!}
                        updateMessage={updateMessage}
                        addAttachment={addAttachment}
                        removeAttachment={removeAttachment}
                        isFirst={campaign.messages[0].id === selectedMessageId}
                      />
                    )}
                  </Card>
                </ScrollArea>
              </CardContent>
            </Card>

            <Drawer open={previewOpen} onOpenChange={setPreviewOpen}>
              <DrawerContent className="mx-[auto] w-[90vw] sm:w-[800px]">
                <DrawerHeader className="flex flex-col items-center justify-center text-center">
                  <DrawerTitle>Message Preview</DrawerTitle>
                  <p className="text-sm text-muted-foreground">
                    Preview how your message will appear to recipients
                  </p>
                </DrawerHeader>
                
                {selectedMessageId && campaign.messages.find(m => m.id === selectedMessageId)?.type === "email" && (
                  <Card className="p-2 w-full max-w-[800px] mx-auto overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
                    <CardHeader className="bg-white/80 dark:bg-gray-900/80 pb-3 border-b border-blue-200 dark:border-blue-800">
                      <div className="flex items-center justify-center">
                        <div className="flex flex-col items-center gap-3">
                          <Avatar className="h-8 w-8 ring-2 ring-blue-500">
                            <AvatarImage src="/default-avatar.png" />
                            <AvatarFallback className="bg-blue-100 text-blue-700">CO</AvatarFallback>
                          </Avatar>
                          <div className="text-center">
                            <div className="flex flex-col items-center gap-2">
                              <h3 className="font-medium text-blue-900 dark:text-blue-100">Company Name</h3>
                              <span className="text-xs text-blue-600 dark:text-blue-400">&lt;company@example.com&gt;</span>
                            </div>
                            <div className="flex items-center justify-center gap-2 text-xs text-blue-500 dark:text-blue-300 mt-0.5">
                              <span>to me</span>
                              <span>•</span>
                              <span>{format(new Date(), "MMM d, h:mm a")}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardHeader className="py-3 bg-white/60 dark:bg-gray-900/60">
                      <CardTitle className="mt-2 text-blue-900 dark:text-blue-100 text-center">
                        {campaign.messages.find(m => m.id === selectedMessageId)?.subject}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 bg-white/40 dark:bg-gray-900/40">
                      <div className="prose prose-sm max-w-none prose-blue dark:prose-invert text-center">
                        {campaign.messages.find(m => m.id === selectedMessageId)!.body}
                      </div>
                    </CardContent>
                    {campaign.messages.find(m => m.id === selectedMessageId)!.attachments?.length > 0 && (
                      <CardContent className="pt-0 px-6 pb-6 bg-blue-100/50 dark:bg-blue-900/50">
                        <div className="flex flex-wrap justify-center gap-3 pt-2">
                          {campaign.messages.find(m => m.id === selectedMessageId)!.attachments?.map((attachment, index) => (
                            <div key={index} className="flex items-center gap-2 bg-white dark:bg-gray-800 p-2 rounded-md shadow-sm hover:shadow-md transition-shadow">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">{attachment}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                )}

                {selectedMessageId && campaign.messages.find(m => m.id === selectedMessageId)?.type === "sms" && (
                  <Card className="p-2 w-full max-w-[800px] mx-auto overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
                    <CardHeader className="bg-white/80 dark:bg-gray-900/80 pb-3 border-b border-gray-200 dark:border-gray-800">
                      <div className="flex items-center gap-3 px-4">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/default-avatar.png" />
                          <AvatarFallback className="bg-gray-100">CO</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-gray-100">Company Name</h3>
                          <span className="text-xs text-gray-500 dark:text-gray-400">+1 (555) 123-4567</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4 bg-gray-50 dark:bg-gray-900 min-h-[200px]">
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-start">
                          <div className="max-w-[80%] bg-blue-500 text-white p-4 rounded-2xl rounded-tl-none shadow-sm">
                            <p className="text-sm">
                              {campaign.messages.find(m => m.id === selectedMessageId)?.body}
                            </p>
                            <div className="text-[10px] text-blue-100 mt-1">
                              {format(new Date(), "h:mm a")}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-start">
                          <div className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                            Delivered
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-4 p-2">
                          <div className="flex items-center w-full bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 px-4 py-2">
                            <Button
                              variant="ghost" 
                              size="icon"
                              className="rounded-full h-7 w-7"
                            >
                              <Plus className="h-5 w-5 text-blue-500" />
                            </Button>
                            
                            <Input 
                              className="flex-1 bg-transparent border-none focus:ring-0 text-sm mx-2"
                              placeholder="iMessage"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  toast({
                                    title: "Message sending not implemented",
                                    description: "This is just a preview of the SMS conversation",
                                  })
                                }
                              }}
                            />

                            <Button
                              variant="ghost"
                              size="icon" 
                              className="rounded-full h-7 w-7 text-blue-500"
                              onClick={() => {
                                toast({
                                  title: "Message sending not implemented",
                                  description: "This is just a preview of the SMS conversation", 
                                })
                              }}
                            >
                              <ChevronRight className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </DrawerContent>
            </Drawer>
           
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface MessageEditorProps {
  message: Message
  updateMessage: (messageId: string, updates: Partial<Message>) => void
  addAttachment: (messageId: string, attachment: string) => void
  removeAttachment: (messageId: string, attachmentIndex: number) => void
  isFirst: boolean
}

function MessageEditor({ message, updateMessage, addAttachment, removeAttachment, isFirst }: MessageEditorProps) {
 
  if (!message) return null;

  return (
    <div className="space-y-4">
      {message.type === "email" && (
        <div>
          <Label htmlFor={`subject-${message.id}`}>Subject</Label>
          <Input
            id={`subject-${message.id}`}
            value={message.subject || ''}
            onChange={(e) => updateMessage(message.id, { subject: e.target.value })}
          />
        </div>
      )}
      <div>
        <Label htmlFor={`body-${message.id}`}>Body</Label>
        <Textarea
          id={`body-${message.id}`}
          value={message.body || ''}
          onChange={(e) => updateMessage(message.id, { body: e.target.value })}
          rows={5}
        />
      </div>
      {message.type === "email" && (
        <div>
          <Label>Attachments</Label>
          <ul className="list-disc pl-5 mb-2">
            {message.attachments?.map((attachment, attachmentIndex) => (
              <li key={attachmentIndex} className="flex items-center justify-between">
                <span>{attachment}</span>
                <Button variant="ghost" size="sm" onClick={() => removeAttachment(message.id, attachmentIndex)}>
                  Remove
                </Button>
              </li>
            ))}
          </ul>
          <div className="flex space-x-2">
            <Input placeholder="New attachment URL" id={`new-attachment-${message.id}`} />
            <Button
              onClick={() => {
                const input = document.getElementById(`new-attachment-${message.id}`) as HTMLInputElement
                if (input?.value) {
                  addAttachment(message.id, input.value)
                  input.value = ""
                }
              }}
            >
              Add
            </Button>
          </div>
        </div>
      )}
      {!isFirst && (
        <div>
          <Label htmlFor={`sendAfter-${message.id}`}>Send after (hours)</Label>
          <Input
            id={`sendAfter-${message.id}`}
            type="number"
            value={message.sendAfter || 0}
            onChange={(e) => updateMessage(message.id, { sendAfter: Number.parseInt(e.target.value) || 0 })}
            min={1}
          />
        </div>
      )}
    </div>
  )
}
