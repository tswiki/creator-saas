'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import HeroVideoDialog from "@/components/ui/hero-video-dialog";
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
  Check
} from "lucide-react";


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
      username: "user123",
      bio: "",
      niche: "",
      mrr: "",
      goal: ""
    });

    return (
      <div className="h-screen min-h-full w-64 flex flex-col p-4 border-r fixed">
        <div className="font-bold text-2xl mb-6">Mentorship Portal</div>
        
        <div className="flex flex-col gap-3 flex-1">
          <Button variant="ghost" className="justify-start w-full" onClick={() => setCurrentView('dashboard')}>
            <User className="mr-2 h-4 w-4" />
            My Profile
          </Button>
          <Button variant="ghost" className="justify-start w-full">
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

        <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
          <DialogTrigger asChild>
            <Button variant="ghost" className="justify-between w-full mt-auto border-t pt-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="text-sm text-muted-foreground">@{profileData.username}</span>
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
            <DialogFooter>
              <Button onClick={() => setShowProfileDialog(false)}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  const ScheduleView = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Schedule a Mentorship Session</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-4">Select Date</h3>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Select Time</h3>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9:00">9:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="14:00">2:00 PM</SelectItem>
                    <SelectItem value="15:00">3:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Session Type</h3>
                <Select>
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

              <div>
                <h3 className="font-semibold mb-2">Duration</h3>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full mt-4">Confirm Booking</Button>
            </div>
          </div>
        </CardContent>
      </Card>

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
              const [peerConnectionRef, setPeerConnectionRef] = useState<RTCPeerConnection | null>(null);
              const [isCallModalOpen, setIsCallModalOpen] = useState(false);

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
                          try {
                            const stream = await navigator.mediaDevices.getUserMedia({
                              video: true,
                              audio: true
                            });
                            
                            const peerConnection = new RTCPeerConnection({
                              iceServers: [
                                { urls: 'stun:stun.l.google.com:19302' }
                              ]
                            });
                            
                            stream.getTracks().forEach(track => {
                              peerConnection.addTrack(track, stream);
                            });
                            
                            setLocalStreamRef(stream);
                            setPeerConnectionRef(peerConnection);
                            session.isJoined = true;
                            setIsCallModalOpen(true);
                            
                          } catch (err) {
                            console.error("Error joining session:", err);
                            alert("Failed to join session. Please check your camera/microphone permissions.");
                          }
                        }}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Join Session
                      </Button>
                    ) : (
                      <Button variant="outline">Cancel</Button>
                    )}
                  </div>

                  <Dialog open={isCallModalOpen} onOpenChange={setIsCallModalOpen}>
                    <DialogContent className="sm:max-w-[90vw] h-[80vh]">
                      <DialogHeader>
                        <DialogTitle>{session.title}</DialogTitle>
                        <DialogDescription>
                          {session.description}
                        </DialogDescription>
                      </DialogHeader>

                      <div className="flex-1 overflow-hidden">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 h-full">
                          {session.participants.map((participant) => (
                            <div 
                              key={participant.id} 
                              className="relative aspect-video bg-slate-900 rounded-lg overflow-hidden"
                            >
                              {participant.hasVideo ? (
                                <video 
                                  id={`video-${participant.id}`}
                                  autoPlay 
                                  playsInline
                                  muted={participant.id === 1}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="flex items-center justify-center h-full">
                                  <User className="h-20 w-20 text-slate-600" />
                                </div>
                              )}
                              <div className="absolute bottom-2 left-2 flex items-center gap-2 bg-black/50 px-2 py-1 rounded-md">
                                <span className="text-white text-sm">{participant.name}</span>
                                {participant.isSpeaking && (
                                  <Activity className="h-4 w-4 text-green-400" />
                                )}
                                {participant.isMuted && (
                                  <Mic className="h-4 w-4 text-red-400" />
                                )}
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
                          onClick={async () => {
                            try {
                              if (!isScreenSharing) {
                                const screenStream = await navigator.mediaDevices.getDisplayMedia({
                                  video: true
                                });
                                
                                if (peerConnectionRef && localStreamRef) {
                                  const videoTrack = screenStream.getVideoTracks()[0];
                                  const sender = peerConnectionRef.getSenders()
                                    .find((s) => s.track?.kind === 'video');
                                    
                                  if (sender) {
                                    sender.replaceTrack(videoTrack);
                                  }
                                  
                                  videoTrack.onended = () => {
                                    const cameraTrack = localStreamRef.getVideoTracks()[0];
                                    if (sender && cameraTrack) {
                                      sender.replaceTrack(cameraTrack);
                                      setIsScreenSharing(false);
                                    }
                                  };
                                  
                                  setIsScreenSharing(true);
                                }
                              }
                            } catch (err) {
                              console.error("Error sharing screen:", err);
                              setIsScreenSharing(false);
                            }
                          }}
                          className="h-10 w-10 rounded-full"
                        >
                          {isScreenSharing ? <MonitorOff /> : <MonitorUp />}
                        </Button>

                        <Button 
                          variant="destructive"
                          size="icon"
                          onClick={() => {
                            if (localStreamRef) {
                              localStreamRef.getTracks().forEach(track => track.stop());
                            }
                            if (peerConnectionRef) {
                              peerConnectionRef.close();
                            }
                            setLocalStreamRef(null);
                            setPeerConnectionRef(null);
                            session.isJoined = false;
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
    </div>
  );


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



  const MessagesView = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Contacts List */}
            <div className="border-r">
              <div className="font-semibold mb-4">Recent Conversations</div>
              <ScrollArea className="h-[500px]">
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
                  },
                  {
                    name: "Emma Thompson",
                    role: "Program Coordinator",
                    lastMessage: "Don't forget about the workshop",
                    time: "2d ago",
                    unread: false
                  }
                ].map((contact, i) => (
                  <div 
                    key={i} 
                    className={`flex items-start gap-3 p-3 hover:bg-accent rounded-lg cursor-pointer ${
                      contact.unread ? 'bg-accent/50' : ''
                    }`}
                  >
                    <Avatar>
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.name}`} />
                      <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold">{contact.name}</div>
                          <div className="text-sm text-muted-foreground">{contact.role}</div>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{contact.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate mt-1">
                        {contact.lastMessage}
                      </p>
                      {contact.unread && (
                        <Badge variant="default" className="mt-2">New</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </div>

            {/* Chat Area */}
            <div className="md:col-span-2 flex flex-col">
              <div className="border-b p-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah Wilson" />
                    <AvatarFallback>SW</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">Sarah Wilson</div>
                    <div className="text-sm text-muted-foreground">Mentor • Online</div>
                  </div>
                </div>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {[
                    { sender: "mentor", message: "How's your progress on the latest project?", time: "10:30 AM" },
                    { sender: "you", message: "It's going well! I've completed the main features we discussed.", time: "10:32 AM" },
                    { sender: "mentor", message: "That's great to hear! Would you like to review it together tomorrow?", time: "10:35 AM" },
                    { sender: "you", message: "Yes, that would be very helpful!", time: "10:36 AM" }
                  ].map((msg, i) => (
                    <div key={i} className={`flex ${msg.sender === 'you' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] ${msg.sender === 'you' ? 'bg-primary text-primary-foreground' : 'bg-muted'} rounded-lg p-3`}>
                        <p>{msg.message}</p>
                        <span className="text-xs opacity-70 mt-1 block">{msg.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="border-t p-4">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Type your message..." 
                    className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  />
                  <Button>Send</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const DashboardView = () => (
    <div className="max-w-7xl mx-auto space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Welcome back, John!</h2>
              <p className="text-muted-foreground">Your next mentorship session is in 2 days</p>
            </div>
            <Button onClick={() => setCurrentView('schedule')}>Schedule Session</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Technical Discussion",
                    time: "Tomorrow, 2:00 PM",
                    description: "Code Review and Architecture Discussion"
                  },
                  {
                    title: "Career Growth",
                    time: "Friday, 11:00 AM",
                    description: "Career Development Planning"
                  }
                ].map((session, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1">
                      <Video className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{session.title}</h3>
                      <p className="text-sm text-muted-foreground">{session.time}</p>
                      <p className="text-sm">{session.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Learning Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardContent className="pt-6">
                      <h4 className="font-semibold mb-2">Resource {i}</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Essential learning material for your growth
                      </p>
                      <Button className="w-full">Access</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Mentor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">Senior Software Engineer</p>
                  <Badge className="mt-2">Available</Badge>
                </div>
              </div>
              <Button className="w-full mt-4">Send Message</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Progress Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                You've completed 60% of your learning goals
              </p>
              <Button className="w-full">View Details</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

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
      </div>
    </div>
  );
}


