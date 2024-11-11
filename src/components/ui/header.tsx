'use client';

import Link from 'next/link';
import { UserCircle, BellRing, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Profile from '@/components/ui/profile'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOverlayClick = () => {
    if (!isModalOpen) {
      setIsOpen(false);
    }
  };

  const handleProfileClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 hover:bg-gray-100 rounded-lg"
      >
        <Menu className="h-6 w-6 text-gray-600" />
      </button>

      {/* Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={handleProfileClose} />
            <div className="relative z-[70]">
              <Profile onClose={handleProfileClose} />
            </div>
          </div>
        </div>
      )}

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={handleOverlayClick}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xl font-bold text-indigo-600">Brand</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          <nav className="space-y-4">
            <Link
              href="/dashboard"
              className="block py-2 px-4 text-sm font-medium text-gray-900 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg"
            >
              Dashboard
            </Link>
            <Link
              href="/cohort"
              className="block py-2 px-4 text-sm font-medium text-gray-900 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg"
            >
              Cohort
            </Link>
            <Link
              href="/crm"
              className="block py-2 px-4 text-sm font-medium text-gray-900 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg"
            >
              CRM
            </Link>
            <Link
              href="/product"
              className="block py-2 px-4 text-sm font-medium text-gray-900 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg"
            >
              Product
            </Link>

            <Link
              href="/store"
              className="block py-2 px-4 text-sm font-medium text-gray-900 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg"
            >
              Store
            </Link>
          </nav>

          <div className="absolute bottom-4 left-0 right-0 px-4">
            <div className="flex flex-col border-t pt-4">
              <div className="flex flex-col items-center space-y-1 px-2">
                <div className="text-sm font-medium text-gray-600">cohort</div>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center space-x-3 hover:bg-gray-100 rounded-lg px-2 py-1 w-full"
                >
                  <div className="bg-gray-200 rounded-full h-8 w-8 flex items-center justify-center">
                    <span className="text-gray-600 font-medium">M</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">tswekemisc@gmail.com</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
