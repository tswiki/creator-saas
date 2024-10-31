'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const fetchUserData = async () => {
      try {
        // Simulate a delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-indigo-100 p-4 rounded-md shadow-sm">
            <h2 className="text-xl font-semibold">Profile</h2>
            <p><strong>Name:</strong> </p>
            <p><strong>Email:</strong> </p>
            <p><strong>Phone:</strong> </p>
            <Link href="/profile/edit" className="text-indigo-600 hover:underline">
              Edit Profile
            </Link>
          </div>
          <div className="bg-indigo-100 p-4 rounded-md shadow-sm">
            <h2 className="text-xl font-semibold">Statistics</h2>
            <p><strong>Projects:</strong> </p>
            <p><strong>Tasks:</strong> </p>
            <p><strong>Completed:</strong> </p>
          </div>
          <div className="bg-indigo-100 p-4 rounded-md shadow-sm">
            <h2 className="text-xl font-semibold">Recent Activities</h2>
            <ul>
              <li>Activity 1</li>
              <li>Activity 2</li>
              <li>Activity 3</li>
            </ul>
          </div>
          <div className="bg-indigo-100 p-4 rounded-md shadow-sm">
            <h2 className="text-xl font-semibold">Notifications</h2>
            <ul>
              <li>Notification 1</li>
              <li>Notification 2</li>
              <li>Notification 3</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
