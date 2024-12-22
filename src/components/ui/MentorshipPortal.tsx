
'use client';

import React from 'react';
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
import { Calendar } from "@/components/ui/calendar";
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
  ChevronRight
} from "lucide-react";
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, Label, DropdownMenuSeparator, RadioGroup } from '@radix-ui/react-dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import { toast } from '@/hooks/use-toast';
import { Textarea } from './textarea';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from './menubar';
import ScheduleView from '@/components/ui/calendar';


const DashboardView = () => {
  const [todos, setTodos] = useState([
    { id: 1, title: "Complete React Tutorial", description: "Finish chapters 4-6", dueDate: "2024-02-01", priority: "High" },
    { id: 2, title: "Review Pull Request", description: "Review team's code changes", dueDate: "2024-02-03", priority: "Medium" }
  ]);

  const [inProgress, setInProgress] = useState([
    { id: 3, title: "Build Portfolio Project", description: "Working on the frontend", dueDate: "2024-02-05", priority: "High" }
  ]);

  const [completed, setCompleted] = useState([
    { id: 4, title: "Setup Development Environment", description: "Install necessary tools", dueDate: "2024-01-30", priority: "Low" }
  ]);

  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [newTask, setNewTask] = useState({ title: "", description: "", dueDate: "", priority: "Medium" });

  const addNewTask = () => {
    const task = {
      id: Date.now(),
      ...newTask
    };
    
    switch(selectedColumn) {
      case 'todo':
        setTodos([...todos, task]);
        break;
      case 'inProgress':
        setInProgress([...inProgress, task]);
        break;
      case 'completed':
        setCompleted([...completed, task]);
        break;
    }
    
    setNewTask({ title: "", description: "", dueDate: "", priority: "Medium" });
    setShowNewTaskDialog(false);
  };

  const moveTask = (taskId: number, from: any[], setFrom: Function, to: any[], setTo: Function) => {
    const taskIndex = from.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      const task = from[taskIndex];
      setFrom(from.filter(t => t.id !== taskId));
      setTo([...to, task]);
    }
  };

  const TaskColumn = ({ title, tasks, onMoveLeft, onMoveRight, leftLabel, rightLabel, columnType }: any) => (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{title}</span>
          <Badge variant="secondary">{tasks.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 relative">
        {tasks.map((task: any) => (
          <Card key={task.id} className="p-4 space-y-2">
            <div className="flex justify-between items-start">
              <h4 className="font-semibold">{task.title}</h4>
              <Badge>{task.priority}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{task.description}</p>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Due: {task.dueDate}</span>
              <div className="flex gap-2">
                {onMoveLeft && (
                  <Button size="sm" variant="ghost" onClick={() => onMoveLeft(task.id)}>
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">{leftLabel}</span>
                  </Button>
                )}
                {onMoveRight && (
                  <Button size="sm" variant="ghost" onClick={() => onMoveRight(task.id)}>
                    <ArrowRight className="h-4 w-4" />
                    <span className="sr-only">{rightLabel}</span>
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
        
        <Button 
          variant="ghost" 
          className="w-full mt-4 border-2 border-dashed"
          onClick={() => {
            setSelectedColumn(columnType);
            setShowNewTaskDialog(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Card
        </Button>
      </CardContent>
    </Card>
  );

  const [showMailboxDialog, setShowMailboxDialog] = useState(false);
  const [emails] = useState([
    { id: 1, subject: "Project Update", from: "team@company.com", date: "2024-02-01", content: "Latest project updates..." },
    { id: 2, subject: "Meeting Notes", from: "manager@company.com", date: "2024-02-02", content: "Notes from today's meeting..." }
  ]);

  return (
    <div className="space-y-6 pt-12">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <Button onClick={() => setShowMailboxDialog(true)}>
          <Mail className="h-4 w-4 mr-1" />
          Mailbox
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TaskColumn
          title="To Do"
          tasks={todos}
          onMoveRight={(id: number) => moveTask(id, todos, setTodos, inProgress, setInProgress)}
          rightLabel="Move to In Progress"
          columnType="todo"
        />
        <TaskColumn
          title="In Progress"
          tasks={inProgress}
          onMoveLeft={(id: number) => moveTask(id, inProgress, setInProgress, todos, setTodos)}
          onMoveRight={(id: number) => moveTask(id, inProgress, setInProgress, completed, setCompleted)}
          leftLabel="Move to Todo"
          rightLabel="Move to Completed"
          columnType="inProgress"
        />
        <TaskColumn
          title="Completed"
          tasks={completed}
          onMoveLeft={(id: number) => moveTask(id, completed, setCompleted, inProgress, setInProgress)}
          leftLabel="Move to In Progress"
          columnType="completed"
        />
      </div>

      <Dialog open={showNewTaskDialog} onOpenChange={setShowNewTaskDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select onValueChange={(value) => setNewTask({...newTask, priority: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={addNewTask}>Add Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showMailboxDialog} onOpenChange={setShowMailboxDialog}>
        {(() => {
          const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
          
          return (
            <DialogContent className="max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {selectedEmailId ? (
                    <Button 
                      variant="ghost" 
                      className="p-0 hover:bg-transparent" 
                      onClick={() => setSelectedEmailId(null)}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Inbox
                    </Button>
                  ) : 
                    "Mailbox"
                  }
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {!selectedEmailId ? (
                  // Inbox View
                  emails.map(email => (
                    <Card 
                      key={email.id} 
                      className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => setSelectedEmailId(email.id)}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold">{email.subject}</h4>
                        <span className="text-sm text-muted-foreground">{email.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">From: {email.from}</p>
                      <p className="text-sm mt-2 line-clamp-2">{email.content}</p>
                    </Card>
                  ))
                ) : (
                  // Email Detail View
                  (() => {
                    const email = emails.find(e => e.id === selectedEmailId);
                    if (!email) return null;
                    return (
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold">{email.subject}</h3>
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>From: {email.from}</span>
                            <span>{email.date}</span>
                          </div>
                        </div>
                        <Separator />
                        <div className="prose dark:prose-invert max-w-none">
                          {email.content}
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="outline" 
                            onClick={() => {
                              // Handle reply logic
                              toast({
                                title: "Reply sent",
                                description: "Your reply has been sent successfully"
                              });
                            }}
                          >
                            <ReplyIcon className="h-4 w-4 mr-2" />
                            Reply
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => {
                              // Handle forward logic
                              toast({
                                title: "Email forwarded",
                                description: "The email has been forwarded"
                              });
                            }}
                          >
                            <Forward className="h-4 w-4 mr-2" />
                            Forward
                          </Button>
                        </div>
                      </div>
                    );
                  })()
                )}
              </div>
            </DialogContent>
          );
        })()}
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
                <h3 className="font-semibold mb-4">Your Learning Path</h3>
                <div className="space-y-4">
                  {[
                    {
                      milestone: "Frontend Fundamentals",
                      status: "Completed",
                      tasks: ["HTML/CSS Basics", "JavaScript Fundamentals", "React Basics"],
                      resources: [
                        { name: "HTML Guide", type: "PDF" },
                        { name: "CSS Examples", type: "Code" }
                      ]
                    },
                    {
                      milestone: "Advanced Frontend",
                      status: "In Progress",
                      tasks: ["State Management", "Performance Optimization", "Testing"],
                      resources: [
                        { name: "Redux Tutorial", type: "Video" },
                        { name: "Testing Guide", type: "Document" }
                      ]
                    },
                    {
                      milestone: "Backend Integration",
                      status: "Upcoming",
                      tasks: ["API Design", "Database Fundamentals", "Authentication"],
                      resources: [
                        { name: "API Best Practices", type: "PDF" },
                        { name: "Database Schemas", type: "Document" }
                      ]
                    }
                  ].map((milestone, i) => (
                    <Card key={i}>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium">{milestone.milestone}</h4>
                            <Badge variant={
                              milestone.status === "Completed" ? "default" :
                              milestone.status === "In Progress" ? "secondary" : "outline"
                            }>
                              {milestone.status}
                            </Badge>
                          </div>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {milestone.tasks.map((task, j) => (
                              <li key={j} className="flex items-center">
                                <div className="w-2 h-2 rounded-full bg-primary mr-2" />
                                {task}
                              </li>
                            ))}
                          </ul>
                          <div className="pt-2">
                            <p className="text-sm font-medium mb-1">Resources:</p>
                            <div className="flex gap-2">
                              {milestone.resources.map((resource, k) => (
                                <Badge key={k} variant="outline">
                                  {resource.name}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
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

  const CourseView = () => {
    const [courses, setCourses] = useState<any[]>([]);

    useEffect(() => {
      const fetchCourses = async () => {
        try {
          const response = await fetch('/api/course',
            {credentials: 'include'
            }
          );
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
    <div className="space-y-6 pt-10">
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
    </div>
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
        id: 1,
        name: "Dr. Sarah Wilson",
        role: "Senior Software Engineer",
        type: "mentor",
        company: "Google",
        expertise: ["Web Development", "System Design", "Cloud Architecture"],
        bio: "15+ years of experience in software development and mentoring. Passionate about helping others grow in their tech careers.",
        yearsOfExperience: 15,
        interests: ["Teaching", "Open Source", "Cloud Computing"],
        socials: {
          linkedin: "linkedin.com/in/sarahwilson",
          twitter: "@sarahwilsontech",
          github: "github.com/sarahwilson",
          website: "sarahwilson.dev"
        },
        achievements: [
          "Led 200+ successful mentorship sessions",
          "Published author on system design",
          "Google Developer Expert"
        ],
        availability: ["Mon 9-5 PST", "Wed 1-6 PST", "Fri 9-3 PST"],
        languages: ["English", "Spanish"],
        location: "San Francisco, CA",
        timezone: "PST",
        rating: 4.9,
        reviews: [
          {
            author: "John Doe",
            text: "Amazing mentor! Helped me land my dream job.",
            rating: 5
          }
        ],
        email: undefined
      },
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
            <CardTitle>Community Members</CardTitle>
            <CardDescription>Connect with mentors and fellow developers in our community</CardDescription>
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

                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Expertise</h4>
                      <div className="flex flex-wrap gap-2">
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
      </div>
    </div>
  );
}
