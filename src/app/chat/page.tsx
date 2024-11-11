
"use client";

import { useState } from 'react';
import { Send, Search, User } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

interface Contact {
  id: string;
  name: string;
  lastMessage: string;
  unread: number;
}

export default function ChatInterface() {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  
  const [messages] = useState<Message[]>([
    {
      id: '1',
      sender: 'John Doe',
      content: 'Hey, how are you?',
      timestamp: new Date().toISOString(),
    },
    {
      id: '2',
      sender: 'Me',
      content: "I am doing great, thanks!",
      timestamp: new Date().toISOString(),
    },
  ]);

  const [contacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'John Doe',
      lastMessage: 'Hey, how are you?',
      unread: 2,
    },
    {
      id: '2', 
      name: 'Jane Smith',
      lastMessage: "Let us catch up soon",
      unread: 0,
    },
  ]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    // Add message sending logic here
    setNewMessage('');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-12 gap-4 h-[calc(100vh-2rem)]">
        
        {/* Contacts Sidebar */}
        <div className="col-span-3">
          <Card className="h-full">
            <CardHeader>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search contacts..." className="pl-8" />
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-12rem)]">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100 ${
                      activeChat === contact.id ? 'bg-gray-100' : ''
                    }`}
                    onClick={() => setActiveChat(contact.id)}
                  >
                    <Avatar>
                      <AvatarFallback>{contact.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-sm text-gray-500">{contact.lastMessage}</div>
                    </div>
                    {contact.unread > 0 && (
                      <div className="bg-blue-500 text-white text-xs rounded-full px-2 py-1">
                        {contact.unread}
                      </div>
                    )}
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Chat Area */}
        <div className="col-span-9">
          <Card className="h-full">
            <CardHeader>
              <Tabs defaultValue="messages" className="w-full">
                <TabsList>
                  <TabsTrigger value="messages">Recent Messages</TabsTrigger>
                  <TabsTrigger value="prospects">Prospects</TabsTrigger>
                  <TabsTrigger value="private">Private Messages</TabsTrigger>
                </TabsList>

                <TabsContent value="messages">
                  <ScrollArea className="h-[calc(100vh-16rem)]">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 mb-4 ${
                          message.sender === 'Me' ? 'justify-end' : ''
                        }`}
                      >
                        {message.sender !== 'Me' && (
                          <Avatar>
                            <AvatarFallback>{message.sender[0]}</AvatarFallback>
                          </Avatar>
                        )}
                        <div className={`max-w-[70%] ${
                          message.sender === 'Me' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                        } rounded-lg p-3`}>
                          <p>{message.content}</p>
                          <span className="text-xs opacity-70">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="prospects">
                  <div className="text-center p-4 text-gray-500">
                    Prospect interactions will appear here
                  </div>
                </TabsContent>

                <TabsContent value="private">
                  <div className="text-center p-4 text-gray-500">
                    Private messages will appear here
                  </div>
                </TabsContent>
              </Tabs>
            </CardHeader>
            
            <CardFooter>
              <div className="flex w-full gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button onClick={sendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

