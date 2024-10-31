
'use client';

import { useState } from 'react';
import { Users, Activity, Edit2, UserCircle } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

interface User {
  name: string;
  email: string;
  isActive?: boolean;
}

export default function ChatLayout({ children }: LayoutProps) {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  
  // Mock user data - replace with your auth implementation
  const mockUser: User = {
    name: 'John Doe',
    email: 'john@example.com',
  };

  // Mock active users - replace with real data
  const activeUsers: User[] = [
    { name: 'Alice Smith', email: 'alice@example.com', isActive: true },
    { name: 'Bob Johnson', email: 'bob@example.com', isActive: true },
    { name: 'Carol White', email: 'carol@example.com', isActive: true },
  ];

  const handleEditProfile = () => {
    setIsEditingProfile(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement profile save logic here
    setIsEditingProfile(false);
  };

  return (
    <div className="flex h-screen pt-16"> {/* pt-16 to account for main header */}
      {/* Permanent Sidebar */}
      <div className="w-64 h-full bg-gray-800 text-white flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">General Chat</h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Total Members: {activeUsers.length}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>Active Now: {activeUsers.filter(user => user.isActive).length}</span>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-2">Active Members</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {activeUsers.map((user, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>{user.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="p-4 bg-gray-700 mt-auto">
          <div 
            className="flex items-center space-x-3 cursor-pointer hover:bg-gray-600 p-2 rounded-lg"
            onClick={handleEditProfile}
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-600 flex items-center justify-center">
              <UserCircle className="w-8 h-8 text-gray-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium">{mockUser.name}</span>
                <Edit2 className="w-4 h-4 text-gray-400" />
              </div>
              <span className="text-sm text-gray-400 truncate block">
                {mockUser.email}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1">
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-y-auto bg-gray-50">
            {children}
          </div>
        </div>
      </div>

      {/* Profile Edit Modal */}
      {isEditingProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input 
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  defaultValue={mockUser.name}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input 
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  defaultValue={mockUser.email}
                  required
                />
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button 
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  onClick={() => setIsEditingProfile(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}






