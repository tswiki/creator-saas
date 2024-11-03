
'use client';

import Link from 'next/link';
import { UserCircle, BellRing } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              {/* Logo can be added here */}
              <span className="text-xl font-bold text-indigo-600">Brand</span>
            </div>
            <div className="flex ml-6 space-x-4 overflow-x-auto">
              <Link
                href="/dashboard"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-indigo-600 border-b-2 border-transparent hover:border-indigo-600 whitespace-nowrap"
              >
                Dashboard
              </Link>
              <Link
                href="/chat"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-indigo-600 border-b-2 border-transparent hover:border-indigo-600 whitespace-nowrap"
              >
                Chat
              </Link>
              <Link
                href="/crm"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-indigo-600 border-b-2 border-transparent hover:border-indigo-600 whitespace-nowrap"
              >
                CRM
              </Link>
              <Link
                href="/calendar"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-indigo-600 border-b-2 border-transparent hover:border-indigo-600 whitespace-nowrap"
              >
                Calendar
              </Link>
              <Link
                href="/marketplace"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-indigo-600 border-b-2 border-transparent hover:border-indigo-600 whitespace-nowrap"
              >
                Marketplace
              </Link>
              <Link
                href="/ai"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-indigo-600 border-b-2 border-transparent hover:border-indigo-600 whitespace-nowrap"
              >
                AI
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/notifications">
              <BellRing className="h-6 w-6 text-gray-600 hover:text-indigo-600 cursor-pointer" />
            </Link>
            <Link href="/profile">
              <UserCircle className="h-8 w-8 text-gray-600 hover:text-indigo-600 cursor-pointer" />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
