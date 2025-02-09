"use client"

import { auth } from '@/firebase/firebaseConfig';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import stream, { StreamClient, Activity, DefaultGenerics } from 'getstream';
import { Card } from '../ui/card';

const apiKey = process.env.NEXT_PUBLIC_STREAM_KEY!;
const appId = process.env.NEXT_PUBLIC_STREAM_APP_ID!;

type ActivityType = Activity<DefaultGenerics>;

export const StreamView = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('anon');
  const [userId, setUserId] = useState<string | null>(null);
  const [client, setClient] = useState<StreamClient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activities, setActivities] = useState<ActivityType[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        const displayName = user.displayName || user.email?.split('@')[0];
        setUserName(displayName);
        const sanitizedEmail = user.email.toLowerCase()
          .replace('@', '_')
          .replace(/[^a-z0-9_-]/g, '');
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
        setClient(null);
      }
    };
  }, [router, client]);

  useEffect(() => {
    if (!userId || !auth.currentUser) {
      setToken(null);
      return;
    }

    auth.currentUser.getIdToken()
      .then(idToken => {
        return axios.post('/api/spaces', {
          user_id: userId
        }, {
          headers: {
            Authorization: `Bearer ${idToken}`
          }
        });
      })
      .then(response => {
        const { payload } = response.data;
        setToken(payload);
      })
      .catch(error => {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.error || 'Failed to get token');
          router.push('/login');
        }
      });

  }, [userId, router]);

  useEffect(() => {
    if (!token || !userId) return;

    const streamClient = stream.connect(
      apiKey,
      token,
      appId
    );

    setClient(streamClient);

    const initializeFeeds = async () => {
      try {
        // Create feed groups if they don't exist
        await streamClient.makeHttpRequest('post', '/feed_groups', {
          name: 'user',
          feed_configs: {}
        });
        
        await streamClient.makeHttpRequest('post', '/feed_groups', {
          name: 'timeline',
          feed_configs: {}
        });
      } catch (error: any) {
        // Ignore errors if feed groups already exist (code 6)
        if (error?.response?.status !== 400 || error?.response?.data?.code !== 6) {
          throw error;
        }
      }
    };

    initializeFeeds()
      .then(() => {
        const userFeed = streamClient.feed("user", userId);
        const timelineFeed = streamClient.feed("timeline", userId);

        return timelineFeed.follow('user', userId)
          .then(() => {
            return userFeed.addActivity({
              actor: userId,
              verb: "joined",
              object: "space:general",
              foreignId: `join:${userId}:${Date.now()}`,
              time: new Date().toISOString()
            });
          })
          .then(() => {
            return timelineFeed.get({ limit: 25 });
          })
          .then((response) => {
            setActivities(response.results);
            
            const subscription = timelineFeed.subscribe((data) => {
              if (data.new && data.new.length > 0) {
                setActivities(prevActivities => [...data.new, ...prevActivities]);
              }
            });

            return () => {
              subscription.cancel();
            };
          });
      })
      .catch(error => {
        console.error('Error initializing stream:', error);
        if (error instanceof Error) {
          setError(`Failed to connect: ${error.message}`);
        }
      });

  }, [token, userId, userName]);

  const formatActivityMessage = (activity: ActivityType) => {
    return `${activity.actor} ${activity.verb} ${activity.object}`;
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!client) return <div>Connecting to activity stream...</div>;
  if (!auth.currentUser) return <div>Please login to access activity stream</div>;

  return (
    <div className="fixed h-[calc(100vh-3.5rem)] w-[calc(100vw-16rem)] left-64 top-14 p-4 overflow-hidden">
      <Card className="h-full w-full border-2 border-primary">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Activity Stream</h2>
          <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-10rem)]">
            {activities.map((activity) => (
              <div 
                key={activity.id} 
                className="p-3 bg-secondary/10 rounded-lg shadow-sm"
              >
                <p className="text-sm font-medium">{formatActivityMessage(activity)}</p>
                <time className="text-xs text-muted-foreground">
                  {new Date(activity.time).toLocaleString()}
                </time>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StreamView;
