
'use client';

import { SetStateAction, useEffect, useRef, useState } from 'react';
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
  Globe
} from "lucide-react";
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, Label, DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import { toast } from '@/hooks/use-toast';
import { Form, useForm } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Textarea } from './textarea';
import { cn } from '@/lib/utils';
import { format } from 'path';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from './menubar';


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

export default function MentorshipPortal() {

  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [date, setDate] = useState<Date | undefined>(new Date());

  const Sidebar = () => {
    const [showProfileDialog, setShowProfileDialog] = useState(false);
    const [profileData, setProfileData] = useState({
      username: auth.currentUser?.email || "johndoe@example.com",
      bio: "",
      niche: "", 
      mrr: "",
      goal: ""
    });
    const { theme, setTheme } = useTheme();

    return (
      <div className="mt-16 fixed top-0 left-0 bottom-0 w-64"> {/* Fixed position with full height */}
        <div className="h-full flex flex-col p-4 border-r bg-background"> {/* Added bg-background to ensure content isn't see-through */}
          {/* <div className="font-bold text-xl mb-6">Mentorship Portal</div> */}
          
          <div className="flex flex-col gap-3 flex-1">
            <Button variant="ghost" className="justify-start w-full" onClick={() => setCurrentView('dashboard')}>
              <Hash className="mr-2 h-4 w-4" />
              Spaces
            </Button>
            <Button variant="ghost" className="justify-start w-full" onClick={() => setCurrentView('mentor')}>
              <Users className="mr-2 h-4 w-4" />
              Connect
            </Button>
            <Button variant="ghost" className="justify-start w-full" onClick={() => setCurrentView('schedule')}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              Schedule
            </Button>
            <Button variant="ghost" className="justify-start w-full" onClick={() => setCurrentView('messages')}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Messages
            </Button>
            <Button variant="ghost" className="justify-start w-full" onClick={() => setCurrentView('resources')}>
              <BookOpen className="mr-2 h-4 w-4" />
              Resources
            </Button>
          </div>

          <div className="flex items-center justify-center w-full border-t pt-3 pb-3">
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

          <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
            <DialogTrigger asChild>
              <Button variant="ghost" className="justify-between w-full mt-2 border-t pt-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm text-muted-foreground">{profileData.username}</span>
                </div>
                <Settings className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Update your profile information below
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-3 py-3">
                <div className="grid gap-2">
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    value={profileData.username}
                    onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                    placeholder="Tell us about yourself..."
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="niche">Niche</label>
                  <input
                    id="niche"
                    value={profileData.niche}
                    onChange={(e) => setProfileData({...profileData, niche: e.target.value})}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                    placeholder="Your area of expertise"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="goal">Goal</label>
                  <input
                    id="goal"
                    value={profileData.goal}
                    onChange={(e) => setProfileData({...profileData, goal: e.target.value})}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                    placeholder="What's your main goal?"
                  />
                </div>
              </div>
              <DialogFooter className="flex justify-between items-center">
                <Button 
                  variant="destructive"
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = '/login';
                  }}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
                <Button onClick={() => setShowProfileDialog(false)}>Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  };

  const ScheduleView = () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [selectedType, setSelectedType] = useState<string>('');
    
    const [showSessionDetailsDialog, setShowSessionDetailsDialog] = useState(false);
    const [showScheduleDialog, setShowScheduleDialog] = useState(false);
    const [selectedSession, setSelectedSession] = useState<any>(null);
    const [sortBy, setSortBy] = useState('date');
    const [filterBy, setFilterBy] = useState('all');

    return (
    <div className="space-y-6 pt-10">
      <Card>
        <CardHeader>
          <CardTitle>Mentorship Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Overall Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Learning Goals</span>
                      <span className="text-sm text-muted-foreground">75%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full">
                      <div className="h-full bg-primary rounded-full" style={{ width: '75%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Sessions Completed</span>
                      <span className="text-sm text-muted-foreground">12/15</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full">
                      <div className="h-full bg-primary rounded-full" style={{ width: '80%' }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Objectives */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Current Objectives</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "Complete System Design Module", progress: 60 },
                    { title: "Build Portfolio Project", progress: 45 },
                    { title: "Practice Mock Interviews", progress: 30 }
                  ].map((objective, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{objective.title}</span>
                        <span className="text-sm text-muted-foreground">{objective.progress}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${objective.progress}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button 
                    className="w-full"
                    variant="outline"
                    onClick={() => setShowScheduleDialog(true)}
                  >
                    Schedule Session
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full" variant="outline">View Resources</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[90vw] max-h-[85vh] w-full h-full">
                      <DialogHeader>
                        <DialogTitle>My Resources Library</DialogTitle>
                        <DialogDescription>
                          View, manage and interact with your saved resources
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-[2fr,1fr] gap-4 h-[calc(85vh-120px)]">
                        <ScrollArea className="flex-1">
                          <div className="grid gap-4 p-4">
                            {[
                              {
                                title: "System Design Interview Guide",
                                type: "PDF",
                                addedOn: "2024-01-15",
                                favorite: true
                              },
                              {
                                title: "Building Scalable Web Apps",
                                type: "Video",
                                addedOn: "2024-01-10", 
                                favorite: true
                              },
                              {
                                title: "Data Structures Cheat Sheet",
                                type: "Document",
                                addedOn: "2024-01-05",
                                favorite: false
                              }
                            ].map((resource, i) => (
                              <Card key={i} className="transition-all hover:shadow-md">
                                <CardContent className="flex items-center justify-between p-4">
                                  <div className="flex items-center gap-4">
                                    <BookOpen className="h-8 w-8 text-muted-foreground" />
                                    <div>
                                      <h4 className="font-medium">{resource.title}</h4>
                                      <p className="text-sm text-muted-foreground">Added on {resource.addedOn}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge variant="secondary">{resource.type}</Badge>
                                    <Star className={`h-4 w-4 cursor-pointer transition-colors ${resource.favorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground hover:text-yellow-400"}`} />
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </ScrollArea>

                        <Card className="h-full flex flex-col">
                          <CardHeader>
                            <CardTitle className="text-lg">Resource Assistant</CardTitle>
                            <CardDescription>Ask questions about your resources</CardDescription>
                          </CardHeader>
                          <CardContent className="flex-1 flex flex-col">
                            <ScrollArea className="flex-1 pr-4">
                              <div className="space-y-4">
                                {[
                                  { role: 'assistant', content: 'How can I help you with your resources today?' }
                                ].map((message, i) => (
                                  <div key={i} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`rounded-lg px-4 py-2 max-w-[80%] ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                      {message.content}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </ScrollArea>
                            <div className="mt-4 flex gap-2">
                              <Input placeholder="Ask about your resources..." className="flex-1" />
                              <Button size="icon">
                                <Send className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button className="w-full" variant="outline">Update Goals</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Session Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle>Schedule a Mentorship Session</DialogTitle>
          </DialogHeader>
          
          <div className="grid md:grid-cols-2 gap-8 items-start justify-items-center">
            <div className="flex flex-col items-center w-full max-w-[400px]">
              <h3 className="font-semibold mb-6 text-center text-lg">Select Date</h3>
              <div className="w-full bg-card rounded-lg p-4 shadow-sm border">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => {
                    setDate(newDate);
                  }}
                  defaultMonth={date}
                  fromDate={new Date()}
                  className="rounded-md mx-auto"
                  disabled={(date) => 
                    date < new Date() ||
                    date.getDay() === 0 ||
                    date.getDay() === 6
                  }
                  initialFocus
                  classNames={{
                    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                    month: "space-y-4 w-full",
                    caption: "flex justify-center pt-1 relative items-center",
                    caption_label: "text-sm font-medium",
                    nav: "space-x-1 flex items-center",
                    table: "w-full border-collapse space-y-1",
                    head_row: "flex justify-between",
                    head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                    row: "flex w-full mt-2 justify-between",
                    cell: "text-center text-sm relative p-0 hover:bg-accent rounded-md cursor-pointer",
                    day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground rounded-md",
                    day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                    day_today: "bg-accent text-accent-foreground",
                    day_outside: "text-muted-foreground opacity-50",
                    day_disabled: "text-muted-foreground opacity-50 cursor-not-allowed",
                    day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                    day_hidden: "invisible",
                  }}
                />
                {date && (
                  <p className="text-center mt-4 text-sm text-muted-foreground">
                    Selected date: {date.toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>

            <div className="w-full max-w-[400px]">
              <Card>
                <CardHeader>
                  <CardTitle>Session Details</CardTitle>
                  <CardDescription>Please fill in the details for your mentorship session</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="selected-date" className="text-sm font-medium">Selected Date</label>
                      <input 
                        id="selected-date"
                        type="text"
                        value={date?.toLocaleDateString()}
                        disabled
                        className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm"
                      />
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="session-type" className="text-sm font-medium">Session Type</label>
                      <Select 
                        onValueChange={(value) => setSelectedType(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select session type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical">Technical Discussion</SelectItem>
                          <SelectItem value="career">Career Guidance</SelectItem>
                          <SelectItem value="project">Project Review</SelectItem>
                          <SelectItem value="general">General Mentorship</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="session-time" className="text-sm font-medium">Preferred Time</label>
                      <Select
                        onValueChange={(value) => setSelectedType(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                          <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                          <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                          <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                          <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                          <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                          <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="session-description" className="text-sm font-medium">Session Goals</label>
                      <textarea
                        id="session-description"
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        placeholder="What would you like to achieve in this session?"
                        onChange={(e) => new RTCSessionDescription(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: "Technical Discussion", 
                date: "Tomorrow",
                time: "2:00 PM",
                description: "Code Review and Architecture Discussion",
                isJoined: false,
                participants: [
                  { id: 1, name: "John Doe", isSpeaking: false, isMuted: false, hasVideo: true },
                  { id: 2, name: "Jane Smith", isSpeaking: false, isMuted: true, hasVideo: false }
                ]
              },
              {
                title: "Career Growth",
                date: "Friday", 
                time: "11:00 AM",
                description: "Career Development Planning",
                isJoined: false,
                participants: [
                  { id: 3, name: "Mike Johnson", isSpeaking: false, isMuted: false, hasVideo: true },
                  { id: 4, name: "Sarah Wilson", isSpeaking: false, isMuted: false, hasVideo: true }
                ]
              }
            ].map((session, i) => {
              const [isVideoEnabled, setIsVideoEnabled] = useState(true);
              const [isAudioEnabled, setIsAudioEnabled] = useState(true);
              const [isScreenSharing, setIsScreenSharing] = useState(false);
              const [localStreamRef, setLocalStreamRef] = useState<MediaStream | null>(null);
              const [screenStreamRef, setScreenStreamRef] = useState<MediaStream | null>(null);
              const [peerConnectionRef, setPeerConnectionRef] = useState<RTCPeerConnection | null>(null);
              const [isCallModalOpen, setIsCallModalOpen] = useState(false);
              const videoRef = useRef<HTMLVideoElement>(null);

              useEffect(() => {
                // Cleanup function to stop all tracks when component unmounts
                return () => {
                  if (localStreamRef) {
                    localStreamRef.getTracks().forEach(track => track.stop());
                  }
                  if (screenStreamRef) {
                    screenStreamRef.getTracks().forEach(track => track.stop());
                  }
                };
              }, [localStreamRef, screenStreamRef]);

              const stopAllTracks = () => {
                if (localStreamRef) {
                  localStreamRef.getTracks().forEach(track => track.stop());
                }
                if (screenStreamRef) {
                  screenStreamRef.getTracks().forEach(track => track.stop());
                }
                if (peerConnectionRef) {
                  peerConnectionRef.close();
                }
                if (videoRef.current) {
                  videoRef.current.srcObject = null;
                }
                setLocalStreamRef(null);
                setScreenStreamRef(null);
                setPeerConnectionRef(null);
                session.isJoined = false;
                setIsVideoEnabled(true);
                setIsAudioEnabled(true);
                setIsScreenSharing(false);
              };

              const setupVideoStream = async () => {
                try {
                  const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                      width: { ideal: 1280 },
                      height: { ideal: 720 },
                      facingMode: "user"
                    },
                    audio: true
                  });
                  
                  if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                  }
                  
                  const peerConnection = new RTCPeerConnection({
                    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
                  });
                  
                  stream.getTracks().forEach(track => {
                    peerConnection.addTrack(track, stream);
                  });
                  
                  setLocalStreamRef(stream);
                  setPeerConnectionRef(peerConnection);
                  session.isJoined = true;
                  
                } catch (err) {
                  console.error("Error accessing media devices:", err);
                  alert("Failed to access camera/microphone. Please check permissions.");
                }
              };

              const toggleScreenShare = async () => {
                try {
                  if (!isScreenSharing) {
                    // Start screen sharing
                    const screenStream = await navigator.mediaDevices.getDisplayMedia({
                      video: true
                    });

                    if (videoRef.current) {
                      // Save current video stream and replace with screen share
                      videoRef.current.srcObject = screenStream;
                      setScreenStreamRef(screenStream);
                      setIsScreenSharing(true);

                      // Handle when user stops sharing via browser controls
                      screenStream.getVideoTracks()[0].onended = () => {
                        if (videoRef.current && localStreamRef) {
                          videoRef.current.srcObject = localStreamRef;
                          setScreenStreamRef(null);
                          setIsScreenSharing(false);
                        }
                      };
                    }
                  } else {
                    // Stop screen sharing and revert to camera
                    if (screenStreamRef) {
                      screenStreamRef.getTracks().forEach(track => track.stop());
                    }
                    if (videoRef.current && localStreamRef) {
                      videoRef.current.srcObject = localStreamRef;
                    }
                    setScreenStreamRef(null);
                    setIsScreenSharing(false);
                  }
                } catch (err) {
                  console.error("Error toggling screen share:", err);
                  setIsScreenSharing(false);
                }
              };

              return (
                <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="flex-shrink-0">
                    <Video className="h-5 w-5" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold">{session.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {session.date}
                      <Clock className="ml-4 mr-2 h-4 w-4" />
                      {session.time}
                    </div>
                    <p className="text-sm">{session.description}</p>
                  </div>
                  <div className="flex gap-2">
                    {!session.isJoined ? (
                      <Button 
                        variant="default"
                        onClick={async () => {
                          await setupVideoStream();
                          setIsCallModalOpen(true);
                        }}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Join Session
                      </Button>
                    ) : (
                      <Button 
                        variant="outline"
                        onClick={() => {
                          stopAllTracks();
                          setIsCallModalOpen(false);
                        }}
                      >
                        Leave Session
                      </Button>
                    )}
                  </div>

                  <Dialog open={isCallModalOpen} onOpenChange={(open) => {
                    if (!open) {
                      stopAllTracks();
                    }
                    setIsCallModalOpen(open);
                  }}>
                    <DialogContent className="sm:max-w-[90vw] h-[80vh]">
                      <DialogHeader>
                        <DialogTitle>{session.title}</DialogTitle>
                        <DialogDescription>{session.description}</DialogDescription>
                      </DialogHeader>

                      <div className="flex-1 overflow-hidden">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 h-full">
                          <div className="relative aspect-video bg-slate-900 rounded-lg overflow-hidden">
                            <video
                              ref={videoRef}
                              autoPlay
                              playsInline
                              muted
                              className={`w-full h-full ${isScreenSharing ? 'object-contain' : 'object-cover'} ${!isVideoEnabled && !isScreenSharing ? 'hidden' : ''}`}
                            />
                            {!isVideoEnabled && !isScreenSharing && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <User className="h-20 w-20 text-slate-600" />
                              </div>
                            )}
                            <div className="absolute bottom-2 left-2 flex items-center gap-2 bg-black/50 px-2 py-1 rounded-md">
                              <span className="text-white text-sm">You {isScreenSharing ? '(Screen)' : ''}</span>
                              {!isAudioEnabled && <MicOff className="h-4 w-4 text-red-400" />}
                            </div>
                          </div>

                          {session.participants.map((participant) => (
                            <div 
                              key={participant.id}
                              className="relative aspect-video bg-slate-900 rounded-lg overflow-hidden"
                            >
                              {participant.hasVideo ? (
                                <video 
                                  autoPlay 
                                  playsInline
                                  muted={participant.isMuted}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="flex items-center justify-center h-full">
                                  <User className="h-20 w-20 text-slate-600" />
                                </div>
                              )}
                              <div className="absolute bottom-2 left-2 flex items-center gap-2 bg-black/50 px-2 py-1 rounded-md">
                                <span className="text-white text-sm">{participant.name}</span>
                                {participant.isSpeaking && <Activity className="h-4 w-4 text-green-400" />}
                                {participant.isMuted && <MicOff className="h-4 w-4 text-red-400" />}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-center gap-4 border-t pt-4">
                        <Button 
                          variant={isVideoEnabled ? "default" : "secondary"}
                          size="icon"
                          onClick={() => {
                            if (localStreamRef) {
                              const videoTrack = localStreamRef.getVideoTracks()[0];
                              if (videoTrack) {
                                videoTrack.enabled = !isVideoEnabled;
                                setIsVideoEnabled(!isVideoEnabled);
                              }
                            }
                          }}
                          className="h-10 w-10 rounded-full"
                          disabled={isScreenSharing}
                        >
                          {isVideoEnabled ? <Video /> : <VideoOff />}
                        </Button>
                        
                        <Button 
                          variant={isAudioEnabled ? "default" : "secondary"}
                          size="icon"
                          onClick={() => {
                            if (localStreamRef) {
                              const audioTrack = localStreamRef.getAudioTracks()[0];
                              if (audioTrack) {
                                audioTrack.enabled = !isAudioEnabled;
                                setIsAudioEnabled(!isAudioEnabled);
                              }
                            }
                          }}
                          className="h-10 w-10 rounded-full"
                        >
                          {isAudioEnabled ? <Mic /> : <MicOff />}
                        </Button>
                        
                        <Button 
                          variant={isScreenSharing ? "default" : "secondary"}
                          size="icon"
                          onClick={toggleScreenShare}
                          className="h-10 w-10 rounded-full"
                        >
                          {isScreenSharing ? <MonitorOff /> : <MonitorUp />}
                        </Button>

                        <Button 
                          variant="destructive"
                          size="icon"
                          onClick={() => {
                            stopAllTracks();
                            setIsCallModalOpen(false);
                          }}
                          className="h-10 w-10 rounded-full"
                        >
                          <PhoneOff />
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Previous Sessions</CardTitle>
            <div className="flex gap-4">
              <Select onValueChange={(value) => setSortBy(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                  <SelectItem value="type">Session Type</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => setFilterBy(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sessions</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="career">Career</SelectItem>
                  <SelectItem value="project">Project</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: 1,
                title: "Code Review Session",
                type: "technical",
                date: "2024-01-15",
                duration: "45 minutes",
                mentor: "Sarah Wilson",
                summary: "Reviewed React component architecture and discussed performance optimizations",
                keyPoints: [
                  "Implemented useMemo for expensive calculations",
                  "Restructured component hierarchy",
                  "Added error boundaries"
                ],
                tasks: [
                  { title: "Refactor authentication flow", status: "completed" },
                  { title: "Add unit tests for utils", status: "pending" }
                ]
              },
              // Add more previous sessions...
            ].map((session) => (
              <div 
                key={session.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent cursor-pointer"
                onClick={() => {
                  setSelectedSession(session);
                  setShowSessionDetailsDialog(true);
                }}
              >
                <div>
                  <h3 className="font-semibold">{session.title}</h3>
                  <div className="text-sm text-muted-foreground">
                    <span>{new Date(session.date).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>{session.duration}</span>
                  </div>
                </div>
                <Badge>{session.type}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showSessionDetailsDialog} onOpenChange={setShowSessionDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedSession?.title}</DialogTitle>
            <DialogDescription>
              Session with {selectedSession?.mentor} on {selectedSession?.date}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-2">Key Points</h4>
              <ul className="list-disc pl-6 space-y-1">
                {selectedSession?.keyPoints.map((point: string, i: number) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Tasks</h4>
              <div className="space-y-2">
                {selectedSession?.tasks.map((task: any, i: number) => (
                  <div key={i} className="flex items-center gap-2">
                    <Badge variant={task.status === 'completed' ? 'default' : 'secondary'}>
                      {task.status}
                    </Badge>
                    <span>{task.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Session Summary</h4>
              <p className="text-sm text-muted-foreground">{selectedSession?.summary}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
  };


  const ResourcesView = () => {

    const [showAddDialog, setShowAddDialog] = useState(false);
    const [newResource, setNewResource] = useState({
      title: '',
      type: '',
      platform: '',
      author: '',
      description: '',
    });

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
                  {[
                    {
                      title: "Advanced JavaScript Concepts",
                      type: "Course",
                      platform: "Udemy",
                      link: "https://udemy.com/advanced-js",
                      recommended: "Sarah Wilson",
                      description: "Deep dive into closures, prototypes, and async programming",
                      attachments: [
                        { name: "Course Slides", type: "PDF", size: "2.4MB" },
                        { name: "Exercise Files", type: "ZIP", size: "15MB" }
                      ],
                      progress: 45
                    },
                    {
                      title: "System Design Interview Guide",
                      type: "Document",
                      platform: "Google Docs",
                      link: "https://docs.google.com/system-design", 
                      recommended: "Michael Chen",
                      description: "Comprehensive guide for system design interviews",
                      attachments: [
                        { name: "Practice Problems", type: "PDF", size: "1.2MB" },
                        { name: "Sample Solutions", type: "PDF", size: "3.1MB" }
                      ],
                      progress: 75
                    },
                    {
                      title: "Clean Code Principles",
                      type: "Book",
                      platform: "PDF",
                      link: "https://cleancode.pdf",
                      recommended: "Sarah Wilson",
                      description: "Best practices for writing maintainable code",
                      attachments: [
                        { name: "Book PDF", type: "PDF", size: "8.5MB" },
                        { name: "Code Examples", type: "ZIP", size: "4.2MB" }
                      ],
                      progress: 20
                    }
                  ].map((resource, i) => (
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
                                  <DialogTitle>{resource.title}</DialogTitle>
                                  <DialogDescription>{resource.description}</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="font-medium mb-2">Progress</h4>
                                    <div className="h-2 bg-secondary rounded-full">
                                      <div 
                                        className="h-full bg-primary rounded-full" 
                                        style={{width: `${resource.progress}%`}}
                                      />
                                    </div>
                                    <p className="text-sm text-right mt-1">{resource.progress}% Complete</p>
                                  </div>
                                  
                                  <div>
                                    <h4 className="font-medium mb-2">Attachments</h4>
                                    <div className="space-y-2">
                                      {resource.attachments.map((file, j) => (
                                        <div key={j} className="flex items-center justify-between p-2 border rounded-lg">
                                          <div className="flex items-center gap-2">
                                            <BookOpen className="h-4 w-4" />
                                            <span className="text-sm">{file.name}</span>
                                            <Badge variant="outline" className="text-xs">
                                              {file.size}
                                            </Badge>
                                          </div>
                                          <Button variant="ghost" size="sm">
                                            Download
                                          </Button>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  <div className="flex justify-between">
                                    <Button variant="outline" onClick={() => window.open(resource.link, '_blank')}>
                                      Open in {resource.platform}
                                    </Button>
                                    <Button onClick={() => setCurrentView('course')}>Continue Learning</Button>
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
              <Button onClick={() => setShowAddDialog(false)}>Add Resource</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  const CourseView = () => (
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
                        { name: "Course Overview", completed: true, current: false },
                        { name: "Setting Up Environment", completed: true, current: false }
                      ]
                    },
                    {
                      title: "Closures & Scope",
                      completed: false,
                      current: true,
                      lessons: [
                        { name: "Understanding Closures", completed: true, current: false },
                        { name: "Lexical Scope", completed: false, current: true },
                        { name: "Practical Applications", completed: false, current: false }
                      ]
                    },
                    {
                      title: "Prototypes & Inheritance",
                      completed: false,
                      lessons: [
                        { name: "Prototype Chain", completed: false, current: false },
                        { name: "Inheritance Patterns", completed: false, current: false }
                      ]
                    },
                    {
                      title: "Asynchronous JavaScript",
                      completed: false,
                      lessons: [
                        { name: "Promises Deep Dive", completed: false, current: false },
                        { name: "Async/Await Patterns", completed: false, current: false },
                        { name: "Error Handling", completed: false, current: false }
                      ]
                    },
                    {
                      title: "Design Patterns",
                      completed: false,
                      lessons: [
                        { name: "Singleton Pattern", completed: false, current: false },
                        { name: "Factory Pattern", completed: false, current: false },
                        { name: "Observer Pattern", completed: false, current: false },
                        { name: "Module Pattern", completed: false, current: false }
                      ]
                    },
                    {
                      title: "Performance Optimization",
                      completed: false,
                      lessons: [
                        { name: "Memory Management", completed: false, current: false },
                        { name: "Code Splitting", completed: false, current: false },
                        { name: "Lazy Loading", completed: false, current: false }
                      ]
                    }
                  ].map((module, i) => (
                    <div key={i} className="mb-6 relative">
                      <div className={`
                        border rounded-lg p-4
                        ${module.current ? 'border-primary bg-accent shadow-sm' : 'border-border'}
                      `}>
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`
                            w-5 h-5 rounded-full z-10 flex items-center justify-center
                            ${module.completed ? 'bg-primary' : module.current ? 'border-2 border-primary' : 'border-2 border-muted-foreground'}
                          `}>
                            {module.completed && <Check className="h-3 w-3 text-primary-foreground" />}
                          </div>
                          <span className="font-medium">{module.title}</span>
                        </div>
                        
                        <div className="space-y-2 ml-6 border-l-2 pl-4 border-border">
                          {module.lessons.map((lesson, j) => (
                            <div 
                              key={j} 
                              className={`
                                flex items-center gap-2 p-2 rounded-md transition-colors
                                ${lesson.current ? 'bg-accent/50 text-primary font-medium' : ''}
                                ${lesson.completed ? 'text-muted-foreground' : ''}
                              `}
                            >
                              <div className={`
                                w-3 h-3 rounded-full
                                ${lesson.completed ? 'bg-primary/60' : lesson.current ? 'border-2 border-primary' : 'border border-muted-foreground'}
                              `} />
                              <span className="text-sm">{lesson.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
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
                          <Button variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </Button>
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



  const MessagesView = () => {
    const [isCallModalOpen, setIsCallModalOpen] = useState(false);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [showNewChatDialog, setShowNewChatDialog] = useState(false);
    const [showDiscoverDialog, setShowDiscoverDialog] = useState(false);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [localStreamRef, setLocalStreamRef] = useState<MediaStream | null>(null);
    const [screenStreamRef, setScreenStreamRef] = useState<MediaStream | null>(null);
    const [peerConnectionRef, setPeerConnectionRef] = useState<RTCPeerConnection | null>(null);
    const [messageInput, setMessageInput] = useState('');
    const videoRef = useRef<HTMLVideoElement>(null);

    type Contact = {
      id: number;
      name: string;
      role: string;
      email: string;
      avatar: string;
      status?: 'online' | 'offline';
      lastSeen?: string;
      expertise?: string[];
      interests?: string[];
      goals?: string[];
      matchScore?: number;
    };

    type Message = {
      id: string;
      sender: 'mentor' | 'mentee';
      content: string;
      timestamp: string;
      type: 'text' | 'file' | 'image' | 'voice';
      status?: 'sent' | 'delivered' | 'read';
    };

    const recommendedContacts: Contact[] = [
      {
        id: 3,
        name: "Emma Thompson",
        role: "Senior Developer",
        email: "emma.t@example.com",
        avatar: "ET",
        expertise: ["React", "TypeScript", "System Design"],
        interests: ["Mentoring", "Web Development"],
        goals: ["Technical Leadership", "Architecture"],
        matchScore: 95
      },
      {
        id: 4,
        name: "David Liu",
        role: "Tech Lead",
        email: "david.l@example.com",
        avatar: "DL",
        expertise: ["Cloud Architecture", "DevOps", "Team Leadership"],
        interests: ["System Design", "Mentoring"],
        goals: ["Engineering Management", "Cloud Solutions"],
        matchScore: 88
      }
    ];

    const contacts: Contact[] = [
      {
        id: 1,
        name: "Sarah Wilson",
        role: "Mentor",
        email: "sarah.w@example.com",
        avatar: "SW",
        status: 'online'
      },
      {
        id: 2,
        name: "Michael Chen",
        role: "Mentor",
        email: "michael.c@example.com",
        avatar: "MC",
        status: 'offline',
        lastSeen: '2 hours ago'
      }
    ];

    const messages: Message[] = [
      {
        id: '1',
        sender: 'mentor',
        content: "Hi there! How's your progress on the latest project coming along?",
        timestamp: '10:30 AM',
        type: 'text',
        status: 'read'
      },
      {
        id: '2', 
        sender: 'mentee',
        content: "Going well! I've implemented the new features we discussed.",
        timestamp: '10:32 AM',
        type: 'text',
        status: 'delivered'
      }
    ];

    const handleSendMessage = () => {
      if (!messageInput.trim()) return;
      console.log('Sending message:', messageInput);
      setMessageInput('');
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        console.log('Uploading file:', file);
      }
    };

    const setupVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        setLocalStreamRef(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing media devices:", err);
      }
    };

    function setShowVideoCallDialog(arg0: boolean): void {
      throw new Error('Function not implemented.');
    }

    return (
      <div className="flex h-[calc(100vh-4rem)] gap-4 p-6 pt-12">
        <div className="flex flex-1 gap-4 pt-7">
          <Card className="w-50 h-[calc(100vh-8rem)]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Messages</CardTitle>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => setShowDiscoverDialog(true)}>
                    <Users className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setShowNewChatDialog(true)}>
                    <PenSquare className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search messages..." className="pl-8" />
              </div>
            </CardHeader>
            <ScrollArea className="h-[calc(100vh-16rem)]">
              <div className="p-4 space-y-4">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={cn(
                      "cursor-pointer hover:border-primary transition-colors p-4 border rounded-lg",
                      selectedContact?.id === contact.id && "border-primary"
                    )}
                    onClick={() => setSelectedContact(contact)}
                  >
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>{contact.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{contact.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {contact.status === 'online' ? (
                              <Badge variant="default" className="bg-green-500">Online</Badge>
                            ) : contact.lastSeen}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate mt-1">{contact.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>

          <Card className="flex-1 h-[calc(100vh-8rem)]">
            {selectedContact ? (
              <div className="flex flex-col h-full">
                <CardContent className="flex-1 p-4">
                  <Card className="h-full flex flex-col">
                    <div className="flex justify-end p-4">
                      <Menubar className="border-none bg-transparent">
                        <MenubarMenu>
                          <MenubarTrigger className="rounded-full w-10 h-10 flex items-center justify-center text-lg font-medium data-[state=open]:bg-accent">
                            {selectedContact.name.split(' ').map(n => n[0]).join('')}
                          </MenubarTrigger>
                          <MenubarContent>
                            <MenubarItem onClick={() => setShowVideoCallDialog(true)}>
                              <Video className="mr-2 h-4 w-4" />
                              <span>Video Call</span>
                            </MenubarItem>
                            <MenubarItem>
                              <UserPlus className="mr-2 h-4 w-4" />
                              <span>Share Contact</span>
                            </MenubarItem>
                            <MenubarItem>
                              <Archive className="mr-2 h-4 w-4" />
                              <span>Archive Chat</span>
                            </MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem className="text-destructive">
                              <Trash className="mr-2 h-4 w-4" />
                              <span>Delete Chat</span>
                            </MenubarItem>
                          </MenubarContent>
                        </MenubarMenu>
                      </Menubar>
                    </div>
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={cn(
                              "flex",
                              message.sender === 'mentee' ? "justify-end" : "justify-start"
                            )}
                          >
                            <div
                              className={cn(
                                "max-w-[70%] rounded-lg p-3",
                                message.sender === 'mentee' 
                                  ? "bg-primary text-primary-foreground" 
                                  : "bg-muted"
                              )}
                            >
                              <p>{message.content}</p>
                              <div className="flex items-center justify-end gap-1 mt-1">
                                <span className="text-xs opacity-70">{message.timestamp}</span>
                                {message.sender === 'mentee' && (
                                  <Check className="h-3 w-3" />
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <div className="p-4 pt-10">
                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="Type a message..."
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                          className="flex-1"
                        />
                        <input
                          type="file"
                          id="file-upload"
                          className="hidden"
                          onChange={handleFileUpload}
                        />
                        <Button variant="ghost" size="icon" asChild>
                          <label htmlFor="file-upload">
                            <Paperclip className="h-5 w-5" />
                          </label>
                        </Button>
                        <Button onClick={handleSendMessage}>
                          <Send className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </CardContent>
              </div>
            ) : (
              <Card className="">
                <CardContent className="">
                  <div className="flex-1 flex flex-col items-center justify-center p-9">
                    <MessageSquare className="h-8 w-8 text-muted-foreground" />
                    <div className="text-center mt-3">
                      <h3 className="font-semibold text-base">No Conversation Selected</h3>
                      <p className="text-sm text-muted-foreground">
                        Select a conversation or connect with recommended mentors below
                      </p>
                    </div>
                    
                    <div className="w-full max-w-lg mt-6 space-y-3">
                      <h4 className="font-medium text-s">Recommended Matches</h4>
                      {recommendedContacts
                        .sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0))
                        .slice(0, 2)
                        .map((contact) => (
                          <div key={contact.id} className="border rounded-lg p-3">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>{contact.avatar}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                  <h5 className="font-medium text-sm truncate">{contact.name}</h5>
                                  <Badge variant="secondary" className="text-xs">{contact.matchScore}% Match</Badge>
                                </div>
                                <p className="text-xs text-muted-foreground truncate">{contact.role}</p>
                              </div>
                            </div>
                            <Button 
                              variant="outline" 
                              className="w-full mt-2 h-8 text-xs"
                              onClick={() => setSelectedContact(contact)}
                            >
                              Start Chat
                            </Button>
                          </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </Card>
        </div>

        <Dialog open={showDiscoverDialog} onOpenChange={setShowDiscoverDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Discover Mentors & Peers</DialogTitle>
              <DialogDescription>
                Connect with mentors and peers who share your interests and goals
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {recommendedContacts.map((contact) => (
                <div key={contact.id} className="border rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{contact.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{contact.name}</h4>
                        <Badge variant="secondary">{contact.matchScore}% Match</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{contact.role}</p>
                      <div className="mt-2">
                        <h5 className="text-sm font-medium">Expertise</h5>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {contact.expertise?.map((skill) => (
                            <Badge key={skill} variant="outline">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="mt-2">
                        <h5 className="text-sm font-medium">Goals</h5>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {contact.goals?.map((goal) => (
                            <Badge key={goal} variant="outline">{goal}</Badge>
                          ))}
                        </div>
                      </div>
                      <Button className="mt-3" onClick={() => {
                        setSelectedContact(contact);
                        setShowDiscoverDialog(false);
                      }}>
                        Start Conversation
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  };


  const MyMentorView = () => {
    const [selectedMember, setSelectedMember] = useState<CommunityMember | null>(null);
    const [showProfileDialog, setShowProfileDialog] = useState(false);

    type CommunityMember = {
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
        ]
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
        ]
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
        ]
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
                        <Badge variant={member.type === 'mentor' ? 'default' : 'secondary'}>
                          {member.type === 'mentor' ? 'Mentor' : 'Member'}
                        </Badge>
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

                    <div className="mt-4 pt-4 border-t">
                      <div className="flex gap-4 justify-center">
                        {member.socials.github && (
                          <Link href={member.socials.github} className="text-muted-foreground hover:text-primary">
                            <Github className="h-5 w-5" />
                          </Link>
                        )}
                        {member.socials.twitter && (
                          <Link href={member.socials.twitter} className="text-muted-foreground hover:text-primary">
                            <Twitter className="h-5 w-5" />
                          </Link>
                        )}
                        {member.socials.linkedin && (
                          <Link href={member.socials.linkedin} className="text-muted-foreground hover:text-primary">
                            <Linkedin className="h-5 w-5" />
                          </Link>
                        )}
                      </div>
                    </div>

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
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            {selectedMember && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl flex items-center gap-2">
                    {selectedMember.name}
                    <Badge variant={selectedMember.type === 'mentor' ? 'default' : 'secondary'}>
                      {selectedMember.type === 'mentor' ? 'Mentor' : 'Member'}
                    </Badge>
                  </DialogTitle>
                  <DialogDescription>
                    {selectedMember.role} {selectedMember.company && `at ${selectedMember.company}`}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">About</h3>
                    <p className="text-muted-foreground">{selectedMember.bio}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.expertise.map((skill, i) => (
                        <Badge key={i} variant="outline">{skill}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.interests.map((interest, i) => (
                        <Badge key={i} variant="secondary">{interest}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Achievements</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedMember.achievements.map((achievement, i) => (
                        <li key={i} className="text-muted-foreground">{achievement}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex gap-4 justify-center">
                      {Object.entries(selectedMember.socials).map(([platform, url]) => (
                        url && (
                          <Link 
                            key={platform}
                            href={url} 
                            className="text-muted-foreground hover:text-primary"
                          >
                            {platform === 'github' && <Github className="h-5 w-5" />}
                            {platform === 'twitter' && <Twitter className="h-5 w-5" />}
                            {platform === 'linkedin' && <Linkedin className="h-5 w-5" />}
                            {platform === 'website' && <Globe className="h-5 w-5" />}
                          </Link>
                        )
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  
  const DashboardView = () => {
    const [selectedChannel, setSelectedChannel] = useState('general');
    const [isCallActive, setIsCallActive] = useState(false);
    const [participants, setParticipants] = useState<string[]>([]);
    const [localStreamRef, setLocalStreamRef] = useState<MediaStream | null>(null);
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [showEventsDialog, setShowEventsDialog] = useState(false);
    const [showVideoDialog, setShowVideoDialog] = useState(false);
    const [showChatDialog, setShowChatDialog] = useState(false);
    const [showNewChannelDialog, setShowNewChannelDialog] = useState(false);
    const [showUserProfileDialog, setShowUserProfileDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [newChannelName, setNewChannelName] = useState('');
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

    const onlineUsers = [
      { 
        id: 1, 
        name: 'Sarah Johnson', 
        status: 'online',
        role: 'Senior Developer',
        bio: 'Full-stack developer with 5 years of experience'
      },
      { 
        id: 2, 
        name: 'Mike Chen', 
        status: 'in-call',
        role: 'UX Designer',
        bio: 'Passionate about creating intuitive user experiences'
      },
      { 
        id: 3, 
        name: 'Emma Wilson', 
        status: 'idle',
        role: 'Product Manager',
        bio: 'Helping teams build amazing products'
      }
    ];

    const createNewChannel = () => {
      if (newChannelName.trim()) {
        setChannels([
          ...channels,
          { id: newChannelName.toLowerCase().replace(/\s+/g, '-'), name: newChannelName }
        ]);
        setNewChannelName('');
        setShowNewChannelDialog(false);
      }
    };

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

    return (
      <div className="max-w-7xl mx-auto space-y-6 pt-10">

        <Card className="w-full transition-all">
          <CardHeader className="flex flex-row items-center justify-between p-4 lg:p-8">
            <div className="flex-1">
              <CardTitle className="text-xl lg:text-2xl xl:text-3xl">Announcements</CardTitle>
              <CardDescription className="text-sm lg:text-base mt-2">
                Stay updated with the latest announcements and notifications
              </CardDescription>
            </div>
            <div className="flex gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="ghost"
                    className="relative group hover:bg-accent transition-colors p-3 lg:p-4"
                  >
                    <Mail className="h-8 w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12 transition-transform group-hover:scale-110" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[95vw] max-w-3xl">
                  <DialogHeader>
                    <DialogTitle className="text-l lg:text-2xl flex items-center gap-3">
                      <Mail className="h-6 w-6 lg:h-8 lg:w-8" />
                      Send Broadcast Message
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 p-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="Enter message subject..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Type your broadcast message..." 
                        className="min-h-[200px]"
                      />
                    </div>
                    <DialogFooter>
                      <Button type="submit">Send to All</Button>
                    </DialogFooter>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="relative group hover:bg-accent transition-colors p-3 lg:p-4"
                  >
                    <BellRing className="h-8 w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12 transition-transform group-hover:scale-110" />
                    <span className="absolute -top-2 -right-2 h-6 w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8 rounded-full bg-red-500 text-xs lg:text-sm font-medium text-white flex items-center justify-center transition-transform group-hover:scale-110">
                      3
                    </span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[95vw] max-w-3xl h-[90vh] max-h-[800px] flex flex-col">
                  <DialogHeader className="p-4 lg:p-6">
                    <DialogTitle className="text-l lg:text-2xl flex items-center gap-3">
                      <BellRing className="h-6 w-6 lg:h-8 lg:w-8" />
                      Notifications
                    </DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="flex-grow px-4 lg:px-6">
                    <div className="space-y-4 lg:space-y-5 pb-4 lg:pb-6">
                      {[
                        {
                          title: "New Feature Released",
                          description: "Check out our new video conferencing capabilities! We've added support for screen sharing, HD video, and up to 50 participants.",
                          time: "2 hours ago",
                          priority: "high"
                        },
                        {
                          title: "System Maintenance",
                          description: "Scheduled maintenance this weekend. The platform will be unavailable from Saturday 2 AM to 4 AM EST.",
                          time: "5 hours ago",
                          priority: "medium"
                        },
                        {
                          title: "New Mentor Joined",
                          description: "Welcome Sarah Johnson to our mentorship program! Sarah is an expert in cloud architecture with 15 years of experience.",
                          time: "1 day ago",
                          priority: "normal"
                        }
                      ].map((notification, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 lg:gap-5 rounded-lg border p-4 lg:p-5 transition-all hover:bg-accent/50 animate-in slide-in-from-right cursor-pointer group"
                          style={{ 
                            animationDelay: `${index * 150}ms`,
                            animationDuration: '400ms'
                          }}
                        >
                          <div className={`h-8 w-8 lg:h-10 lg:w-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors
                            ${notification.priority === 'high' ? 'bg-red-100 text-red-600' : 
                              notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' : 
                              'bg-blue-100 text-blue-600'}`}>
                            <Bell className="h-4 w-4 lg:h-5 lg:w-5 transition-transform group-hover:scale-110" />
                          </div>
                          <div className="flex-1 space-y-2 min-w-0">
                            <div className="flex justify-between items-start gap-3">
                              <p className="font-semibold text-base lg:text-lg leading-tight">
                                {notification.title}
                              </p>
                              <span className="text-xs lg:text-sm text-muted-foreground whitespace-nowrap">
                                {notification.time}
                              </span>
                            </div>
                            <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                              {notification.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-2 gap-6">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Channels</CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowNewChannelDialog(true)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {channels.map(channel => (
                  <Button
                    key={channel.id}
                    variant={selectedChannel === channel.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      setSelectedChannel(channel.id);
                      setShowChatDialog(true);
                    }}
                  >
                    <Hash className="h-4 w-4 mr-2" />
                    {channel.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader>
              <CardTitle>Online Users</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="pb-4">User</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {onlineUsers.map(user => (
                    <tr key={user.id} className="border-t">
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                          </Avatar>
                          <p className="text-sm font-medium">{user.name}</p>
                        </div>
                      </td>
                      <td className="py-3">
                        <p className="text-xs text-muted-foreground capitalize">{user.status}</p>
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => {
                              setSelectedUser(user);
                              setShowUserProfileDialog(true);
                            }}
                          >
                            <User className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                          >
                            <Video className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        <Dialog open={showChatDialog} onOpenChange={setShowChatDialog}>
          <DialogContent className="max-w-4xl h-[80vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Hash className="h-5 w-5" />
                {channels.find(c => c.id === selectedChannel)?.name}
              </DialogTitle>
              <Button onClick={startCall} variant="outline" className="absolute right-4 top-4">
                <Video className="h-4 w-4 mr-2" />
                Join Call
              </Button>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
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
              </div>
            </div>
            <div className="p-4 border-t mt-auto">
              <div className="flex gap-2">
                <Input placeholder="Type a message..." />
                <Button>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showNewChannelDialog} onOpenChange={setShowNewChannelDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Channel</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="channel-name">Channel Name</Label>
                  <Input
                    id="channel-name"
                    value={newChannelName}
                    onChange={(e) => setNewChannelName(e.target.value)}
                    placeholder="Enter channel name..."
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={createNewChannel}>Create Channel</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showUserProfileDialog} onOpenChange={setShowUserProfileDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>User Profile</DialogTitle>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback>{selectedUser.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{selectedUser.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedUser.role}</p>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium mb-2">About</h4>
                  <p className="text-sm">{selectedUser.bio}</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    className="flex-1 gap-2"
                    onClick={() => {
                      setShowUserProfileDialog(false);
                      // Add message handling logic here
                    }}
                  >
                    <MessageSquare className="h-4 w-4" />
                    Send Message
                  </Button>
                  <Button 
                    className="flex-1 gap-2" 
                    variant="outline"
                    onClick={() => {
                      setShowUserProfileDialog(false);
                      // Add meeting scheduling logic here
                    }}
                  >
                    <CalendarIcon className="h-4 w-4" />
                    Schedule Meeting
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <Dialog open={showVideoDialog} onOpenChange={setShowVideoDialog}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Video Conference</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {localStreamRef && (
                  <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                    <video
                      ref={video => {
                        if (video && localStreamRef) {
                          video.srcObject = localStreamRef;
                          video.play();
                        }
                      }}
                      muted
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
              
              <div className="flex justify-center gap-4">
                <Button
                  size="icon"
                  variant={isAudioEnabled ? "outline" : "secondary"}
                  onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                >
                  {isAudioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                </Button>
                <Button
                  size="icon"
                  variant={isVideoEnabled ? "outline" : "secondary"}
                  onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                >
                  {isVideoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                </Button>
                <Button
                  size="icon"
                  variant={isScreenSharing ? "secondary" : "outline"}
                  onClick={toggleScreenShare}
                >
                  <MonitorUp className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={stopCall}
                >
                  <PhoneOff className="h-4 w-4" />
                </Button>
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
        {currentView === 'schedule' && <ScheduleView />}
        {currentView === 'messages' && <MessagesView />}
        {currentView === 'resources' && <ResourcesView/>}
        {currentView === 'course' && <CourseView/>}
        {currentView === 'mentor' && <MyMentorView/>}
      </div>
    </div>
  );
}


function setSelectedType(value: string): void {
  throw new Error('Function not implemented.');
}

