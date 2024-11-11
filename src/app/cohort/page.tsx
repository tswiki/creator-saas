
"use client";

import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  BookOpen,
  Calendar,
  Video,
  FileText,
  Users,
  Lock,
  User,
  Send,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  PhoneOff,
  ScreenShare,
} from 'lucide-react';
import {
  Card,
  CardContent, 
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Resource {
  id: number;
  title: string;
  description: string;
  type: 'video' | 'document' | 'assignment';
  url: string;
  completed: boolean;
}

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  channelType: 'cohort' | 'mentor';
}

interface Session {
  id: number;
  title: string;
  date: string;
  time: string;
  description: string;
  mentor: string;
  status: 'scheduled' | 'live' | 'ended';
  participants: Participant[];
}

interface Participant {
  id: number;
  name: string;
  avatar: string;
  isMuted: boolean;
  isVideoOn: boolean;
  isScreenSharing: boolean;
}

const CohortInterface = () => {
  const [resources, setResources] = useState<Resource[]>([
    {
      id: 1,
      title: "Getting Started Guide",
      description: "Essential information to begin your journey",
      type: "document",
      url: "/resources/getting-started.pdf",
      completed: false
    }
  ]);

  const [cohortMessages, setCohortMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "System",
      content: "Welcome to the cohort discussion!",
      timestamp: new Date().toISOString(),
      channelType: 'cohort'
    }
  ]);

  const [mentorMessages, setMentorMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "Mentor",
      content: "Hi! I'm your mentor. Feel free to ask any questions.",
      timestamp: new Date().toISOString(),
      channelType: 'mentor'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [activeChannel, setActiveChannel] = useState<'cohort' | 'mentor'>('cohort');

  const [upcomingSessions, setUpcomingSessions] = useState<Session[]>([
    {
      id: 1,
      title: "1:1 Mentorship Session",
      date: "2024-01-20",
      time: "15:00",
      description: "Personal guidance and progress review",
      mentor: "John Mentor",
      status: 'live',
      participants: [
        {
          id: 1,
          name: "John Mentor",
          avatar: "/avatars/mentor.png",
          isMuted: false,
          isVideoOn: true,
          isScreenSharing: false
        },
        {
          id: 2,
          name: "You",
          avatar: "/avatars/you.png",
          isMuted: true,
          isVideoOn: false,
          isScreenSharing: false
        }
      ]
    }
  ]);

  const [activeSession, setActiveSession] = useState<Session | null>(null);
  const [userAudioEnabled, setUserAudioEnabled] = useState(false);
  const [userVideoEnabled, setUserVideoEnabled] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now(),
      sender: "You",
      content: newMessage,
      timestamp: new Date().toISOString(),
      channelType: activeChannel
    };

    if (activeChannel === 'cohort') {
      setCohortMessages(prev => [...prev, message]);
    } else {
      setMentorMessages(prev => [...prev, message]);
    }

    setNewMessage('');
  };

  const toggleAudio = () => {
    setUserAudioEnabled(!userAudioEnabled);
  };

  const toggleVideo = () => {
    setUserVideoEnabled(!userVideoEnabled);
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
  };

  const joinSession = (session: Session) => {
    setActiveSession(session);
  };

  const leaveSession = () => {
    setActiveSession(null);
    setUserAudioEnabled(false);
    setUserVideoEnabled(false);
    setIsScreenSharing(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Main Content Area */}
        <div className="md:col-span-8 space-y-4">
          {/* Resources Section */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Learning Resources</CardTitle>
              <CardDescription>Access your personalized learning materials</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="videos">Videos</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="assignments">Assignments</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  <ScrollArea className="h-[400px]">
                    {resources.map((resource) => (
                      <Card key={resource.id} className="mb-4">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{resource.title}</CardTitle>
                            {resource.completed && (
                              <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                                Completed
                              </div>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p>{resource.description}</p>
                          <Button variant="outline" className="mt-2">
                            Access Resource
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Upcoming Sessions Section */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
              <CardDescription>Your scheduled mentorship sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                {upcomingSessions.map((session) => (
                  <Card key={session.id} className="mb-4 relative">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{session.title}</CardTitle>
                        {session.status === 'live' && (
                          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs animate-pulse">
                            LIVE
                          </span>
                        )}
                      </div>
                      <CardDescription>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{session.date} at {session.time}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <User className="w-4 h-4" />
                          <span>{session.mentor}</span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {activeSession?.id === session.id ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            {session.participants.map((participant) => (
                              <div key={participant.id} className="bg-gray-100 p-4 rounded-lg">
                                <div className="aspect-video bg-gray-800 rounded-lg mb-2 relative">
                                  {participant.isVideoOn ? (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <Video className="w-8 h-8 text-gray-400" />
                                    </div>
                                  ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <Avatar className="w-16 h-16">
                                        <AvatarImage src={participant.avatar} />
                                        <AvatarFallback>{participant.name[0]}</AvatarFallback>
                                      </Avatar>
                                    </div>
                                  )}
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">{participant.name}</span>
                                  <div className="flex gap-2">
                                    {participant.isMuted && <MicOff className="w-4 h-4 text-gray-500" />}
                                    {participant.isScreenSharing && <ScreenShare className="w-4 h-4 text-blue-500" />}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex justify-center gap-4 pt-4 border-t">
                            <Button
                              variant={userAudioEnabled ? "default" : "outline"}
                              onClick={toggleAudio}
                              className="rounded-full w-12 h-12 p-0"
                            >
                              {userAudioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                            </Button>
                            <Button
                              variant={userVideoEnabled ? "default" : "outline"}
                              onClick={toggleVideo}
                              className="rounded-full w-12 h-12 p-0"
                            >
                              {userVideoEnabled ? <Camera className="w-5 h-5" /> : <CameraOff className="w-5 h-5" />}
                            </Button>
                            <Button
                              variant={isScreenSharing ? "default" : "outline"}
                              onClick={toggleScreenShare}
                              className="rounded-full w-12 h-12 p-0"
                            >
                              <ScreenShare className="w-5 h-5" />
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={leaveSession}
                              className="rounded-full w-12 h-12 p-0"
                            >
                              <PhoneOff className="w-5 h-5" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button 
                          onClick={() => joinSession(session)}
                          variant={session.status === 'live' ? "default" : "outline"}
                          className="w-full"
                        >
                          {session.status === 'live' ? 'Join Now' : 'Join When Live'}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Chat Sidebar */}
        <div className="md:col-span-4">
          <Card className="h-full">
            <CardHeader>
              <Tabs defaultValue="cohort" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="cohort" onClick={() => setActiveChannel('cohort')}>
                    <Users className="w-4 h-4 mr-2" />
                    Cohort
                  </TabsTrigger>
                  <TabsTrigger value="mentor" onClick={() => setActiveChannel('mentor')}>
                    <Lock className="w-4 h-4 mr-2" />
                    Mentor
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="cohort">
                  <ScrollArea className="h-[600px] p-4">
                    {cohortMessages.map((message) => (
                      <div key={message.id} className="mb-4">
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <AvatarFallback>{message.sender[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{message.sender}</div>
                            <div className="text-sm text-gray-500">
                              {new Date(message.timestamp).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                        <p className="mt-2 pl-10">{message.content}</p>
                      </div>
                    ))}
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="mentor">
                  <ScrollArea className="h-[600px] p-4">
                    {mentorMessages.map((message) => (
                      <div key={message.id} className="mb-4">
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <AvatarFallback>{message.sender[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{message.sender}</div>
                            <div className="text-sm text-gray-500">
                              {new Date(message.timestamp).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                        <p className="mt-2 pl-10">{message.content}</p>
                      </div>
                    ))}
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardHeader>
            <CardFooter>
              <div className="flex w-full gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={`Message ${activeChannel === 'cohort' ? 'cohort' : 'mentor'}...`}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button onClick={sendMessage}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CohortInterface;