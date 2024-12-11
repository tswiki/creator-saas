

import { SetStateAction, useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, Label } from '@radix-ui/react-dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import { toast } from '@/hooks/use-toast';
import { Form, useForm } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl } from './ui/form';


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

//   export default function sidebar();