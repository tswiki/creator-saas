
'use client';

import { auth } from '@/firebase/firebaseConfig';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import stream from 'getstream';
import { Card } from '../ui/card';

const apiKey = process.env.NEXT_PUBLIC_STREAM_KEY!;

export const StreamView = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('anon');
  const [userId, setUserId] = useState<string | null>(null);
  const [client, setClient] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        const displayName = user.displayName || user.email?.split('@')[0];
        setUserName(displayName);
        const sanitizedEmail = user.email.replace(/[^a-z0-9@_-]/gi, '_');
        setUserId(sanitizedEmail);
      } else {
        setUserId(null);
        setToken(null);
        router.push('/login');
      }
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
      if (client) {
        client.disconnect();
        setClient(null);
      }
    };
  }, [router, client]);

  useEffect(() => {
    const getToken = async () => {
      if (!userId || !auth.currentUser) {
        setToken(null);
        return;
      }

      try {
        const idToken = await auth.currentUser.getIdToken();
        const response = await axios.post('/api/spaces', {
          user_id: userId
        }, {
          headers: {
            Authorization: `Bearer ${idToken}`
          }
        });
        const { payload } = response.data;
        setToken(payload);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.error || 'Failed to get token');
          router.push('/login');
        }
      }
    };

    if (userId) {
      getToken();
    }
  }, [userId, router]);

  useEffect(() => {
    if (!token || !userId) return;

    const initializeStream = async () => {
      try {
        const streamClient = stream.connect(
          apiKey,
          token,
          process.env.NEXT_PUBLIC_STREAM_APP_ID
        );

        setClient(streamClient);

      } catch (error) {
        console.error('Error initializing stream:', error);
        if (error instanceof Error) {
          setError(`Failed to connect: ${error.message}`);
        }
      }
    };

    initializeStream();
  }, [token, userId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!client) return <div>Connecting to activity stream...</div>;
  if (!auth.currentUser) return <div>Please login to access activity stream</div>;

  return (
    <div className="fixed h-[calc(100vh-3.5rem)] w-[calc(100vw-16rem)] left-64 top-14 p-4 overflow-hidden">
      <Card className="h-full w-full border-2 border-primary">
        <div>Activity Stream Connected</div>
      </Card>
    </div>
  );
};

export default StreamView;
