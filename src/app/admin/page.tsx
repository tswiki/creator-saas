

'use client';

import React, { useMemo } from 'react';
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, SetStateAction, useEffect, useRef, useState } from 'react';
import { Button } from "@/components/v0/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/v0/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/v0/ui/avatar";
import { Badge } from "@/components/v0/ui/badge";
import HeroVideoDialog from "@/components/v0/ui/hero-video-dialog";
import { auth } from '@/firebase/firebaseConfig';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/v0/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/v0/ui/sheet";
import { ScrollArea } from "@/components/v0/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/v0/ui/select";
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
  Wand2
} from "lucide-react";
import { Input } from '@/components/v0/ui/input';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, Label, DropdownMenuSeparator, RadioGroup, Separator } from '@radix-ui/react-dropdown-menu';
import { Switch } from '@/components/v0/ui/switch';
import { useTheme } from 'next-themes';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';
import { useView } from '@/contexts/viewContext'
import { Textarea } from '@/components/v0/ui/textarea';
import CampaignForm from '@/components/campaign/campaign-form';
import CampaignPreview from '@/components/campaign/campaign-preview';
import { Campaign } from '~/types/campaign';
import { useCampaign } from '@/contexts/campaignContext';



export default function AdminPortal() {

  const [mobileOpen, setMobileOpen] = useState(false);
  const { currentView, setCurrentView } = useView(' ');
  useEffect(() => {
    setCurrentView('overview');
  }, []);


  const OverviewView = () => {
    const [selectedBoard, setSelectedBoard] = useState('pipeline');
    const [showCreateDialog, setShowCreateDialog] = useState(false);

    return (
      <div className="fixed h-[calc(100vh-3.5rem)] w-[calc(100vw-16rem)] left-64 top-14 p-4">
        <Card className="h-full w-full border-8 border-primary overflow-hidden">
          <Card className="h-full overflow-hidden">
            <CardHeader className="sticky top-0 bg-background z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Select defaultValue={selectedBoard} onValueChange={setSelectedBoard}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select board" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pipeline">Pipeline View</SelectItem>
                      <SelectItem value="kanban">Kanban Board</SelectItem>
                      <SelectItem value="list">List View</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="relative ml-20">
                    <Input
                      placeholder="Search users..."
                      className="w-[200px] border-2"
                      startIcon={<Search className="h-4 w-4 text-muted-foreground" />}
                    />
                  </div>

                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <Avatar key={i} className="border-2 border-background hover:translate-y-[-2px] transition-transform cursor-pointer">
                        <AvatarImage src={`/default-avatar.png`} />
                        <AvatarFallback>U{i + 1}</AvatarFallback>
                      </Avatar>
                    ))}
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button size="sm" onClick={() => setShowCreateDialog(true)}>
                    <Plus className="h-4 w-4" />
                    Create Task
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-2 overflow-auto">
              <div className="grid grid-cols-3 gap-3 h-[calc(100vh-12rem)]">
                {['Backlog', 'In Progress', 'Review'].map((column) => (
                  <Card key={column} className="p-2 border-2 border-primary h-[calc(100vh-14rem)] flex flex-col">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <h3 className="font-semibold">{column}</h3>
                      <Badge variant="outline">{3}</Badge>
                    </div>
                    <ScrollArea className="flex-1 overflow-auto">
                      <div className="space-y-3 pr-4">
                        {[...Array(3)].map((_, i) => (
                          <Card key={i} className="p-4 m-2 cursor-pointer hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium">Task Title {i + 1}</h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Brief description of the task...
                                </p>
                              </div>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex -space-x-2">
                                <Avatar className="h-6 w-6 border-2 border-background">
                                  <AvatarFallback>U1</AvatarFallback>
                                </Avatar>
                                <Avatar className="h-6 w-6 border-2 border-background">
                                  <AvatarFallback>U2</AvatarFallback>
                                </Avatar>
                              </div>
                              <Badge>{column === 'Completed' ? 'Done' : 'Active'}</Badge>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
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
        <Card className="w-full border-8">
          <Card className="">
            <Card>
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
          </Card>
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
            <Card className="w-full border-8 border-primary"> 
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
        <Card className="w-full border-8 border-primary">
          <CardContent className="h-[calc(100vh-12rem)] overflow-hidden">
            <ScrollArea className="h-full">
              <CampaignPreview campaignID={campaignId}/>
            </ScrollArea>
          </CardContent>
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
                  <CardTitle>Engagement Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4">
                    <Card className="p-4">
                      <div className="flex flex-col items-center">
                        <Users2 className="h-8 w-8 mb-2 text-primary" />
                        <h3 className="text-2xl font-bold">2,543</h3>
                        <p className="text-sm text-muted-foreground">Active Users</p>
                        <span className="text-xs text-green-500 mt-1">+12% vs last month</span>
                      </div>
                    </Card>

                    <Card className="p-4">
                      <div className="flex flex-col items-center">
                        <MessageSquare className="h-8 w-8 mb-2 text-primary" />
                        <h3 className="text-2xl font-bold">1,877</h3>
                        <p className="text-sm text-muted-foreground">Comments</p>
                        <span className="text-xs text-green-500 mt-1">+8% vs last month</span>
                      </div>
                    </Card>

                    <Card className="p-4">
                      <div className="flex flex-col items-center">
                        <Star className="h-8 w-8 mb-2 text-primary" />
                        <h3 className="text-2xl font-bold">4.7</h3>
                        <p className="text-sm text-muted-foreground">Avg Rating</p>
                        <span className="text-xs text-green-500 mt-1">+0.2 vs last month</span>
                      </div>
                    </Card>

                    <Card className="p-4">
                      <div className="flex flex-col items-center">
                        <Share2 className="h-8 w-8 mb-2 text-primary" />
                        <h3 className="text-2xl font-bold">892</h3>
                        <p className="text-sm text-muted-foreground">Shares</p>
                        <span className="text-xs text-green-500 mt-1">+15% vs last month</span>
                      </div>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Community Reviews</CardTitle>
                    <div className="flex gap-4">
                      <Select 
                        value={selectedReview.filter} 
                        onValueChange={(value) => setSelectedReview(prev => ({...prev, filter: value}))}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filter reviews" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Reviews</SelectItem>
                          <SelectItem value="featured">Featured</SelectItem>
                          <SelectItem value="recent">Recent</SelectItem>
                          <SelectItem value="by-product">By Product</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select 
                        value={selectedReview.sortBy}
                        onValueChange={(value) => setSelectedReview(prev => ({...prev, sortBy: value}))}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newest">Newest First</SelectItem>
                          <SelectItem value="oldest">Oldest First</SelectItem>
                          <SelectItem value="highest">Highest Rated</SelectItem>
                          <SelectItem value="lowest">Lowest Rated</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-4">
                      <Card className="p-4">
                        <h4 className="font-medium text-lg mb-2 text-center">Average Rating</h4>
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-4xl font-bold my-6">4.7</span>
                          <div className="flex text-yellow-400 mt-2 justify-center">
                            <Star className="h-5 w-5 fill-current" />
                            <Star className="h-5 w-5 fill-current" />
                            <Star className="h-5 w-5 fill-current" />
                            <Star className="h-5 w-5 fill-current" />
                            <Star className="h-5 w-5 fill-current" />
                          </div>
                          <div className="text-sm text-muted-foreground mt-2 text-center">
                            <span className="text-green-500">+0.2</span>
                            <span className="ml-1">vs last 30 days</span>
                          </div>
                        </div>
                      </Card>
                    </div>

                    <div className="col-span-8">
                      <ScrollArea className="h-[400px]">
                        <div className="space-y-4 pr-4">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Card key={i} className="p-4">
                              <div className="flex gap-4">
                                <div className="w-[30%]">
                                  <div className="flex items-center gap-3">
                                    <Avatar>
                                      <AvatarImage src="/default-avatar.png" />
                                      <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <h4 className="font-medium">John Doe</h4>
                                      <p className="text-sm text-muted-foreground">Total Reviews: 15</p>
                                    </div>
                                  </div>
                                </div>

                                <div className="w-[70%]">
                                  <div className="flex text-yellow-400 mb-2">
                                    <Star className="h-4 w-4 fill-current" />
                                    <Star className="h-4 w-4 fill-current" />
                                    <Star className="h-4 w-4 fill-current" />
                                    <Star className="h-4 w-4 fill-current" />
                                    <Star className="h-4 w-4 fill-current" />
                                  </div>
                                  <p className="text-sm mb-4">Excellent product! The user interface is intuitive and the features are exactly what I needed.</p>
                                  <div className="flex gap-2">
                                    <Button variant="outline" size="sm">
                                      <MessagesSquare className="h-4 w-4 mr-2" />
                                      Message
                                    </Button>
                                    <Button variant="outline" size="sm">
                                      <Star className="h-4 w-4 mr-2" />
                                      Like
                                    </Button>
                                    <Button variant="outline" size="sm">
                                      <Reply className="h-4 w-4 mr-2" />
                                      Reply
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </ScrollArea>
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
        {currentView === 'dashboard' && <DashboardView />}        
      </div>
    </div>
  );
}
