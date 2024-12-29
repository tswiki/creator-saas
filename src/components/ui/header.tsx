'use client';

import Link from 'next/link';
import { UserCircle, BellRing, Menu, X, Calendar, Users, MessageSquare, Search, Bell } from 'lucide-react';
import { useState } from 'react';
import Profile from '@/components/ui/profile'
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './dialog';
import { Button } from './button';
import { ScrollArea } from './scroll-area';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./command";

interface HeaderProps {
  logoSrc?: string;
  brandName?: string;
}

export default function Header({ logoSrc, brandName = "Concrete Manifest" }: HeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
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


  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 border-b dark:bg-slate-900/75 backdrop-blur-sm transition-colors duration-200">
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
            <span className="text-xl font-bold text-indigo-600">{brandName}</span>
          </div>

          {/* Center - Command Menu */}
          <div className="hidden md:flex items-center">
            <Button
              variant="outline"
              className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-80 lg:w-96"
              onClick={() => setOpen(true)}
            >
              <span className="hidden lg:inline-flex">Search commands...</span>
              <span className="inline-flex lg:hidden">Search...</span>
              <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
              <CommandInput placeholder="Type a command or search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Navigation">
                  <CommandItem onSelect={() => window.location.href = '/dashboard'}>
                    Dashboard
                  </CommandItem>
                  <CommandItem onSelect={() => window.location.href = '/cohort'}>
                    Cohort
                  </CommandItem>
                  <CommandItem onSelect={() => window.location.href = '/crm'}>
                    CRM
                  </CommandItem>
                  <CommandItem onSelect={() => window.location.href = '/product'}>
                    Product
                  </CommandItem>
                  <CommandItem onSelect={() => window.location.href = '/store'}>
                    Store
                  </CommandItem>
                  <CommandItem onSelect={() => window.location.href = '/chat'}>
                    Chat
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Quick Actions">
                  <CommandItem>Create New Post</CommandItem>
                  <CommandItem>Start Discussion</CommandItem>
                  <CommandItem>View Calendar</CommandItem>
                  <CommandItem>Search Members</CommandItem>
                </CommandGroup>
              </CommandList>
            </CommandDialog>
          </div>

          {/* Right side - Features */}
          <div className="flex items-center space-x-4 pr-20">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
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
          </div>
        </div>
      </div>      
    </header>
  );
}
