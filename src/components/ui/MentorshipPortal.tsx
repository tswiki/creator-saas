
'use client';

import React, { useMemo } from 'react';
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, SetStateAction, useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import HeroVideoDialog from "@/components/ui/hero-video-dialog";
import { auth } from '@/firebase/firebaseConfig';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  BookOpen, 
  Calendar as CalendarIcon, 
  Clock,
  MessageSquare, 
  User, 
  Users, 
  Video,
  Menu,
  Settings,
  MonitorUp,
  Mic,
  MonitorOff,
  MicOff,
  Activity,
  VideoOff,
  PhoneOff,
  Check,
  ArrowUp,
  PenSquare,
  Send,
  ImageIcon,
  Play,
  Github,
  Link,
  Linkedin,
  Star,
  Twitter,
  Hash,
  Moon,
  Sun,
  LogOut,
  Bell,
  BellRing,
  MoreVertical,
  Plus,
  Mail,
  Eye,
  Pencil,
  Settings2,
  Trash2,
  Paperclip,
  Phone,
  CheckCheck,
  Search,
  Archive,
  Trash,
  UserPlus,
  MapPin,
  Globe,
  CheckCircle2,
  Trophy,
  Target,
  Wrench,
  Save,
  Instagram,
  ArrowLeft,
  ArrowRight,
  LayoutDashboard,
  Upload,
  MonitorPlay,
  Heart,
  MessageCircle,
  Share,
  Forward,
  ReplyIcon,
  X,
  Filter,
  Palette,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  CheckCircle,
  Calendar,
  Inbox,
  Users2,
  FileText,
  Music,
  Youtube,
  ThumbsUp,
  ThumbsDown,
  Download,
  Subtitles
} from "lucide-react";
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, Label, DropdownMenuSeparator, RadioGroup } from '@radix-ui/react-dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import { toast } from '@/hooks/use-toast';
import { Textarea } from './textarea';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from './menubar';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';
import Marquee from './marquee';


