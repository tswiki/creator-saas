
// app/page.tsx

'use client';

import CountdownTimer from '@/components/ui/coundownTimer';
import { useState } from 'react';
import { ApiResponse, ApiErrorResponse } from './types';
import Link from 'next/link';

export default function Home() {
  const targetDate = '2025-01-01T00:00:00';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNo: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/waiting-list', { // Correct path
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result: ApiResponse = await response.json();
        alert(result.message);
        setFormData({ fullName: '', email: '', phoneNo: '' });
      } else {
        const error: ApiErrorResponse = await response.json();
        alert(error.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        {/* Countdown Timer */}
        <CountdownTimer targetDate={targetDate} />

        {/* Waiting List Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Full Name Input */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="John Doe"
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="you@example.com"
            />
          </div>

          {/* Phone Number Input */}
          <div>
            <label htmlFor="phoneNo" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNo"
              name="phoneNo"
              required
              value={formData.phoneNo}
              onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="+1 234 567 8900"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Join Waiting List
          <Link href="/dashboard">
            Join Waiting List
          </Link>
          </button>
        </form>
      </div>

      {/* Optional Footer or Additional Content */}
      <footer className="mt-8 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </footer>
    </div>
  );
}
