
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
  Subtitles,
  ArrowUpDown,
  BarChart2,
  Repeat,
  Share2,
  Bookmark,
  MoreHorizontal,
  Sparkles,
  HelpCircle,
  Folder,
  FileIcon,
  FileX,
  ChevronDown,
  ExternalLink,
  Package,
  Table,
  PlayCircle,
  Link2,
  FolderKanban,
  UserMinus,
  TrendingUp,
  Film,
  Compass,
  Icon,
  Code,
  PenTool,
  Database,
  FolderTree
} from "lucide-react";
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, Label, DropdownMenuSeparator, RadioGroup, Separator } from '@radix-ui/react-dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import { toast } from '@/hooks/use-toast';
import { Textarea } from './textarea';
import { Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarMenu, MenubarRadioGroup, MenubarRadioItem, MenubarSeparator, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from './menubar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';
import SpacesView from './chatView';
import {EventCreationDialog} from '../v0/event-creation-dialog'
import ResourceCreationDialog from '../v0/resource-creation-dialog';
import EmailInbox from '../v0/email-inbox';
import { useView } from '@/contexts/viewContext'
import { useAdmin } from '@/contexts/adminContext';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './carousel';

const DashboardView = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slides = [
    {
      title: "Schedule Overview",
      description: "Upcoming meetings and deadlines",
      component: (
        <div className="p-4">
          <Card className="relative border-4 border-primary">
            <div className="absolute top-6 right-6">
              <Card className="p-2 border-2 border-primary">
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={prevSlide}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={nextSlide}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </div>
            <CardHeader>
              <CardTitle>This Week's Schedule</CardTitle>
              <CardDescription>Your upcoming events and tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Card className="p-4 border-2 border-primary">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Weekly Team Standup</p>
                      <p className="text-sm text-muted-foreground">Today at 2:00 PM</p>
                    </div>
                  </div>
                  <Badge>Meeting</Badge>
                </div>
              </Card>
              <Card className="p-4 border-2 border-primary">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Project Deadline</p>
                      <p className="text-sm text-muted-foreground">In 2 days</p>
                    </div>
                  </div>
                  <Badge variant="destructive">High Priority</Badge>
                </div>
              </Card>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      title: "Community Feed",
      description: "Latest community updates and activities", 
      component: (
        <div className="p-4">
          <Card className="relative border-4 border-primary">
            <div className="absolute top-6 right-6">
              <Card className="p-2 border-2 border-primary">
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={prevSlide}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={nextSlide}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Community Stream</CardTitle>
                  <CardDescription>Recent activities and updates</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-20rem)] pr-4">
                <div className="space-y-4">
                  <Card className="p-4 border-2 border-primary">
                    <div className="flex gap-4">
                      <Avatar>
                        <AvatarImage src="/avatars/sarah.jpg" />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium">Sarah Chen</span>
                            <span className="text-muted-foreground"> started a live stream</span>
                          </div>
                          <span className="text-sm text-muted-foreground">2m ago</span>
                        </div>
                        <p className="mt-2">🎥 Building a Full-Stack App with Next.js - Join now!</p>
                        <div className="mt-3 flex gap-2">
                          <Button size="sm">
                            <MonitorPlay className="h-4 w-4 mr-2" />
                            Join Stream
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Comment
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 border-2 border-primary">
                    <div className="flex gap-4">
                      <Avatar>
                        <AvatarImage src="/avatars/alex.jpg" />
                        <AvatarFallback>AR</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium">Alex Rivera</span>
                            <span className="text-muted-foreground"> shared a resource</span>
                          </div>
                          <span className="text-sm text-muted-foreground">15m ago</span>
                        </div>
                        <p className="mt-2">📚 Great article on React performance optimization</p>
                        <Card className="mt-3 p-3 bg-muted">
                          <div className="flex items-center gap-2">
                            <Link2 className="h-4 w-4" />
                            <span className="text-sm">React Performance: A Deep Dive</span>
                          </div>
                        </Card>
                        <div className="mt-3 flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Heart className="h-4 w-4 mr-2" />
                            Like
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Comment
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 border-2 border-primary">
                    <div className="flex gap-4">
                      <Avatar>
                        <AvatarImage src="/avatars/maria.jpg" />
                        <AvatarFallback>MK</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium">Maria Kim</span>
                            <span className="text-muted-foreground"> posted an announcement</span>
                          </div>
                          <span className="text-sm text-muted-foreground">1h ago</span>
                        </div>
                        <p className="mt-2">🎉 New workshop series starting next week! Topics include Docker, K8s, and Cloud Native development.</p>
                        <div className="mt-3 flex gap-2">
                          <Button size="sm">Register Now</Button>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Comment
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      title: "Community Chat",
      description: "Connect with your peers and mentors",
      component: (
        <div className="p-4">
          <Card className="relative border-4 border-primary">
            <div className="absolute top-6 right-6">
              <Card className="p-2 border-2 border-primary">
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={prevSlide}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={nextSlide}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </div>
            <CardHeader>
              <CardTitle>Community Discussions</CardTitle>
              <CardDescription>Recent conversations and topics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Card className="p-4 border-2 border-primary">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Technical Discussion</p>
                      <p className="text-sm text-muted-foreground">15 new messages</p>
                    </div>
                  </div>
                  <Badge>Active</Badge>
                </div>
              </Card>
              <Card className="p-4 border-2 border-primary">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Mentorship Group</p>
                      <p className="text-sm text-muted-foreground">5 mentors online</p>
                    </div>
                  </div>
                  <Button size="sm">Join Chat</Button>
                </div>
              </Card>
              <Card className="p-4 border-2 border-primary">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Q&A Forum</p>
                      <p className="text-sm text-muted-foreground">3 unanswered questions</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">View All</Button>
                </div>
              </Card>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      title: "Chat Spaces", 
      description: "Community discussions and mentorship",
      component: (
        <div className="p-4">
          <Card className="relative border-2 border-primary">
            <div className="absolute top-6 right-6">
              <Card className="p-2 border-2 border-primary">
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={prevSlide}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={nextSlide}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </div>
            <CardHeader>
              <CardTitle>Active Spaces</CardTitle>
              <CardDescription>Connect with mentors and peers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Card className="p-4 border-2 border-primary">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users2 className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Discord Community</p>
                      <p className="text-sm text-muted-foreground">125 members online</p>
                    </div>
                  </div>
                  <Button size="sm">Join</Button>
                </div>
              </Card>
              <Card className="p-4 border-2 border-primary">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MonitorPlay className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Live Streams</p>
                      <p className="text-sm text-muted-foreground">2 streams active</p>
                    </div>
                  </div>
                  <Button size="sm">Watch</Button>
                </div>
              </Card>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      title: "Recent Activity",
      description: "Your recent and most accessed content",
      component: (
        <div className="p-4">
          <Card className="relative border-2 border-primary">
            <div className="absolute top-6 right-6">
              <Card className="p-2 border-2 border-primary">
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={prevSlide}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={nextSlide}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </div>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Your most accessed resources and actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Card className="p-4 border-2 border-primary">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5" />
                    <div>
                      <p className="font-medium">TypeScript Tutorial Series</p>
                      <p className="text-sm text-muted-foreground">Last accessed 2 hours ago</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Resume</Button>
                </div>
              </Card>
              <Card className="p-4 border-2 border-primary">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Discord Community Chat</p>
                      <p className="text-sm text-muted-foreground">Active 30 minutes ago</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Rejoin</Button>
                </div>
              </Card>
              <Card className="p-4 border-2 border-primary">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bookmark className="h-5 w-5" />
                    <div>
                      <p className="font-medium">React Best Practices Guide</p>
                      <p className="text-sm text-muted-foreground">Bookmarked yesterday</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Continue</Button>
                </div>
              </Card>
            </CardContent>
          </Card>
        </div>
      )
    }
    ,{
      title: "Resources",
      description: "Learning materials and documentation", 
      component: (
        <div className="p-4">
          <Card className="relative border-2 border-primary">
            <div className="absolute top-6 right-6">
              <Card className="p-2 border-2 border-primary">
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={prevSlide}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={nextSlide}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </div>
            <CardHeader>
              <CardTitle>Latest Resources</CardTitle>
              <CardDescription>Recently added learning materials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Card className="p-4 border-2 border-primary">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5" />
                    <div>
                      <p className="font-medium">React Best Practices Guide</p>
                      <p className="text-sm text-muted-foreground">Added 2 days ago</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">View</Button>
                </div>
              </Card>
              <Card className="p-4 border-2 border-primary">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Youtube className="h-5 w-5" />
                    <div>
                      <p className="font-medium">TypeScript Tutorial Series</p>
                      <p className="text-sm text-muted-foreground">8 videos</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Watch</Button>
                </div>
              </Card>
            </CardContent>
          </Card>
        </div>
      )
    }
  ];

  return (
    <div className="fixed h-[calc(100vh-3.5rem)] w-[calc(100vw-16rem)] left-64 top-14 p-4 overflow-hidden">
      <Card className="h-full w-full border-2 border-primary">
        <div className="relative h-full w-full overflow-hidden">
          <div className="flex items-center justify-center gap-6 p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300">
            <Card className="flex flex-col items-center p-3 border-2 border-primary">
              <h2 className="text-2xl font-bold">
                {(() => {
                  const hour = new Date().getHours();
                  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
                  return `${greeting}, ${auth.currentUser?.displayName?.split(' ')[0] || 'Guest'}`
                })()}
              </h2>
            </Card>
          </div>
          <div className="absolute inset-0 flex justify-center items-center px-6">
            {slides.map((slide, index) => {
              let distance = Math.abs(currentSlide - index);
              if (distance > slides.length / 2) {
                distance = slides.length - distance;
              }
              if (distance > 1) return null;
              
              const isCenter = distance === 0;
              let position;
              if (index === (currentSlide + 1) % slides.length) {
                position = 1;
              } else if (index === (currentSlide - 1 + slides.length) % slides.length) {
                position = -1;
              } else {
                position = 0;
              }
              
              const overlap = position * 85;
              
              return (
                <div
                  key={index}
                  className="absolute transition-all duration-500 h-auto min-h-[60%] max-h-[90%] w-[70%] max-w-2xl"
                  style={{
                    transform: `translateX(${overlap}%) scale(${isCenter ? 0.945 : 0.81})`,
                    opacity: isCenter ? 1 : 0.5,
                    zIndex: isCenter ? 20 : position === -1 ? 5 : 1,
                    pointerEvents: isCenter ? 'auto' : 'none',
                    boxShadow: isCenter ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' : 'none',
                    filter: isCenter ? 'none' : 'blur(3px)'
                  }}
                >
                  <div className="h-full w-full overflow-auto rounded-lg bg-background">
                    {slide.component}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-30">
            {slides.map((_, index) => (
              <Button
                key={index}
                variant={currentSlide === index ? "default" : "outline"}
                size="sm"
                className="w-2 h-2 p-0 rounded-full"
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};


const ProfileView = () => {
  const [profileData, setProfileData] = useState({
    username: "johndoe@example.com",
    fullName: "John Doe",
    email: "johndoe@example.com",
    photoURL: "/default-avatar.png", 
    bio: "Software Developer & Mentor",
    skills: ["React", "TypeScript", "Node.js"],
    achievements: ["Top Contributor 2023", "Mentor of the Month"],
    niche: "Full Stack Development",
    goal: "Help others learn and grow in tech"
  });

  return (
    <div className="fixed h-[calc(100vh-3.5rem)] w-[calc(100vw-16rem)] left-64 top-14 p-4 overflow-hidden">
      <Card className="h-full w-full border-2 border-primary">
        <div className="relative h-full w-full overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            <div className="flex flex-col">
              <Card className="md:col-span-1 border-2 border-primary h-fit">
                <CardContent className="pt-12">
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative w-24 h-24 md:w-32 md:h-32">
                      <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-primary">
                        <img
                          src={profileData.photoURL}
                          alt={profileData.fullName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-lg md:text-xl">{profileData.fullName}</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">{profileData.email}</p>
                    </div>
                    <div className="w-full pt-2">
                      <div className="flex justify-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Calendar className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2 border-primary mt-5">
                <CardContent className="flex flex-col gap-4 p-6">
                  <div className="flex justify-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => window.open('https://linkedin.com', '_blank')}>
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => window.open('https://twitter.com', '_blank')}>
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => window.open('https://instagram.com', '_blank')}>
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => window.open('https://github.com', '_blank')}>
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

                       

            <div className="md:col-span-2 space-y-4 overflow-y-auto max-h-[calc(100vh-10rem)]">
              <Card className="border-2 border-primary">
                <CardHeader className="py-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <FileText className="h-4 w-4" />
                    About
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs md:text-sm text-muted-foreground">{profileData.bio}</p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-2 border-primary">
                  <CardHeader className="py-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Sparkles className="h-4 w-4" />
                      Skills & Expertise
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1">
                      {profileData.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-primary">
                  <CardHeader className="py-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Trophy className="h-4 w-4" />
                      Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      {profileData.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                          <CheckCircle className="h-3 w-3 text-primary" />
                          {achievement}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-2 border-primary">
                <CardHeader className="py-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Target className="h-4 w-4" />
                    Goals & Focus
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm mb-1">Niche</h4>
                    <p className="text-xs md:text-sm text-muted-foreground">{profileData.niche}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-1">Current Goal</h4>
                    <p className="text-xs md:text-sm text-muted-foreground">{profileData.goal}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Card>
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
    <div className="fixed h-[calc(100vh-3.5rem)] w-[calc(100vw-16rem)] left-64 top-14 p-4">
      <Card className="w-full border-2 border-primary">
        <Card className="rounded-b-none border-b-0">
          <Card>
            <CardHeader className="sticky top-0 bg-background z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pl-10">
                <Card className="bg-white dark:bg-gray-800 shadow-sm">
                  <CardHeader className="p-2">
                    <div>
                      <CardTitle>Timeline</CardTitle>
                    </div>
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
                  <div>
                  <EventCreationDialog />
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Card>

        <Card>
          <CardContent className="flex h-[calc(100vh-12rem)]">
            <ScrollArea>
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
            </ScrollArea>
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
  const { currentView, setCurrentView } = useView();
  useEffect(() => {
    setCurrentView('dashboard');
  }, []);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const Sidebar = () => {
    const [showProfileDialog, setShowProfileDialog] = useState(false);
    const [currentProfileView, setCurrentProfileView] = useState('details');
    const { currentView, setCurrentView } = useView('dashboard');
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
      <div className="mt-16 fixed top-0 left-0 bottom-10 w-64">
        <div className="h-full flex flex-col p-4 bg-background">
          <div className="flex flex-col gap-3 flex-1">
            <div className="pl-5">
              <Button variant="ghost" className="justify-start w-full pl-10" onClick={() => setCurrentView('dashboard')}>
                <LayoutDashboard className="mr-2 h-4 w-4 pl-" />
                Dashboard
              </Button>
            </div>
            <div className="pl-5">
              <Button variant="ghost" className="justify-start w-full pl-10" onClick={() => setCurrentView('spaces')}>
                <Hash className="mr-2 h-4 w-4" />
                Spaces
              </Button>
            </div>
            <div className="pl-5">
              <Button variant="ghost" className="justify-start w-full pl-10" onClick={() => setCurrentView('connect')}>
                <Users className="mr-2 h-4 w-4" />
                Connect
              </Button>
            </div>
            <div className="pl-5">
              <Button variant="ghost" className="justify-start w-full pl-10" onClick={() => setCurrentView('schedule')}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                Schedule
              </Button>
            </div>
            <div className="pl-5">
              <Button variant="ghost" className="justify-start w-full pl-10" onClick={() => setCurrentView('resources')}>
                <BookOpen className="mr-2 h-4 w-4" />
                Resources
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center w-full pt-3">
            <div className="flex items-center justify-center space-x-2 pb-5">
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

          <div className="px-4">
            <Card className="border-2 border-primary">
              <CardContent className="p-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="text-sm font-medium text-muted-foreground">Engagement Score</div>
                  <div className="relative w-20 h-20">
                    <svg className="w-20 h-20 transform -rotate-90">
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-muted/20"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 36}`}
                        strokeDashoffset={`${2 * Math.PI * 36 * (1 - 0.87)}`}
                        className="text-primary"
                      />
                    </svg>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold">
                      87%
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground text-center mt-1">
                    Great engagement this week!
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  };
  const FilesView = () => {
    const [files, setFiles] = useState<any[]>([]);
    const [showUploadDialog, setShowUploadDialog] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    useEffect(() => {
      const fetchFiles = async () => {
        try {
          const response = await fetch('/api/files');
          if (!response.ok) {
            throw new Error('Failed to fetch files');
          }
          const data = await response.json();
          setFiles(data);
        } catch (error) {
          console.error('Error fetching files:', error);
        }
      };

      fetchFiles();
    }, []);

    return (
      <div className="fixed h-[calc(100vh-3.5rem)] w-[calc(100vw-16rem)] left-64 top-14 p-4 overflow-auto">
        <Card className="h-full w-full border-2 border-primary">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Files</CardTitle>
              <Button 
                onClick={() => setShowUploadDialog(true)}
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                Upload File
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {files.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[60vh] text-muted-foreground">
                <FileX className="h-16 w-16 mb-4" />
                <p>No files uploaded yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {files.map((file) => (
                  <Card key={file.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <FileIcon className="h-8 w-8 text-blue-500" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{file.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {file.size} • {file.uploadedAt}
                          </p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share className="h-4 w-4 mr-2" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload File</DialogTitle>
              <DialogDescription>
                Choose a file to upload to your workspace
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Input type="file" className="hidden" id="file-upload" />
                <label 
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Click to select a file or drag and drop
                  </span>
                </label>
              </div>
              {uploadProgress > 0 && (
                <Progress value={uploadProgress} className="w-full" />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  };


  const SocialsView = () => {
    const socialChannels = [
      {
        platform: "Instagram",
        handle: "@creator_handle",
        followers: "10.2K",
        icon: <Instagram className="h-5 w-5" />,
        color: "bg-gradient-to-r from-purple-500 to-pink-500"
      },
      {
        platform: "Twitter",
        handle: "@creator_handle", 
        followers: "5.8K",
        icon: <Twitter className="h-5 w-5" />,
        color: "bg-blue-400"
      },
      {
        platform: "LinkedIn",
        handle: "@creator_handle",
        followers: "3.2K",
        icon: <Linkedin className="h-5 w-5" />,
        color: "bg-blue-600"
      },
      {
        platform: "TikTok",
        handle: "@creator_handle",
        followers: "25.5K", 
        icon: <Video className="h-5 w-5" />,
        color: "bg-black"
      },
      {
        platform: "YouTube",
        handle: "@creator_handle",
        followers: "12.3K",
        icon: <Youtube className="h-5 w-5" />,
        color: "bg-red-600"
      }
    ];

    return (
      <div className="fixed h-[calc(100vh-3.5rem)] w-[calc(100vw-16rem)] left-64 top-14 p-4 overflow-auto">
        <Card className="h-full w-full border-2 border-primary">
          <CardContent className="max-w-[800px] mx-auto border-none">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left Column */}
              <div className="pt-2">
                <div className="w-full mx-auto">
                  <Card className="border-2 border-primary p-3">
                    <CardContent className="flex flex-col space-y-2">
                      <div className="flex justify-center">
                        <Card className="p-4">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20">
                              <AvatarImage src="/avatars/channel-avatar.png" />
                              <AvatarFallback>CH</AvatarFallback>
                            </Avatar>
                            <div>
                              <h2 className="text-2xl font-bold">Code Horizons</h2>
                              <p className="text-muted-foreground">256K subscribers</p>
                            </div>
                          </div>
                        </Card>
                      </div>

                      <div className="space-y-2 pt-2">
                        <Card className="border border-border">
                          <CardContent className="p-4">
                            <div className="flex">
                              <div className="w-[20%]">
                                <h3 className="mb-2">Vision</h3>
                              </div>
                              <div className="pl-8 w-[80%]">
                                <p className="text-muted-foreground">
                                  Teaching modern web development through practical projects and in-depth tutorials. 
                                  Specializing in React, TypeScript, and full-stack development.
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <div className="pt-3">
                          <Card className="border border-border pt-2">
                            <CardHeader className="p-4">
                              <div className="flex">
                                <div className="w-[20%]">
                                  <h3 className="">Contact</h3>
                                </div>
                                <div className="pl-8 w-[80%]">
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      <Globe className="h-4 w-4 text-muted-foreground" />
                                      <a href="#" className="text-primary hover:underline">codehorizons.dev</a>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Mail className="h-4 w-4 text-muted-foreground" />
                                      <span>contact@codehorizons.dev</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <MapPin className="h-4 w-4 text-muted-foreground" />
                                      <span>San Francisco, CA</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardHeader>
                          </Card>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Right Column */}
              <div className="w-full md:w-2/3 pt-10 pl-8 flex items-center justify-center">
                <div className="flex flex-col space-y-8">
                  {socialChannels.map((channel, index) => (
                    <div key={index} className="w-full">
                      <Card className="overflow-hidden border-0">
                        <div className="w-full max-w-[400px] mx-auto">
                          <Button 
                            className="w-full hover:scale-105 transition-transform" 
                            onClick={() => {
                              window.open(`https://${channel.platform.toLowerCase()}.com/${channel.handle}`, '_blank')
                            }}
                          >
                            <CardContent className="flex items-center p-2">
                              {/* Icon Column */}
                              <div className="w-2 flex justify-center">
                                <div className="p-4">
                                {channel.platform === "Instagram" && (
                                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                  </svg>
                                )}
                                {channel.platform === "Twitter" && (
                                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                  </svg>
                                )}
                                {channel.platform === "LinkedIn" && (
                                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                  </svg>
                                )}
                                {channel.platform === "TikTok" && (
                                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                                  </svg>
                                )}
                                {channel.platform === "YouTube" && (
                                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                  </svg>
                                )}
                                </div>
                              </div>
                              
                              {/* Content Column */}
                              <div className="flex flex items-center justify-between pl-4">
                                <div className="flex flex-col">
                                  <span className="text-sm text-muted-foreground">{channel.handle}</span>
                                </div>
                                <ArrowRight className="h-5 w-5 text-gray-400" />
                              </div>
                            </CardContent>
                          </Button>
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const ProductView = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState('');    

    //used the same resources API request as is being used in Resources View
    //we needa define a new API request because the displayed in this view is 
    //different to that in resourcesView's suggested files (1 row 3 columns), 
    //Product View's catalog is going to be the library that the suggested files
    //in resources is derived from

    //currently just serves as sample data to ensure that the look and feel is consistent

    useEffect(() => {
      const fetchResources = async () => {
        try {
          const response = await fetch('/api/resources');
          if (!response.ok) {
            throw new Error('Failed to fetch resources');
          }
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error('Error fetching resources:', error);
        }
      };

      fetchResources();
    }, []);

    return (
      <div className="fixed h-[calc(100vh-3.5rem)] w-[calc(100vw-16rem)] left-64 top-14 p-4 overflow-auto">
        <Card className="h-full w-full border-2 border-primary">
          <CardContent>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold">Products</h2>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64"
                />
                <ResourceCreationDialog/>
              </div>
            </div>

            <div className="space-y-4">
              <ScrollArea className="h-[calc(100vh-12rem)]">
                <div className="grid grid-cols-3 gap-7">
                  {products.map((product, i) => (
                    <Button 
                      key={i}
                      variant="ghost" 
                      className="w-full h-full p-0" 
                      onClick={() => setSelectedProduct(product)}
                    >
                      <Card className="hover:bg-accent/50 transition-colors w-full min-h-[250px] flex flex-col">
                        <CardHeader className="p-4 pb-2 flex-none">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 min-w-0 pr-2">
                              <Package className="h-5 w-5 text-blue-500 flex-none" />
                              <h3 className="font-semibold truncate">{product.title}</h3>
                            </div>
                            <div onClick={(e) => e.stopPropagation()} className="flex-none">
                              <Menubar>
                                <MenubarMenu>
                                  <MenubarTrigger asChild>
                                    <Button variant="ghost" className="pl-1 pr-1">
                                      <MoreVertical className="h-2 w-2" />
                                    </Button>
                                  </MenubarTrigger>
                                  <MenubarContent>
                                    <MenubarItem>View Details</MenubarItem>
                                    <MenubarItem>Edit</MenubarItem>
                                    <MenubarItem>Share</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem className="text-red-600">Delete</MenubarItem>
                                  </MenubarContent>
                                </MenubarMenu>
                              </Menubar>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="px-4 py-2 flex-grow overflow-auto">
                          <div className="flex flex-col items-center justify-center h-full">
                            <div className="w-24 h-24 bg-muted/50 rounded-lg flex items-center justify-center">
                              <Package className="w-12 h-12 text-muted-foreground" />
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="px-4 pt-2 pb-4 flex-none">
                          <p className="text-xs text-muted-foreground">
                            Last updated {new Date().toLocaleDateString()}
                          </p>
                        </CardFooter>
                      </Card>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const ArchiveView = () => {
    const [archivedItems, setArchivedItems] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [starredItems, setStarredItems] = useState<any[]>([]);

    useEffect(() => {
      // Simulated archived items data
      const mockArchivedItems = [
        {
          id: 1,
          title: "Old Project Documentation",
          type: "Document", 
          archivedDate: "2023-10-15",
          size: "2.4 MB",
          isStarred: true
        },
        {
          id: 2,
          title: "Previous Course Materials",
          type: "Folder",
          archivedDate: "2023-09-28", 
          size: "156 MB",
          isStarred: true
        },
        {
          id: 3,
          title: "Legacy Code Repository",
          type: "Code",
          archivedDate: "2023-11-01",
          size: "45 MB",
          isStarred: false
        },
        {
          id: 4,
          title: "Legacy Code Repository",
          type: "Code",
          archivedDate: "2023-11-01",
          size: "45 MB",
          isStarred: false
        },
        {
          id: 5,
          title: "Legacy Code Repository",
          type: "Code",
          archivedDate: "2023-11-01",
          size: "45 MB",
          isStarred: false
        },
        {
          id: 6,
          title: "Legacy Code Repository",
          type: "Code",
          archivedDate: "2023-11-01",
          size: "45 MB",
          isStarred: false
        }
      ];
      setArchivedItems(mockArchivedItems);
      setStarredItems(mockArchivedItems.filter(item => item.isStarred));
    }, []);

    const filteredStarredItems = starredItems.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="fixed h-[calc(100vh-3.5rem)] w-[calc(100vw-16rem)] left-64 top-14 p-4 overflow-auto">
        <Card className="h-full w-full border-2 border-primary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Archive</CardTitle>
              <div className="flex gap-2">
                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Export
                    </MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>
                        <FileText className="h-4 w-4 mr-2" />
                        Export as PDF
                      </MenubarItem>
                      <MenubarItem>
                        <FileText className="h-4 w-4 mr-2" />
                        Export as DOC
                      </MenubarItem>
                      <MenubarItem>
                        <Table className="h-4 w-4 mr-2" />
                        Export as CSV
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Archive
                </Button>
              </div>
            </div>
            <CardDescription>Access your archived files and folders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column - Starred Items */}
              <div>
                <div className="mb-4">
                  <Card className="border-2 border-primary">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-center">
                        <div className="relative w-full">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="text"
                            placeholder="Search starred items..."
                            className="pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="absolute right-2 top-3 h-4 w-6">
                                <Filter className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>
                                <FileText className="h-4 w-4 mr-2 text-blue-500" />
                                Documents
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Folder className="h-4 w-4 mr-2 text-yellow-500" />
                                Folders
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileIcon className="h-4 w-4 mr-2 text-green-500" />
                                Code Files
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Reset Filters
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <h3 className="text-lg font-semibold mb-4">Starred Items</h3>
                <div className="space-y-4">
                  {filteredStarredItems.map((item) => (
                    <Card key={item.id} className="hover:bg-accent/50 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {item.type === "Document" && <FileText className="h-5 w-5 text-blue-500" />}
                            {item.type === "Folder" && <Folder className="h-5 w-5 text-yellow-500" />}
                            {item.type === "Code" && <FileIcon className="h-5 w-5 text-green-500" />}
                            <div>
                              <p className="font-medium">{item.title}</p>
                              <p className="text-sm text-muted-foreground">Archived on {item.archivedDate}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground">{item.size}</span>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <RefreshCw className="h-4 w-4 mr-2" />
                                  Restore
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <FileX className="h-4 w-4 mr-2" />
                                  Delete Permanently
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Right Column - Upload Section */}
              <div>
                <div 
                  className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-accent/50 transition-colors cursor-pointer"
                  onClick={() => {/* Handle upload click */}}
                >
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium">Drop files here or click to upload</p>
                  <p className="text-sm text-muted-foreground mt-2">Support for documents, images, and other file types</p>
                </div>
                <div className="mt-2">
                  <h4 className="text-sm font-medium mb-2">Recent Uploads</h4>
                  <Card className="p-4">
                    <ScrollArea>
                    <div className="space-y-2">
                      {archivedItems.slice(0, 3).map((item) => (
                        <Card key={item.id}>
                          <div className="flex items-center justify-between p-2 rounded-md hover:bg-accent/50">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{item.title}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">{item.size}</span>
                          </div>
                        </Card>
                      ))}
                    </div>
                    </ScrollArea>
                  </Card>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  const ResourcesView = () => {
    const [resources, setResources] = useState<any[]>([]);
    const [showAddDialog, setShowAddDialog] = useState(false);
    const { currentView, setCurrentView } = useView('resources');

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

    function setShowSecondStep(arg0: boolean): void {
      throw new Error('Function not implemented.');
    }

    return (
      <div className="fixed h-[calc(100vh-3.5rem)] w-[calc(100vw-16rem)] left-64 top-14 p-4 overflow-auto">
        <Card className="h-full w-full border-2 border-primary">
          <CardContent>
            <div>
              <div className="flex items-center gap-2 p-2">
                <h2 className="text-base font-semibold pt-5">Suggested Folders</h2>
              </div>
              <div className="space-y-4">              
                <div className="grid grid-cols-3 gap-4">
                  <Card className="hover:bg-accent/50 transition-colors cursor-pointer w-full" onClick={() => setCurrentView('products')}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Folder className="h-5 w-5 text-blue-500" />
                        <div>
                          <h3 className="font-semibold pl-12">Products</h3>
                          <div className="flex justify-center pl-2">
                            <p className="text-sm text-muted-foreground">Product resources and guides</p>
                          </div>
                        </div>
                      </div>
                      <div onClick={(e) => e.stopPropagation()}>
                        <Menubar>
                          <MenubarMenu>
                            <MenubarTrigger asChild>
                              <Button variant="ghost" className="pl-1 pr-1">
                                <MoreVertical className="h-3 w-3" />
                              </Button>
                            </MenubarTrigger>
                            <MenubarContent>
                              <MenubarItem>Open</MenubarItem>
                              <MenubarItem>Share</MenubarItem>
                              <MenubarItem>Move</MenubarItem>
                              <MenubarSeparator />
                              <MenubarItem className="text-red-600">Delete</MenubarItem>
                            </MenubarContent>
                          </MenubarMenu>
                        </Menubar>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:bg-accent/50 transition-colors cursor-pointer w-full" onClick={() => setCurrentView('socials')}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Folder className="h-5 w-5 text-blue-500" />
                        <div>
                          <h3 className="font-semibold pl-12">Socials</h3>
                          <div className="flex justify-center pl-2">
                            <p className="text-sm text-muted-foreground">Social media content</p>
                          </div>
                        </div>
                      </div>
                      <div onClick={(e) => e.stopPropagation()}>
                        <Menubar>
                          <MenubarMenu>
                            <MenubarTrigger asChild>
                              <Button variant="ghost" className="pl-1 pr-1">
                                <MoreVertical className="h-3 w-3" />
                              </Button>
                            </MenubarTrigger>
                            <MenubarContent>
                              <MenubarItem>Open</MenubarItem>
                              <MenubarItem>Share</MenubarItem>
                              <MenubarItem>Move</MenubarItem>
                              <MenubarSeparator />
                              <MenubarItem className="text-red-600">Delete</MenubarItem>
                            </MenubarContent>
                          </MenubarMenu>
                        </Menubar>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:bg-accent/50 transition-colors cursor-pointer w-full" onClick={() => setCurrentView('archives')}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Folder className="h-5 w-5 text-blue-500" />
                        <div>
                          <h3 className="font-semibold pl-12">Archive</h3>
                          <div className="flex justify-center pl-3">
                            <p className="text-xs text-muted-foreground">Past resources and materials</p>
                          </div>
                        </div>
                      </div>
                      <div onClick={(e) => e.stopPropagation()}>
                        <Menubar>
                          <MenubarMenu>
                            <MenubarTrigger asChild>
                              <Button variant="ghost" className="pl-1 pr-1">
                                <MoreVertical className="h-3 w-3" />
                              </Button>
                            </MenubarTrigger>
                            <MenubarContent>
                              <MenubarItem>Open</MenubarItem>
                              <MenubarItem>Share</MenubarItem>
                              <MenubarItem>Move</MenubarItem>
                              <MenubarSeparator />
                              <MenubarItem className="text-red-600">Delete</MenubarItem>
                            </MenubarContent>
                          </MenubarMenu>
                        </Menubar>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 p-2">
                <h2 className="text-base font-semibold">Suggested Files</h2>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-7">
                  {resources.map((resource, i) => (
                    <Button variant="ghost" className="w-full h-full p-0" onClick={() => setCurrentView('course')}>
                      <Card key={i} className="hover:bg-accent/50 transition-colors w-full min-h-[250px] flex flex-col">
                        <CardHeader className="p-4 pb-2 flex-none">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 min-w-0 pr-2">
                              <FileText className="h-5 w-5 text-blue-500 flex-none" />
                              <h3 className="font-semibold truncate">{resource.title}</h3>
                            </div>
                            <div onClick={(e) => e.stopPropagation()} className="flex-none">
                              <Menubar>
                                <MenubarMenu>
                                  <MenubarTrigger asChild>
                                    <Button variant="ghost" className="pl-1 pr-1">
                                      <MoreVertical className="h-2 w-2" />
                                    </Button>
                                  </MenubarTrigger>
                                  <MenubarContent>
                                    <MenubarItem>Open</MenubarItem>
                                    <MenubarItem>Share</MenubarItem>
                                    <MenubarItem>Move</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem className="text-red-600">Delete</MenubarItem>
                                  </MenubarContent>
                                </MenubarMenu>
                              </Menubar>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="px-4 py-2 flex-grow overflow-auto">
                          <div className="flex flex-col items-center justify-center h-full">
                            <div className="w-24 h-24 bg-muted/50 rounded-lg flex items-center justify-center">
                              <FileText className="w-12 h-12 text-muted-foreground" />
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="px-4 pt-2 pb-4 flex-none">
                          <p className="text-xs text-muted-foreground">
                            Last accessed {new Date().toLocaleDateString()}
                          </p>
                        </CardFooter>
                      </Card>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
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
    const [sortBy, setSortBy] = useState("recent");
    const [profile] = useState({
      handle: "@codehorizons",
      name: "Code Horizons",
      description: "Teaching code through short-form content 👨‍💻✨\nDaily tips and tutorials on web development",
      stats: {
        followers: "125K",
        following: "892",
        likes: "1.2M"
      }
    });

    const [posts, setPosts] = useState([
      {
        id: "1",
        caption: "Quick CSS Grid Tutorial 🎨",
        stats: {
          likes: "45K",
          comments: "1.2K",
          shares: "2.3K",
          views: "250K"
        },
        duration: "0:45",
        publishedAt: "2024-01-15T12:00:00Z"
      },
      {
        id: "2",
        caption: "JavaScript Tips & Tricks ⚡️",
        stats: {
          likes: "32K", 
          comments: "890",
          shares: "1.5K",
          views: "180K"
        },
        duration: "1:00",
        publishedAt: "2024-01-12T15:30:00Z"
      },
      {
        id: "3",
        caption: "React Hooks Explained Simply 💡",
        stats: {
          likes: "28K",
          comments: "750",
          shares: "1.2K",
          views: "165K"
        },
        duration: "0:55",
        publishedAt: "2024-01-10T14:20:00Z"
      }
    ]);

    return (
      <div className="flex flex-col space-y-6 pt-10">
        {/* Profile Section */}
        <div className="bg-card rounded-lg p-6">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="relative">
              <img
                src="/default-avatar.png"
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-primary"
              />
              <div className="absolute -bottom-2 right-0 bg-primary text-white text-xs px-2 py-1 rounded-full">
                Pro
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center mb-2">
                <h2 className="text-2xl font-bold">{profile.name}</h2>
                <span className="text-muted-foreground text-sm">{profile.handle}</span>
              </div>
              <p className="text-muted-foreground whitespace-pre-line mb-4 max-w-lg">{profile.description}</p>
              <div className="flex justify-center gap-12">
                <div className="text-center">
                  <div className="font-bold">{profile.stats.followers}</div>
                  <div className="text-sm text-muted-foreground">Followers</div>
                </div>
                <div className="text-center">
                  <div className="font-bold">{profile.stats.following}</div>
                  <div className="text-sm text-muted-foreground">Following</div>
                </div>
                <div className="text-center">
                  <div className="font-bold">{profile.stats.likes}</div>
                  <div className="text-sm text-muted-foreground">Likes</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div>
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-semibold">Latest Shorts</h3>
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger className="gap-2">
                    <ArrowUpDown className="h-4 w-4" />
                    Sort by
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem onClick={() => setSortBy("recent")}>Most Recent</MenubarItem>
                    <MenubarItem onClick={() => setSortBy("views")}>Most Viewed</MenubarItem>
                    <MenubarItem onClick={() => setSortBy("likes")}>Most Liked</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="group bg-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-[9/16]">
                  <img
                    src="/default-avatar.png"
                    alt={post.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/75 text-white text-xs px-2 py-1 rounded">
                    {post.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                    {post.caption}
                  </h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
                    <span>❤️ {post.stats.likes}</span>
                    <span>💬 {post.stats.comments}</span>
                    <span>↗️ {post.stats.shares}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const TwitterView = () => {
    const [tweets, setTweets] = useState([
      {
        id: "1",
        snippet: {
          title: "🔥 Just launched my new React course! Early bird pricing available for the next 48 hours.",
          description: "Learn React from the ground up including:\n• Hooks\n• State Management\n• Performance Optimization\n• Testing\n\nLink in bio! 🚀",
          thumbnails: {
            medium: {
              url: "/course-promo.jpg"
            }
          },
          publishedAt: "2024-01-20T10:30:00Z"
        },
        statistics: {
          retweetCount: "3.2K",
          likeCount: "15.7K",
          replyCount: "428",
          viewCount: "102K"
        }
      },
      {
        id: "2",
        snippet: {
          title: "💡 Pro Tip: When debugging React components, use the React DevTools extension.",
          description: "It lets you:\n• Inspect component props\n• View state changes\n• Profile performance\n• Debug hooks\n\nA must-have for React developers!",
          publishedAt: "2024-01-20T07:30:00Z"
        },
        statistics: {
          retweetCount: "2.1K",
          likeCount: "9.3K",
          replyCount: "156", 
          viewCount: "78K"
        }
      },
      {
        id: "3",
        snippet: {
          title: "Today's coding session:",
          description: "• Built a new authentication system\n• Added real-time updates\n• Fixed that pesky bug in production\n\nRemember: coding is a journey, not a race. Take breaks and celebrate small wins! 🎉",
          publishedAt: "2024-01-20T04:30:00Z"
        },
        statistics: {
          retweetCount: "1.8K",
          likeCount: "7.2K",
          replyCount: "203",
          viewCount: "65K"
        }
      }
    ]);

    return (
      <div className="space-y-6 pt-12">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Twitter Profile</CardTitle>
              <Button variant="outline" size="sm" className="hover:bg-accent/50 transition-colors">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Card className="overflow-hidden">
              {/* Profile Banner */}
              <div className="relative mb-16">
                <div className="h-32 bg-gradient-to-r from-blue-400 to-blue-600 rounded-t-lg"></div>
                <div className="absolute -bottom-12 left-6">
                  <Avatar className="h-24 w-24 ring-4 ring-background shadow-xl">
                    <AvatarImage src="/avatars/sarah.jpg" />
                    <AvatarFallback>SW</AvatarFallback>
                  </Avatar>
                </div>
              </div>

              {/* Profile Info */}
              <Card className="border-0 shadow-none">
                <CardContent className="px-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold">Sarah Wilson</h3>
                      <p className="text-muted-foreground">@sarahcodes</p>
                    </div>
                    <Button className="hover:bg-primary/90 transition-colors">Follow</Button>
                  </div>

                  <p className="mt-4">Senior Software Engineer | Teaching web development and React | Building in public</p>

                  <Card className="mt-4 bg-accent/10">
                    <CardContent className="py-4">
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          San Francisco, CA
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Joined March 2020
                        </span>
                      </div>

                      <div className="flex gap-6 mt-4">
                        <span className="text-sm">
                          <strong>75.2K</strong> <span className="text-muted-foreground">Followers</span>
                        </span>
                        <span className="text-sm">
                          <strong>1.2K</strong> <span className="text-muted-foreground">Following</span>
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </Card>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Recent Tweets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              {tweets.map((tweet) => (
                <Card key={tweet.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="pb-2">
                    <div className="flex gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/avatars/sarah.jpg" />
                        <AvatarFallback>SW</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">Sarah Wilson</span>
                          <span className="text-muted-foreground">@sarahcodes</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(tweet.snippet.publishedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <Card className="bg-accent/5 border-0">
                      <CardContent className="py-3">
                        <p className="font-medium">{tweet.snippet.title}</p>
                        <p className="mt-2 text-muted-foreground whitespace-pre-line">{tweet.snippet.description}</p>
                      </CardContent>
                    </Card>
                    
                    {tweet.snippet.thumbnails?.medium.url && (
                      <Card className="mt-4 overflow-hidden border-0">
                        <img 
                          src={tweet.snippet.thumbnails.medium.url}
                          alt=""
                          className="w-full rounded-lg"
                        />
                      </Card>
                    )}

                    <Card className="mt-4 bg-background">
                      <CardContent className="py-2">
                        <div className="flex justify-between text-muted-foreground">
                          <Button variant="ghost" size="sm" className="hover:text-blue-500 hover:bg-blue-500/10">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            {tweet.statistics.replyCount}
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:text-green-500 hover:bg-green-500/10">
                            <Repeat className="h-4 w-4 mr-2" />
                            {tweet.statistics.retweetCount}
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:text-red-500 hover:bg-red-500/10">
                            <Heart className="h-4 w-4 mr-2" />
                            {tweet.statistics.likeCount}
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:text-blue-500 hover:bg-blue-500/10">
                            <BarChart2 className="h-4 w-4 mr-2" />
                            {tweet.statistics.viewCount}
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-accent/50">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };
  const InstagramView = () => {
    return (
      <div className="space-y-6 pt-16">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20 ring-2 ring-offset-2 ring-primary/10">
                      <AvatarImage src="/default-avatar.png" />
                      <AvatarFallback>IG</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">username</h3>
                      <p className="text-muted-foreground">Full Name</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="hover:bg-accent/50">
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex justify-between text-center">
                  <div className="p-2">
                    <p className="font-semibold">234</p>
                    <p className="text-sm text-muted-foreground">Posts</p>
                  </div>
                  <div className="p-2">
                    <p className="font-semibold">14.3k</p>
                    <p className="text-sm text-muted-foreground">Followers</p>
                  </div>
                  <div className="p-2">
                    <p className="font-semibold">1,234</p>
                    <p className="text-sm text-muted-foreground">Following</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent className="p-4">
                <p className="text-sm">
                  Bio description goes here
                  <br />📍 Location
                  <br />🔗 website.com
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((post) => (
                    <Card key={post} className="aspect-square overflow-hidden hover:opacity-90 transition-opacity">
                      <CardContent className="p-0">
                        <img
                          src="/default-avatar.png"
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardContent className="p-0">
            {[1, 2].map((post) => (
              <Card key={post} className="mb-4 last:mb-0">
                <CardContent className="p-0">
                  <Card className="border-0">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8 ring-2 ring-offset-1 ring-primary/10">
                            <AvatarImage src="/default-avatar.png" />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">username</span>
                        </div>
                        <Button variant="ghost" size="icon" className="hover:bg-accent/50">
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="aspect-square">
                    <img
                      src="/default-avatar.png"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <Card className="border-0">
                    <CardContent className="p-4">
                      <div className="flex justify-between text-muted-foreground">
                        <div className="flex gap-4">
                          <Button variant="ghost" size="sm" className="hover:text-red-500 hover:bg-red-500/10">
                            <Heart className="h-5 w-5" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:text-blue-500 hover:bg-blue-500/10">
                            <MessageCircle className="h-5 w-5" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:text-blue-500 hover:bg-blue-500/10">
                            <Send className="h-5 w-5" />
                          </Button>
                        </div>
                        <Button variant="ghost" size="sm" className="hover:text-blue-500 hover:bg-blue-500/10">
                          <Bookmark className="h-5 w-5" />
                        </Button>
                      </div>
                      <p className="mt-2 text-sm">
                        <span className="font-medium">username</span> Caption text goes here...
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">View all 123 comments</p>
                      <p className="mt-1 text-xs text-muted-foreground">2 HOURS AGO</p>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  };
  
  const CourseView = () => {
    const [courses, setCourses] = useState<any[]>([]);
    const { isAdmin, setIsAdmin } = useAdmin();

    // Set initial admin view
    useEffect(() => {
      setIsAdmin(true);
    }, [setIsAdmin]);

    return (
      <div className="space-y-6 pt-16">
        {isAdmin ? (
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
            <div className="flex items-center space-x-2">
              <Switch/>
              <Label>Edit</Label>
            </div>
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
            <div className="flex items-center space-x-2">
              <Switch/>
              <Label>Edit</Label>
            </div>
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
    return (
      <div className="fixed h-[calc(100vh-3.5rem)] w-[calc(100vw-16rem)] left-64 top-14 p-4 overflow-auto">
        <Card className="h-full w-full border-2 border-primary">
          <CardHeader>
            <div className="flex justify-between items-center pt-2">
              <CardTitle>Community Connect</CardTitle>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2 h-[2.5rem] w-[9rem]">
                      <Users className="h-4 w-4" />
                      Browse Members
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl h-[calc(100vh-8rem)]">
                    <DialogHeader>
                      <DialogTitle>Community Members</DialogTitle>
                      <DialogDescription>Browse and connect with members of the community</DialogDescription>
                    <div className="flex flex-col gap-4 py-4">
                      <div className="flex gap-4">
                        <div className="relative flex-1">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search members..."
                            className="pl-8"
                          />
                        </div>
                        <Menubar>
                          <MenubarMenu>
                            <MenubarTrigger className="flex gap-2">
                              <Filter className="h-4 w-4" />
                              Filters
                            </MenubarTrigger>
                            <MenubarContent>
                              <MenubarCheckboxItem>
                                Mentors Only
                              </MenubarCheckboxItem>
                              <MenubarCheckboxItem>
                                Available for Mentoring
                              </MenubarCheckboxItem>
                              <MenubarSeparator />
                              <MenubarRadioGroup>
                                <MenubarRadioItem value="all">All Skills</MenubarRadioItem>
                                <MenubarRadioItem value="frontend">Frontend</MenubarRadioItem>
                                <MenubarRadioItem value="backend">Backend</MenubarRadioItem>
                                <MenubarRadioItem value="fullstack">Full Stack</MenubarRadioItem>
                              </MenubarRadioGroup>
                            </MenubarContent>
                          </MenubarMenu>
                        </Menubar>
                      </div>
                    </div>
                    </DialogHeader>
                    <div className="">
                      <ScrollArea className="h-[400px] w-full">
                          <div className="grid grid-cols-2 gap-4">
                            {/* Example member cards - replace with actual data */}
                            {[1,2,3,4,5,6].map((member) => (
                              <Card key={member} className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-4">
                                  <div className="flex items-center gap-3">
                                    <Avatar>
                                      <AvatarImage src={`/avatars/0${member}.png`} />
                                      <AvatarFallback>MB</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <p className="font-medium">Member {member}</p>
                                      <p className="text-sm text-muted-foreground">Developer</p>
                                    </div>
                                  </div>
                                  <Button variant="outline" size="sm" className="w-full mt-4">
                                    View Profile
                                  </Button>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" className="flex items-center gap-2">
                  <FolderTree className="h-4 w-4" />
                  Categories
                </Button>
              </div>
            </div>
            <CardDescription>
              Connect with mentors and peers in your learning journey
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Featured Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/avatars/01.png" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Jane Doe</p>
                        <p className="text-sm text-muted-foreground">Senior Developer</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">View All Members</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Popular Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Code className="h-4 w-4 mr-2" />
                      Programming
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <PenTool className="h-4 w-4 mr-2" />
                      Design
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Database className="h-4 w-4 mr-2" />
                      Data Science
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">New discussion in Programming</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">5 new members joined today</p>
                    </div>
                    <Button variant="outline" className="w-full">View All Activities</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  
  return (
    <div className="min-h-screen flex">
      <div className="hidden md:block w-64">
        <Sidebar />
        {/* <Sidebar /> */}
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
        {currentView === 'instagram' && <InstagramView/>}
        {currentView === 'emailInbox' && <EmailInbox/>}
        {currentView === 'files' && <FilesView/>}
        {currentView === 'socials' && <SocialsView/>}
        {currentView === 'products' && <ProductView/>}
        {currentView === 'archives' && <ArchiveView/>}
        {currentView === 'profile' && <ProfileView/>}
      </div>
    </div>
  );
}