const DashboardView = () => {
  const [selectedChat, setSelectedChat] = useState({
    name: "John Doe",
    avatar: "/avatars/john.jpg", 
    lastMessage: "Thanks for the help!",
    lastMessageTime: "2:30 PM"
  });

  const [messages, setMessages] = useState([
  ]);

  const cohortMembers = [
    {
      name: "Sarah Wilson",
      avatar: "/avatars/sarah.jpg",
      email: "sarah@example.com"
    },
    {
      name: "Mike Johnson", 
      avatar: "/avatars/mike.jpg",
      email: "mike@example.com"
    },
    {
      name: "Emily Brown",
      avatar: "/avatars/emily.jpg",
      email: "emily@example.com" 
    }
  ];

  const upcomingEvent = {
    name: "Weekly Mentorship Session",
    description: "Group discussion on advanced React patterns",
    startTime: "3:00 PM",
    duration: "1 hour",
    date: "Oct 15, 2023",
    attendees: cohortMembers
  };

  return (
    <div className="h-screen pt-16 px-6">
      <Card className="mb-6">
        <CardHeader className="py-4 flex flex-col items-center text-center">
          <CardTitle className="text-2xl">
            {(() => {
              const { auth } = require('@/firebase/firebaseConfig');
              const [firstName, setFirstName] = useState('');
              
              useEffect(() => {
                const unsubscribe = auth.onAuthStateChanged(async (user: { displayName: string; }) => {
                  if (user) {
                    // Get user's display name and split to get first name
                    const displayName = user.displayName || '';
                    const firstName = displayName.split(' ')[0];
                    setFirstName(firstName);
                  }
                });
                
                return () => unsubscribe();
              }, []);

              const hour = new Date().getHours();
              let greeting = '';
              if (hour < 12) greeting = 'Good morning';
              else if (hour < 17) greeting = 'Good afternoon'; 
              else greeting = 'Good evening';
              
              return `${greeting}, ${firstName || 'there'}!`
            })()}
          </CardTitle>
          <CardDescription className="text-base">
            Welcome to your mentorship dashboard
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-3 gap-6 h-[calc(100vh-160px)]">
        <Card className="col-span-2 h-full">
          <CardHeader className="py-4">
            <div className="mb-4 px-2 text-center">
              <Card className="w-48 p-3 mx-auto">
                <h2 className="text-2xl font-semibold flex items-center justify-center gap-2">
                  <Inbox className="h-6 w-6" />
                  Inbox
                </h2>
              </Card>
            </div>
            <Card className="p-4">
              <div className="px-2">
                <div className="flex justify-between items-center">
                  <div className="flex-1 flex space-x-3">
                    <Input placeholder="Search emails..." className="max-w-md" />
                    <Button variant="outline" className="px-4">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                  <Button className="ml-4 px-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Compose
                  </Button>
                </div>
              </div>
            </Card>
          </CardHeader>
          
          <CardContent className="p-6 h-[calc(100vh-100px)]">
            <Card className="h-full">
              <div className="h-full flex flex-col">
                <ScrollArea className="flex-1 p-4 ">
                  <div className="space-y-4 pr-4">
                    {messages.map(msg => (
                      <Dialog key={msg.id}>
                        <DialogTrigger asChild>
                          <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                            <CardContent className="p-5">
                              <div className="grid grid-cols-[80px_1fr] gap-4">
                                <div className="flex items-center justify-center">
                                  <Avatar className="h-12 w-12">
                                    <AvatarFallback>{msg.sender[0]}</AvatarFallback>
                                  </Avatar>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex justify-between mb-1">
                                    <p className="font-medium text-base truncate">{msg.sender}</p>
                                    <span className="text-sm text-muted-foreground">{msg.timestamp}</span>
                                  </div>
                                  <p className="text-sm font-medium mb-1">{msg.subject}</p>
                                  <p className="text-sm text-muted-foreground truncate">{msg.content}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[525px]">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>{msg.sender[0]}</AvatarFallback>
                              </Avatar>
                              {msg.sender}
                            </DialogTitle>
                            <DialogDescription className="text-sm text-muted-foreground">
                              {msg.timestamp}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="mt-4">
                            <p className="font-medium mb-2">{msg.subject}</p>
                            <p className="text-base">{msg.content}</p>
                          </div>
                          <DialogFooter className="mt-6">
                            <Button>Reply</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    ))}
                    {/* Sample Messages */}
                    {[
                      {
                        id: 'sample1',
                        sender: 'John Mentor',
                        subject: 'Project Milestone Check-in',
                        timestamp: '15 March',
                        content: 'Hey there! Just checking in on your progress with the latest project milestone.'
                      },
                      {
                        id: 'sample2',
                        sender: 'Sarah Coach',
                        subject: 'Presentation Feedback',
                        timestamp: '14 March',
                        content: 'Great work on your presentation! I have some feedback to share when you have a moment.'
                      },
                      {
                        id: 'sample3',
                        sender: 'Tech Team',
                        subject: 'Workshop Resources Available',
                        timestamp: '13 March',
                        content: 'New resources available for the upcoming workshop. Please review before Thursday.'
                      },
                      {
                        id: 'sample4',
                        sender: 'Career Services',
                        subject: 'Mock Interview Opportunity',
                        timestamp: '12 March',
                        content: 'Exciting opportunity: Mock interviews scheduled for next week. Sign up now!'
                      }
                    ].map(msg => (
                      <Dialog key={msg.id}>
                        <DialogTrigger asChild>
                          <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                            <CardContent className="p-5">
                              <div className="grid grid-cols-[80px_1fr] gap-4">
                                <div className="flex items-center justify-center">
                                  <Avatar className="h-12 w-12">
                                    <AvatarFallback>{msg.sender[0]}</AvatarFallback>
                                  </Avatar>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex justify-between mb-1">
                                    <p className="font-medium text-base truncate">{msg.sender}</p>
                                    <span className="text-sm text-muted-foreground">{msg.timestamp}</span>
                                  </div>
                                  <p className="text-sm font-medium mb-1">{msg.subject}</p>
                                  <p className="text-sm text-muted-foreground truncate">{msg.content}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[525px]">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>{msg.sender[0]}</AvatarFallback>
                              </Avatar>
                              {msg.sender}
                            </DialogTitle>
                            <DialogDescription className="text-sm text-muted-foreground">
                              {msg.timestamp}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="mt-4">
                            <p className="font-medium mb-2">{msg.subject}</p>
                            <p className="text-base">{msg.content}</p>
                          </div>
                          <DialogFooter className="mt-6">
                            <Button>Reply</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </Card>
          </CardContent>
          <Card>
            <div className="h-[calc(100vh-var(--header-height)-2rem)]">
              <CardFooter className="flex flex-col gap-2 p-4">
                <Card className="w-fit p-3">
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Last Updated: {new Date().toLocaleTimeString()}</span>
                  </div>
                </Card>
                <Card className="w-fit p-3">
                  <div className="flex items-center justify-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">3 unread messages</span>
                  </div>
                </Card>
              </CardFooter>
            </div>
          </Card>
        </Card>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Cohort Section */}
          <Card>
            <CardHeader className="py-4">
              <div className="flex items-center justify-center gap-2">
                <Card className="p-2 w-full">
                  <CardTitle className="text-lg text-center flex items-center justify-center gap-2">
                    <Users2 className="h-5 w-5" />
                    Cohort
                  </CardTitle>
                </Card>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[300px] px-4">
                <div className="space-y-3 py-4">
                  <Card className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 shadow-sm">
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Active Members</CardTitle>
                    </CardHeader>
                  </Card>
                  <Card className="relative">
                    <div className="space-y-2">
                      {[
                        {
                          name: "Sarah Johnson",
                          email: "sarah.j@example.com",
                          avatar: "/avatars/sarah.png"
                        },
                        {
                          name: "Michael Chen", 
                          email: "m.chen@example.com",
                          avatar: "/avatars/michael.png"
                        },
                        {
                          name: "Emma Wilson",
                          email: "emma.w@example.com", 
                          avatar: "/avatars/emma.png"
                        },
                        {
                          name: "James Rodriguez",
                          email: "james.r@example.com",
                          avatar: "/avatars/james.png"
                        },
                        {
                          name: "Sophia Lee",
                          email: "sophia.l@example.com",
                          avatar: "/avatars/sophia.png"
                        },
                        {
                          name: "David Kim",
                          email: "david.k@example.com",
                          avatar: "/avatars/david.png"
                        },
                        ...cohortMembers
                      ].map((member, i) => (
                        <Dialog key={i}>
                          <DialogTrigger asChild>
                            <Card className="p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                              <div className="flex items-center space-x-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={member.avatar} />
                                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <p className="font-medium text-sm mb-1">{member.name}</p>
                                  <div className="flex items-center text-xs text-muted-foreground">
                                    <Mail className="h-3 w-3 mr-1" />
                                    {member.email}
                                  </div>
                                </div>
                              </div>
                            </Card>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Send Message</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="flex items-center space-x-3">
                                <Avatar className="h-12 w-12">
                                  <AvatarImage src={member.avatar} />
                                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{member.name}</p>
                                  <p className="text-sm text-muted-foreground">{member.email}</p>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="text-sm font-medium">Message</div>
                                <Textarea id="message" placeholder="Type your message here..." />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline">Cancel</Button>
                              <Button>Send Message</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      ))}
                    </div>
                  </Card>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Event Section */}
          <Card>
            <div className="flex justify-center">
              <CardHeader className="py-4 text-center">
                <div>
                  <Card className="p-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Upcoming Event
                    </CardTitle>
                  </Card>
                </div>
              </CardHeader>
            </div>
            <CardContent className="space-y-4 p-2">
              <Card className="flex justify-center">
                <CardContent className="space-y-4 p-4 text-center">
                  <div>
                    <h3 className="font-semibold text-base mb-1">{upcomingEvent.name}</h3>
                    <p className="text-sm text-muted-foreground">{upcomingEvent.description}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-xs justify-center">
                      <Clock className="h-3 w-3 mr-2" />
                      {upcomingEvent.startTime} ({upcomingEvent.duration})
                    </div>
                    <div className="flex items-center text-xs justify-center">
                      <Calendar className="h-3 w-3 mr-2" />
                      {upcomingEvent.date}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium mb-2">Attendees</p>
                    <div className="flex -space-x-2 justify-center">
                      {upcomingEvent.attendees.map((attendee, i) => (
                        <Avatar key={i} className="h-8 w-8 border-2 border-background">
                          <AvatarImage src={attendee.avatar} />
                          <AvatarFallback>{attendee.name[0]}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full text-sm py-2" variant="outline">
                    <Share className="h-3 w-3 mr-2" />
                    Share Invitation Link
                  </Button>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const ScheduleView = () => {
  const [tasks, setTasks] = useState<any[]>([
    // Sample data for better visualization
    {
      id: '1',
      title: 'Weekly Team Standup',
      description: 'Regular team sync meeting to discuss progress and blockers',
      dueDate: new Date(Date.now() + 1000 * 60 * 60).toISOString(), // 1 hour from now
      priority: 'medium',
      status: 'current',
      type: 'meeting',
      attendees: ['john@example.com', 'sarah@example.com', 'mike@example.com'],
      location: 'Conference Room A'
    },
    {
      id: '2', 
      title: 'Project Deadline',
      description: 'Complete and submit the Q1 project deliverables',
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days from now
      priority: 'high',
      status: 'upcoming',
      type: 'task'
    },
    {
      id: '3',
      title: 'Client Presentation',
      description: 'Present new features to key stakeholders',
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days from now
      priority: 'high', 
      status: 'upcoming',
      type: 'meeting',
      attendees: ['client@external.com', 'ceo@example.com'],
      location: 'Virtual - Zoom'
    }
  ]);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'meeting' | 'task'>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    type: 'task',
    attendees: [] as string[],
    location: ''
  });

  const filteredTasks = useMemo(() => {
    return tasks
      .filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            task.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === 'all' || task.type === filterType;
        const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
        return matchesSearch && matchesType && matchesPriority;
      })
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }, [tasks, searchQuery, filterType, filterPriority]);

  const groupedTasks = useMemo(() => {
    const now = new Date();
    const groups = {
      overdue: [] as typeof tasks,
      today: [] as typeof tasks,
      tomorrow: [] as typeof tasks,
      thisWeek: [] as typeof tasks,
      later: [] as typeof tasks,
      completed: [] as typeof tasks,
    };

    filteredTasks.forEach(task => {
      if (task.status === 'completed') {
        groups.completed.push(task);
        return;
      }

      const taskDate = new Date(task.dueDate);
      const isToday = taskDate.toDateString() === now.toDateString();
      const isTomorrow = taskDate.toDateString() === new Date(now.getTime() + 86400000).toDateString();
      const isThisWeek = taskDate <= new Date(now.getTime() + 7 * 86400000);

      if (taskDate < now && !isToday) {
        groups.overdue.push(task);
      } else if (isToday) {
        groups.today.push(task);
      } else if (isTomorrow) {
        groups.tomorrow.push(task);
      } else if (isThisWeek) {
        groups.thisWeek.push(task);
      } else {
        groups.later.push(task);
      }
    });

    return groups;
  }, [filteredTasks]);

  const addTask = async () => {
    try {
      const newTaskData = {
        ...newTask,
        id: (tasks.length + 1).toString(),
        status: 'upcoming',
        dueDate: new Date(newTask.dueDate).toISOString()
      };
      
      setTasks([...tasks, newTaskData]);
      setShowAddDialog(false);
      setNewTask({
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium',
        type: 'task',
        attendees: [],
        location: ''
      });

      toast({
        title: "Success",
        description: "Task added successfully"
      });
    } catch (error) {
      console.error('Error adding task:', error);
      toast({
        title: "Error",
        description: "Failed to add task",
        variant: "destructive"
      });
    }
  };

  const updateTaskStatus = (taskId: string, newStatus: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
    
    toast({
      title: "Success", 
      description: "Task status updated"
    });
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    toast({
      title: "Success",
      description: "Task deleted successfully"
    });
  };

  const renderTaskCard = (task: any) => (
    <Card key={task.id} className="relative bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow">
      <Card className="p-4">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Due Date */}
          <div className="col-span-2 p-4">
            <Card className="h-full shadow-md border-2 border-gray-200 dark:border-gray-700">
              <CardContent className="flex items-center justify-center h-full p-4">
                <Card className="w-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 border border-transparent hover:border-primary">
                  <CardContent className="p-2">
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-3xl font-bold">
                        {new Date(task.dueDate).getDate()}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(task.dueDate).getFullYear()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - Time & Location */}
          <div className="col-span-3 p-4">
            <Card className="h-full shadow-md border-2 border-gray-200 dark:border-gray-700">
              <CardContent className="space-y-3 p-4">
                <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 border border-transparent hover:border-primary">
                  <CardContent className="p-2">
                    <div className="flex items-center text-sm">
                      <Clock className="mr-2 h-4 w-4 text-gray-400" />
                      {new Date(task.dueDate).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric'
                      })}
                    </div>
                  </CardContent>
                </Card>
                {task.type === 'meeting' && (
                  <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 border border-transparent hover:border-primary">
                    <CardContent className="p-2">
                      <div className="flex items-center text-sm text-muted-foreground group cursor-pointer">
                        <MapPin className="mr-2 h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
                        <span className="hover:underline group-hover:text-primary transition-colors">{task.location}</span>
                      </div>
                    </CardContent>
                  </Card>
                )}
                <Badge 
                  variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}
                  className="capitalize"
                >
                  {task.priority}
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Description & Attendees */}
          <div className="col-span-7 p-4">
            <Card className="h-full shadow-md border-2 border-gray-200 dark:border-gray-700">
              <CardContent className="space-y-4 p-4">
                <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 border border-transparent hover:border-primary">
                  <CardContent className="p-2">
                    <div>
                      <h3 className="font-medium text-lg mb-1">{task.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                        {task.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                {task.attendees && task.attendees.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                      {task.attendees.map((attendee: string, index: number) => (
                        <Avatar key={index} className="h-8 w-8 border-2 border-white dark:border-slate-900">
                          <AvatarFallback className="bg-blue-500 text-white text-xs">
                            {attendee.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      <Button
                        variant="outline" 
                        size="sm"
                        className="h-8 w-8 rounded-full border-2 border-white dark:border-slate-900 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                        onClick={() => {
                          // Add attendee logic here
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <span className="text-sm text-gray-500">
                      {task.attendees.length} {task.attendees.length === 1 ? 'attendee' : 'attendees'}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </Card>

      <Card className="border-t rounded-t-none">
        <CardFooter className="pt-3 pb-3 px-6 flex items-center justify-between bg-black-50 dark:bg-black-800">
          <Card className="bg-white dark:bg-gray-800 shadow-sm">
            <CardContent className="p-2">
              <div className="text-sm text-gray-500 flex items-center">
                <span>{task.type === 'meeting' ? 'Meeting' : 'Task'}</span>
                <span className="mx-2">•</span>
                <span>Created {new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
          <div className="flex items-center space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 inline-flex items-center"
                >
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Edit {task.type === 'meeting' ? 'Meeting' : 'Task'}</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="date">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="date">Date</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="content">Content</TabsTrigger>
                  </TabsList>
                  <TabsContent value="date" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Due Date</Label>
                      <Input type="date" defaultValue={new Date(task.dueDate).toISOString().split('T')[0]} />
                    </div>
                  </TabsContent>
                  <TabsContent value="details" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Time</Label>
                      <Input type="time" defaultValue={new Date(task.dueDate).toTimeString().slice(0,5)} />
                    </div>
                    {task.type === 'meeting' && (
                      <div className="space-y-2">
                        <Label>Location</Label>
                        <Input defaultValue={task.location} />
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label>Priority</Label>
                      <Select defaultValue={task.priority}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>
                  <TabsContent value="content" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input defaultValue={task.title} />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea defaultValue={task.description} />
                    </div>
                    {task.type === 'meeting' && (
                      <div className="space-y-2">
                        <Label>Attendees</Label>
                        <Input defaultValue={task.attendees?.join(', ')} placeholder="Enter email addresses separated by commas" />
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
                <DialogFooter>
                  <Button type="submit">Save Changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button 
              variant="outline"
              size="sm"
              className="text-gray-600 hover:text-gray-900 inline-flex items-center"
              onClick={() => updateTaskStatus(task.id, task.status === 'completed' ? 'upcoming' : 'completed')}
            >
              {task.status === 'completed' ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Reopen
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Complete
                </>
              )}
            </Button>
            <Button 
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-900 hover:bg-red-100 dark:hover:text-red-400 dark:hover:bg-red-950 inline-flex items-center"
              onClick={() => deleteTask(task.id)}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Card>
  );

  return (
    <div className="space-y-6 pt-10">
      <Card className="h-[80vh] flex flex-col">
        <Card className="rounded-b-none border-b-0">
          <Card>
            <CardHeader className="sticky top-0 bg-background z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <Card className="bg-white dark:bg-gray-800 shadow-sm">
                  <CardHeader className="p-2">
                    <CardTitle>Timeline</CardTitle>
                  </CardHeader>
                </Card>
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                  <Input
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-xs"
                  />
                  <Menubar>
                    <MenubarMenu>
                      <MenubarTrigger asChild>
                        <Button variant="ghost" className="w-[120px]">
                          <Filter className="mr-2 h-4 w-4" />
                          Filters
                        </Button>
                      </MenubarTrigger>
                      <MenubarContent>
                        <MenubarSub>
                          <MenubarSubTrigger>Type ({filterType})</MenubarSubTrigger>
                          <MenubarSubContent>
                            <MenubarItem onClick={() => setFilterType('all')}>
                              <Check className={`mr-2 h-4 w-4 ${filterType === 'all' ? 'opacity-100' : 'opacity-0'}`} />
                              All Types
                            </MenubarItem>
                            <MenubarItem onClick={() => setFilterType('meeting')}>
                              <Check className={`mr-2 h-4 w-4 ${filterType === 'meeting' ? 'opacity-100' : 'opacity-0'}`} />
                              Meetings
                            </MenubarItem>
                            <MenubarItem onClick={() => setFilterType('task')}>
                              <Check className={`mr-2 h-4 w-4 ${filterType === 'task' ? 'opacity-100' : 'opacity-0'}`} />
                              Tasks
                            </MenubarItem>
                          </MenubarSubContent>
                        </MenubarSub>
                        <MenubarSeparator />
                        <MenubarSub>
                          <MenubarSubTrigger>Priority ({filterPriority})</MenubarSubTrigger>
                          <MenubarSubContent>
                            <MenubarItem onClick={() => setFilterPriority('all')}>
                              <Check className={`mr-2 h-4 w-4 ${filterPriority === 'all' ? 'opacity-100' : 'opacity-0'}`} />
                              All Priorities
                            </MenubarItem>
                            <MenubarItem onClick={() => setFilterPriority('low')}>
                              <Check className={`mr-2 h-4 w-4 ${filterPriority === 'low' ? 'opacity-100' : 'opacity-0'}`} />
                              Low
                            </MenubarItem>
                            <MenubarItem onClick={() => setFilterPriority('medium')}>
                              <Check className={`mr-2 h-4 w-4 ${filterPriority === 'medium' ? 'opacity-100' : 'opacity-0'}`} />
                              Medium
                            </MenubarItem>
                            <MenubarItem onClick={() => setFilterPriority('high')}>
                              <Check className={`mr-2 h-4 w-4 ${filterPriority === 'high' ? 'opacity-100' : 'opacity-0'}`} />
                              High
                            </MenubarItem>
                          </MenubarSubContent>
                        </MenubarSub>
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                  <Button onClick={() => setShowAddDialog(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Card>

        <Card className="flex-1 rounded-t-none border-t-0">
          <CardContent className="flex-1 overflow-y-auto pr-4 custom-scrollbar" style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgb(203 213 225) transparent'
          }}>
            <style jsx global>{`
              .custom-scrollbar::-webkit-scrollbar {
                width: 8px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: transparent;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background-color: rgb(203 213 225);
                border-radius: 20px;
                border: 2px solid transparent;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background-color: rgb(148 163 184);
              }
            `}</style>

            <div className="space-y-8">
              {groupedTasks.overdue.length > 0 && (
                <div>
                  <h3 className="text-red-500 font-semibold mb-4">Overdue</h3>
                  <div className="space-y-4">
                    {groupedTasks.overdue.map(renderTaskCard)}
                  </div>
                </div>
              )}
              
              {groupedTasks.today.length > 0 && (
                <div className="pt-4">
                  <Card className="bg-white dark:bg-gray-800 shadow-sm">
                    <CardContent className="p-2">
                      <div className="flex items-center justify-center gap-3">
                        <h3 className="text-blue-500 font-semibold">Today :</h3>
                        <span className="text-blue-500 font-semibold">
                          {new Date().toLocaleDateString('en-US', { 
                            weekday: 'long',
                            month: 'short', 
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                  <div className="space-y-4">
                    {groupedTasks.today.map(renderTaskCard)}
                  </div>
                </div>
              )}

              {groupedTasks.tomorrow.length > 0 && (
                <div>
                  <h3 className="text-green-500 font-semibold mb-4">Tomorrow</h3>
                  <div className="space-y-4">
                    {groupedTasks.tomorrow.map(renderTaskCard)}
                  </div>
                </div>
              )}

              {groupedTasks.thisWeek.length > 0 && (
                <div>
                  <Card className="bg-white dark:bg-gray-800 shadow-sm">
                    <CardContent className="p-2">
                      <div className="flex items-center justify-center gap-3">
                        <h3 className="text-purple-500 font-semibold">This Week :</h3>
                        <span className="text-purple-500 font-semibold">
                          {new Date().toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })} - {new Date(Date.now() + 6 * 86400000).toLocaleDateString('en-US', {
                            month: 'short', 
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                  <div className="space-y-4">
                    {groupedTasks.thisWeek.map(renderTaskCard)}
                  </div>
                </div>
              )}

              {groupedTasks.later.length > 0 && (
                <div>
                  <h3 className="text-gray-500 font-semibold mb-4">Later</h3>
                  <div className="space-y-4">
                    {groupedTasks.later.map(renderTaskCard)}
                  </div>
                </div>
              )}

              {groupedTasks.completed.length > 0 && (
                <div>
                  <h3 className="text-gray-400 font-semibold mb-4">Completed</h3>
                  <div className="space-y-4">
                    {groupedTasks.completed.map(renderTaskCard)}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </Card>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task/Meeting</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Due Date</Label>
              <Input
                type="datetime-local"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select 
                value={newTask.type} 
                onValueChange={(value: 'meeting' | 'task') => setNewTask({...newTask, type: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="task">Task</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select 
                value={newTask.priority} 
                onValueChange={(value: 'low' | 'medium' | 'high') => setNewTask({...newTask, priority: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {newTask.type === 'meeting' && (
              <>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={newTask.location}
                    onChange={(e) => setNewTask({...newTask, location: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Attendees (comma-separated emails)</Label>
                  <Input
                    value={newTask.attendees.join(', ')}
                    onChange={(e) => setNewTask({
                      ...newTask, 
                      attendees: e.target.value.split(',').map(email => email.trim())
                    })}
                  />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
            <Button onClick={addTask}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};





export function HeroVideoDialogDemoTopInBottomOut() {
  return (
    <div className="relative">
      <HeroVideoDialog
        className="dark:hidden block"
        animationStyle="top-in-bottom-out"
        videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
        thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
        thumbnailAlt="Hero Video"
      />
      <HeroVideoDialog
        className="hidden dark:block"
        animationStyle="top-in-bottom-out"
        videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
        thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
        thumbnailAlt="Hero Video"
      />
    </div>
  );
}

async function refreshSession() {
  try {
    // Get current user
    const user = auth.currentUser;
    if (!user) {
      throw new Error('No user logged in');
    }

    // Get fresh ID token
    const idToken = await user.getIdToken(true);

    // Call session endpoint to refresh session cookie
    const response = await fetch('/api/auth/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh session');
    }

    return true;
  } catch (error) {
    console.error('Error refreshing session:', error);
    return false;
  }
}


export default function MentorshipPortal() {

  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [date, setDate] = useState<Date | undefined>(new Date());

  const Sidebar = () => {
    const [showProfileDialog, setShowProfileDialog] = useState(false);
    const [currentProfileView, setCurrentProfileView] = useState('details');
    const [profileData, setProfileData] = useState({
      username: auth.currentUser?.email || "johndoe@example.com",
      fullName: auth.currentUser?.displayName || "John Doe", 
      email: auth.currentUser?.email || "johndoe@example.com",
      photoURL: auth.currentUser?.photoURL || "/default-avatar.png",
      bio: "",
      skills: [] as string[],
      achievements: [] as string[],
      niche: "",
      goal: "",
      isGoogleConnected: false,
      isInstagramConnected: false,
      isDiscordConnected: false,
      isLinkedInConnected: false,
      isTwitterConnected: false,
      isTikTokConnected: false
    });
    const { theme, setTheme } = useTheme();

    const handleConnect = (service: string) => {
      setProfileData(prev => ({
        ...prev,
        [`is${service}Connected`]: true
      }));
      toast({
        title: "Success",
        description: `Connected to ${service}`
      });
    };

    return (
      <div className="mt-16 fixed top-0 left-0 bottom-0 w-64">
        <div className="h-full flex flex-col p-4 border-r bg-background">
          <div className="flex flex-col gap-3 flex-1">
            <Button variant="ghost" className="justify-start w-full" onClick={() => setCurrentView('dashboard')}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="ghost" className="justify-start w-full" onClick={() => setCurrentView('spaces')}>
              <Hash className="mr-2 h-4 w-4" />
              Spaces
            </Button>
            <Button variant="ghost" className="justify-start w-full" onClick={() => setCurrentView('connect')}>
              <Users className="mr-2 h-4 w-4" />
              Connect
            </Button>
            <Button variant="ghost" className="justify-start w-full" onClick={() => setCurrentView('schedule')}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              Schedule
            </Button>
            <Button variant="ghost" className="justify-start w-full" onClick={() => setCurrentView('resources')}>
              <BookOpen className="mr-2 h-4 w-4" />
              Resources
            </Button>
          </div>

          <div className="flex items-center justify-center w-full border-t border-b pt-3 pb-3 mb-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="flex items-center justify-center gap-2">
                <Sun className={`h-4 w-4 transition-opacity ${theme === 'dark' ? 'opacity-50' : 'text-yellow-500'}`} />
              </div>
              <Switch 
                id="theme-mode"
                checked={theme === 'dark'}
                onCheckedChange={(checked) => {
                  const newTheme = checked ? 'dark' : 'light';
                  setTheme(newTheme);
                  toast({
                    title: "Theme Changed",
                    description: `Switched to ${newTheme} mode`
                  });
                }}
                className="data-[state=checked]:bg-slate-800 data-[state=unchecked]:bg-yellow-500"
              />
              <div className="flex items-center justify-center gap-2">
                <Moon className={`h-4 w-4 transition-opacity ${theme === 'dark' ? 'text-slate-200' : 'opacity-50'}`} />
              </div>
            </div>
          </div>

          <Button variant="ghost" className="justify-between w-full mt-2 mb-2" onClick={async () => {
              try {
                const response = await fetch('/api/profiles', {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                  }
                });

                if (!response.ok) {
                  throw new Error('Failed to fetch profile');
                }

                const data = await response.json();
                setProfileData(data.profile);
                setShowProfileDialog(true);
                setCurrentProfileView('details');
              } catch (error) {
                console.error('Error fetching profile:', error);
                toast({
                  title: "Error",
                  description: "Failed to load profile data",
                  variant: "destructive",
                  duration: 3000
                });
              }
          }}>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={profileData.photoURL} alt={profileData.fullName} />
                <AvatarFallback>{profileData.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">{profileData.fullName}</span>
                <span className="text-xs text-muted-foreground">{profileData.email}</span>
              </div>
            </div>
            <Settings className="h-4 w-4" />
          </Button>

          <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
            <DialogContent className="w-[70vw] max-w-[1000px] h-[80vh] max-h-[800px]">
              <div className="space-y-6 mt-6 overflow-y-auto pr-4 custom-scrollbar" style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgb(203 213 225) transparent'
              }}>
                <style jsx global>{`
                  .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                  }
                  .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                  }
                  .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: rgb(203 213 225);
                    border-radius: 20px;
                    border: 2px solid transparent;
                  }
                  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: rgb(148 163 184);
                  }
                `}</style>
                <Card>
                  <CardHeader className="pb-4">
                    <div className="flex flex-col items-center gap-4">
                      <div className="relative">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={profileData.photoURL} alt={profileData.fullName} />
                          <AvatarFallback>{profileData.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute bottom-0 right-0 rounded-full bg-background shadow-sm"
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Change photo</span>
                        </Button>
                      </div>
                      <Button variant="outline" size="sm">
                        <Link className="h-4 w-4 mr-1" />
                        Copy Link
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4 divide-y divide-border">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Name</h3>
                        <input
                          id="fullName"
                          value={profileData.fullName}
                          onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                        />
                      </div>

                      <div className="pt-4">
                        <h3 className="text-sm font-medium mb-2">Username</h3>
                        <input
                          id="username"
                          value={profileData.username}
                          onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                        />
                      </div>

                      <div className="pt-4">
                        <h3 className="text-sm font-medium mb-2">Email Address</h3>
                        <input
                          id="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                        />
                      </div>

                      <div className="pt-4">
                        <h3 className="text-sm font-medium mb-2">Phone Number</h3>
                        <div className="flex gap-2">
                          <Select
                            onValueChange={(value) => setProfileData(prev => ({
                              ...prev,
                              countryCode: value
                            }))}
                          >
                            <SelectTrigger className="w-[140px]">
                              <SelectValue placeholder="Code" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="+1">+1 (US/CA)</SelectItem>
                              <SelectItem value="+44">+44 (UK)</SelectItem>
                              <SelectItem value="+61">+61 (AU)</SelectItem>
                              <SelectItem value="+91">+91 (IN)</SelectItem>
                              <SelectItem value="+86">+86 (CN)</SelectItem>
                              <SelectItem value="+81">+81 (JP)</SelectItem>
                              <SelectItem value="+49">+49 (DE)</SelectItem>
                              <SelectItem value="+33">+33 (FR)</SelectItem>
                              <SelectItem value="+55">+55 (BR)</SelectItem>
                            </SelectContent>
                          </Select>
                          <input
                            id="phone"
                            type="tel"
                            value={profileData.phoneNumber}
                            onChange={(e) => setProfileData({...profileData, phoneNumber: e.target.value})}
                            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                            placeholder="Enter phone number"
                          />
                        </div>
                      </div>

                      <div className="pt-4">
                        <h3 className="text-sm font-medium mb-2">About</h3>
                        <textarea
                          id="bio"
                          value={profileData.bio}
                          onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                          className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                          placeholder="Tell us about yourself..."
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center gap-4 mt-6">
                <Button 
                  variant="destructive"
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = '/login';
                  }}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
                <Button 
                  className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 dark:bg-white dark:hover:bg-gray-100"
                  onClick={async () => {
                    try {
                      const response = await fetch('/api/profiles', {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(profileData)
                      });
                      
                      if (!response.ok) {
                        throw new Error('Failed to save changes');
                      }
                      
                      const data = await response.json();
                      toast({
                        title: "Success",
                        description: "Profile updated successfully",
                        duration: 3000
                      });
                      setShowProfileDialog(false);
                    } catch (error) {
                      console.error('Error saving changes:', error);
                      toast({
                        title: "Error",
                        description: "Failed to save changes",
                        variant: "destructive",
                        duration: 3000
                      });
                    }
                  }}
                >
                  <Save className="h-4 w-4" />
                  Save
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  };

  const ResourcesView = () => {
    const [resources, setResources] = useState<any[]>([]);
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [newResource, setNewResource] = useState({
      title: '',
      type: '',
      platform: '',
      author: '', 
      description: '',
    });

    // Fetch resources on component mount
    useEffect(() => {
      const fetchResources = async () => {
        try {
          const response = await fetch('/api/resources');
          if (!response.ok) {
            throw new Error('Failed to fetch resources');
          }
          const data = await response.json();
          setResources(data);
        } catch (error) {
          console.error('Error fetching resources:', error);
        }
      };

      fetchResources();
    }, []);

    function setView(arg0: string): void {
      throw new Error('Function not implemented.');
    }

    return (
    <div className="space-y-6 pt-10">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Learning Resources</CardTitle>
              <Button onClick={() => setShowAddDialog(true)}>
                Add Resource
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Recommended Resources */}
              <div>
                <h3 className="font-semibold mb-4">Recommended by Your Mentor</h3>
                <div className="space-y-4">
                  {resources.map((resource, i) => (
                    <Card key={i}>
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{resource.title}</h4>
                              <div className="text-sm text-muted-foreground">
                                Recommended by {resource.recommended}
                              </div>
                              <p className="text-sm mt-2">{resource.description}</p>
                              <Badge variant="secondary" className="mt-2">
                                {resource.type}
                              </Badge>
                            </div>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <BookOpen className="h-4 w-4 mr-2" />
                                  Open
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                  <DialogTitle>Join Our Mentorship Program</DialogTitle>
                                  <DialogDescription>
                                    Get personalized guidance and unlock premium resources
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-6">
                                  <div className="text-center">
                                    <h4 className="font-medium mb-4">Premium Mentorship Benefits</h4>
                                    <ul className="text-sm space-y-3">
                                      <li className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-primary" />
                                        <span>1-on-1 sessions with expert mentors</span>
                                      </li>
                                      <li className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-primary" />
                                        <span>Access to all premium resources</span>
                                      </li>
                                      <li className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-primary" />
                                        <span>Personalized learning path</span>
                                      </li>
                                      <li className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-primary" />
                                        <span>Project reviews and feedback</span>
                                      </li>
                                    </ul>
                                  </div>

                                  <div className="text-center space-y-4">
                                    <div>
                                      <span className="text-3xl font-bold">$199</span>
                                      <span className="text-sm text-muted-foreground">/month</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                      Cancel anytime. 100% satisfaction guaranteed.
                                    </p>
                                  </div>

                                  <div className="flex flex-col gap-3">
                                    <Button size="lg" onClick={() => setCurrentView('course')}>
                                      Start Your Mentorship Journey
                                    </Button>
                                  </div>

                                  <div className="text-center text-sm text-muted-foreground">
                                    <p>Have questions? <span className="text-primary cursor-pointer hover:underline">Contact us</span></p>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Learning Path */}
              <div>
                <h3 className="font-semibold mb-4">Creator Content Hub</h3>
                {currentView === "youtube" ? (
                  <YoutubeView />
                ) : currentView === "tiktok" ? (
                  <TikTokView />
                ) : currentView === "twitter" ? (
                  <TwitterView />
                ) : (
                  <div className="space-y-4">
                    {[
                      {
                        platform: "YouTube",
                        status: "Latest Content", 
                        content: [
                          {
                            title: "Frontend Development Tips",
                            views: "15K views",
                            date: "2 days ago",
                            thumbnail: "/youtube-thumb-1.jpg"
                          },
                          {
                            title: "React Best Practices",
                            views: "32K views",
                            date: "1 week ago", 
                            thumbnail: "/youtube-thumb-2.jpg"
                          }
                        ],
                        channelInfo: {
                          subscribers: "50K",
                          totalVideos: "125"
                        }
                      },
                      {
                        platform: "TikTok",
                        status: "Trending",
                        content: [
                          {
                            title: "Quick CSS Tips",
                            likes: "45K",
                            comments: "1.2K",
                            thumbnail: "/tiktok-thumb-1.jpg"
                          },
                          {
                            title: "JavaScript Shorts",
                            likes: "32K",
                            comments: "890",
                            thumbnail: "/tiktok-thumb-2.jpg"
                          }
                        ],
                        profileInfo: {
                          followers: "100K",
                          likes: "1.2M"
                        }
                      },
                      {
                        platform: "Twitter",
                        status: "Recent Threads",
                        content: [
                          {
                            text: "🧵 Essential Web Development Tools in 2024",
                            retweets: "2.5K",
                            likes: "12K",
                            time: "3h ago"
                          },
                          {
                            text: "Breaking down complex React concepts 👇",
                            retweets: "1.8K",
                            likes: "8K",
                            time: "1d ago"
                          }
                        ],
                        profileInfo: {
                          followers: "75K",
                          tweets: "3.2K"
                        }
                      }
                    ].map((platform, i) => (
                      <Card 
                        key={i} 
                        className="hover:shadow-md transition-shadow"
                      >
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <Card className="p-3">
                              <div className="flex justify-between items-center">
                                <h4 className="font-medium flex items-center gap-2">
                                  {platform.platform === "YouTube" && (
                                    <Button 
                                      variant="ghost" 
                                      size="icon"
                                      className="p-0"
                                    >
                                      <Youtube className="h-5 w-5 text-red-600" />
                                    </Button>
                                  )}
                                  {platform.platform === "TikTok" && (
                                    <Button 
                                      variant="ghost" 
                                      size="icon"
                                      className="p-0"
                                    >
                                      <Music className="h-5 w-5 text-black" />
                                    </Button>
                                  )}
                                  {platform.platform === "Twitter" && (
                                    <Button 
                                      variant="ghost" 
                                      size="icon"
                                      className="p-0"
                                    >
                                      <Twitter className="h-5 w-5 text-blue-400" />
                                    </Button>
                                  )}
                                  {platform.platform}
                                </h4>
                                <Badge variant="secondary">{platform.status}</Badge>
                              </div>
                            </Card>

                            <div className="grid gap-3">
                              {platform.content.map((item, j) => (
                                <Card key={j} className="p-2">
                                  <div className="flex items-center gap-3 hover:bg-accent rounded-lg">
                                    {item.thumbnail && (
                                      <div className="w-24 h-16 bg-muted rounded overflow-hidden">
                                        <div className="w-full h-full bg-center bg-cover" style={{backgroundImage: `url(${item.thumbnail})`}} />
                                      </div>
                                    )}
                                    <div className="flex-1">
                                      <p className="font-medium text-sm">{item.title || item.text}</p>
                                      <div className="flex gap-2 text-xs text-muted-foreground mt-1">
                                        {item.views && <span>{item.views}</span>}
                                        {item.likes && <span>{item.likes} likes</span>}
                                        {item.retweets && <span>{item.retweets} retweets</span>}
                                        {item.date || item.time && <span>• {item.date || item.time}</span>}
                                      </div>
                                    </div>
                                  </div>
                                </Card>
                              ))}
                            </div>

                            <Card className="p-3">
                              <div className="flex justify-between items-center">
                                <div className="flex gap-4 text-sm text-muted-foreground">
                                  {platform.channelInfo && (
                                    <>
                                      <span>{platform.channelInfo.subscribers} subscribers</span>
                                      <span>{platform.channelInfo.totalVideos} videos</span>
                                    </>
                                  )}
                                  {platform.profileInfo && (
                                    <>
                                      <span>{platform.profileInfo.followers} followers</span>
                                      {platform.profileInfo.likes && <span>{platform.profileInfo.likes} likes</span>}
                                      {platform.profileInfo.tweets && <span>{platform.profileInfo.tweets} tweets</span>}
                                    </>
                                  )}
                                </div>
                                <Button 
                                  variant="outline"
                                  onClick={() => setCurrentView(platform.platform.toLowerCase())}
                                >
                                  Open
                                </Button>
                              </div>
                            </Card>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Resource</DialogTitle>
              <DialogDescription>
                Add a new course or information product to your resources
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  value={newResource.title}
                  onChange={(e) => setNewResource({...newResource, title: e.target.value})}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="type">Type</label>
                <Select onValueChange={(value) => setNewResource({...newResource, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Course">Course</SelectItem>
                    <SelectItem value="Book">Book</SelectItem>
                    <SelectItem value="Document">Document</SelectItem>
                    <SelectItem value="Video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="author">Author</label>
                <input
                  id="author"
                  value={newResource.author}
                  onChange={(e) => setNewResource({...newResource, author: e.target.value})}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={newResource.description}
                  onChange={(e) => setNewResource({...newResource, description: e.target.value})}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={async () => {
                try {
                  // Call the resources API endpoint to create new resource
                  const response = await fetch('/api/resources', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newResource)
                  });

                  if (!response.ok) {
                    throw new Error('Failed to add resource');
                  }

                  // Fetch updated resources
                  const updatedResponse = await fetch('/api/resources');
                  const updatedData = await updatedResponse.json();
                  setResources(updatedData);

                  // Reset form
                  setNewResource({
                    title: '',
                    type: '',
                    platform: '',
                    author: '',
                    description: '',
                  });
                  
                  // Close dialog
                  setShowAddDialog(false);
                } catch (error) {
                  console.error('Error adding resource:', error);
                  // Here you could show an error toast/alert to the user
                }
              }}>Add Resource</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  const YoutubeView = () => {
    const [channelData] = useState({
      snippet: {
        title: "Code With Sarah",
        thumbnails: {
          default: {
            url: "/avatars/sarah.jpg"
          }
        }
      },
      statistics: {
        subscriberCount: "125K",
        videoCount: "342",
        viewCount: "2.1M",
        commentCount: "45.2K"
      }
    });

    const [videos] = useState([
      {
        id: "1",
        snippet: {
          title: "Build a Full Stack App with Next.js 13",
          thumbnails: {
            medium: {
              url: "/thumbnails/nextjs-tutorial.jpg"
            }
          },
          publishedAt: "2024-01-15T14:30:00Z"
        },
        statistics: {
          viewCount: "12.5K"
        }
      },
      {
        id: "2", 
        snippet: {
          title: "React Hooks Deep Dive - useState & useEffect",
          thumbnails: {
            medium: {
              url: "/thumbnails/react-hooks.jpg" 
            }
          },
          publishedAt: "2024-01-10T16:45:00Z"
        },
        statistics: {
          viewCount: "8.2K"
        }
      },
      {
        id: "3",
        snippet: {
          title: "TypeScript Crash Course for Beginners",
          thumbnails: {
            medium: {
              url: "/thumbnails/typescript.jpg"
            }
          },
          publishedAt: "2024-01-05T13:15:00Z"
        },
        statistics: {
          viewCount: "15.7K"
        }
      }
    ]);

    return (
      <div className="flex h-screen w-full overflow-hidden bg-background pt-12">
        {/* Main Content - 2/3 width */}
        <div className="w-2/3 h-full flex flex-col px-8">
          {/* Title Section */}
          <h1 className="text-3xl font-bold tracking-tight mb-6">Building a Modern Web Application with React and TypeScript</h1>
          
          {/* Video Player Section */}
          <div className="h-[45%] w-full rounded-xl overflow-hidden shadow-lg">
            <div className="relative w-full h-full">
              <iframe
                src="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                title="Channel Trailer"
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Video Info Section */}
          <div className="flex-1 mt-6">
            <div className="flex flex-col space-y-4">
              {/* Video title and controls row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 ring-2 ring-primary/10">
                    <AvatarImage src="/avatars/channel-avatar.png" />
                    <AvatarFallback>CH</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">Code Horizons</h3>
                    <p className="text-sm text-muted-foreground">256K subscribers</p>
                  </div>
                  <Button className="ml-4" variant="default" size="sm">Subscribe</Button>
                  
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" className="flex items-center gap-2 px-4">
                    <ThumbsUp className="h-5 w-5" />
                    12K
                  </Button>
                  <Button variant="ghost" className="flex items-center gap-2 px-4">
                    <Share className="h-5 w-5" />
                    Share
                  </Button>
                  <div>
                    <Menubar className="border-none">
                      <MenubarMenu>
                        <MenubarTrigger className="cursor-pointer hover:bg-accent/50">
                          <MoreVertical className="h-5 w-5" />
                        </MenubarTrigger>
                        <MenubarContent>
                          <Dialog>
                            <DialogTrigger asChild>
                              <MenubarItem>Show Description</MenubarItem>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Video Description</DialogTitle>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <p className="text-sm text-muted-foreground">
                                  Learn how to build modern web applications using React and TypeScript. This comprehensive tutorial covers everything from setup to deployment, including best practices and advanced patterns.
                                </p>
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <MenubarItem>Show Subtitles</MenubarItem>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Live Subtitles</DialogTitle>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <iframe 
                                  src="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb&cc_load_policy=1"
                                  className="w-full h-[200px]"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                ></iframe>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </MenubarContent>
                      </MenubarMenu>
                    </Menubar>
                  </div>
                </div>
              </div>

              {/* Video details section */}
              <div className="flex flex-col gap-4">
                <div className="bg-accent/20 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Learn how to build modern web applications using React and TypeScript. This comprehensive tutorial covers everything from setup to deployment, including best practices and advanced patterns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-1/3 h-full">
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between px-6">
              <h3 className="font-semibold text-lg pl-8">Similar Videos</h3>
              <Menubar className="border-none">
                <MenubarMenu>
                  <MenubarTrigger className="cursor-pointer hover:bg-accent/50">
                    <Filter className="h-4 w-4" />
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>Most Recent</MenubarItem>
                    <MenubarItem>Most Viewed</MenubarItem>
                    <MenubarItem>Most Liked</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>

            <ScrollArea className="flex-1">
              <div className="space-y-4 p-6">
                {videos.map((video) => (
                  <div 
                    key={video.id}
                    className="group p-3 hover:bg-accent/50 rounded-lg cursor-pointer transition-colors"
                  >
                    <div className="flex gap-4">
                      <div className="relative w-44 aspect-video rounded-md overflow-hidden">
                        <img
                          src="/default-avatar.png"
                          alt={video.snippet.title}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute bottom-2 right-2 bg-black/75 text-white text-xs px-2 py-1 rounded">
                          10:30
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                          {video.snippet.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-2">Code Horizons</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1.5">
                          <span>{video.statistics.viewCount} views</span>
                          <span>•</span>
                          <span>{new Date(video.snippet.publishedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    );
  };

  const TikTokView = () => {
    const [tiktokData, setTiktokData] = useState<any>({
      statistics: {
        followers: "100K",
        likes: "1.2M",
        videos: "450"
      },
      profile: {
        username: "@codingmentor",
        bio: "Teaching code one video at a time 👨‍💻",
        avatar: "/tiktok-avatar.jpg"
      }
    });

    const [posts, setPosts] = useState([
      {
        id: "1",
        caption: "Quick CSS Grid Tutorial 🎨",
        stats: {
          likes: "45K",
          comments: "1.2K",
          shares: "2.3K"
        },
        thumbnail: "/tiktok-thumb-1.jpg",
        posted: "2 days ago"
      },
      {
        id: "2", 
        caption: "JavaScript Tips & Tricks ⚡️",
        stats: {
          likes: "32K",
          comments: "890",
          shares: "1.5K"
        },
        thumbnail: "/tiktok-thumb-2.jpg",
        posted: "5 days ago"
      }
    ]);

    return (
      <div className="space-y-8">
        {/* Profile Header */}
        <div className="bg-card p-6 rounded-lg">
          <div className="flex items-center gap-6">
            {tiktokData.profile.avatar && (
              <img
                src={tiktokData.profile.avatar}
                alt="TikTok Profile"
                className="w-16 h-16 rounded-full"
              />
            )}
            <div>
              <h2 className="text-2xl font-bold">{tiktokData.profile.username}</h2>
              <p className="text-muted-foreground">{tiktokData.profile.bio}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-background p-4 rounded-md text-center">
              <p className="text-2xl font-bold">{tiktokData.statistics.followers}</p>
              <p className="text-sm text-muted-foreground">Followers</p>
            </div>
            <div className="bg-background p-4 rounded-md text-center">
              <p className="text-2xl font-bold">{tiktokData.statistics.likes}</p>
              <p className="text-sm text-muted-foreground">Total Likes</p>
            </div>
            <div className="bg-background p-4 rounded-md text-center">
              <p className="text-2xl font-bold">{tiktokData.statistics.videos}</p>
              <p className="text-sm text-muted-foreground">Videos</p>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Recent Posts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-card rounded-lg overflow-hidden shadow-sm">
                <img 
                  src={post.thumbnail}
                  alt={post.caption}
                  className="w-full aspect-[9/16] object-cover"
                />
                <div className="p-4">
                  <h4 className="font-semibold line-clamp-2">{post.caption}</h4>
                  <div className="flex gap-4 text-sm text-muted-foreground mt-2">
                    <span>{post.stats.likes} likes</span>
                    <span>{post.stats.comments} comments</span>
                    <span>{post.stats.shares} shares</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{post.posted}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const TwitterView = () => {
    const [twitterData] = useState({
      statistics: {
        followers: "75.2K",
        following: "1.2K", 
        tweets: "3.2K"
      },
      profile: {
        handle: "@sarahcodes",
        name: "Sarah Wilson",
        bio: "Senior Software Engineer | Teaching web development and React | Building in public | Join me on my coding journey! 👩‍💻",
        avatar: "/avatars/sarah.jpg",
        banner: "/banners/twitter-banner.jpg",
        location: "San Francisco, CA",
        website: "sarahcodes.dev"
      }
    });

    const [tweets] = useState([
      {
        id: "1",
        text: "🔥 Just launched my new React course! Early bird pricing available for the next 48 hours.\n\nLearn React from the ground up including:\n• Hooks\n• State Management\n• Performance Optimization\n• Testing\n\nLink in bio! 🚀",
        media: "/course-promo.jpg",
        stats: {
          retweets: "3.2K",
          likes: "15.7K",
          replies: "428",
          views: "102K"
        },
        posted: "2h ago"
      },
      {
        id: "2", 
        text: "💡 Pro Tip: When debugging React components, use the React DevTools extension.\n\nIt lets you:\n• Inspect component props\n• View state changes\n• Profile performance\n• Debug hooks\n\nA must-have for React developers!",
        stats: {
          retweets: "2.1K",
          likes: "9.3K", 
          replies: "156",
          views: "78K"
        },
        posted: "5h ago"
      },
      {
        id: "3",
        text: "Today's coding session:\n\n• Built a new authentication system\n• Added real-time updates\n• Fixed that pesky bug in production\n\nRemember: coding is a journey, not a race. Take breaks and celebrate small wins! 🎉",
        stats: {
          retweets: "1.8K",
          likes: "7.2K",
          replies: "203",
          views: "65K"
        },
        posted: "8h ago"
      }
    ]);

    return (
      <div className="space-y-8">
        {/* Profile Header */}
        <div className="bg-card rounded-lg overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-400 to-blue-600"></div>
          <div className="p-6">
            <div className="flex items-center gap-6">
              <img
                src={twitterData.profile.avatar}
                alt={twitterData.profile.name}
                className="w-20 h-20 rounded-full border-4 border-background -mt-12"
              />
              <div>
                <h2 className="text-2xl font-bold">{twitterData.profile.name}</h2>
                <p className="text-muted-foreground">{twitterData.profile.handle}</p>
              </div>
            </div>
            
            <p className="mt-4 text-muted-foreground">{twitterData.profile.bio}</p>
            
            <div className="flex gap-4 mt-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {twitterData.profile.location}
              </span>
              <span className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                {twitterData.profile.website}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 px-6 pb-6">
            <div className="bg-background p-4 rounded-md text-center">
              <p className="text-2xl font-bold">{twitterData.statistics.followers}</p>
              <p className="text-sm text-muted-foreground">Followers</p>
            </div>
            <div className="bg-background p-4 rounded-md text-center">
              <p className="text-2xl font-bold">{twitterData.statistics.following}</p>
              <p className="text-sm text-muted-foreground">Following</p>
            </div>
            <div className="bg-background p-4 rounded-md text-center">
              <p className="text-2xl font-bold">{twitterData.statistics.tweets}</p>
              <p className="text-sm text-muted-foreground">Tweets</p>
            </div>
          </div>
        </div>

        {/* Tweets List */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Recent Tweets</h3>
          <div className="space-y-4">
            {tweets.map((tweet) => (
              <div key={tweet.id} className="bg-card p-6 rounded-lg">
                <p className="whitespace-pre-line text-base">{tweet.text}</p>
                {tweet.media && (
                  <img src={tweet.media} alt="" className="mt-4 rounded-lg w-full" />
                )}
                <div className="flex gap-6 mt-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" /> {tweet.stats.replies}
                  </span>
                  <span className="flex items-center gap-1">
                    <ReplyIcon className="h-4 w-4" /> {tweet.stats.retweets}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-4 w-4" /> {tweet.stats.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" /> {tweet.stats.views}
                  </span>
                  <span className="ml-auto">{tweet.posted}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  
  const CourseView = () => {
    const [courses, setCourses] = useState<any[]>([]);
    const [isAdminView, setIsAdminView] = useState(false);

    useEffect(() => {
      const fetchCourses = async () => {
        try {
          const response = await fetch('/api/course', {
            credentials: 'include'
          });
          if (!response.ok) {
            throw new Error('Failed to fetch courses');
          }
          const data = await response.json();
          setCourses(data.courses);
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      };

      fetchCourses();
    }, []);

    return (
      <div className="space-y-6 pt-16">
        <div className="flex justify-end mb-4">
          <Button
            variant="outline"
            onClick={() => setIsAdminView(!isAdminView)}
          >
            {isAdminView ? (
              <>
                <Eye className="h-4 w-4 mr-2" />
                View Course
              </>
            ) : (
              <>
                <Pencil className="h-4 w-4 mr-2" />
                Edit Course
              </>
            )}
          </Button>
        </div>

        {isAdminView ? (
          <AdminCourseView courses={courses} />
        ) : (
          <MemberCourseView courses={courses} />
        )}
      </div>
    );
  };

  // Member facing view
  const MemberCourseView = ({ courses }: { courses: any[] }) => {
    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Course: Advanced JavaScript Concepts</CardTitle>
            <Badge variant="secondary">Progress: 45%</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Course Content Navigation */}
            <div className="md:col-span-1 flex flex-col h-full">
              <div className="font-semibold mb-4">Course Modules</div>
              <ScrollArea className="flex-grow pr-4">
                <div className="relative">
                  {/* Vertical line connecting modules */}
                  <div className="absolute left-[18px] top-6 bottom-6 w-0.5 bg-border" />
                  
                  {[
                    {
                      title: "Introduction to Advanced JS",
                      completed: true,
                      lessons: [
                        { name: "Course Overview", completed: true, current: false, url: "/lessons/course-overview" },
                        { name: "Setting Up Environment", completed: true, current: false, url: "/lessons/setup" }
                      ]
                    },
                    {
                      title: "Closures & Scope", 
                      completed: false,
                      current: true,
                      lessons: [
                        { name: "Understanding Closures", completed: true, current: false, url: "/lessons/closures" },
                        { name: "Lexical Scope", completed: false, current: true, url: "/lessons/lexical-scope" },
                        { name: "Practical Applications", completed: false, current: false, url: "/lessons/practical-closures" }
                      ]
                    },
                    {
                      title: "Prototypes & Inheritance",
                      completed: false,
                      lessons: [
                        { name: "Prototype Chain", completed: false, current: false, url: "/lessons/prototype-chain" },
                        { name: "Inheritance Patterns", completed: false, current: false, url: "/lessons/inheritance" }
                      ]
                    },
                    {
                      title: "Asynchronous JavaScript",
                      completed: false,
                      lessons: [
                        { name: "Promises Deep Dive", completed: false, current: false, url: "/lessons/promises" },
                        { name: "Async/Await Patterns", completed: false, current: false, url: "/lessons/async-await" },
                        { name: "Error Handling", completed: false, current: false, url: "/lessons/error-handling" }
                      ]
                    },
                    {
                      title: "Design Patterns",
                      completed: false,
                      lessons: [
                        { name: "Singleton Pattern", completed: false, current: false, url: "/lessons/singleton" },
                        { name: "Factory Pattern", completed: false, current: false, url: "/lessons/factory" },
                        { name: "Observer Pattern", completed: false, current: false, url: "/lessons/observer" },
                        { name: "Module Pattern", completed: false, current: false, url: "/lessons/module-pattern" }
                      ]
                    },
                    {
                      title: "Performance Optimization",
                      completed: false,
                      lessons: [
                        { name: "Memory Management", completed: false, current: false, url: "/lessons/memory" },
                        { name: "Code Splitting", completed: false, current: false, url: "/lessons/code-splitting" },
                        { name: "Lazy Loading", completed: false, current: false, url: "/lessons/lazy-loading" }
                      ]
                    }
                  ].map((module, i) => {
                    // Check if all lessons are completed
                    const isModuleCompleted = module.lessons.every(lesson => lesson.completed);
                    
                    const handleLessonClick = async (lessonUrl: string, moduleIndex: number, lessonIndex: number) => {
                      try {
                        // Mark the lesson as completed
                        const response = await fetch('/api/course/progress', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            moduleIndex,
                            lessonIndex,
                            completed: true
                          })
                        });

                        if (!response.ok) {
                          throw new Error('Failed to update lesson progress');
                        }

                        // Navigate to lesson content
                        window.location.href = lessonUrl;
                      } catch (error) {
                        console.error('Error updating lesson progress:', error);
                      }
                    };

                    return (
                    <div key={i} className="mb-6 relative">
                      <div className={`
                        border rounded-lg p-4
                        ${module.current ? 'border-primary bg-accent shadow-sm' : 'border-border'}
                      `}>
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`
                            w-5 h-5 rounded-full z-10 flex items-center justify-center
                            ${isModuleCompleted ? 'bg-primary' : module.current ? 'border-2 border-primary' : 'border-2 border-muted-foreground'}
                          `}>
                            {isModuleCompleted && <Check className="h-3 w-3 text-primary-foreground" />}
                          </div>
                          <span className="font-medium">{module.title}</span>
                        </div>
                        
                        <div className="space-y-2 ml-6 border-l-2 pl-4 border-border">
                          {module.lessons.map((lesson, j) => (
                            <button
                              key={j}
                              onClick={() => handleLessonClick(lesson.url, i, j)}
                              className={`
                                block w-full text-left flex items-center gap-2 p-2 rounded-md 
                                transition-all duration-200 ease-in-out
                                hover:bg-accent/50 hover:text-primary hover:-translate-y-0.5
                                hover:underline hover:decoration-primary hover:decoration-2
                                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                                ${lesson.current ? 'bg-accent/50 text-primary font-medium' : ''}
                                ${lesson.completed ? 'text-muted-foreground' : ''}
                              `}
                            >
                              <div className={`
                                w-3 h-3 rounded-full
                                ${lesson.completed ? 'bg-primary/60' : lesson.current ? 'border-2 border-primary' : 'border border-muted-foreground'}
                              `} />
                              <span className="text-sm">{lesson.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )})}
                </div>
              </ScrollArea>

              {/* Add New Module Section */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full mt-6">
                    + Add New Module
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Module</DialogTitle>
                    <DialogDescription>
                      Create a new module and add its submodules. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label htmlFor="module-name" className="text-sm font-medium">
                        Module Name
                      </label>
                      <input
                        id="module-name"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        placeholder="Enter module name"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">
                        Submodules
                      </label>
                      <div className="space-y-2">
                        <input
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          placeholder="Submodule 1"
                        />
                        <input
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          placeholder="Submodule 2"
                        />
                        <Button variant="outline" className="w-full">
                          + Add Another Submodule
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Module</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Content Area */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-4">Lexical Scope</h3>
                
                {/* Video Player */}
                <Card className="mb-6">
                  <CardContent className="p-4">
                    <div className="aspect-video bg-accent rounded-lg flex items-center justify-center">
                      <HeroVideoDialogDemoTopInBottomOut />
                    </div>
                  </CardContent>
                </Card>

                {/* Course Materials */}
                <Card className="mb-6">
                  <CardHeader className="text-center">
                    <Card className="p-4">
                      <div className="text-center">
                        <CardTitle className="text-base">Course Materials</CardTitle>
                      </div>
                    </Card>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <div className="space-y-4 w-full max-w-md">
                      <Card className="p-4">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            <span>Notes.pdf</span>
                          </div>
                          <Button variant="outline" size="sm">Download</Button>
                        </div>
                      </Card>
                      <Card className="p-4">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2">
                            <Link className="h-5 w-5" />
                            <span>Additional Resources</span>
                          </div>
                          <Button variant="outline" size="sm">Visit</Button>
                        </div>
                      </Card>
                    </div>
                  </CardContent>
                </Card>

                {/* Quiz */}
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle className="text-base">Knowledge Check</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <Card className="p-6">
                        <div className="space-y-4">
                          <Card className="p-4">
                            <div className="font-medium">Question 1</div>
                            <div className="text-sm mt-2">What is the main purpose of closures in JavaScript?</div>
                          </Card>
                          
                          <Card className="p-4">
                            <RadioGroup className="space-y-3">
                              <Card className="p-3 hover:bg-accent transition-colors">
                                <div className="flex items-center space-x-2">
                                  <RadioGroup value="a" id="a" />
                                  <Label htmlFor="a">Data privacy and encapsulation</Label>
                                </div>
                              </Card>
                              <Card className="p-3 hover:bg-accent transition-colors">
                                <div className="flex items-center space-x-2">
                                  <RadioGroup value="b" id="b" />
                                  <Label htmlFor="b">Memory optimization</Label>
                                </div>
                              </Card>
                              <Card className="p-3 hover:bg-accent transition-colors">
                                <div className="flex items-center space-x-2">
                                  <RadioGroup value="c" id="c" />
                                  <Label htmlFor="c">Code organization</Label>
                                </div>
                              </Card>
                            </RadioGroup>
                          </Card>

                          <Card className="p-4">
                            <div className="flex justify-between items-center gap-4">
                              <Input placeholder="feedback" className="max-w-xs" />
                              <Button>Submit Answer</Button>
                            </div>
                          </Card>
                        </div>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Admin editing view - contains the original implementation
  const AdminCourseView = ({ courses }: { courses: any[] }) => {
    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Course: Advanced JavaScript Concepts</CardTitle>
            <Badge variant="secondary">Progress: 45%</Badge>
          </div>
        </CardHeader>
        
        
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Course Content Navigation */}
            <div className="md:col-span-1 flex flex-col h-full">
              <div className="font-semibold mb-4">Course Modules</div>
              <ScrollArea className="flex-grow pr-4">
                <div className="relative">
                  {/* Vertical line connecting modules */}
                  <div className="absolute left-[18px] top-6 bottom-6 w-0.5 bg-border" />
                  
                  {[
                    {
                      title: "Introduction to Advanced JS",
                      completed: true,
                      lessons: [
                        { name: "Course Overview", completed: true, current: false, url: "/lessons/course-overview" },
                        { name: "Setting Up Environment", completed: true, current: false, url: "/lessons/setup" }
                      ]
                    },
                    {
                      title: "Closures & Scope", 
                      completed: false,
                      current: true,
                      lessons: [
                        { name: "Understanding Closures", completed: true, current: false, url: "/lessons/closures" },
                        { name: "Lexical Scope", completed: false, current: true, url: "/lessons/lexical-scope" },
                        { name: "Practical Applications", completed: false, current: false, url: "/lessons/practical-closures" }
                      ]
                    },
                    {
                      title: "Prototypes & Inheritance",
                      completed: false,
                      lessons: [
                        { name: "Prototype Chain", completed: false, current: false, url: "/lessons/prototype-chain" },
                        { name: "Inheritance Patterns", completed: false, current: false, url: "/lessons/inheritance" }
                      ]
                    },
                    {
                      title: "Asynchronous JavaScript",
                      completed: false,
                      lessons: [
                        { name: "Promises Deep Dive", completed: false, current: false, url: "/lessons/promises" },
                        { name: "Async/Await Patterns", completed: false, current: false, url: "/lessons/async-await" },
                        { name: "Error Handling", completed: false, current: false, url: "/lessons/error-handling" }
                      ]
                    },
                    {
                      title: "Design Patterns",
                      completed: false,
                      lessons: [
                        { name: "Singleton Pattern", completed: false, current: false, url: "/lessons/singleton" },
                        { name: "Factory Pattern", completed: false, current: false, url: "/lessons/factory" },
                        { name: "Observer Pattern", completed: false, current: false, url: "/lessons/observer" },
                        { name: "Module Pattern", completed: false, current: false, url: "/lessons/module-pattern" }
                      ]
                    },
                    {
                      title: "Performance Optimization",
                      completed: false,
                      lessons: [
                        { name: "Memory Management", completed: false, current: false, url: "/lessons/memory" },
                        { name: "Code Splitting", completed: false, current: false, url: "/lessons/code-splitting" },
                        { name: "Lazy Loading", completed: false, current: false, url: "/lessons/lazy-loading" }
                      ]
                    }
                  ].map((module, i) => {
                    // Check if all lessons are completed
                    const isModuleCompleted = module.lessons.every(lesson => lesson.completed);
                    
                    const handleLessonClick = async (lessonUrl: string, moduleIndex: number, lessonIndex: number) => {
                      try {
                        // Mark the lesson as completed
                        const response = await fetch('/api/course/progress', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            moduleIndex,
                            lessonIndex,
                            completed: true
                          })
                        });

                        if (!response.ok) {
                          throw new Error('Failed to update lesson progress');
                        }

                        // Navigate to lesson content
                        window.location.href = lessonUrl;
                      } catch (error) {
                        console.error('Error updating lesson progress:', error);
                      }
                    };

                    return (
                    <div key={i} className="mb-6 relative">
                      <div className={`
                        border rounded-lg p-4
                        ${module.current ? 'border-primary bg-accent shadow-sm' : 'border-border'}
                      `}>
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`
                            w-5 h-5 rounded-full z-10 flex items-center justify-center
                            ${isModuleCompleted ? 'bg-primary' : module.current ? 'border-2 border-primary' : 'border-2 border-muted-foreground'}
                          `}>
                            {isModuleCompleted && <Check className="h-3 w-3 text-primary-foreground" />}
                          </div>
                          <span className="font-medium">{module.title}</span>
                        </div>
                        
                        <div className="space-y-2 ml-6 border-l-2 pl-4 border-border">
                          {module.lessons.map((lesson, j) => (
                            <button
                              key={j}
                              onClick={() => handleLessonClick(lesson.url, i, j)}
                              className={`
                                block w-full text-left flex items-center gap-2 p-2 rounded-md 
                                transition-all duration-200 ease-in-out
                                hover:bg-accent/50 hover:text-primary hover:-translate-y-0.5
                                hover:underline hover:decoration-primary hover:decoration-2
                                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                                ${lesson.current ? 'bg-accent/50 text-primary font-medium' : ''}
                                ${lesson.completed ? 'text-muted-foreground' : ''}
                              `}
                            >
                              <div className={`
                                w-3 h-3 rounded-full
                                ${lesson.completed ? 'bg-primary/60' : lesson.current ? 'border-2 border-primary' : 'border border-muted-foreground'}
                              `} />
                              <span className="text-sm">{lesson.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )})}
                </div>
              </ScrollArea>

              {/* Add New Module Section */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full mt-6">
                    + Add New Module
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Module</DialogTitle>
                    <DialogDescription>
                      Create a new module and add its submodules. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label htmlFor="module-name" className="text-sm font-medium">
                        Module Name
                      </label>
                      <input
                        id="module-name"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        placeholder="Enter module name"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">
                        Submodules
                      </label>
                      <div className="space-y-2">
                        <input
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          placeholder="Submodule 1"
                        />
                        <input
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          placeholder="Submodule 2"
                        />
                        <Button variant="outline" className="w-full">
                          + Add Another Submodule
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Module</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Main Content Area */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-4">Lexical Scope</h3>
                
                {/* Video Player */}
                <Card className="mb-4">
                  <CardContent className="p-4">
                    <div className="aspect-video bg-accent rounded-lg flex items-center justify-center">
                    <HeroVideoDialogDemoTopInBottomOut />
                    </div>
                  </CardContent>
                </Card>

                {/* Content Upload Section */}
                <Card className="mb-4">
                  <CardHeader>
                    <CardTitle className="text-base">Course Materials</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Upload Video Content</label>
                          <div className="border-2 border-dashed rounded-lg p-4 text-center">
                            <input type="file" accept="video/*" className="hidden" id="video-upload" />
                            <label htmlFor="video-upload" className="cursor-pointer">
                              <Video className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">Click to upload video</span>
                            </label>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Upload Documents</label>
                          <div className="border-2 border-dashed rounded-lg p-4 text-center">
                            <input type="file" accept=".pdf,.doc,.docx" className="hidden" id="doc-upload" />
                            <label htmlFor="doc-upload" className="cursor-pointer">
                              <BookOpen className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">Click to upload documents</span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">External Resources</label>
                        <input 
                          type="url" 
                          placeholder="Enter Google Drive or external link"
                          className="w-full rounded-md border border-input px-3 py-2"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quiz Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Knowledge Check</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Question</label>
                          <input
                            type="text"
                            placeholder="Enter your question"
                            className="w-full rounded-md border border-input px-3 py-2"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Answer Type</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select answer type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="radio">Single Choice (Radio)</SelectItem>
                              <SelectItem value="checkbox">Multiple Choice (Checkbox)</SelectItem>
                              <SelectItem value="short">Short Text</SelectItem>
                              <SelectItem value="long">Long Text</SelectItem>
                              <SelectItem value="truefalse">True/False</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-4">
                          <label className="block text-sm font-medium">Answer Options</label>
                          
                          <div className="space-y-3">
                            {/* Dynamic answer options based on type */}
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                placeholder="Enter answer option"
                                className="flex-1 rounded-md border border-input px-3 py-2"
                              />
                              <div className="flex items-center gap-2">
                                <input 
                                  type="checkbox"
                                  id="correct-1"
                                  className="h-4 w-4 rounded border-gray-300"
                                />
                                <label htmlFor="correct-1" className="text-sm">
                                  Correct
                                </label>
                              </div>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <Button 
                            variant="outline" 
                            size="sm"
                            className="w-full"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Answer Option
                          </Button>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium">Feedback</label>
                          <textarea
                            placeholder="Enter feedback for correct/incorrect answers"
                            className="w-full rounded-md border border-input px-3 py-2 min-h-[80px]"
                          />
                        </div>

                        <div className="flex gap-2">
                          <Button className="flex-1">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Question
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline">
                                <Eye className="h-4 w-4 mr-2" />
                                Preview Quiz
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                              <DialogHeader>
                                <DialogTitle>Quiz Preview</DialogTitle>
                                <DialogDescription>
                                  This is how students will see the quiz
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-6 py-4">
                                <Card>
                                  <CardHeader>
                                    <CardTitle>Knowledge Check Quiz</CardTitle>
                                    <CardDescription>Test your understanding of the concepts covered</CardDescription>
                                  </CardHeader>
                                  <CardContent className="space-y-4">
                                    <div className="space-y-4">
                                      <div className="font-medium">Question 1</div>
                                      <div className="text-sm">What is the main purpose of closures in JavaScript?</div>
                                      <RadioGroup className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                          <RadioGroup value="a" id="a" />
                                          <Label htmlFor="a">Data privacy and encapsulation</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <RadioGroup value="b" id="b" />
                                          <Label htmlFor="b">Memory optimization</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <RadioGroup value="c" id="c" />
                                          <Label htmlFor="c">Code organization</Label>
                                        </div>
                                      </RadioGroup>
                                    </div>
                                  </CardContent>
                                  <CardFooter>
                                    <Button className="w-full">Submit Answer</Button>
                                  </CardFooter>
                                </Card>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-medium">Questions</h3>
                          <Button variant="outline" size="sm">
                            <Settings2 className="h-4 w-4 mr-2" />
                            Quiz Settings
                          </Button>
                        </div>

                        <div className="space-y-4">
                          {/* Question list/preview */}
                          <div className="border rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div className="font-medium">Question 1</div>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="icon">
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              Multiple Choice • 4 Options
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </CardContent>

      </Card>
    );
  };


  const ConnectView = () => {
    const [selectedMember, setSelectedMember] = useState<CommunityMember | null>(null);
    const [showProfileDialog, setShowProfileDialog] = useState(false);

    type CommunityMember = {
      email: any;
      id: number;
      name: string;
      role: string;
      type: 'mentor' | 'member';
      company?: string;
      expertise: string[];
      bio: string;
      yearsOfExperience: number;
      interests: string[];
      socials: {
        linkedin?: string;
        twitter?: string;
        github?: string;
        website?: string;
      };
      achievements: string[];
      availability?: string[];
      languages?: string[];
      location?: string;
      timezone?: string;
      rating?: number;
      reviews?: {
        author: string;
        text: string;
        rating: number;
      }[];
    };

    const communityMembers: CommunityMember[] = [
      {
        id: 2,
        name: "Alex Rivera",
        role: "Frontend Developer",
        type: "member",
        company: "Startup XYZ",
        expertise: ["React", "TypeScript", "UI/UX"],
        bio: "Passionate about creating beautiful and accessible web experiences. Always eager to learn and share knowledge.",
        yearsOfExperience: 3,
        interests: ["Web Accessibility", "Design Systems", "JavaScript"],
        socials: {
          github: "github.com/arivera",
          twitter: "@arivera_dev"
        },
        achievements: [
          "Created popular React component library",
          "Regular speaker at local tech meetups"
        ],
        location: "Austin, TX",
        timezone: "CST",
        email: undefined
      },
      {
        id: 3,
        name: "Emily Chen",
        role: "Machine Learning Engineer",
        type: "mentor",
        company: "Tesla",
        expertise: ["AI/ML", "Python", "Data Science"],
        bio: "Working on cutting-edge ML applications. Love to mentor aspiring data scientists and ML engineers.",
        yearsOfExperience: 8,
        interests: ["AI Ethics", "Neural Networks", "Computer Vision"],
        socials: {
          linkedin: "linkedin.com/in/emilychen",
          github: "github.com/echen"
        },
        achievements: [
          "Published ML research papers",
          "Built autonomous systems used in production"
        ],
        availability: ["Tue 10-6 EST", "Thu 1-5 EST"],
        languages: ["English", "Mandarin"],
        location: "Boston, MA",
        timezone: "EST",
        rating: 4.8,
        email: undefined
      },
      {
        id: 4,
        name: "Marcus Johnson",
        role: "DevOps Engineer",
        type: "mentor",
        company: "Amazon",
        expertise: ["Kubernetes", "AWS", "CI/CD", "Docker"],
        bio: "Specializing in cloud infrastructure and DevOps practices. Love helping teams improve their deployment processes.",
        yearsOfExperience: 10,
        interests: ["Infrastructure as Code", "Site Reliability", "Automation"],
        socials: {
          linkedin: "linkedin.com/in/marcusj",
          github: "github.com/mjohnson"
        },
        achievements: [
          "AWS Certified Solutions Architect",
          "Kubernetes Certified Administrator",
          "Built scalable infrastructure for unicorn startups"
        ],
        availability: ["Mon-Thu 6-9pm GMT"],
        languages: ["English"],
        location: "London, UK",
        timezone: "GMT",
        rating: 4.7,
        email: undefined
      }
    ];

    return (
      <div className="max-w-7xl mx-auto space-y-6 pt-10">
        <Card>
          <CardHeader>
            <Card className="p-4">
              <div className="flex flex-col items-center justify-center text-center">
                <CardTitle>Community Members</CardTitle>
                <CardDescription>Connect with mentors and fellow developers in our community</CardDescription>
              </div>
            </Card>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communityMembers.map((member) => (
                <Card key={member.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="text-xl">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-lg">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                        {member.company && (
                          <p className="text-sm text-muted-foreground">at {member.company}</p>
                        )}
                        <div className="flex gap-2 items-center">
                          <Badge variant={member.type === 'mentor' ? 'default' : 'secondary'}>
                            {member.type === 'mentor' ? 'Mentor' : 'Member'}
                          </Badge>
                          {member.rating && (
                            <Badge variant="outline">
                              ⭐ {member.rating}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 h-[80px]">
                      <h4 className="font-medium mb-2">Expertise</h4>
                      <div className="flex flex-wrap gap-2 h-[48px] overflow-hidden">
                        {member.expertise.slice(0, 3).map((skill, i) => (
                          <Badge key={i} variant="outline">{skill}</Badge>
                        ))}
                      </div>
                    </div>

                    {member.location && (
                      <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{member.location}</span>
                      </div>
                    )}

                    <Button 
                      className="w-full mt-4" 
                      onClick={() => {
                        setSelectedMember(member);
                        setShowProfileDialog(true);
                      }}
                    >
                      View Profile
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
          <DialogContent className="w-[95vw] max-w-7xl">
            <DialogHeader className="p-6 border-b">
              <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                {selectedMember?.name}
                {selectedMember?.type === 'mentor' && (
                  <Badge variant="secondary">Mentor</Badge>
                )}
              </DialogTitle>
              <DialogDescription className="text-lg flex items-center gap-2">
                <span>{selectedMember?.role}</span>
                {selectedMember?.company && (
                  <>
                    <span>•</span>
                    <span>{selectedMember.company}</span>
                  </>
                )}
                {selectedMember?.location && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {selectedMember.location}
                    </span>
                  </>
                )}
              </DialogDescription>
            </DialogHeader>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* About Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      About
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">{selectedMember?.bio}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {selectedMember?.yearsOfExperience} years experience
                      </div>
                      {selectedMember?.timezone && (
                        <div className="flex items-center gap-1">
                          <Globe className="h-4 w-4" />
                          {selectedMember.timezone}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Skills & Expertise Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wrench className="h-5 w-5" />
                      Skills & Expertise
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {selectedMember?.expertise.map((skill, i) => (
                        <Badge key={i} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                    {selectedMember?.languages && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Languages</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedMember.languages.map((language, i) => (
                            <Badge key={i} variant="outline">{language}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Objectives & Goals Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Objectives & Goals
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {selectedMember?.interests.map((interest, i) => (
                        <Badge key={i} variant="secondary">{interest}</Badge>
                      ))}
                    </div>
                    {selectedMember?.achievements && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Key Achievements</h4>
                        {selectedMember.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <Trophy className="h-4 w-4 text-yellow-500" />
                            <span>{achievement}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-6 flex justify-end gap-4">
                <Menubar className="border-none bg-transparent p-0">
                  <MenubarMenu>
                    <MenubarTrigger className="flex cursor-default select-none items-center rounded-sm px-3 py-2 text-sm font-medium outline-none focus:bg-neutral-100 focus:text-neutral-900 data-[state=open]:bg-neutral-100 data-[state=open]:text-neutral-900 dark:focus:bg-neutral-800 dark:focus:text-neutral-50 dark:data-[state=open]:bg-neutral-800 dark:data-[state=open]:text-neutral-50">
                      Actions
                    </MenubarTrigger>
                    <MenubarContent className="min-w-[12rem] overflow-hidden rounded-md border border-neutral-200 bg-white p-1 text-neutral-950 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50">
                      {Object.entries(selectedMember?.socials || {}).map(([platform, url]) => (
                        url && (
                          <MenubarItem 
                            key={platform} 
                            className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-neutral-800 dark:focus:text-neutral-50"
                            onClick={() => window.open(url, '_blank')}
                          >
                            <div className="flex items-center gap-2">
                              {platform === 'github' && <Github className="h-4 w-4" />}
                              {platform === 'twitter' && <Twitter className="h-4 w-4" />}
                              {platform === 'linkedin' && <Linkedin className="h-4 w-4" />}
                              {platform === 'website' && <Globe className="h-4 w-4" />}
                              {platform.charAt(0).toUpperCase() + platform.slice(1)}
                            </div>
                          </MenubarItem>
                        )
                      ))}
                      <MenubarSeparator className="-mx-1 my-1 h-px bg-neutral-100 dark:bg-neutral-800"/>
                      <MenubarSub>
                        <MenubarSubTrigger>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Contact Options
                        </MenubarSubTrigger>
                        <MenubarSubContent>
                          <MenubarItem 
                            onClick={() => {
                              // Handle direct message
                              if (selectedMember) {
                                toast({
                                  title: "Message Started",
                                  description: `Starting chat with ${selectedMember.name}`,
                                  duration: 3000,
                                })
                              }
                            }}
                          >
                            Direct Message
                          </MenubarItem>
                          <MenubarItem
                            onClick={() => {
                              // Handle email
                              if (selectedMember?.email) {
                                window.location.href = `mailto:${selectedMember.email}`
                              }
                            }}
                          >
                            Send Email
                          </MenubarItem>
                        </MenubarSubContent>
                      </MenubarSub>
                      <MenubarSub>
                        <MenubarSubTrigger>
                          <UserPlus className="h-4 w-4 mr-2" />
                          Mentorship
                        </MenubarSubTrigger>
                        <MenubarSubContent>
                          <MenubarItem 
                            onClick={() => {
                              if (selectedMember) {
                                toast({
                                  title: "Mentorship Request Sent",
                                  description: `Your request has been sent to ${selectedMember.name}`,
                                  duration: 3000,
                                })
                              }
                            }}
                          >
                            Request Mentorship
                          </MenubarItem>
                          <MenubarItem
                            onClick={() => {
                              if (selectedMember) {
                                toast({
                                  title: "Schedule Meeting",
                                  description: "Opening calendar to schedule a meeting",
                                  duration: 3000,
                                })
                              }
                            }}
                          >
                            Schedule Meeting
                          </MenubarItem>
                        </MenubarSubContent>
                      </MenubarSub>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  
  const SpacesView = () => {
    const [selectedChannel, setSelectedChannel] = useState('general');
    const [isCallActive, setIsCallActive] = useState(false);
    const [localStreamRef, setLocalStreamRef] = useState<MediaStream | null>(null);
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [showVideoDialog, setShowVideoDialog] = useState(false);
    const [messages, setMessages] = useState<any[]>([
      {
        id: 1,
        user: "Sarah Johnson",
        message: "Hey everyone! Who's working on the new React project?",
        timestamp: "10:30 AM"
      },
      {
        id: 2,
        user: "Mike Chen",
        message: "I am! Having some issues with hooks though.",
        timestamp: "10:32 AM"
      }
    ]);

    const [channels, setChannels] = useState([
      { id: 'general', name: 'General' },
      { id: 'study-room', name: 'Study Room' },
      { id: 'coding-help', name: 'Coding Help' },
      { id: 'career-advice', name: 'Career Advice' }
    ]);

    const [timeline, setTimeline] = useState([
      { time: '9:00 AM', event: 'Daily Standup' },
      { time: '11:00 AM', event: 'Code Review' },
      { time: '2:00 PM', event: 'Mentorship Session' },
      { time: '4:00 PM', event: 'Team Meeting' }
    ]);

    const startCall = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        setLocalStreamRef(stream);
        setIsCallActive(true);
        setShowVideoDialog(true);
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    const stopCall = () => {
      if (localStreamRef) {
        localStreamRef.getTracks().forEach(track => track.stop());
        setLocalStreamRef(null);
      }
      setIsCallActive(false);
      setShowVideoDialog(false);
      setIsScreenSharing(false);
    };

    const toggleScreenShare = async () => {
      try {
        if (!isScreenSharing) {
          const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
          setLocalStreamRef(screenStream);
          setIsScreenSharing(true);
        } else {
          const videoStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          setLocalStreamRef(videoStream);
          setIsScreenSharing(false);
        }
      } catch (error) {
        console.error('Error toggling screen share:', error);
      }
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        // Handle file upload logic here
        console.log('File selected:', file);
      }
    };

    return (
      <div className="h-[calc(100vh-4rem)] pt-10">
        <Card className="h-full">
          <div className="flex h-full">
            <div className="w-72 border-r p-4 flex flex-col gap-4">
              <Select
                value={selectedChannel}
                onValueChange={setSelectedChannel}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select channel" />
                </SelectTrigger>
                <SelectContent>
                  {channels.map(channel => (
                    <SelectItem key={channel.id} value={channel.id}>
                      <div className="flex items-center gap-2">
                        <Hash className="h-4 w-4" />
                        {channel.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    View Highlights
                    <Star className="h-4 w-4 ml-2" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[90vw] max-w-[500px] h-[90vh] max-h-[800px] p-0">
                  <DialogHeader className="absolute top-0 left-0 right-0 z-10 bg-black/50 p-4">
                    <DialogTitle className="text-white">Channel Highlights</DialogTitle>
                  </DialogHeader>
                  <div className="w-full h-full relative overflow-hidden bg-black">
                    <div 
                      className="absolute inset-0 overflow-y-auto snap-y snap-mandatory"
                      style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        '::-webkit-scrollbar': {
                          display: 'none'
                        }
                      }}
                    >
                      {[
                        {
                          type: 'video' as const,
                          url: '/sample-video.mp4',
                          description: 'Weekly Mentorship Session Highlights',
                          likes: 245,
                          comments: 12
                        },
                        {
                          type: 'image' as const,
                          url: '/project-showcase.jpg',
                          description: 'Student Project Showcase',
                          likes: 189,
                          comments: 8
                        },
                        {
                          type: 'text' as const,
                          description: 'Key learning outcomes from this week\'s sessions',
                          likes: 156,
                          comments: 5
                        }
                      ].map((content, index) => (
                          <div 
                            key={index} 
                            className="w-full h-full snap-start relative bg-gradient-to-br from-gray-900 to-black"
                          >
                            <div className="absolute inset-0 flex items-center justify-center">
                              {content.type === 'video' ? (
                                <video 
                                  src={content.url}
                                  className="w-full h-full object-cover"
                                  controls
                                  loop
                                  autoPlay
                                  muted
                                />
                              ) : content.type === 'image' ? (
                                <img
                                  src={content.url} 
                                  alt={content.description}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-purple-600 to-blue-600 p-8">
                                  <p className="text-2xl text-white text-center">{content.description}</p>
                                </div>
                              )}
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                              <p className="text-white text-xl font-medium mb-3">{content.description}</p>
                              <div className="flex gap-6">
                                <button className="flex items-center gap-2 text-white hover:text-pink-500 transition-colors">
                                  <Heart className="h-6 w-6" />
                                  {content.likes}
                                </button>
                                <button className="flex items-center gap-2 text-white hover:text-blue-500 transition-colors">
                                  <MessageCircle className="h-6 w-6" />
                                  {content.comments}
                                </button>
                                <button className="flex items-center gap-2 text-white hover:text-green-500 transition-colors ml-auto">
                                  <Share className="h-6 w-6" />
                                </button>
                              </div>
                            </div>
                          </div>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <div className="mt-6 flex-1 overflow-y-auto">
                <h3 className="font-semibold mb-4">Today's Timeline</h3>
                <div className="space-y-4">
                  {timeline.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-20 text-sm text-muted-foreground">
                        {item.time}
                      </div>
                      <div className="flex-1 text-sm bg-muted p-2 rounded-md">
                        {item.event}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {!isCallActive ? (
                <Button onClick={startCall} variant="outline" className="w-full">
                  <Video className="h-4 w-4 mr-2" />
                  Join Voice
                </Button>
              ) : (
                <Button onClick={stopCall} variant="destructive" className="w-full">
                  <PhoneOff className="h-4 w-4 mr-2" />
                  Leave Call
                </Button>
              )}
            </div>

            <div className="flex-1 flex flex-col h-full">
              <Card className="flex-1 flex flex-col h-full">
                <CardHeader className="pb-2">
                  <CardTitle>{selectedChannel || "Chat"}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-4 overflow-hidden">
                  <Card className="h-full flex flex-col">
                    <CardContent className="flex-1 space-y-4 p-4 overflow-y-auto">
                      {messages.map((msg) => (
                        <div key={msg.id} className="flex gap-3 items-start">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{msg.user[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{msg.user}</p>
                              <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                            </div>
                            <p className="text-sm">{msg.message}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </CardContent>

                <CardFooter className="p-4 border-t mt-auto">
                  <div className="flex gap-2 w-full">
                    <div className="flex-1 relative">
                      <Input placeholder="Type a message..." />
                      <label htmlFor="file-upload" className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                        <Paperclip className="h-4 w-4 text-muted-foreground" />
                        <input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          onChange={handleFileUpload}
                        />
                      </label>
                    </div>
                    <Button>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </Card>

        <Dialog open={showVideoDialog} onOpenChange={setShowVideoDialog}>
          <DialogContent className="max-w-4xl">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {localStreamRef && (
                  <div className="relative">
                    <video
                      ref={(video) => {
                        if (video) video.srcObject = localStreamRef;
                      }}
                      autoPlay
                      muted
                      className="w-full rounded-lg"
                    />
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      <Button
                        size="sm"
                        variant={isAudioEnabled ? "default" : "destructive"}
                        onClick={() => {
                          if (localStreamRef) {
                            localStreamRef.getAudioTracks().forEach(track => {
                              track.enabled = !isAudioEnabled;
                            });
                            setIsAudioEnabled(!isAudioEnabled);
                          }
                        }}
                      >
                        {isAudioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                      </Button>
                      
                      <Button
                        size="sm"
                        variant={isVideoEnabled ? "default" : "destructive"}
                        onClick={() => {
                          if (localStreamRef) {
                            localStreamRef.getVideoTracks().forEach(track => {
                              track.enabled = !isVideoEnabled;
                            });
                            setIsVideoEnabled(!isVideoEnabled);
                          }
                        }}
                      >
                        {isVideoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                      </Button>

                      <Button
                        size="sm"
                        variant={isScreenSharing ? "destructive" : "default"}
                        onClick={async () => {
                          try {
                            if (!isScreenSharing) {
                              const screenStream = await navigator.mediaDevices.getDisplayMedia({
                                video: true
                              });
                              const videoTrack = screenStream.getVideoTracks()[0];
                              videoTrack.onended = () => {
                                setIsScreenSharing(false);
                                if (localStreamRef) {
                                  const originalVideoTrack = localStreamRef.getVideoTracks()[0];
                                  if (originalVideoTrack) originalVideoTrack.enabled = true;
                                }
                              };
                              setIsScreenSharing(true);
                              if (localStreamRef) {
                                const originalVideoTrack = localStreamRef.getVideoTracks()[0];
                                if (originalVideoTrack) originalVideoTrack.enabled = false;
                                localStreamRef.addTrack(videoTrack);
                              }
                            } else {
                              const screenTrack = localStreamRef?.getVideoTracks().find(track => track.label.includes('screen'));
                              if (screenTrack) {
                                screenTrack.stop();
                                localStreamRef?.removeTrack(screenTrack);
                              }
                              if (localStreamRef) {
                                const originalVideoTrack = localStreamRef.getVideoTracks()[0];
                                if (originalVideoTrack) originalVideoTrack.enabled = true;
                              }
                              setIsScreenSharing(false);
                            }
                          } catch (error) {
                            console.error('Error sharing screen:', error);
                          }
                        }}
                      >
                        {isScreenSharing ? <MonitorOff className="h-4 w-4" /> : <MonitorPlay className="h-4 w-4" />}
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          if (localStreamRef) {
                            localStreamRef.getTracks().forEach(track => track.stop());
                            setLocalStreamRef(null);
                          }
                          setIsCallActive(false);
                          setShowVideoDialog(false);
                          setIsAudioEnabled(true);
                          setIsVideoEnabled(true);
                          setIsScreenSharing(false);
                        }}
                      >
                        <PhoneOff className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:block w-64 border-r">
        <Sidebar />
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild className="md:hidden p-4">
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>

      <div className="flex-1 p-6">
        {currentView === 'dashboard' && <DashboardView />}
        {currentView === 'spaces' && <SpacesView />}
        {currentView === 'schedule' && <ScheduleView />}
        {currentView === 'resources' && <ResourcesView/>}
        {currentView === 'course' && <CourseView/>}
        {currentView === 'connect' && <ConnectView/>}
        {currentView === 'youtube' && <YoutubeView/>}
        {currentView === 'tiktok' && <TikTokView/>}
        {currentView === 'twitter' && <TwitterView/>}
      </div>
    </div>
  );
}
