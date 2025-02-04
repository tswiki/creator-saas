
'use client';

import { useEffect, useState } from 'react';
import {Bell, User, Settings, LogOut, Menu, Shield, Users } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './dialog';
import { Button } from './button';
import { ScrollArea } from './scroll-area';
import { useView } from '@/contexts/viewContext';
import { SearchBar } from '@/components/v0/search-bar';
import { Card, CardContent } from './card';
import { signOut } from 'firebase/auth';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from '@/components/ui/menubar';
import router, { useRouter } from 'next/router';
import { Separator } from '@radix-ui/react-menubar';
import { auth } from '@/firebase/firebaseConfig';

interface HeaderProps {
  logoSrc?: string;
  brandName?: string;
}

export default function Header({ logoSrc, brandName = "dejitaru " }: HeaderProps) {
  const { currentView, setCurrentView } = useView(' ');
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);

  const upcomingEvents = [
    {
      title: "Community Meetup", 
      date: "Next Tuesday, 6:00 PM",
      description: "Join us for our monthly community gathering to network and share ideas"
    },
    {
      title: "Workshop: Advanced React Patterns",
      date: "This Saturday, 2:00 PM", 
      description: "Learn advanced React patterns and best practices from industry experts"
    },
    {
      title: "Hackathon 2024",
      date: "March 15-17",
      description: "48-hour coding challenge with amazing prizes"
    }
  ];

  // Helper function to determine if dark mode is active
  const isDarkMode = () => {
    if (!mounted) return false;
    return theme === 'dark';
  };

  useEffect(() => {
    setMounted(true);
    
    // Fade in logo after mounting
    const timer = setTimeout(() => {
      setLogoVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  return (
    <header className="fixed top-0 left-72 right-0 z-50 bg-background backdrop-blur-sm transition-colors duration-200 pt-1">
      <div className="space-x-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side - Brand/Logo */}
            <div className="flex items-center gap-2 pl-5">
              <div className={`relative w-8 h-8 transition-opacity duration-500 ${logoVisible ? 'opacity-100' : 'opacity-0'}`}>
                <Image
                  src={isDarkMode() ? '/cmli-white.png' : '/cmli-black.png'}
                  alt="/cmli-tt"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold text-white-600">{brandName}</span>
            </div>

            {/* Center - Command Menu */}
            <div className="flex items-center justify-center flex-1 max-w-4xl">
              <SearchBar/>
            </div>

            {/* Right side - Features */}
            <div className="flex items-center space-x-4 pr-20">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="">
                    <Bell className="h-8 w-8" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center">Upcoming Events</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                      {upcomingEvents.map((event, i) => (
                        <Card key={i}>
                          <CardContent className="p-4 border-2 rounded-lg">
                            <h3 className="font-semibold">{event.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{event.date}</p>
                            <p className="text-sm mt-2">{event.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => {setCurrentView('console')}}
                className=""
              >
              <Settings className="h-8 w-8" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => {setCurrentView('profile')}}
                className=""
              >
                <User className="h-8 w-8" />
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="">
                    <Menu className="h-8 w-8" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center">Menu</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3 w-full max-w-sm mx-auto">
                    <Card className="w-full transition-all hover:scale-[1.02]">
                      <CardContent className="p-2">
                        <Button 
                          variant="ghost" 
                          className="w-full justify-center h-12" 
                          onClick={() => {
                            window.location.href = '/admin';
                          }}
                        >
                          <Shield className="mr-3 h-5 w-5" />
                          <span className="text-center">Admin Dashboard</span>
                        </Button>
                      </CardContent>
                    </Card>
                    <Card className="w-full transition-all hover:scale-[1.02]">
                      <CardContent className="p-2">
                        <Button
                          variant="ghost"
                          className="w-full justify-center h-12"
                          onClick={() => {
                            window.location.href = '/cohort';
                          }}
                        >
                          <Users className="mr-3 h-5 w-5" />
                          <span className="text-center">Cohort View</span>
                        </Button>
                      </CardContent>
                    </Card>
                    <Separator className="my-2" />
                    <Card className="w-full transition-all hover:scale-[1.02]">
                      <CardContent className="p-2">
                        <Button
                          variant="ghost"
                          className="w-full justify-center h-12"
                          onClick={async () => {
                            await signOut(auth);
                            window.location.href = '/login';
                          }}
                        >
                          <LogOut className="mr-3 h-5 w-5" />
                          <span className="text-center">Sign Out</span>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </DialogContent>
              </Dialog>
              </div>
          </div>
        </div>      
      </div>
    </header>
  );
}
