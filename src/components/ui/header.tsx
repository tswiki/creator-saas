
'use client';

import Link from 'next/link';
import { UserCircle, BellRing, Menu, X, Calendar, Users, MessageSquare, Search, Bell, Mail, User } from 'lucide-react';
import { useState } from 'react';
import Profile from '@/components/ui/profile'
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './dialog';
import { Button } from './button';
import { ScrollArea } from './scroll-area';
;
import { useView } from '@/contexts/viewContext';
import { SearchBar } from '@/components/v0/search-bar';

interface HeaderProps {
  logoSrc?: string;
  brandName?: string;
}

export default function Header({ logoSrc, brandName = "dejitaru " }: HeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentView, setCurrentView } = useView();
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();

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

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Here you can add additional search functionality like:
    // - Filtering content
    // - Making API calls
    // - Updating search results
  };


  return (
    <header className="fixed top-0 left-12 right-0 z-50 bg-background backdrop-blur-sm transition-colors duration-200 pt-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Brand/Logo */}
          <div className="flex items-center gap-2 pl-5">
            <div className="relative w-8 h-8">
              <Image
                src={theme === 'dark' ? '/cmli-white.png' : '/cmli-black.png'}
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
                <Button variant="ghost" size="icon" className="border-2 border-primary rounded-full">
                  <Bell className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upcoming Events</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {upcomingEvents.map((event, i) => (
                      <div key={i} className="p-4 rounded-lg border">
                        <h3 className="font-semibold">{event.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{event.date}</p>
                        <p className="text-sm mt-2">{event.description}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => {setCurrentView('emailInbox')}}
              className="border-2 border-primary rounded-full"
            >
            <Mail className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => {setCurrentView('profile')}}
              className="border-2 border-primary rounded-full"
            >
              <User className="h-5 w-5" />
            </Button>
            </div>
        </div>
      </div>      
    </header>
  );
}
