
'use client';

import { SetStateAction, useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import HeroVideoDialog from "@/components/ui/hero-video-dialog";
import { auth } from '../firebase/firebaseConfig';
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
  LogOut
} from "lucide-react";
import { Separator } from '@/components/ui/separator';
import { Input } from './ui/input';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, Label } from '@radix-ui/react-dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import { toast } from '@/hooks/use-toast';
import { Form, useForm } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl } from './ui/form';


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

    function setTheme(arg0: string): void {
      throw new Error('Function not implemented.');
    }

    return (
      <div className="h-screen min-h-full w-64 flex flex-col p-4 border-r fixed">
        <div className="font-bold text-2xl mb-6">Mentorship Portal</div>
        
        <div className="flex flex-col gap-3 flex-1">
          <Button variant="ghost" className="justify-start w-full" onClick={() => setCurrentView('dashboard')}>
            <Hash className="mr-2 h-4 w-4" />
            Spaces
          </Button>
          <Button variant="ghost" className="justify-start w-full" onClick={() => setCurrentView('mentor')}>
            <Users className="mr-2 h-4 w-4" />
            My Mentor
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

        <div className="flex items-center justify-center w-full border-t pt-4 pb-4">
          <div className="flex items-center justify-center space-x-2 my-auto">
            <div className="flex items-center justify-center gap-2">
              <Sun className={`h-[1.2rem] w-[1.2rem] transition-opacity ${localStorage.getItem('theme') === 'dark' ? 'opacity-50' : 'text-yellow-500'}`} />
            </div>
            <Switch 
              id="theme-mode"
              checked={localStorage.getItem('theme') === 'dark'}
              onCheckedChange={(checked) => {
                const newTheme = checked ? 'dark' : 'light';
                localStorage.setItem('theme', newTheme);
                document.documentElement.classList.toggle('dark', checked);
                toast({
                  title: "Theme Changed",
                  description: `Switched to ${newTheme} mode`
                });
              }}
              className="my-auto data-[state=checked]:bg-slate-800 data-[state=unchecked]:bg-yellow-500"
            />
            <div className="flex items-center justify-center gap-2">
              <Moon className={`h-[1.2rem] w-[1.2rem] transition-opacity ${localStorage.getItem('theme') === 'dark' ? 'text-slate-200' : 'opacity-50'}`} />
            </div>
          </div>
        </div>


        <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
          <DialogTrigger asChild>
            <Button variant="ghost" className="justify-between w-full mt-auto border-t pt-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="text-sm text-muted-foreground">{profileData.username}</span>
              </div>
              <Settings className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Update your profile information below
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  value={profileData.username}
                  onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Tell us about yourself..."
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="niche">Niche</label>
                <input
                  id="niche"
                  value={profileData.niche}
                  onChange={(e) => setProfileData({...profileData, niche: e.target.value})}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Your area of expertise"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="goal">Goal</label>
                <input
                  id="goal"
                  value={profileData.goal}
                  onChange={(e) => setProfileData({...profileData, goal: e.target.value})}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
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
    <div className="space-y-6">
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
                    onClick={() => setShowScheduleDialog(true)}
                  >
                    Schedule Session
                  </Button>
                  <Button className="w-full" variant="outline">View Resources</Button>
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
                  {/* Rest of the session details form remains the same */}
                  {/* ... */}
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
      <div className="space-y-6">
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
    <div className="space-y-6">
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
                    <div className="space-y-4">
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
                          <select className="w-full rounded-md border border-input px-3 py-2">
                            <option value="radio">Single Choice (Radio)</option>
                            <option value="checkbox">Multiple Choice (Checkbox)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Answer Options</label>
                          <div className="space-y-2">
                            {[1, 2, 3, 4].map((num) => (
                              <div key={num} className="flex gap-2">
                                <input
                                  type="text"
                                  placeholder={`Option ${num}`}
                                  className="flex-1 rounded-md border border-input px-3 py-2"
                                />
                                <div className="flex items-center">
                                  <input
                                    type="checkbox"
                                    id={`correct-${num}`}
                                    className="mr-2"
                                  />
                                  <label htmlFor={`correct-${num}`} className="text-sm">
                                    Correct Answer
                                  </label>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Button className="w-full">Add Question</Button>
                      </div>

                      <div className="border-t pt-4">
                        <h3 className="font-medium mb-4">Preview</h3>
                        {/* Preview section would render the created questions */}
                        <div className="text-muted-foreground text-sm text-center py-8">
                          Questions you create will appear here
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
    const [selectedContact, setSelectedContact] = useState(null);
    const [localStreamRef, setLocalStreamRef] = useState<MediaStream | null>(null);
    const [screenStreamRef, setScreenStreamRef] = useState<MediaStream | null>(null);
    const [peerConnectionRef, setPeerConnectionRef] = useState<RTCPeerConnection | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Mock contacts data - in real app would come from API/database
    const contacts = [
      {
        id: 1,
        name: "Sarah Wilson",
        role: "Mentor",
        email: "sarah.w@example.com",
        avatar: "SW"
      },
      {
        id: 2,
        name: "Michael Chen",
        role: "Mentor",
        email: "michael.c@example.com",
        avatar: "MC"
      },
      {
        id: 3,
        name: "Emma Davis",
        role: "Student",
        email: "emma.d@example.com",
        avatar: "ED"
      }
    ];

    const handleStartNewChat = (contact: SetStateAction<null>) => {
      setSelectedContact(contact);
      setShowNewChatDialog(false);
      // Here you would typically initialize a new chat with the selected contact
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

    const startScreenShare = async () => {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true
        });
        setScreenStreamRef(screenStream);
        if (videoRef.current) {
          videoRef.current.srcObject = screenStream;
        }
        setIsScreenSharing(true);
      } catch (err) {
        console.error("Error sharing screen:", err);
      }
    };

    const stopScreenShare = () => {
      if (screenStreamRef) {
        screenStreamRef.getTracks().forEach(track => track.stop());
        setScreenStreamRef(null);
        if (videoRef.current && localStreamRef) {
          videoRef.current.srcObject = localStreamRef;
        }
        setIsScreenSharing(false);
      }
    };

    const stopAllTracks = () => {
      if (localStreamRef) {
        localStreamRef.getTracks().forEach(track => track.stop());
      }
      if (screenStreamRef) {
        screenStreamRef.getTracks().forEach(track => track.stop());
      }
      setLocalStreamRef(null);
      setScreenStreamRef(null);
      setIsScreenSharing(false);
    };

    useEffect(() => {
      return () => {
        stopAllTracks();
      };
    }, []);

    return (
      <div className="flex h-[calc(100vh-4rem)] gap-6">
        {/* Left Card - Chats List */}
        <Card className="w-1/3">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Messages</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setShowNewChatDialog(true)}>
              <PenSquare className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-12rem)]">
              {[
                {
                  name: "Sarah Wilson",
                  role: "Mentor",
                  lastMessage: "Let's discuss your progress tomorrow",
                  time: "2h ago",
                  unread: true
                },
                {
                  name: "Michael Chen",
                  role: "Mentor", 
                  lastMessage: "Great work on the project!",
                  time: "1d ago",
                  unread: false
                }
              ].map((contact, i, arr) => (
                <div key={i}>
                  <div className={`flex items-start gap-3 p-4 hover:bg-accent rounded-lg cursor-pointer ${
                    contact.unread ? 'bg-accent/50' : ''
                  }`}>
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {contact.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div className="font-semibold">{contact.name}</div>
                        <span className="text-xs text-muted-foreground">{contact.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                      {contact.unread && <Badge className="mt-1">New</Badge>}
                    </div>
                  </div>
                  {i < arr.length - 1 && <Separator className="my-1 mx-4" />}
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Right Card - Chat Area */}
        <Card className="flex-1 flex flex-col">
          <CardHeader className="border-b">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-primary-foreground">SW</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">Sarah Wilson</div>
                  <div className="text-sm text-muted-foreground">Online</div>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={async () => {
                  await setupVideoStream();
                  setIsCallModalOpen(true);
                }}
              >
                <Video className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0 flex-1 flex flex-col">
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4">
                {[
                  { sender: "mentor", content: "How's your progress on the latest project?", time: "10:30 AM", type: "text" },
                  { sender: "you", content: "/voice-note-1.mp3", time: "10:31 AM", type: "voice" },
                  { sender: "mentor", content: "/screenshot.png", time: "10:33 AM", type: "image" },
                  { sender: "you", content: "Yes, that would be very helpful!", time: "10:36 AM", type: "text" }
                ].map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender === 'you' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] rounded-2xl p-3 ${
                      msg.sender === 'you' 
                        ? 'bg-blue-500 text-white rounded-br-none' 
                        : 'bg-gray-100 text-gray-900 rounded-bl-none'
                    }`}>
                      {msg.type === 'text' && <p>{msg.content}</p>}
                      {msg.type === 'voice' && (
                        <div className="flex items-center gap-2">
                          <Play className="h-4 w-4" />
                          <div className="h-4 bg-current/20 rounded-full flex-1" />
                          <span className="text-xs">0:30</span>
                        </div>
                      )}
                      {msg.type === 'image' && (
                        <img src={msg.content} alt="" className="rounded-lg max-w-full" />
                      )}
                      <span className="text-xs opacity-70 mt-1 block">{msg.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t p-4 mt-auto">
              <div className="flex items-center gap-2 bg-accent rounded-full p-2">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ImageIcon className="h-5 w-5" />
                </Button>
                <input 
                  type="text" 
                  placeholder="iMessage"
                  className="flex-1 bg-transparent border-none focus:outline-none text-center"
                />
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Mic className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Video Call Dialog */}
        <Dialog open={isCallModalOpen} onOpenChange={(open) => {
          if (!open) {
            stopAllTracks();
          }
          setIsCallModalOpen(open);
        }}>
          <DialogContent className="sm:max-w-[90vw] h-[80vh]">
            <DialogHeader>
              <DialogTitle>Video Call with Sarah Wilson</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 h-full">
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
              </div>
              <div className="aspect-video bg-slate-900 rounded-lg" />
            </div>
            <div className="flex justify-center gap-4">
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
              >
                {isAudioEnabled ? <Mic /> : <MicOff />}
              </Button>
              <Button
                variant={isScreenSharing ? "default" : "secondary"}
                size="icon"
                onClick={() => {
                  if (isScreenSharing) {
                    stopScreenShare();
                  } else {
                    startScreenShare();
                  }
                }}
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
              >
                <PhoneOff />
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* New Chat Dialog */}
        <Dialog open={showNewChatDialog} onOpenChange={setShowNewChatDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Message</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[400px]">
              <div className="space-y-2 p-4">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center gap-3 p-3 hover:bg-accent rounded-lg cursor-pointer"
                    onClick={() => setSelectedContact(contact)}
                  >
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {contact.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{contact.name}</div>
                      <div className="text-sm text-muted-foreground">{contact.role}</div>
                      <div className="text-sm text-muted-foreground">{contact.email}</div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    );
  };


  const MyMentorView = () => {
    const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);

    // Define Mentor type
    type Mentor = {
      id: number;
      name: string;
      title: string; 
      company: string;
      expertise: string[];
      bio: string;
      rating: number;
      totalSessions: number;
      availability: string;
      socials: {
        linkedin: string;
        twitter: string;
        github: string;
      };
      upcomingSessions: {
        date: string;
        time: string;
        topic: string;
      }[];
    };

    // Mock mentor data - would come from API/database in real app
    const mentors: Mentor[] = [
      {
        id: 1,
        name: "Dr. Sarah Wilson",
        title: "Senior Software Engineer",
        company: "Google",
        expertise: ["Web Development", "System Design", "Cloud Architecture"],
        bio: "15+ years of experience in software development and mentoring. Passionate about helping others grow in their tech careers.",
        rating: 4.9,
        totalSessions: 156,
        availability: "Mon-Thu, 2PM-6PM EST",
        socials: {
          linkedin: "linkedin.com/in/sarahwilson",
          twitter: "@sarahwilsontech",
          github: "github.com/sarahwilson"
        },
        upcomingSessions: [
          {
            date: "2024-02-15",
            time: "2:00 PM EST",
            topic: "System Design Interview Prep"
          },
          {
            date: "2024-02-22", 
            time: "3:00 PM EST",
            topic: "Code Review Workshop"
          }
        ]
      },
      {
        id: 2,
        name: "Michael Chen",
        title: "Tech Lead",
        company: "Microsoft",
        expertise: ["Mobile Development", "Leadership", "Agile Methodologies"],
        bio: "Tech lead with focus on mobile development and team leadership. Helping mentees navigate both technical and career challenges.",
        rating: 4.8,
        totalSessions: 98,
        availability: "Wed-Fri, 10AM-4PM PST",
        socials: {
          linkedin: "linkedin.com/in/michaelchen",
          twitter: "@michaelchendev",
          github: "github.com/mchen"
        },
        upcomingSessions: [
          {
            date: "2024-02-18",
            time: "11:00 AM PST",
            topic: "Mobile App Architecture"
          }
        ]
      }
    ];

    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>My Mentors</CardTitle>
            <CardDescription>View and manage your mentorship relationships</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {mentors.map((mentor) => (
                <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="text-xl">
                          {mentor.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-lg">{mentor.name}</h3>
                        <p className="text-sm text-muted-foreground">{mentor.title} at {mentor.company}</p>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
                          <span className="text-sm">{mentor.rating} ({mentor.totalSessions} sessions)</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {mentor.expertise.map((skill, i) => (
                          <Badge key={i} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Upcoming Sessions</h4>
                      <div className="space-y-2">
                        {mentor.upcomingSessions.map((session, i) => (
                          <div key={i} className="text-sm">
                            <div className="font-medium">{session.topic}</div>
                            <div className="text-muted-foreground">
                              {session.date} at {session.time}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <div className="grid grid-cols-3 gap-4">
                        <Link 
                          href={mentor.socials.linkedin} 
                          className="flex justify-center text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Linkedin className="h-5 w-5" />
                        </Link>
                        <Link 
                          href={mentor.socials.twitter} 
                          className="flex justify-center text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Twitter className="h-5 w-5" />
                        </Link>
                        <Link 
                          href={mentor.socials.github} 
                          className="flex justify-center text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Github className="h-5 w-5" />
                        </Link>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Button className="w-full" onClick={() => setSelectedMentor(mentor)}>
                        View Profile
                      </Button>
                      <Button variant="outline" className="w-full">
                        Schedule Session
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
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

    const channels = [
      { id: 'general', name: 'General' },
      { id: 'study-room', name: 'Study Room' },
      { id: 'coding-help', name: 'Coding Help' },
      { id: 'career-advice', name: 'Career Advice' }
    ];

    const onlineUsers = [
      { id: 1, name: 'Sarah Johnson', status: 'online' },
      { id: 2, name: 'Mike Chen', status: 'in-call' },
      { id: 3, name: 'Emma Wilson', status: 'idle' }
    ];

    const startCall = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        setLocalStreamRef(stream);
        setIsCallActive(true);
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
    };

    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Community Space</h2>
                <p className="text-muted-foreground">Connect with fellow learners</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-12 gap-6">
          {/* Channels Sidebar */}
          <div className="md:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Channels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {channels.map(channel => (
                    <Button
                      key={channel.id}
                      variant={selectedChannel === channel.id ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedChannel(channel.id)}
                    >
                      <Hash className="h-4 w-4 mr-2" />
                      {channel.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Online Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {onlineUsers.map(user => (
                    <div key={user.id} className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{user.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-9">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="border-b">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Hash className="h-5 w-5" />
                    {channels.find(c => c.id === selectedChannel)?.name}
                  </CardTitle>
                  <div className="flex gap-2">
                    {!isCallActive ? (
                      <Button onClick={startCall}>
                        <Video className="h-4 w-4 mr-2" />
                        Join Voice
                      </Button>
                    ) : (
                      <Button variant="destructive" onClick={stopCall}>
                        <PhoneOff className="h-4 w-4 mr-2" />
                        Leave Call
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 overflow-y-auto p-4">
                {isCallActive && (
                  <div className="grid grid-cols-2 gap-4 mb-4">
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
                        <div className="absolute bottom-2 right-2 flex gap-2">
                          <Button
                            size="sm"
                            variant={isAudioEnabled ? "default" : "secondary"}
                            onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                          >
                            {isAudioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                          </Button>
                          <Button
                            size="sm"
                            variant={isVideoEnabled ? "default" : "secondary"}
                            onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                          >
                            {isVideoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Chat messages would go here */}
                <div className="space-y-4">
                  {/* Example messages */}
                </div>
              </CardContent>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input placeholder="Type a message..." />
                  <Button>Send</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
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
