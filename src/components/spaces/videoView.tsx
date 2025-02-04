
'use client';

import { auth } from '@/firebase/firebaseConfig';
import {
  CallControls,
  SpeakerLayout, 
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  User,
  useCallStateHooks,
  CallingState,
  ParticipantView,
  useCall,
  StreamVideoParticipant
} from "@stream-io/video-react-sdk";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';

import "@stream-io/video-react-sdk/dist/css/styles.css";
import { Card } from '../ui/card';
import { ScrollArea } from '@radix-ui/react-scroll-area';

const apiKey = process.env.NEXT_PUBLIC_STREAM_KEY!;

export const VideoView = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('anon');
  const [userId, setUserId] = useState<string | null>(null);
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<any>(null);
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
        client.disconnectUser();
        setClient(null);
        setCall(null);
      }
    };
  }, [router]);

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

    const initializeVideo = async () => {
      try {
        const user: User = { 
          id: userId,
          name: userName,
          image: '/default-avatar.png'
        };

        const videoClient = new StreamVideoClient({ 
          apiKey,
          user,
          token
        });

        const videoCall = videoClient.call('default', 'general-room');
        videoCall.join({ create: true });

        setClient(videoClient);
        setCall(videoCall);

      } catch (error) {
        console.error('Error initializing video:', error);
        if (error instanceof Error) {
          setError(`Failed to connect: ${error.message}`);
        }
      }
    };

    initializeVideo();
  }, [token, userId, userName]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!client || !call) return <div>Connecting to video...</div>;
  if (!auth.currentUser) return <div>Please login to access video</div>;

  
  const MyUILayout = () => {
    const { useCallCallingState } = useCallStateHooks();
    const callingState = useCallCallingState();
  
    if (callingState !== CallingState.JOINED) {
      return <div>Loading...</div>;
    }
  
    return (
      <StreamTheme>
        <SpeakerLayout participantsBarPosition='bottom' />
        <CallControls />
      </StreamTheme>
    );
  };

  return (
    <div className="fixed h-[calc(100vh-3.5rem)] w-[calc(100vw-16rem)] left-64 top-14 p-4 overflow-hidden">
    <Card className="h-full w-full border-2 border-primary">
      <div className="h-[calc(100vh-3.5rem)] w-[calc(100vw-16rem)]">
        <ScrollArea className="h-[calc(100vh-3.5rem)] w-full overflow">
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <MyUILayout />
            </StreamCall>
          </StreamVideo>
        </ScrollArea>
      </div>
    </Card>
    </div>
  );
};

export default VideoView;