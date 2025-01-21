
'use client';

import { auth } from '@/firebase/firebaseConfig';
import { Channel, ChannelHeader, Chat, MessageInput, MessageList, Window, Thread } from 'stream-chat-react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { StreamChat, User, Channel as StreamChannel } from 'stream-chat';
import { useRouter } from 'next/navigation';

import 'stream-chat-react/dist/css/v2/index.css';
import './layout.css';
import { Card } from '../v0/ui/card';

const apiKey = process.env.NEXT_PUBLIC_STREAM_KEY!;
const streamClient = StreamChat.getInstance(apiKey);

const ChannelView = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [channel, setChannel] = useState<StreamChannel | null>(null); 
  const [userName, setUserName] = useState<string>('anon');
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Handle auth state changes
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
        setChannel(null);
        router.push('/login');
      }
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
      if (streamClient) {
        streamClient.disconnectUser();
        setIsConnected(false);
        setChannel(null);
      }
    };
  }, [router]);

  // Get token when userId changes
  useEffect(() => {
    const getToken = async () => {
      if (!userId || !auth.currentUser) {
        setToken(null);
        setChannel(null);
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
          setChannel(null);
          router.push('/login');
        }
      }
    };

    if (userId) {
      getToken();
    }
  }, [userId, router]);

  // Connect user and initialize channel
  useEffect(() => {
    if (!token || !userId || !auth.currentUser) return;

    const connectUserAndChannel = async () => {

      try {
        // Connect user if not already connected
        if (!isConnected) {
          await streamClient.connectUser(
            {
              id: userId,
              name: userName,
              image: '/default-avatar.png',
              role: 'channel_moderator' // Assign the channel_member role to the user
            },
            token
          );
          setIsConnected(true);
        }
    
        const channelId = 'general-chat';
        let channel = streamClient.channel('messaging', channelId, {
          name: 'General Chat',
          image: "/default-avatar.png",
          created_by_id: userId,
          members: [userId],
          // Remove custom grants as they are now handled at the channel type level
          // Only specify channel-specific configurations
          public: true
        });
    
        await channel.watch();    
        setChannel(channel);

      } catch (error: unknown) {
        console.error('Error:', error);
        if (error instanceof Error) {
          setError(`Failed to connect: ${error.message}`);
        } else {
          setError('Failed to connect: Unknown error occurred');
        }
      }
    };

    connectUserAndChannel();
  }, [token, userId, userName, isConnected, router]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!channel) return <div>Connecting to chat...</div>;
  if (!auth.currentUser) return <div>Please login to access chat</div>;

  return (
    <div className="fixed h-[calc(100vh-3.5rem)] w-[calc(100vw-16rem)] left-64 top-14 p-4 overflow-hidden">
      <Card className="h-full w-full border-2 border-primary">
      <Chat client={streamClient}>
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
      </Card>
    </div>
  );
};

export default ChannelView;