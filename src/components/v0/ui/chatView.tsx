
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/v0/ui/card";
import { Button } from "@/components/v0/ui/button";
import { ScrollArea } from "@/components/v0/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/v0/ui/avatar";
import { Badge } from "@/components/v0/ui/badge";
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
  Smartphone
} from "lucide-react";

const ChatView = () => {
  const { currentView, setCurrentView } = useView(' ');

  const handleJoinChannel = () => {
    setCurrentView('channel');
  };

  const handleJoinVideo = () => {
    setCurrentView('video');
  };

  const handleJoinStream = () => {
    setCurrentView('stream');
  };

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
                  <div className="grid grid-cols-2">
                    {/* Active Conversations Column */}
                    <div className="space-y-3">
                      <h3 className="text-center font-semibold text-lg">Active Discussions</h3>
                      <ScrollArea className="h-[200px]">
                        <div className="space-y-2">
                          {[
                            { title: "Next.js Performance Tips", participants: 12, messages: 45, icon: <ActivityIcon className="h-4 w-4" /> },
                            { title: "React State Management", participants: 8, messages: 32, icon: <RefreshCw className="h-4 w-4" /> },
                            { title: "TypeScript Best Practices", participants: 15, messages: 67, icon: <MessageSquare className="h-4 w-4" /> }
                          ].map((convo, i) => (
                            <div className="flex items-center justify-center">
                              <Card key={i} className="border-4 p-2 rounded-lg bg-accent/50 hover:bg-accent/70 transition-colors w-[75%]">
                                <div className="flex items-center p-1">
                                  <div className="justify-center">
                                    {convo.icon}
                                  </div>
                                  <div className="flex items-center justify-end w-full">
                                    <span className="font-medium text-center w-full px-4">{convo.title}</span>
                                    <Badge variant="secondary" className="ml-auto px-4">{convo.messages}</Badge>
                                  </div>
                                </div>
                              </Card>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>

                    {/* Trending Topics Column */}
                    <div className="space-y-3">
                      <h3 className="text-center font-semibold text-lg">Trending Topics</h3>
                      <ScrollArea className="h-[200px]">
                        <div className="space-y-2">
                          {[
                            { topic: "Frontend Development", mentions: 156, trend: "↑", icon: <Code className="h-4 w-4" /> },
                            { topic: "AI Integration", mentions: 124, trend: "↑", icon: <Brain className="h-4 w-4" /> },
                            { topic: "Cloud Architecture", mentions: 98, trend: "→", icon: <Cloud className="h-4 w-4" /> }, 
                            { topic: "Mobile Development", mentions: 76, trend: "→", icon: <Smartphone className="h-4 w-4" /> }
                          ].map((topic, i) => (
                            <div className="flex items-center justify-center">
                              <Card key={i} className="border-4 p-2 rounded-lg bg-accent/50 hover:bg-accent/70 transition-colors w-[75%]">
                                <div className="flex items-center p-1">
                                  <div className="justify-center">
                                    {topic.icon}
                                  </div>
                                  <div className="flex items-center justify-end w-full">
                                    <span className="font-medium text-center w-full px-4">{topic.topic}</span>
                                    <Badge variant="secondary" className="ml-auto px-4">{topic.mentions}</Badge>
                                  </div>
                                </div>
                              </Card>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
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
                      <p className="font-semibold text-base">Live Discussion</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-2">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        15 new messages
                      </p>
                    </div>
                  </div>
                  <Button onClick={handleJoinVideo} className="w-full group-hover:bg-primary/90 text-sm py-2">
                    Join Discussion
                  </Button>
                </div>
              </Card>

              <Card className="group border-4 border-primary/50 hover:border-primary transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5">
                <div className="p-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-base">Mentor Connect</p>
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
