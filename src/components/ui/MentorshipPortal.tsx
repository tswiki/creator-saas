
'use client';

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from '@/firebase/firebaseConfig';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
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
  Users, 
  Menu,
  Settings,
  Link,
  Hash,
  Moon,
  Sun,
  LogOut,
  Pencil,
  Save,
  LayoutDashboard,
} from "lucide-react";
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import { toast } from '@/hooks/use-toast';

import DashboardView from './dashboardView'
import ScheduleView from './scheduleView';
import SpacesView from './spacesView';
import MyMentorView from './mentorView';
import CourseView from './courseView';
import ResourcesView from './resoursesView';
import { useState } from "react";
import { Card, CardHeader, CardContent } from "./card";


export default function MentorshipPortal() {

  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [date, setDate] = useState<Date | undefined>(new Date());

  const Sidebar = () => {
    const [showProfileDialog, setShowProfileDialog] = useState(false);
    const [currentProfileView, setCurrentProfileView] = useState('details');
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
      <div className="mt-16 fixed top-0 left-0 bottom-0 w-64">
        <div className="h-full flex flex-col p-4 border-r bg-background">
          <div className="flex flex-col gap-3 flex-1">
            <Button variant="ghost" className="justify-start w-full" onClick={() => setCurrentView('dashboard')}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="ghost" className="justify-start w-full" onClick={() => setCurrentView('spaces')}>
              <Hash className="mr-2 h-4 w-4" />
              Spaces
            </Button>
            <Button variant="ghost" className="justify-start w-full" onClick={() => setCurrentView('mentor')}>
              <Users className="mr-2 h-4 w-4" />
              Connect
            </Button>
            <Button variant="ghost" className="justify-start w-full" onClick={() => setCurrentView('schedule')}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              Schedule
            </Button>
            <Button variant="ghost" className="justify-start w-full" onClick={() => setCurrentView('resources')}>
              <BookOpen className="mr-2 h-4 w-4" />
              Resources
            </Button>
          </div>

          <div className="flex items-center justify-center w-full border-t border-b pt-3 pb-3 mb-4">
            <div className="flex items-center justify-center space-x-2">
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

          <Button variant="ghost" className="justify-between w-full mt-2 mb-2" onClick={async () => {
              try {
                const response = await fetch('/api/profiles', {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                  }
                });

                if (!response.ok) {
                  throw new Error('Failed to fetch profile');
                }

                const data = await response.json();
                setProfileData(data.profile);
                setShowProfileDialog(true);
                setCurrentProfileView('details');
              } catch (error) {
                console.error('Error fetching profile:', error);
                toast({
                  title: "Error",
                  description: "Failed to load profile data",
                  variant: "destructive",
                  duration: 3000
                });
              }
          }}>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={profileData.photoURL} alt={profileData.fullName} />
                <AvatarFallback>{profileData.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">{profileData.fullName}</span>
                <span className="text-xs text-muted-foreground">{profileData.email}</span>
              </div>
            </div>
            <Settings className="h-4 w-4" />
          </Button>

          <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
            <DialogContent className="w-[70vw] max-w-[1000px] h-[80vh] max-h-[800px]">
              <div className="space-y-6 mt-6 overflow-y-auto pr-4 custom-scrollbar" style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgb(203 213 225) transparent'
              }}>
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
                <Card>
                  <CardHeader className="pb-4">
                    <div className="flex flex-col items-center gap-4">
                      <div className="relative">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={profileData.photoURL} alt={profileData.fullName} />
                          <AvatarFallback>{profileData.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute bottom-0 right-0 rounded-full bg-background shadow-sm"
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Change photo</span>
                        </Button>
                      </div>
                      <Button variant="outline" size="sm">
                        <Link className="h-4 w-4 mr-1" />
                        Copy Link
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4 divide-y divide-border">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Name</h3>
                        <input
                          id="fullName"
                          value={profileData.fullName}
                          onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                        />
                      </div>

                      <div className="pt-4">
                        <h3 className="text-sm font-medium mb-2">Username</h3>
                        <input
                          id="username"
                          value={profileData.username}
                          onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                        />
                      </div>

                      <div className="pt-4">
                        <h3 className="text-sm font-medium mb-2">Email Address</h3>
                        <input
                          id="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                        />
                      </div>

                      <div className="pt-4">
                        <h3 className="text-sm font-medium mb-2">Phone Number</h3>
                        <div className="flex gap-2">
                          <Select
                            onValueChange={(value) => setProfileData(prev => ({
                              ...prev,
                              countryCode: value
                            }))}
                          >
                            <SelectTrigger className="w-[140px]">
                              <SelectValue placeholder="Code" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="+1">+1 (US/CA)</SelectItem>
                              <SelectItem value="+44">+44 (UK)</SelectItem>
                              <SelectItem value="+61">+61 (AU)</SelectItem>
                              <SelectItem value="+91">+91 (IN)</SelectItem>
                              <SelectItem value="+86">+86 (CN)</SelectItem>
                              <SelectItem value="+81">+81 (JP)</SelectItem>
                              <SelectItem value="+49">+49 (DE)</SelectItem>
                              <SelectItem value="+33">+33 (FR)</SelectItem>
                              <SelectItem value="+55">+55 (BR)</SelectItem>
                            </SelectContent>
                          </Select>
                          <input
                            id="phone"
                            type="tel"
                            value={profileData.phoneNumber}
                            onChange={(e) => setProfileData({...profileData, phoneNumber: e.target.value})}
                            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                            placeholder="Enter phone number"
                          />
                        </div>
                      </div>

                      <div className="pt-4">
                        <h3 className="text-sm font-medium mb-2">About</h3>
                        <textarea
                          id="bio"
                          value={profileData.bio}
                          onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                          className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                          placeholder="Tell us about yourself..."
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center gap-4 mt-6">
                <Button 
                  variant="destructive"
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = '/login';
                  }}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
                <Button 
                  className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 dark:bg-white dark:hover:bg-gray-100"
                  onClick={async () => {
                    try {
                      const response = await fetch('/api/profiles', {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(profileData)
                      });
                      
                      if (!response.ok) {
                        throw new Error('Failed to save changes');
                      }
                      
                      const data = await response.json();
                      toast({
                        title: "Success",
                        description: "Profile updated successfully",
                        duration: 3000
                      });
                      setShowProfileDialog(false);
                    } catch (error) {
                      console.error('Error saving changes:', error);
                      toast({
                        title: "Error",
                        description: "Failed to save changes",
                        variant: "destructive",
                        duration: 3000
                      });
                    }
                  }}
                >
                  <Save className="h-4 w-4" />
                  Save
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  };

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
        {currentView === 'spaces' && <SpacesView />}
        {currentView === 'schedule' && <ScheduleView />}
        {currentView === 'resources' && <ResourcesView/>}
        {currentView === 'course' && <CourseView/>}
        {currentView === 'mentor' && <MyMentorView/>}
      </div>
    </div>
  );
}
