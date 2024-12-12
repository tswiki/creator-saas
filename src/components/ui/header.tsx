'use client';

import Link from 'next/link';
import { UserCircle, BellRing, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Profile from '@/components/ui/profile'
import { useTheme } from 'next-themes';
import Image from 'next/image';

interface HeaderProps {
  logoSrc?: string;
  brandName?: string;
}

export default function Header({ logoSrc, brandName = "Concrete Manifest" }: HeaderProps) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Brand/Logo */}
          <div className="flex items-center gap-2">
            {logoSrc && (
              <div className="relative w-8 h-8">
                <Image
                  src={logoSrc}
                  alt={`${brandName} logo`}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <span className="text-xl font-bold text-indigo-600">{brandName}</span>
          </div>

          {/* Center - Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-foreground hover:text-indigo-600 dark:text-slate-200"
            >
              Dashboard
            </Link>
            <Link
              href="/cohort"
              className="text-sm font-medium text-foreground hover:text-indigo-600 dark:text-slate-200"
            >
              Cohort
            </Link>
            <Link
              href="/crm"
              className="text-sm font-medium text-foreground hover:text-indigo-600 dark:text-slate-200"
            >
              CRM
            </Link>
            <Link
              href="/product"
              className="text-sm font-medium text-foreground hover:text-indigo-600 dark:text-slate-200"
            >
              Product
            </Link>
            <Link
              href="/store"
              className="text-sm font-medium text-foreground hover:text-indigo-600 dark:text-slate-200"
            >
              Store
            </Link>
            <Link
              href="/chat"
              className="text-sm font-medium text-foreground hover:text-indigo-600 dark:text-slate-200"
            >
              Chat
            </Link>
          </nav>

          {/* Right side - User profile */}
          <div className="flex items-center space-x-4">
          </div>
        </div>
      </div>      
    </header>
  );
}

