"use client"

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { auth } from '@/firebase/firebaseConfig';
import VideoView from "@/components/spaces/videoView";
import { onAuthStateChanged } from 'firebase/auth';

export default function Page({
  params,
}: {
  params: { callName?: string };
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const callName = params.callName || "default-call";
  const [users, setUsers] = useState<string[]>([]);
  const [callCreator, setCallCreator] = useState<string>('');
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string>('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        const userDisplayName = user.displayName || user.email?.split('@')[0];
        setDisplayName(userDisplayName);
        const sanitizedEmail = user.email.replace(/[^a-z0-9@_-]/gi, '_');
        setCurrentUserId(sanitizedEmail);
      } else {
        setCurrentUserId(null);
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    const urlUsers = searchParams.get('users')?.split(',') || [];
    
    // Set call creator to current user's sanitized email if they are the creator
    const urlCreator = searchParams.get('creator');
    if (!urlCreator && currentUserId) {
      setCallCreator(currentUserId); // Set creator to current user's sanitized email
    } else if (urlCreator) {
      // Sanitize the urlCreator email if it exists
      const sanitizedCreator = urlCreator.replace(/[^a-z0-9@_-]/gi, '_');
      setCallCreator(sanitizedCreator);
    }

    // Use sanitized emails for users array
    if (currentUserId && !urlUsers.includes(currentUserId)) {
      setUsers([...urlUsers.map(user => user.replace(/[^a-z0-9@_-]/gi, '_')), currentUserId]);
    } else {
      setUsers(urlUsers.map(user => user.replace(/[^a-z0-9@_-]/gi, '_')));
    }
  }, [searchParams, currentUserId, displayName]);

  return (
    <div className="h-screen overflow-hidden">
      <VideoView 
        callName={callName} 
        intendedUsers={users}
        callCreator={callCreator}
      />
    </div>
  );
}