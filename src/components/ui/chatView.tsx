
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useView } from '@/contexts/viewContext';
import { auth } from '@/firebase/firebaseConfig';
import {
  MessageCircle,
  Users,
  Users2,
  MonitorPlay,
  Clock,
  MessageSquare,
  Bookmark,
  RefreshCw,
  Heart,
  Share2,
  Link2,
  ActivityIcon,
  Code,
  Brain,
  Cloud,
  Smartphone,
  XIcon
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './dialog';
import { Label } from './label';
import { Input } from './input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';


const users = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    role: 'Developer',
    avatar: '/avatars/01.png',
    status: 'online',
    lastSeen: 'Now'
  },
  {
    id: '2', 
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    role: 'Designer',
    avatar: '/avatars/02.png',
    status: 'offline',
    lastSeen: '2h ago'
  },
  {
    id: '3',
    name: 'Carol Williams',
    email: 'carol.williams@example.com',
    role: 'Product Manager',
    avatar: '/avatars/03.png', 
    status: 'online',
    lastSeen: 'Now'
  },
  {
    id: '4',
    name: 'Dave Brown',
    email: 'dave.brown@example.com',
    role: 'Developer',
    avatar: '/avatars/04.png',
    status: 'away',
    lastSeen: '5m ago'
  },
  {
    id: '5',
    name: 'Eve Davis',
    email: 'eve.davis@example.com',
    role: 'Designer',
    avatar: '/avatars/05.png',
    status: 'online',
    lastSeen: 'Now'
  }
];

const selectedUsers: string[] = [];


const ChatView = () => {
  const { currentView, setCurrentView } = useView(' ');
  const [callName, setCallName] = useState<string>('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const handleJoinChannel = () => {
    setCurrentView('channel');
  };

  const handleJoinVideo = (callName: string, intendedUsers: string[]) => {
    setCurrentView('spaces');
    // Directly use the URL structure from page.tsx
    const searchParams = new URLSearchParams();
    searchParams.set('call', callName);
    searchParams.set('users', intendedUsers.join(','));
    window.location.href = `/spaces?${searchParams.toString()}`;
  };

  const handleJoinStream = () => {
    setCurrentView('stream');
  };

  
  function setDialogOpen(arg0: boolean) {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="fixed h-[calc(100vh-3.5rem)] w-[calc(100vw-16rem)] left-64 top-14 p-4 overflow-hidden">
      <Card className="h-full w-full border-4 border-primary">
        <div className="flex justify-center items-center h-full">
          <Card className="w-full h-full border-4 border-primary bg-gradient-to-br from-background to-accent/20">
            <CardHeader>
              <div>
              </div>

              <Card className="border-4">
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Community Stream Column */}
                    <Card className="group border-4 border-primary/50 hover:border-primary transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5">
                      <div className="p-4 space-y-4">
                        <h3 className="text-lg font-semibold">Community Stream</h3>
                        <div className="flex items-center gap-2">
                          <MonitorPlay className="h-5 w-5 text-primary" />
                          <span className="text-sm text-muted-foreground">Live Now</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/avatars/community.png" />
                            <AvatarFallback>CM</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">Tech Talks Live</p>
                            <p className="text-xs text-muted-foreground">250 viewers</p>
                          </div>
                        </div>
                        <Button onClick={handleJoinStream} className="w-full group-hover:bg-primary/90">
                          Join Community Stream
                        </Button>
                      </div>
                    </Card>

                    {/* Cohort Stream Column */}
                    <Card className="group border-4 border-primary/50 hover:border-primary transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5">
                      <div className="p-4 space-y-4">
                        <h3 className="text-lg font-semibold">Cohort Stream</h3>
                        <div className="flex items-center gap-2">
                          <MonitorPlay className="h-5 w-5 text-primary" />
                          <span className="text-sm text-muted-foreground">Starting Soon</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/avatars/cohort.png" />
                            <AvatarFallback>CH</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">Cohort Workshop</p>
                            <p className="text-xs text-muted-foreground">25 participants</p>
                          </div>
                        </div>
                        <Button onClick={handleJoinStream} className="w-full group-hover:bg-primary/90">
                          Join Cohort Stream
                        </Button>
                      </div>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </CardHeader>

            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="group border-4 border-primary/50 hover:border-primary transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5">
                <div className="p-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <MessageCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-base text-center">Webinar</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-2">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        15 new messages
                      </p>
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full group-hover:bg-primary/90 text-sm py-2">
                        Join Discussion
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Join Video Call</DialogTitle>
                        <DialogDescription>
                          Enter a name for the call and optionally invite participants
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Call Name</Label>
                          <Input 
                            defaultValue={`${auth.currentUser?.displayName || auth.currentUser?.email?.split('@')[0]}'s Call`}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCallName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Invite Users (Optional)</Label>
                          <Select
                            onValueChange={(value: string) => {
                              if (value) {
                                const newUsers = [...selectedUsers, value];
                                setSelectedUsers(newUsers);
                              }
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select users to invite" />
                            </SelectTrigger>
                            <SelectContent>
                              {users?.map((user) => (
                                <SelectItem 
                                  key={user.email}
                                  value={user.email}
                                >
                                  {user.name || user.email.split('@')[0]}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <div className="mt-2">
                            <Label>Selected Users:</Label>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {selectedUsers.map((userId: string) => {
                                const user = users?.find(u => u.email === userId);
                                return (
                                  <Badge 
                                    key={userId}
                                    variant="secondary"
                                    className="flex items-center gap-1"
                                  >
                                    {user?.name || user?.email.split('@')[0]}
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="h-4 w-4 p-0 hover:bg-transparent"
                                      onClick={() => {
                                        const filteredUsers = selectedUsers.filter(id => id !== userId);
                                        setSelectedUsers(filteredUsers);
                                      }}
                                    >
                                      <XIcon className="h-3 w-3" />
                                    </Button>
                                  </Badge>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button 
                          onClick={() => {
                            if (callName) {
                              // If no users are selected, pass an array with empty string
                              const usersToInvite = selectedUsers.length === 0 ? [''] : selectedUsers;
                              handleJoinVideo(callName, usersToInvite);
                              setDialogOpen(false);
                            }
                          }}
                          disabled={!callName}
                        >
                          Start Call
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </Card>

              <Card className="group border-4 border-primary/50 hover:border-primary transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5">
                <div className="p-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-base text-center">Community Chat</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-2">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        5 mentors online
                      </p>
                    </div>
                  </div>
                  <Button onClick={handleJoinChannel} className="w-full group-hover:bg-primary/90 text-sm py-2">
                    Meet Mentors
                  </Button>
                </div>
              </Card>

              <Card className="group border-4 border-primary/50 hover:border-primary transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5">
                <div className="p-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <ActivityIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-base">Activity Feed</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-2">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        10 new updates
                      </p>
                    </div>
                  </div>
                  <Button onClick={handleJoinStream} className="w-full group-hover:bg-primary/90 text-sm py-2">
                    View Activities
                  </Button>
                </div>
              </Card>
            </CardContent>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default ChatView;
