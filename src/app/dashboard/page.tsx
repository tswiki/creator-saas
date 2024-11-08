'use client';

import { useState } from 'react';
import { CalendarForm } from '@/components/ui/datePicker';
import { BellRing, Check, Calendar as CalendarIcon, MessageSquare, ListTodo, Mic, Video, ChevronLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NotificationsCard } from '@/components/ui/card-notifications';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
}

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];

const tasks = [
  {
    title: "Complete Project Proposal",
    description: "Due tomorrow",
  },
  {
    title: "Review Code Changes",
    description: "3 pull requests pending",
  },
  {
    title: "Team Meeting",
    description: "In 30 minutes",
  },
];

const events = [
  {
    title: "Weekly Standup",
    description: "9:00 AM",
  },
  {
    title: "Client Meeting",
    description: "2:00 PM",
  },
  {
    title: "Project Review",
    description: "4:30 PM",
  },
];


export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'chat' | 'notifications' | 'tasks' | 'schedule'>('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-gray-700 text-white'
                        : 'bg-white text-gray-800'
                    }`}
                  >
                    <p>{message.text}</p>
                    <span className="text-xs opacity-75">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:border-gray-500"
                />
                <button
                  type="submit"
                  className="bg-gray-700 text-white px-6 py-2 rounded-full hover:bg-gray-600 transition-colors"
                >
                  Send
                </button>
              </div>
            </form>
          </>
        );
      default:
        return null;
    }
  };
  

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Left Sidebar */}
      <div className="w-96 bg-gray-800 text-white overflow-y-auto">
        <div className="p-6 space-y-6 flex flex-col items-center">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          
          {/* Calendar Form Component */}
          <div className="bg-gray-700 p-4 rounded-lg border border-gray-600 w-full">
            <h2 className="text-lg font-semibold mb-4 text-white text-center">Schedule Event</h2>
            <CalendarForm />
          </div>

          {/* Tasks Card */}
          <Card className="bg-gray-700 border-gray-600 w-full">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <ListTodo className="h-5 w-5" />
                Tasks
              </CardTitle>
              <CardDescription className="text-gray-300">
                You have {tasks.length} pending tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {tasks.map((task, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[25px_1fr] items-start pb-4 last:pb-0"
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-yellow-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none text-white">{task.title}</p>
                    <p className="text-sm text-gray-400">{task.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Events Card */}
          <Card className="bg-gray-700 border-gray-600 w-full">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Today's Events
              </CardTitle>
              <CardDescription className="text-gray-300">
                You have {events.length} events scheduled
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {events.map((event, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[25px_1fr] items-start pb-4 last:pb-0"
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-blue-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none text-white">{event.title}</p>
                    <p className="text-sm text-gray-400">{event.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Notifications Card */}
          <NotificationsCard className="w-full" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-100">
        <div className="bg-gray-800 shadow-md">
          <div className="p-4">
            <h2 className="text-xl font-semibold text-white capitalize">{activeTab}</h2>
          </div>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}