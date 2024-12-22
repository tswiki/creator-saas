import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { BookOpen, Badge, MoreVertical, Star, Upload, Calendar, Video, CalendarIcon, Clock, User, MicOff, Activity, VideoOff, Mic, MonitorOff, MonitorUp, PhoneOff } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "react-day-picker";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "./card";
import { DialogHeader } from "./dialog";
import { Input } from "./input";


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
                      <Button className="w-full" variant="outline">Library</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[90vw] max-h-[85vh] w-full h-full">
                      <DialogHeader>
                        <DialogTitle>Collections</DialogTitle>
                        <DialogDescription>
                          Browse your collections and uploaded resources
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-[2fr,1fr] gap-4 h-[calc(85vh-120px)]">
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-4">
                            <Input placeholder="Search resources..." className="flex-1" />
                            <Select defaultValue="all">
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Resources</SelectItem>
                                <SelectItem value="pdf">PDFs</SelectItem>
                                <SelectItem value="video">Videos</SelectItem>
                                <SelectItem value="document">Documents</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <Tabs defaultValue="all" className="flex-1">
                            <TabsList>
                              <TabsTrigger value="all">All</TabsTrigger>
                              <TabsTrigger value="collections">Collections</TabsTrigger>
                              <TabsTrigger value="favorites">Favorites</TabsTrigger>
                              <TabsTrigger value="recent">Recently Added</TabsTrigger>
                            </TabsList>

                            <TabsContent value="all" className="mt-4">
                              <ScrollArea className="h-[calc(85vh-250px)]">
                                <div className="grid gap-4 p-4">
                                  {[
                                    {
                                      title: "System Design Interview Guide",
                                      type: "PDF",
                                      addedOn: "2024-01-15",
                                      favorite: true,
                                      collection: "Interview Prep"
                                    },
                                    {
                                      title: "Building Scalable Web Apps",
                                      type: "Video",
                                      addedOn: "2024-01-10",
                                      favorite: true,
                                      collection: "System Design"
                                    },
                                    {
                                      title: "Data Structures Cheat Sheet",
                                      type: "Document", 
                                      addedOn: "2024-01-05",
                                      favorite: false,
                                      collection: "DSA"
                                    }
                                  ].map((resource, i) => (
                                    <Card key={i} className="transition-all hover:shadow-md">
                                      <CardContent className="flex items-center justify-between p-4">
                                        <div className="flex items-center gap-4">
                                          <BookOpen className="h-8 w-8 text-muted-foreground" />
                                          <div>
                                            <h4 className="font-medium">{resource.title}</h4>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                              <span>Added on {resource.addedOn}</span>
                                              <span>•</span>
                                              <span>Collection: {resource.collection}</span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Badge variant="secondary">{resource.type}</Badge>
                                          <Button variant="ghost" size="icon">
                                            <MoreVertical className="h-4 w-4" />
                                          </Button>
                                          <Star className={`h-4 w-4 cursor-pointer transition-colors ${resource.favorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground hover:text-yellow-400"}`} />
                                        </div>
                                      </CardContent>
                                    </Card>
                                  ))}
                                </div>
                              </ScrollArea>
                            </TabsContent>
                          </Tabs>
                        </div>

                        <Card className="h-full flex flex-col">
                          <CardHeader>
                            <CardTitle className="text-lg">Upload Resources</CardTitle>
                            <CardDescription>Add new files to your library</CardDescription>
                          </CardHeader>
                          <CardContent className="flex-1">
                            <div className="space-y-4">
                              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">
                                  Drag and drop files here or click to browse
                                </p>
                              </div>
                              <div className="space-y-2">
                                <Label>Add to Collection</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select collection" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="interview">Interview Prep</SelectItem>
                                    <SelectItem value="system">System Design</SelectItem>
                                    <SelectItem value="dsa">DSA</SelectItem>
                                    <SelectItem value="new">Create New Collection...</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <Button className="w-full">Upload Files</Button>
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

export default ScheduleView;


