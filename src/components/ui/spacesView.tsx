import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select";
import { Hash } from "crypto";
import { Star, Heart, MessageCircle, Share, Video, PhoneOff, Paperclip, Send, Mic, MicOff, VideoOff, MonitorOff, MonitorPlay } from "lucide-react";
import { useState } from "react";
import { Button } from "react-day-picker";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./card";
import { DialogHeader } from "./dialog";
import { Input } from "./input";


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

  export default SpacesView;