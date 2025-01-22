'use client';

import { useRouter } from 'next/navigation';
import { auth } from '@/firebase/firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Channel, ChannelHeader, Chat, MessageList, Window, Thread } from 'stream-chat-react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { StreamChat, Channel as StreamChannel } from 'stream-chat';
import { Card } from '@/components/v0/ui/card';
import 'stream-chat-react/dist/css/v2/index.css';

const apiKey = process.env.NEXT_PUBLIC_STREAM_KEY!;
const streamClient = StreamChat.getInstance(apiKey);

const generateGuestName = () => {
  const adjectives = ['Happy', 'Lucky', 'Sunny', 'Clever', 'Swift', 'Bright', 'Kind'];
  const nouns = ['Panda', 'Tiger', 'Eagle', 'Dolphin', 'Fox', 'Wolf', 'Bear'];
  const randomNum = Math.floor(Math.random() * 1000);
  
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  
  return `${randomAdjective}${randomNoun}${randomNum}`;
};

export default function LoginPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [channel, setChannel] = useState<StreamChannel | null>(null);
  const [userName] = useState<string>(generateGuestName());
  const [userId] = useState<string>(`guest-${Date.now()}`);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Get token for guest user
  useEffect(() => {
    const getToken = async () => {
      try {
        const response = await axios.post('/api/spaces', {
          user_id: userId
        });
        const { payload } = response.data;
        setToken(payload);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.error || 'Failed to get token');
          setChannel(null);
        }
      }
      setIsLoading(false);
    };

    getToken();
  }, [userId]);

  // Connect guest user and initialize channel
  useEffect(() => {
    if (!token) return;

    const connectUserAndChannel = async () => {
      try {
        if (!isConnected) {
          await streamClient.connectUser(
            {
              id: userId,
              name: userName,
              image: '/default-avatar.png',
              role: 'guest'
            },
            token
          );
          setIsConnected(true);
        }
    
        const channelId = 'general-chat';
        let channel = streamClient.channel('messaging', channelId, {
          name: 'General Chat',
          image: "/default-avatar.png",
          members: [userId],
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
  }, [token, userId, userName, isConnected]);

  const handleGoogleSignIn = async (e: any) => {
    try {
      const provider = new GoogleAuthProvider();

      provider.addScope('https://www.googleapis.com/auth/gmail.readonly');
      provider.addScope('https://www.googleapis.com/auth/calendar');
      provider.addScope('https://www.googleapis.com/auth/drive.readonly');
  
      provider.setCustomParameters({
        access_type: 'offline',
        prompt: 'consent'
      });

      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
    
      const response = await fetch('/api/auth/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      if (response.ok) {

        const isNewUser = result.user.metadata.creationTime === result.user.metadata.lastSignInTime;
        
        if (isNewUser) {
          // Redirect to onboarding page for new users
          router.push('/onboarding');
        } else {
          // Redirect existing users to cohort page
          router.push('/cohort');
        }

      }

    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const renderChat = () => {
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!channel) return <div>Connecting to chat...</div>;

    return (
      <Card className="h-full w-full border-2 border-primary">
        <Chat client={streamClient}>
          <Channel channel={channel}>
            <Window>
              <ChannelHeader />
              <MessageList />
              <button>
                Login to Send Messages
              </button>
            </Window>
            <Thread />
          </Channel>
        </Chat>
      </Card>
    );
  };

  return (
    <div className="flex h-screen">
      {/* Left Column - Chat View */}
      <div className="w-1/2 h-full">
        {renderChat()}
      </div>

      {/* Right Column - Login */}
      <div className="w-1/2 h-full flex flex-col items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please sign in to continue
            </p>
          </div>

          <div className="mt-8 space-y-6">
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center px-4 py-2 border border-2 text-sm font-medium rounded-md text-black bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
