'use client';

import { useState, useRef, useEffect } from 'react';
import { CalendarForm } from '@/components/ui/datePicker';
import { BellRing, Check, Calendar as CalendarIcon, MessageSquare, ListTodo, Mic, Video, ChevronLeft, Pin, ChevronDown } from "lucide-react";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

interface Post {
  id: number;
  author: string;
  content: string;
  timestamp: Date;
  isPinned: boolean;
  likes: number;
  comments: number;
  type?: 'update' | 'event';
  eventDate?: Date;
  isNew?: boolean;
}

interface Task {
  title: string;
  description: string;
}

interface Event {
  title: string;
  description: string;
}

const tasks: Task[] = [
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

const events: Event[] = [
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

const defaultPinnedPosts: Post[] = [
  {
    id: 1,
    author: 'Admin',
    content: '🎉 Welcome to our new community platform! Please read our community guidelines.',
    timestamp: new Date(),
    isPinned: true,
    likes: 15,
    comments: 5,
    type: 'update'
  },
  {
    id: 2,
    author: 'Events Team',
    content: '📅 Upcoming Workshop: Advanced React Patterns - Join us next week!',
    timestamp: new Date(),
    isPinned: true,
    likes: 20,
    comments: 8,
    type: 'event',
    eventDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  }
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'community' | 'notifications' | 'tasks' | 'schedule'>('community');
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [pinnedPosts] = useState<Post[]>(defaultPinnedPosts);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [lastReadTimestamp, setLastReadTimestamp] = useState<Date>(new Date());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newPost: Post = {
        id: Date.now(),
        author: 'System',
        content: `New update ${new Date().toLocaleTimeString()}`,
        timestamp: new Date(),
        isPinned: false,
        likes: 0,
        comments: 0,
        isNew: true
      };
      setPosts(prev => [...prev, newPost]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post: Post = {
      id: Date.now(),
      author: 'You',
      content: newPost,
      timestamp: new Date(),
      isPinned: false,
      likes: 0,
      comments: 0,
      isNew: false
    };

    setPosts([...posts, post]);
    setNewPost('');
    scrollToBottom();
  };

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const bottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 1;
    setShowScrollButton(!bottom);
  };

  const getUnreadPosts = () => {
    return posts.filter(post => post.timestamp > lastReadTimestamp);
  };

  const getReadPosts = () => {
    return posts.filter(post => post.timestamp <= lastReadTimestamp);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'community':
        return (
          <div className="flex-1 flex flex-col h-full max-h-screen overflow-hidden">
            <div 
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto"
            >
              {/* Pinned Section */}
              <div className="p-4">
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Pin className="h-5 w-5" />
                    Pinned Updates & Events
                  </h3>
                  <div className="space-y-4">
                    {pinnedPosts.map((post) => (
                      <Card key={post.id} className="border-yellow-500 bg-yellow-50">
                        <CardHeader>
                          <div className="flex items-center gap-2">
                            <Avatar>
                              <AvatarFallback>{post.author[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-sm">{post.author}</CardTitle>
                              <CardDescription>{post.timestamp.toLocaleString()}</CardDescription>
                            </div>
                            <span className="text-xs font-medium text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
                              {post.type === 'event' ? 'Event' : 'Update'}
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p>{post.content}</p>
                          {post.eventDate && (
                            <p className="mt-2 text-sm text-gray-600">
                              Date: {post.eventDate.toLocaleDateString()}
                            </p>
                          )}
                        </CardContent>
                        <CardFooter className="flex gap-4 text-sm text-gray-500">
                          <button className="hover:text-gray-700">
                            {post.likes} Likes
                          </button>
                          <button className="hover:text-gray-700">
                            {post.comments} Comments
                          </button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Read Posts */}
                <div className="space-y-4">
                  {getReadPosts().map((post) => (
                    <Card key={post.id}>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <AvatarFallback>{post.author[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-sm">{post.author}</CardTitle>
                            <CardDescription>{post.timestamp.toLocaleString()}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p>{post.content}</p>
                      </CardContent>
                      <CardFooter className="flex gap-4 text-sm text-gray-500">
                        <button className="hover:text-gray-700">
                          {post.likes} Likes
                        </button>
                        <button className="hover:text-gray-700">
                          {post.comments} Comments
                        </button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                {/* Unread Messages Separator */}
                {getUnreadPosts().length > 0 && (
                  <div className="my-8">
                    <div className="relative">
                      <Separator />
                      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-sm font-medium text-gray-500">
                        Unread messages
                      </span>
                    </div>
                  </div>
                )}

                {/* Unread Posts */}
                <div className="space-y-4">
                  {getUnreadPosts().map((post) => (
                    <Card key={post.id} className="border-blue-200 shadow-blue-100">
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <AvatarFallback>{post.author[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-sm">{post.author}</CardTitle>
                            <CardDescription>{post.timestamp.toLocaleString()}</CardDescription>
                          </div>
                          <span className="ml-auto text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                            New
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p>{post.content}</p>
                      </CardContent>
                      <CardFooter className="flex gap-4 text-sm text-gray-500">
                        <button className="hover:text-gray-700">
                          {post.likes} Likes
                        </button>
                        <button className="hover:text-gray-700">
                          {post.comments} Comments
                        </button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Fixed Input Form at Bottom */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 z-10">
              <form onSubmit={handleCreatePost}>
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarFallback>Y</AvatarFallback>
                  </Avatar>
                  <Input
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Write something..."
                    className="flex-1"
                  />
                  <Button type="submit">Post</Button>
                </div>
              </form>
            </div>

            {showScrollButton && (
              <button
                onClick={scrollToBottom}
                className="fixed bottom-24 right-8 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
              >
                <ChevronDown className="h-6 w-6" />
              </button>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-900">
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