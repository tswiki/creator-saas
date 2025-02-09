

'use client';

import { useMemo } from 'react';
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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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
  FolderTree,
  Edit,
  MousePointerClick,
  Ban,
  MessagesSquare,
  Reply,
  LineChart,
  Wand2,
  Library
} from "lucide-react";
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, Label, DropdownMenuSeparator, RadioGroup, Separator } from '@radix-ui/react-dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import { toast } from '@/hooks/use-toast';
import { useView } from '@/contexts/viewContext'
import { Textarea } from '@/components/ui/textarea';
import CampaignForm from '@/components/campaign/campaign-form';
import CampaignPreview from '@/components/campaign/campaign-preview';
import { Campaign } from '~/types/campaign';
import { useCampaign } from '@/contexts/campaignContext';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { HeroVideoDialogDemoTopInBottomOut } from '@/components/ui/MentorshipPortal';
import { useAdmin } from '@/contexts/adminContext';
import Marquee from '@/components/ui/marquee';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from '@/components/ui/menubar';
import { Slider } from '@/components/ui/slider';
import AvatarCircles from '@/components/ui/avatar-circles';
import React from 'react';
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';



export default function AdminPortal() {

  const [mobileOpen, setMobileOpen] = useState(false);
  const { currentView, setCurrentView } = useView(' ');
  const { isAdmin, setIsAdmin } = useAdmin();

  useEffect(() => {
    setCurrentView('overview');
    setIsAdmin(true);
  }, [setCurrentView, setIsAdmin]);


  const OverviewView = () => {
    return (
      <div className="fixed h-[calc(100vh-3.5rem)] w-[calc(100vw-16rem)] left-64 top-14 p-4">
        <Card className="h-full w-full border-8 border-primary">
          <div className="h-full">
            <div className="grid grid-cols-12 gap-4 p-6">
              {/* Main AI Interaction Area */}
              <div className="col-span-8 space-y-4">
                
                <div className="space-y-6">
                  <Card className="p-4">
                    <div className="flex gap-2 items-start">
                      <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0">
                        <Wand2 className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h2 className="text-sm font-semibold text-muted-foreground text-center">AI Assistant</h2>
                        <div className="flex flex-col gap-2">
                          <div className="p-3 bg-muted rounded-lg">
                            <p className="font-medium mb-1 text-center">How can I help you today?</p>
                            <p className="text-sm text-muted-foreground text-center">Ask me anything about your community, campaigns, or analytics.</p>
                          </div>
                          <div className="flex gap-2">
                            <Input 
                              placeholder="Type your question here..."
                              className="flex-1"
                            />
                            <Button>
                              <Send className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" className="w-full">View Previous Insights</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Community Insights</DialogTitle>
                              <DialogDescription>Recent analysis and recommendations</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-2">
                              <div className="p-3 bg-muted rounded-lg">
                                <p className="font-medium">Campaign Performance:</p>
                                <ul className="mt-1 space-y-1">
                                  <li>• Email engagement peaks between 9-11 AM</li>
                                  <li>• SMS response rates are 34% higher on weekends</li>
                                  <li>• Your most engaged audience segment is growing by 12% monthly</li>
                                </ul>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 h-[190px]">
                    <div className="flex gap-4 items-start h-full">
                      <div className="flex-1 h-full">
                          <div className="">
                            <h2 className="text-l text-center font-bold">Metrics</h2>
                          </div>
                        <div className="relative w-full h-full flex justify-left items-center">
                          <Carousel 
                            className="w-full max-h-[120px]"
                            opts={{
                              align: "start",
                              loop: true,
                              dragFree: true,
                              skipSnaps: false,
                              startIndex: 0
                            }}
                          >
                            <CarouselContent className="h-full">
                              <CarouselItem className="pl-4 basis-1/3 h-full">
                                <Card className="h-[120px] hover:bg-primary/5 transition-all cursor-pointer group">
                                  <CardHeader className="p-2 flex flex-row items-center justify-between">
                                    <h4 className="font-medium text-sm">Mail</h4>
                                    <Mail className="w-5 h-5 text-primary" />
                                  </CardHeader>
                                  <CardContent className="p-2 text-center">
                                    <div className="flex items-baseline gap-2 justify-center">
                                      <p className="text-2xl font-bold">45.2%</p>
                                      <p className="text-xs text-green-500 font-medium">+5.3%</p>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">Open Rate</p>
                                  </CardContent>
                                </Card>
                              </CarouselItem>

                              <CarouselItem className="pl-4 basis-1/3 h-full">
                                <Card className="h-[120px] hover:bg-primary/5 transition-all cursor-pointer group">
                                  <CardHeader className="p-2 flex flex-row items-center justify-between">
                                    <h4 className="font-medium text-sm">Engagement</h4>
                                    <MousePointerClick className="w-5 h-5 text-primary" />
                                  </CardHeader>
                                  <CardContent className="p-2 text-center">
                                    <div className="flex items-baseline gap-2 justify-center">
                                      <p className="text-2xl font-bold">12.8%</p>
                                      <p className="text-xs text-green-500 font-medium">+2.1%</p>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">Click-through Rate</p>
                                  </CardContent>
                                </Card>
                              </CarouselItem>

                              <CarouselItem className="pl-4 basis-1/3 h-full">
                                <Card className="h-[120px] hover:bg-primary/5 transition-all cursor-pointer group">
                                  <CardHeader className="p-2 flex flex-row items-center justify-between">
                                    <h4 className="font-medium text-sm">Community</h4>
                                    <Users className="w-5 h-5 text-primary" />
                                  </CardHeader>
                                  <CardContent className="p-2 text-center">
                                    <div className="flex items-baseline gap-2 justify-center">
                                      <p className="text-2xl font-bold">1,234</p>
                                      <p className="text-xs text-green-500 font-medium">+12.5%</p>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">Active Members</p>
                                  </CardContent>
                                </Card>
                              </CarouselItem>

                              <CarouselItem className="pl-4 basis-1/3 h-full">
                                <Card className="h-[120px] hover:bg-primary/5 transition-all cursor-pointer group">
                                  <CardHeader className="p-2 flex flex-row items-center justify-between">
                                    <h4 className="font-medium text-sm">Satisfaction</h4>
                                    <Star className="w-5 h-5 text-primary" />
                                  </CardHeader>
                                  <CardContent className="p-2 text-center">
                                    <div className="flex items-baseline gap-2 justify-center">
                                      <p className="text-2xl font-bold">4.8</p>
                                      <p className="text-xs text-green-500 font-medium">+0.2</p>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">Average Rating</p>
                                  </CardContent>
                                </Card>
                              </CarouselItem>
                            </CarouselContent>
                            <CarouselPrevious className="absolute -left-4" />
                            <CarouselNext className="absolute -right-4" />
                          </Carousel>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>


              {/* Right Sidebar */}
              <div className="col-span-4 space-y-4">
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Quick Actions</h3>
                    <MousePointerClick className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <PenTool className="w-4 h-4 mr-2" />
                      Create New Campaign
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      View Analytics
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <MessagesSquare className="w-4 h-4 mr-2" />
                      Audience Insights
                    </Button>
                  </div>
                </Card>

                <Card className="p-4 h-[220px] flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Live Activity</h3>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm text-muted-foreground">Live</span>
                    </div>
                  </div>
                  <ScrollArea className="flex-1 overflow-hidden">
                    <div className="space-y-3 pr-4">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Card key={i} className="flex items-start gap-2 p-2 hover:bg-muted rounded-lg transition-colors">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <p className="text-sm break-words">New subscriber joined Campaign #{i}</p>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </Card>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  };


  const MembersView = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMember, setSelectedMember] = useState(null);

    // Mock member data - replace with actual data source
    const members = [
      {
        id: 1,
        name: "Sarah Chen",
        email: "sarah.chen@example.com",
        avatar: "/default-avatar.png",
        skills: ["React", "TypeScript", "Node.js", "UI/UX Design"],
        joinedDate: "2023-01-15",
      },
      {
        id: 2,
        name: "Alex Rivera", 
        email: "alex.rivera@example.com",
        avatar: "/default-avatar.png",
        skills: ["Python", "Machine Learning", "Data Science", "AWS"],
        joinedDate: "2023-02-20",
      },
      {
        id: 3,
        name: "Maria Garcia",
        email: "maria.garcia@example.com", 
        avatar: "/default-avatar.png",
        skills: ["Java", "Spring Boot", "Microservices", "Docker"],
        joinedDate: "2023-03-10",
      },
      {
        id: 4,
        name: "James Wilson",
        email: "james.wilson@example.com",
        avatar: "/default-avatar.png", 
        skills: ["Vue.js", "JavaScript", "CSS", "Web Design"],
        joinedDate: "2023-04-05",
      },
      {
        id: 5,
        name: "Emily Zhang",
        email: "emily.zhang@example.com",
        avatar: "/default-avatar.png",
        skills: ["DevOps", "Kubernetes", "CI/CD", "Cloud Architecture"],
        joinedDate: "2023-05-15",
      },
      {
        id: 6,
        name: "Michael Brown",
        email: "michael.brown@example.com",
        avatar: "/default-avatar.png",
        skills: ["Mobile Development", "React Native", "iOS", "Android"],
        joinedDate: "2023-06-20",
      }
    ];

    const filteredMembers = members.filter(member => 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="fixed h-[calc(100vh-3.5rem)] w-[calc(100vw-16rem)] left-64 top-14 p-4">
        <Card className="w-full h-full border-8">
          <CardHeader className="sticky top-0 bg-background z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pl-10">
              <Card className="bg-white dark:bg-gray-800 shadow-sm">
                <CardHeader className="p-2">
                  <div>
                    <CardTitle>Community Members</CardTitle>
                  </div>
                </CardHeader>
              </Card>
              <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                <Input
                  placeholder="Search members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-xs border-2"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <ScrollArea className="h-[calc(100vh-16rem)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMembers.map((member) => (
                  <Card key={member.id} className="border-2 border-primary">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{member.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Skills & Expertise</h4>
                          <div className="flex flex-wrap gap-2">
                            {member.skills.slice(0, 2).map((skill, index) => (
                              <Badge key={index} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">
                            Joined {new Date(member.joinedDate).toLocaleDateString()}
                          </p>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    );
  };


  const CampaignView = () => {
    
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const { setCampaignId } = useCampaign();

    useEffect(() => {
      const loadCampaigns = async () => {
        try {
          const response = await fetch('/api/campaign');
          if (!response.ok) {
            throw new Error('Failed to fetch campaigns');
          }
          const data = await response.json();
          // Add unique index as key for each campaign
          const campaignsWithIndex = data.map((campaign: any, index: number) => ({
            ...campaign,
            key: `campaign-${index}`, // Unique key combining campaign and index
            index // Keep index for ordering
          }));
          setCampaigns(campaignsWithIndex);
        } catch (error) {
          console.error('Error loading campaigns:', error);
          setCampaigns([]);
        }
      };

      loadCampaigns();
    }, []);

    return (
      <div className="fixed h-[calc(100vh-3.5rem)] w-[calc(100vw-16rem)] left-64 top-14 p-4">
            <Card className="h-full w-full border-8 border-primary">
                <CardHeader className="sticky top-0 bg-background">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <CardTitle>Campaigns</CardTitle>
                      <CardDescription>Manage and track your marketing campaigns</CardDescription>
                    </div>

                    <div className="flex items-center gap-2">
                      <Select defaultValue="all">
                        <SelectTrigger className="m-2 space-x-1">
                          <SelectValue placeholder="Filter by type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Campaigns</SelectItem>
                          <SelectItem value="email">Email Campaigns</SelectItem>
                          <SelectItem value="message">Message Campaigns</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button>
                        <CampaignForm/>
                      </Button>
                      
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="h-[calc(100vh-12rem)]">
                  <ScrollArea className="h-[calc(100vh-12rem)] pb-4">
                    <div className="grid md:grid-cols-2 gap-4 pr-4">
                      {/* Active Campaigns */}
                      <Card className="border-2 border-primary">
                        <CardHeader>
                          <CardTitle className="text-lg text-center">Active Campaigns</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {campaigns.map((campaign) => (
                              <div key={campaign.id} className="relative">
                                <Button 
                                  variant="ghost" 
                                  className="w-full p-0 h-auto hover:bg-transparent"
                                  onClick={() => {
                                    setCampaignId(campaign.id);
                                    setCurrentView('campaign-editor');
                                  }}
                                >
                                  <Card className="p-4 border-2 cursor-pointer hover:border-primary transition-colors w-full">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        
                                        <div className="flex items-center gap-2">
                                          <Mail className="h-4 w-4 text-primary" />
                                          <h4 className="font-medium">Welcome Series #{campaign.id}</h4>
                                        </div>
                                        <p className="text-sm text-muted-foreground">Email Campaign • 3 messages</p>
                                        <div className="flex gap-2 mt-2">
                                          <Badge>Running</Badge>
                                          <Badge variant="outline">45% Open Rate</Badge>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="mt-4 flex items-center gap-2">
                                      <div className="h-2 flex-1 bg-gray-200 rounded-full">
                                        <div 
                                          className="h-full bg-primary rounded-full" 
                                          style={{width: '45%'}}
                                        />
                                      </div>
                                      <span className="text-sm font-medium">45%</span>
                                    </div>
                                  </Card>
                                </Button>
                                <div className="absolute top-2 right-2">
                                  <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Selected Campaign Analytics */}
                      <Card className="border-2 border-primary">
                        <CardHeader>
                          <CardTitle className="text-lg text-center">Campaign Analytics</CardTitle>
                          <CardDescription className="text-center">Series Overview</CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center">
                          <div className="grid grid-cols-2 gap-4 max-w-3xl">
                            <Card className="p-4 border-2">
                              <div className="flex items-center justify-center gap-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <div className="text-center">
                                  <p className="text-sm font-medium">Sent Emails</p>
                                  <p className="text-2xl font-bold">1,234</p>
                                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                                </div>
                              </div>
                            </Card>
                            <Card className="p-4 border-2">
                              <div className="flex items-center justify-center gap-2">
                                <MousePointerClick className="h-4 w-4 text-muted-foreground" />
                                <div className="text-center">
                                  <p className="text-sm font-medium">Click Rate</p>
                                  <p className="text-2xl font-bold">12%</p>
                                  <p className="text-xs text-muted-foreground">+2.4% from last month</p>
                                </div>
                              </div>
                            </Card>
                            <Card className="p-4 border-2">
                              <div className="flex items-center justify-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <div className="text-center">
                                  <p className="text-sm font-medium">Conversions</p>
                                  <p className="text-2xl font-bold">89</p>
                                  <p className="text-xs text-muted-foreground">+15 new this month</p>
                                </div>
                              </div>
                            </Card>
                            <Card className="p-4 border-2">
                              <div className="flex items-center justify-center gap-2">
                                <Ban className="h-4 w-4 text-muted-foreground" />
                                <div className="text-center">
                                  <p className="text-sm font-medium">Bounce Rate</p>
                                  <p className="text-2xl font-bold">0.8%</p>
                                  <p className="text-xs text-muted-foreground">-0.2% from last month</p>
                                </div>
                              </div>
                            </Card>
                            <Card className="p-4 border-2 col-span-2">
                              <div className="flex items-center justify-center gap-2 mb-4">
                                <LineChart className="h-4 w-4 text-muted-foreground" />
                                <p className="text-sm font-medium">Engagement Over Time</p>
                              </div>
                              <div className="h-[200px] w-full bg-muted/20 rounded-lg flex items-center justify-center">
                                [Chart Placeholder]
                              </div>
                            </Card>
                            <Card className="p-4 border-2">
                              <div className="flex items-center justify-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <div className="text-center">
                                  <p className="text-sm font-medium">Avg. Time to Open</p>
                                  <p className="text-2xl font-bold">2.5h</p>
                                  <p className="text-xs text-muted-foreground">-30min from last month</p>
                                </div>
                              </div>
                            </Card>
                            <Card className="p-4 border-2">
                              <div className="flex items-center justify-center gap-2">
                                <Share2 className="h-4 w-4 text-muted-foreground" />
                                <div className="text-center">
                                  <p className="text-sm font-medium">Forward Rate</p>
                                  <p className="text-2xl font-bold">3.2%</p>
                                  <p className="text-xs text-muted-foreground">+0.5% from last month</p>
                                </div>
                              </div>
                            </Card>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
        </div>
    );
  };

  const CampaignEditorView = () => {

    const { campaignId } = useCampaign();


    return (
      <div className="fixed h-[calc(100vh-3.5rem)] w-[calc(100vw-16rem)] left-64 top-14 p-4">
        <Card className="h-full w-full border-8 border-primary">
          <CardContent className="h-[calc(100vh-6rem)]">
            <ScrollArea className="h-full w-full  overflow-hidden">
              <div className="p-4 flex items-center justify-center">
                <div className="w-[98%] h-[95%]">
                  <CampaignPreview campaignId={campaignId}/>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    );
  };


  const CourseView = () => {
    const [courses, setCourses] = useState<any[]>([]);

    return (
      <div className="fixed h-[calc(100vh-3.5rem)] w-[calc(100vw-16rem)] left-64 top-14 p-4">
        <Card className="h-full w-full border-8 border-primary">
          <CardContent className="h-[calc(100vh-6rem)]">
            <ScrollArea className="h-full w-full overflow-hidden">
              <div className="space-y-6 pt-16">
                {isAdmin ? (
                  <AdminCourseView courses={courses} />
                ) : (
                  <MemberCourseView courses={courses} />
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    );
  };
  

   // Member facing view
  const MemberCourseView = ({ courses }) => {
    return (
      <div className="fixed h-[calc(100vh-3.5rem)] w-[calc(100vw-16rem)] left-64 top-14 p-4 overflow-auto">
          <Card className="h-full w-full border-8 border-primary"> 
          <ScrollArea className="h-full w-full overflow-auto">
          <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Course: Advanced JavaScript Concepts</CardTitle>
            <div className="flex items-center space-x-2">
              <Switch 
                checked={isAdmin} 
                onCheckedChange={(checked) => {
                  setIsAdmin(!checked);
                  if (isAdmin) {
                    setCurrentView('adminCourse');
                  }
                }}
              />
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
                      <Card className={`
                          ${module.current ? 'border-primary bg-accent shadow-sm' : ''}
                        `}>
                        <CardContent className="p-4">
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
                                  <Card key={j}>
                                    <CardContent className="p-0">
                                      <button
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
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                        </CardContent>
                      </Card>
                    </div>
                  )})}
                </div>
              </ScrollArea>              
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
                                  <Label className="cursor-pointer">Data privacy and encapsulation</Label>
                                </div>
                              </Card>
                              <Card className="p-3 hover:bg-accent transition-colors">
                                <div className="flex items-center space-x-2">
                                  <RadioGroup value="b" id="b" />
                                  <Label className="cursor-pointer">Memory optimization</Label>
                                </div>
                              </Card>
                              <Card className="p-3 hover:bg-accent transition-colors">
                                <div className="flex items-center space-x-2">
                                  <RadioGroup value="c" id="c" />
                                  <Label className="cursor-pointer">Code organization</Label>
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
        </ScrollArea>
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
        <Card className="h-full w-full border-8 border-primary">
          <CardContent className="h-[calc(100vh-16rem)] pt-3 p-2">
            <div className="grid grid-cols-3 gap-4 h-[calc(100vh-8rem)]">
              {/* Column 1: Recommended Resources Carousel */}
              <Card className="border-4 h-[95%]">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-lg">Recommended</CardTitle>
                      <CardDescription>Curated resources for you</CardDescription>
                    </div>
                    <Badge variant="secondary" className="text-sm">
                      {resources.length}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[calc(100vh-15rem)] pb-2">
                    <div className="space-y-4">
                      {resources.map((resource, i) => (
                        <Card key={i} className="p-4 border-4 border-primary hover:bg-accent cursor-pointer">
                          <div className="flex flex-col gap-3">
                            {/* Thumbnail */}
                            <div className="w-full h-48 rounded-lg bg-muted overflow-hidden">
                              <img 
                                src={resource.thumbnail || '/default-avatar.png'} 
                                alt={resource.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            {/* Title */}
                            <h3 className="font-medium line-clamp-2">{resource.title}</h3>
                            
                            {/* Bottom row */}
                            <div className="flex items-center justify-between">
                              {/* Avatar */}
                              <div className="flex items-center gap-2">
                                <AvatarCircles 
                                  avatarUrls={[
                                    {
                                      imageUrl: resource.instructor?.avatar || '/default-avatar.png',
                                      profileUrl: '#'
                                    },
                                    {
                                      imageUrl: '/default-avatar.png', 
                                      profileUrl: '#'
                                    },
                                    {
                                      imageUrl: '/default-avatar.png',
                                      profileUrl: '#'
                                    }
                                  ]}
                                  numPeople={1}
                                  className="border-2 border-primary rounded-full [&>a:last-child]: [&>a:last-child]:bg-transparent [&>a:last-child]:text-black dark:[&>a:last-child]:text-white"
                                />
                              </div>
                              
                              {/* Outcome Badge */}
                              <Badge variant="secondary" className="text-xs flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {resource.duration || '2h 30m'}
                              </Badge>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Column 2: Course Messages */}
              <Card className="border-4 border-primary h-[95%]">
                <CardHeader>
                  <CardTitle className="text-lg">Courses</CardTitle>
                  <CardDescription>Latest additions and updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[calc(100vh-15rem)] pb-2">
                    <div className="space-y-4">
                      {resources.map((course, i) => (
                        <div key={i} className="flex gap-2">
                          <Button variant="ghost" className="w-full p-0 h-auto hover:bg-transparent" onClick={() => setCurrentView('courses')}>
                            <Card className="p-2 bg-accent rounded-lg flex-1 border-4 w-full">
                              <div className="flex items-center">
                              <Avatar className="h-6 w-6 rounded-full border-2 border-primary flex items-center justify-center">
                              {(() => {
                                const icons = [
                                  <Video className="h-3 w-3" />,
                                  <FileText className="h-3 w-3" />,
                                  <MonitorPlay className="h-3 w-3" />
                                ];
                                return icons[Math.floor(Math.random() * icons.length)];
                              })()}
                            </Avatar>
                                <div className="flex justify-between items-start px-2">
                                  <Badge variant="secondary" className="text-xs text-muted-foreground">3/12</Badge>
                                </div>
                                  <div className="top-2 right-2 ml-auto" onClick={(e) => e.stopPropagation()}>
                                    <Menubar className="border-0 bg-transparent p-0 h-auto">
                                      <MenubarMenu>
                                        <MenubarTrigger asChild>
                                          <Badge variant="outline" className="cursor-pointer hover:bg-accent-foreground/10">
                                            <MoreVertical className="h-4 w-4 rotate-90" />
                                          </Badge>
                                        </MenubarTrigger>
                                        <MenubarContent>
                                          <MenubarItem>
                                            <Edit className="mr-2 h-4 w-4" />
                                            Edit
                                          </MenubarItem>
                                          <MenubarItem>
                                            <Share className="mr-2 h-4 w-4" />
                                            Share
                                          </MenubarItem>
                                          <MenubarSeparator />
                                          <MenubarItem className="text-destructive">
                                            <Trash className="mr-2 h-4 w-4" />
                                            Delete
                                          </MenubarItem>
                                        </MenubarContent>
                                      </MenubarMenu>
                                    </Menubar>
                                  </div>
                              </div>
                              <p className="text-xs text-muted-foreground p-2">{course.type || 'Video Course'} by {course.creator || 'Sarah Smith'}</p>
                              <p className="font-medium">{course.title}</p>
                              <div className="mt-3 space-y-2">
                                <div className="w-full flex items-center gap-2">
                                  <Slider 
                                    defaultValue={[(3/12) * 100]}
                                    max={100}
                                    step={1}
                                    disabled
                                    className="cursor-default"
                                  />
                                </div>
                                <div className="flex justify-between text-[0.7rem] text-muted-foreground">
                                  <span>Jan 15, 2024</span>
                                  <span>Feb 1, 2024</span>
                                </div>
                              </div>
                            </Card>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Column 3: Featured Section */}
              <Card className="border-4 border-primary h-[95%]">
                <CardHeader>
                  <CardTitle className="text-lg">Featured</CardTitle>
                  <CardDescription>Highlights and important updates</CardDescription>
                </CardHeader>
                <CardContent className="overflow-0">
                  <div className="h-[calc(100vh-20rem)] relative">
                    <div>
                      <Card className="p-4 border-4 border-primary bg-accent hover:bg-accent/80 transition-colors">
                        <div className="flex items-center gap-2 ">
                          <Star className="h-5 w-5 text-primary" />
                          <h3 className="font-semibold">Featured Course</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">Advanced TypeScript Masterclass</p>
                        <p className="text-sm mb-4">Master TypeScript with hands-on projects and advanced concepts</p>
                        <div className="flex items-center gap-2 mb-4">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm">8 weeks</span>
                        </div>
                        <Button className="w-full hover:bg-primary/90">Enroll Now</Button>
                      </Card>
                    </div>
                    <div className="">
                      {/* summarise the reviews for a more consise feedback loop/message */}
                      <Marquee className="bg-muted/50 rounded-lg" pauseOnHover>
                        <div className="flex items-center gap-4 px-3">
                          <Card className="w-[224px] p-3 border-2 mb-2">
                            <div className="flex items-center gap-2 mb-1">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src="/avatars/user1.jpg" />
                                <AvatarFallback>JD</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-xs font-medium">John Doe</p>
                                <p className="text-[10px] text-muted-foreground">TypeScript Student</p>
                              </div>
                            </div>
                            <p className="text-xs">"The TypeScript course was exactly what I needed!"</p>
                          </Card>

                          <Card className="w-[224px] p-3 border-2 mb-2">
                            <div className="flex items-center gap-2 mb-1">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src="/avatars/user2.jpg" />
                                <AvatarFallback>AR</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-xs font-medium">Alice Rodriguez</p>
                                <p className="text-[10px] text-muted-foreground">Full Stack Developer</p>
                              </div>
                            </div>
                            <p className="text-xs">"Sarah's teaching style is incredible."</p>
                          </Card>

                          <Card className="w-[224px] p-3 border-2 mb-2">
                            <div className="flex items-center gap-2 mb-1">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src="/avatars/user3.jpg" />
                                <AvatarFallback>MK</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-xs font-medium">Mike Kim</p>
                                <p className="text-[10px] text-muted-foreground">React Developer</p>
                              </div>
                            </div>
                            <p className="text-xs">"The hands-on projects really helped cement the concepts."</p>
                          </Card>
                        </div>
                      </Marquee>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };


  const AdminCourseView = ({ courses }: { courses: any[] }) => {
    const { currentView, setCurrentView } = useView();

    return (
        <div className="fixed h-[calc(100vh-3.5rem)] w-[calc(100vw-16rem)] left-64 top-14 p-4 overflow-auto">
          <Card className="h-full w-full border-8 border-primary"> 
          <ScrollArea className="h-full w-full overflow-auto">
          <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Course: Advanced JavaScript Concepts [edit]</CardTitle>
            <div className="flex items-center space-x-2">
              <Switch 
                checked={isAdmin}
                onCheckedChange={(checked) => {
                  setIsAdmin(!checked);
                  if (isAdmin) {
                    setCurrentView('memberCourse');
                  }
                }}
              />
            </div>
          </div>
        </CardHeader>
        
        
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Course Content Navigation */}
            <div>
                <div className="md:col-span-1 flex flex-col h-full">
                  <div className="font-semibold mb-4">Course Modules</div>
                    <div className="">
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
                          <Card className={`
                              ${module.current ? 'border-primary bg-accent shadow-sm' : ''}
                            `}>
                              <CardContent className="p-4">
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
                                    <Card key={j}>
                                      <CardContent className="p-0">
                                        <button
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
                                      </CardContent>
                                    </Card>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                        </div>
                      )})}
                    </div>
                  

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
                      <div className="flex justify-center gap-3">
                        <Button variant="outline">Cancel</Button>
                        <Button>Save Module</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
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
                                      <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                          <input type="radio" name="quiz" id="a" value="a" className="radio" />
                                          <label htmlFor="a" className="text-sm">Data privacy and encapsulation</label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <input type="radio" name="quiz" id="b" value="b" className="radio" />
                                          <label htmlFor="b" className="text-sm">Memory optimization</label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <input type="radio" name="quiz" id="c" value="c" className="radio" />
                                          <label htmlFor="c" className="text-sm">Code organization</label>
                                        </div>
                                      </div>
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
        </ScrollArea>
      </Card>
      </div>
    );
  };

  const EngagementView = () => {
    const [selectedMetric, setSelectedMetric] = useState('overview');
    const [selectedReview, setSelectedReview] = useState({
      rating: 0,
      comment: '',
      timestamp: '',
      reviewer: '',
      status: 'all',
      filter: 'all',
      sortBy: 'newest',
      mainContent: 'reviews',
      productFilter: 'all'
    });

    return (
      <div className="fixed h-[calc(100vh-3.5rem)] w-[calc(100vw-16rem)] left-64 top-14 p-4">
        <Card className="w-full border-8 border-primary"> 
        <CardHeader>
            <CardTitle>Community Engagement</CardTitle>
            <CardDescription>
              Monitor and manage your community's engagement metrics and interactions
            </CardDescription>
          </CardHeader>
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <CardContent className="p-6 space-y-6">
              <Card className="border-2">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Engagement Metrics</CardTitle>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Metric
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    
                    <div className="relative w-full h-full">
                      <Carousel
                        className="w-full"
                        opts={{
                          align: "start",
                          loop: true,
                          dragFree: true,
                          skipSnaps: false,
                          startIndex: 0
                        }}
                      >
                        <CarouselContent>
                          <CarouselItem className="pl-4 basis-1/4">
                            <Card className="h-[120px] hover:bg-primary/5 transition-all cursor-pointer group">
                              <CardHeader className="p-2 flex flex-row items-center justify-between">
                                <h4 className="font-medium text-sm">Active Users</h4>
                                <Users2 className="w-5 h-5 text-primary" />
                              </CardHeader>
                              <CardContent className="p-2 text-center">
                                <div className="flex items-baseline gap-2 justify-center">
                                  <p className="text-2xl font-bold">2,543</p>
                                  <p className="text-xs text-green-500 font-medium">+12%</p>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">Total Users</p>
                              </CardContent>
                            </Card>
                          </CarouselItem>

                          <CarouselItem className="pl-4 basis-1/4">
                            <Card className="h-[120px] hover:bg-primary/5 transition-all cursor-pointer group">
                              <CardHeader className="p-2 flex flex-row items-center justify-between">
                                <h4 className="font-medium text-sm">Comments</h4>
                                <MessageSquare className="w-5 h-5 text-primary" />
                              </CardHeader>
                              <CardContent className="p-2 text-center">
                                <div className="flex items-baseline gap-2 justify-center">
                                  <p className="text-2xl font-bold">1,877</p>
                                  <p className="text-xs text-green-500 font-medium">+8%</p>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">Total Comments</p>
                              </CardContent>
                            </Card>
                          </CarouselItem>

                          <CarouselItem className="pl-4 basis-1/4">
                            <Card className="h-[120px] hover:bg-primary/5 transition-all cursor-pointer group">
                              <CardHeader className="p-2 flex flex-row items-center justify-between">
                                <h4 className="font-medium text-sm">Rating</h4>
                                <Star className="w-5 h-5 text-primary" />
                              </CardHeader>
                              <CardContent className="p-2 text-center">
                                <div className="flex items-baseline gap-2 justify-center">
                                  <p className="text-2xl font-bold">4.7</p>
                                  <p className="text-xs text-green-500 font-medium">+0.2</p>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">Average Rating</p>
                              </CardContent>
                            </Card>
                          </CarouselItem>

                          <CarouselItem className="pl-4 basis-1/4">
                            <Card className="h-[120px] hover:bg-primary/5 transition-all cursor-pointer group">
                              <CardHeader className="p-2 flex flex-row items-center justify-between">
                                <h4 className="font-medium text-sm">Shares</h4>
                                <Share2 className="w-5 h-5 text-primary" />
                              </CardHeader>
                              <CardContent className="p-2 text-center">
                                <div className="flex items-baseline gap-2 justify-center">
                                  <p className="text-2xl font-bold">892</p>
                                  <p className="text-xs text-green-500 font-medium">+15%</p>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">Total Shares</p>
                              </CardContent>
                            </Card>
                          </CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious className="absolute -left-4" />
                        <CarouselNext className="absolute -right-4" />
                      </Carousel>
                    </div>

                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="w-full justify-between">
                          <span>View Detailed Analytics</span>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-4 mt-4">
                        <div className="grid grid-cols-2 gap-4">
                          <Card className="p-4">
                            <CardHeader>
                              <CardTitle className="text-lg">Engagement Over Time</CardTitle>
                            </CardHeader>
                            <CardContent>
                              {/* Area Chart Component would go here */}
                              <div className="h-[200px] w-full bg-muted rounded-lg flex items-center justify-center">
                                Area Chart Placeholder
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="p-4">
                            <CardHeader>
                              <CardTitle className="text-lg">User Distribution</CardTitle>
                            </CardHeader>
                            <CardContent>
                              {/* Pie Chart Component would go here */}
                              <div className="h-[200px] w-full bg-muted rounded-lg flex items-center justify-center">
                                Pie Chart Placeholder
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Detailed Metrics</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Metric</TableHead>
                                  <TableHead>Value</TableHead>
                                  <TableHead>Change</TableHead>
                                  <TableHead>Trend</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell>Session Duration</TableCell>
                                  <TableCell>12m 30s</TableCell>
                                  <TableCell className="text-green-500">+2m 15s</TableCell>
                                  <TableCell>↗</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Bounce Rate</TableCell>
                                  <TableCell>24.8%</TableCell>
                                  <TableCell className="text-red-500">+2.1%</TableCell>
                                  <TableCell>↘</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Community Engagement & Feedback</CardTitle>
                    <div className="flex gap-4">
                      <Select 
                        value={selectedReview.filter}
                        onValueChange={(value) => setSelectedReview(prev => ({...prev, filter: value}))}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="View Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Feedback</SelectItem>
                          <SelectItem value="reviews">Reviews</SelectItem>
                          <SelectItem value="suggestions">Suggestions</SelectItem>
                          <SelectItem value="bugs">Bug Reports</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select
                        value={selectedReview.sortBy}
                        onValueChange={(value) => setSelectedReview(prev => ({...prev, sortBy: value}))}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Time Range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="day">Last 24 Hours</SelectItem>
                          <SelectItem value="week">Last Week</SelectItem>
                          <SelectItem value="month">Last Month</SelectItem>
                          <SelectItem value="quarter">Last Quarter</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-4">
                      <div className="space-y-4">
                        <Card className="p-4">
                          <h4 className="font-medium text-lg mb-2 text-center">Engagement Score</h4>
                          <div className="flex flex-col items-center justify-center">
                            <span className="text-4xl font-bold my-6">87</span>
                            <div className="w-[80%] h-2 bg-gray-200 rounded-full">
                              <div className="h-full bg-primary rounded-full" style={{width: '87%'}}></div>
                            </div>
                            <div className="text-sm text-muted-foreground mt-4 text-center">
                              <span className="text-green-500">+12</span>
                              <span className="ml-1">from previous period</span>
                            </div>
                          </div>
                        </Card>

                        <Card className="p-4">
                          <h4 className="font-medium text-lg mb-4">Quick Stats</h4>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Active Users</span>
                              <span className="font-medium">2,847</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Avg. Response Time</span>
                              <span className="font-medium">2.3 hrs</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Resolution Rate</span>
                              <span className="font-medium">94%</span>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </div>

                    <div className="col-span-8">
                      <Card className="h-full">
                        <CardHeader>
                          <h4 className="font-medium">Recent Community Activity</h4>
                        </CardHeader>
                        <CardContent>
                          <ScrollArea className="h-[400px]">
                            <div className="space-y-4">
                              {[1, 2, 3, 4, 5].map((i) => (
                                <Card key={i} className="p-4 hover:bg-muted/50 transition-colors">
                                  <div className="flex gap-4">
                                    <div className="w-[15%]">
                                      <Avatar>
                                        <AvatarImage src="/default-avatar.png" />
                                        <AvatarFallback>U{i}</AvatarFallback>
                                      </Avatar>
                                    </div>
                                    <div className="w-[85%]">
                                      <div className="flex justify-between items-start mb-2">
                                        <div>
                                          <h4 className="font-medium">User Feedback #{i}</h4>
                                          <p className="text-sm text-muted-foreground">2 hours ago</p>
                                        </div>
                                        <Badge variant="outline">Feature Request</Badge>
                                      </div>
                                      <p className="text-sm mb-3">Would love to see more customization options for the dashboard layout. The current setup is good but more flexibility would be great!</p>
                                      <div className="flex items-center gap-4">
                                        <Button variant="outline" size="sm" className="gap-2">
                                          <ThumbsUp className="h-4 w-4" />
                                          <span>23</span>
                                        </Button>
                                        <Button variant="outline" size="sm" className="gap-2">
                                          <MessageCircle className="h-4 w-4" />
                                          <span>12</span>
                                        </Button>
                                        <Button variant="outline" size="sm">
                                          View Thread
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </Card>
                              ))}
                            </div>
                          </ScrollArea>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </ScrollArea>
        </Card>
      </div>
    );
  };

  const ConsoleView = () => {
    const [activeSlide, setActiveSlide] = React.useState(0);
    const totalSlides = 3;
  
    const [selectedReview, setSelectedReview] = React.useState({
      rating: 0,
      comment: '',
      timestamp: '',
      reviewer: '',
      status: 'all',
      filter: 'all', 
      sortBy: 'newest',
      mainContent: 'reviews',
      productFilter: 'all'
    });
  
    const [selectedSetting, setSelectedSetting] = React.useState({
      agentName: 'settings',
      agentRole: '',
      agentBehavior: '',
      customInstructions: '',
      model: 'gpt4',
      temperature: 0.7
    });
  
    const handleSettingChange = (field: string, value: string | number | File[]) => {
      if (field === 'documents' && Array.isArray(value)) {
        const files = value as File[];
        const allowedTypes = ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        
        const validFiles = files.filter(file => allowedTypes.includes(file.type));
        
        if (validFiles.length !== files.length) {
          console.warn('Some files were skipped due to invalid file type');
        }
  
        setSelectedSetting(prev => ({
          ...prev,
          ...{documents: [...((prev as any).documents || []), ...validFiles]}
        }));
  
      } else {
        setSelectedSetting(prev => ({
          ...prev,
          [field]: value
        }));
      }
    };
  
    return (
      <div className="fixed h-[calc(100vh-3.5rem)] w-[calc(100vw-16rem)] left-64 top-14 p-6">
        <Card className="h-full w-full border-4 border-primary shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold">User Console</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-12 gap-6 h-[calc(100vh-12rem)]">
              
              {/* Sidebar */}
              <div className="col-span-3 p-4">
                  <div className="space-y-2">
                    {[
                      {name: 'settings', icon: Settings2, label: 'Agent Settings'},
                      {name: 'history', icon: Clock, label: 'Conversation History'}, 
                      {name: 'context', icon: Library, label: 'Context Library'},
                      {name: 'prompts', icon: MessagesSquare, label: 'Prompt Templates'}
                    ].map((item) => (
                      <Button 
                        key={item.name}
                        variant={selectedSetting.agentName === item.name ? 'default' : 'ghost'} 
                        className="w-full justify-start"
                        onClick={() => setSelectedSetting({
                          ...selectedSetting,
                          agentName: item.name
                        })}
                      >
                        <item.icon className="h-4 w-4 mr-2" />
                        {item.label}
                      </Button>
                    ))}
                  </div>
              </div>

              {/* Main Content */}
              <div className="col-span-9 p-4">
                <ScrollArea className="h-[calc(100vh-14rem)] ">
                  {selectedSetting.agentName === 'settings' && (
                    <div className="space-y-6">
                      <Card className="border-2">
                        <CardHeader>
                          <CardTitle className="text-center">Agent Configuration</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div>
                                <Label className="text-center">Model Selection</Label>
                                <Menubar className="w-full mt-2">
                                  <MenubarMenu>
                                    <MenubarTrigger className="w-full justify-between">
                                      {selectedSetting.model === 'gpt4' && 'GPT-4'}
                                      {selectedSetting.model === 'gpt35' && 'GPT-3.5'} 
                                      {selectedSetting.model === 'claude' && 'Claude'}
                                      {selectedSetting.model === 'llama' && 'Llama 2'}
                                    </MenubarTrigger>
                                    <MenubarContent>
                                      {['gpt4', 'gpt35', 'claude', 'llama'].map((model) => (
                                        <MenubarItem key={model} onClick={() => handleSettingChange('model', model)}>
                                          {model === 'gpt4' && 'GPT-4'}
                                          {model === 'gpt35' && 'GPT-3.5'}
                                          {model === 'claude' && 'Claude'} 
                                          {model === 'llama' && 'Llama 2'}
                                        </MenubarItem>
                                      ))}
                                    </MenubarContent>
                                  </MenubarMenu>
                                </Menubar>
                              </div>

                              <div>
                                <Label className="text-center">Agent Role</Label>
                                <Menubar className="w-full mt-2">
                                  <MenubarMenu>
                                    <MenubarTrigger className="w-full justify-between">
                                      {selectedSetting.agentRole || 'Select Agent Role'}
                                    </MenubarTrigger>
                                    <MenubarContent>
                                      <MenubarItem onClick={() => handleSettingChange('agentRole', 'Research Assistant')}>
                                        Research Assistant
                                      </MenubarItem>
                                      <MenubarItem onClick={() => handleSettingChange('agentRole', 'Copywriter')}>
                                        Copywriter
                                      </MenubarItem>
                                      <MenubarItem onClick={() => handleSettingChange('agentRole', 'Data Analyst')}>
                                        Data Analyst
                                      </MenubarItem>
                                      <MenubarItem onClick={() => handleSettingChange('agentRole', 'Content Strategist')}>
                                        Content Strategist
                                      </MenubarItem>
                                      <MenubarItem onClick={() => handleSettingChange('agentRole', 'Business Analyst')}>
                                        Business Analyst
                                      </MenubarItem>
                                      <MenubarItem onClick={() => handleSettingChange('agentRole', 'Technical Writer')}>
                                        Technical Writer
                                      </MenubarItem>
                                    </MenubarContent>
                                  </MenubarMenu>
                                </Menubar>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <Label className="text-center">Agent Behavior</Label>
                                <Textarea
                                  className="mt-2 min-h-[120px]"
                                  placeholder="Describe how the agent should behave...  eg. provide responses in a specific format etc..."
                                  value={selectedSetting.agentBehavior}
                                  onChange={(e) => handleSettingChange('agentBehavior', e.target.value)}
                                />
                              </div>
                            </div>
                          </div>

                          <div>
                            <Label className="text-center">Custom Instructions</Label>
                            <Textarea
                              className="mt-2 min-h-[120px]"
                              placeholder="Add any custom instructions to further personalise the agent... eg. You are a sales manager for a supplements company"
                              value={selectedSetting.customInstructions}
                              onChange={(e) => handleSettingChange('customInstructions', e.target.value)}
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <Label>Temperature ({selectedSetting.temperature})</Label>
                              <span className="text-sm text-muted-foreground">Controls randomness</span>
                            </div>
                            <Slider 
                              defaultValue={[selectedSetting.temperature]} 
                              max={1} 
                              step={0.1}
                              onValueChange={(value) => handleSettingChange('temperature', value[0])}
                            />
                          </div>

                          <div>
                            <Label>Knowledge Base</Label>
                            <Input
                              type="file"
                              multiple
                              accept=".pdf,.txt,.doc,.docx"
                              className="mt-2"
                              onChange={(e) => handleSettingChange('documents', Array.from(e.target.files || []))}
                            />
                            <p className="text-sm text-muted-foreground mt-1">Upload documents to enhance agent knowledge</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {selectedSetting.agentName === 'history' && (
                    <div className="grid grid-cols-2 gap-4">
                      {[1,2,3,4].map((i) => (
                        <Dialog key={i}>
                          <DialogTrigger asChild>
                            <Card className="border-2 hover:border-primary cursor-pointer transition-all">
                              <CardContent className="p-4">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <h4 className="font-medium">Conversation #{i}</h4>
                                    <p className="text-sm text-muted-foreground">2 hours ago</p>
                                  </div>
                                  <Button variant="outline" size="sm">View</Button>
                                </div>
                              </CardContent>
                            </Card>
                          </DialogTrigger>
                          <DialogContent className="w-[70vw] h-[70vh]">
                            <DialogHeader>
                              <DialogTitle>Conversation History #{i}</DialogTitle>
                            </DialogHeader>
                            <ScrollArea className="h-[calc(70vh-8rem)] p-6">
                              <div className="space-y-4">
                                <div className="flex justify-end mb-4">
                                  <Card className="max-w-[80%] border-2 border-primary">
                                    <CardContent className="p-3">
                                      <div className="flex items-start gap-3">
                                        <div className="text-sm whitespace-pre-wrap break-words">
                                          How can I improve this code?
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>
                                <div className="flex justify-start mb-4">
                                  <Card className="max-w-[80%] border-2 border-neutral-900 dark:border-neutral-50">
                                    <CardContent className="p-3">
                                      <div className="flex items-start gap-3">
                                        <Avatar className="h-8 w-8">
                                          <AvatarImage src="/default-avatar.png" alt="AI Assistant" />
                                          <AvatarFallback>AI</AvatarFallback>
                                        </Avatar>
                                        <div className="text-sm whitespace-pre-wrap break-words">
                                          Here are some suggestions to improve your code...
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>
                              </div>
                            </ScrollArea>
                          </DialogContent>
                        </Dialog>
                      ))}
                    </div>
                  )}

                  {selectedSetting.agentName === 'context' && (
                    <div className="space-y-6">
                      <Card className="border-2">
                        <CardHeader>
                          <CardTitle className="text-center">Creator Resources Library</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4">
                            {[
                              {
                                title: 'Content Creation Guides',
                                categories: ['Video Editing', 'Podcasting', 'Copywriting'],
                                lastUpdated: '1 day ago'
                              },
                              {
                                title: 'Platform Best Practices', 
                                categories: ['YouTube', 'TikTok', 'Instagram'],
                                lastUpdated: '3 days ago'
                              },
                              {
                                title: 'Marketing Resources',
                                categories: ['Social Media', 'Email Marketing', 'Brand Strategy'],
                                lastUpdated: '1 week ago'
                              },
                              {
                                title: 'Design Assets',
                                categories: ['Motion Graphics', 'Graphic Design'],
                                lastUpdated: '2 days ago'
                              }
                            ].map((resource) => (
                              <Card key={resource.title} className="border-2">
                                <CardContent className="p-4">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h4 className="font-medium">{resource.title}</h4>
                                      <div className="flex flex-wrap gap-1 mt-1">
                                        {resource.categories.map((category) => (
                                          <span key={category} className="text-xs bg-muted px-2 py-1 rounded">
                                            {category}
                                          </span>
                                        ))}
                                      </div>
                                      <p className="text-sm text-muted-foreground mt-2">
                                        Last updated {resource.lastUpdated}
                                      </p>
                                    </div>
                                    <div className="space-x-2">
                                      <Button variant="outline" size="sm">Edit</Button>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                          <Button className="w-full mt-4" variant="outline">
                            Add New Resource
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {selectedSetting.agentName === 'prompts' && (
                    <div className="space-y-6">
                      <Card className="border-2">
                        <CardHeader>
                          <CardTitle>Prompt Templates</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4">
                            {[
                              {
                                title: 'Content Strategy',
                                description: 'Generate content ideas and strategy for your niche'
                              },
                              {
                                title: 'Video Script',
                                description: 'Create engaging video scripts with hooks and storytelling'
                              },
                              {
                                title: 'Social Caption',
                                description: 'Write compelling social media captions that drive engagement'
                              },
                              {
                                title: 'SEO Optimization',
                                description: 'Optimize your content titles and descriptions for search'
                              }
                            ].map((template) => (
                              <Card key={template.title} className="border-2">
                                <CardContent className="p-4">
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <h4 className="font-medium">{template.title}</h4>
                                      <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                                    </div>
                                    <Button variant="outline" size="sm">Edit</Button>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </ScrollArea>
              </div>
            </div>
          </CardContent>
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
      <Card className="h-full w-full border-8 border-primary">
        <div className="relative h-full w-full overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            <div className="flex flex-col">
              <Card className="md:col-span-1 border-4 border-primary h-fit">
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
              <Card className="border-4 border-primary mt-5">
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

                       

            <div className="md:col-span-2 space-y-4 max-h-[calc(100vh-10rem)]">
              <Card className="border-4 border-primary">
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
                <Card className="border-4 border-primary">
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

                <Card className="border-4 border-primary">
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

              <Card className="border-4 border-primary">
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
              <Button variant="ghost" className="justify-start w-full pl-10" onClick={() => setCurrentView('overview')}>
                <BarChart2 className="mr-2 h-4 w-4" />
                Overview
              </Button>
            </div>
            <div className="pl-5">
              <Button variant="ghost" className="justify-start w-full pl-10" onClick={() => setCurrentView('members')}>
                <Users2 className="mr-2 h-4 w-4" />
                Members
              </Button>
            </div>
            <div className="pl-5">
              <Button variant="ghost" className="justify-start w-full pl-10" onClick={() => setCurrentView('campaigns')}>
                <Sparkles className="mr-2 h-4 w-4" />
                Campaigns
              </Button>
            </div>
            <div className="pl-5">
              <Button variant="ghost" className="justify-start w-full pl-10" onClick={() => setCurrentView('engagement')}>
                <TrendingUp className="mr-2 h-4 w-4" />
                Engagement
              </Button>
            </div>
            <div className="pl-5">
              <Button variant="ghost" className="justify-start w-full pl-10" onClick={() => setCurrentView('resources')}>
                <FolderTree className="mr-2 h-4 w-4" />
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

          <div className="px-3">
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
        {currentView === 'overview' && <OverviewView />}
        {currentView === 'members' && <MembersView />}
        {currentView === 'campaigns' && <CampaignView />}
        {currentView === 'engagement' && <EngagementView />}
        {currentView === 'campaign-editor' && <CampaignEditorView />}
        {currentView === 'resources' && <ResourcesView />}   
        {currentView === 'courses' && <CourseView />}  
        {currentView === 'adminCourse' && <AdminCourseView courses={[]}/>}   
        {currentView === 'memberCourse' && <MemberCourseView courses={[]}/>} 
        {currentView === 'console' && <ConsoleView/>}
        {currentView === 'profile' && <ProfileView/>}

   
      </div>
    </div>
  );
}
