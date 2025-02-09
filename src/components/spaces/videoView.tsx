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
  StreamVideoParticipant,
  PaginatedGridLayout,
  CancelCallButton
} from "@stream-io/video-react-sdk";
import { Channel, ChannelHeader, Chat, MessageInput, MessageList, Window, Thread } from 'stream-chat-react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Card } from '../ui/card';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { StreamChat, Channel as StreamChannel } from 'stream-chat';

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "stream-chat-react/dist/css/v2/index.css";
import { useTheme } from 'next-themes';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

const apiKey = process.env.NEXT_PUBLIC_STREAM_KEY!;
const streamClient = StreamChat.getInstance(apiKey);

interface VideoViewProps {
  callName: string;
  intendedUsers: string[];
  callCreator: string;
}

export const VideoView = ({ callName, intendedUsers, callCreator }: VideoViewProps) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('anon');
  const [userId, setUserId] = useState<string | null>(null);
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [channel, setChannel] = useState<StreamChannel | null>(null);
  const [isConnected, setIsConnected] = useState(false);

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
      if (streamClient) {
        streamClient.disconnectUser();
        setIsConnected(false);
        setChannel(null);
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
    if (!token || !userId || !callName) return;

    const initializeVideo = async () => {
      try {
        // Get current authenticated user's display name
        const currentUser = auth.currentUser;
        const displayName = currentUser?.displayName || 'Anonymous User';

        const user: User = { 
          id: userId,
          name: displayName,
          image: '/default-avatar.png'
        };

        const videoClient = new StreamVideoClient({ 
          apiKey,
          user,
          token
        });

        // Check if user is already in any active calls
        const existingCalls = await videoClient.queryCalls({
          filters: { 
            members: { $in: [userId] }
          }
        });

        const isAlreadyInCall = existingCalls.calls.some(call => {
          const activeMembers = call.members || [];
          return activeMembers.some(member => member.user_id === userId);
        });

        if (isAlreadyInCall) {
          setError('You are already connected to a call in another window. Please end other calls first.');
          return;
        }

        // Use callName from URL params for the video call
        const videoCall = videoClient.call('default', callName);

        try {
          // Get call state before joining to check existing participants
          const callState = await videoCall.get();
          const existingParticipants = callState.members || [];

          // Check if user is already in this specific call
          const isDuplicateUser = existingParticipants.some(
            (participant: { user_id: string }) => participant.user_id === userId
          );

          if (isDuplicateUser) {
            setError('You are already connected to this call in another window');
            return;
          }

          // Join the call if no duplicate found
          await videoCall.join({ create: true });
          setClient(videoClient);
          setCall(videoCall);

          // Verify user is authorized to join if there are intended users
          if (intendedUsers.length > 0) {
            const currentUser = auth.currentUser;
            const displayName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Anonymous User';
            
            // Allow call creator to always join
            if (displayName === callCreator) {
              // Call creator is always allowed
            }
            // Check other users against intended users list
            else if (!intendedUsers.includes(userId) && !intendedUsers.includes(displayName)) {
              await videoCall.leave();
              setClient(null);
              setCall(null);
              setError(`You (${displayName}) are not authorized to join this call. This call is only available to specific users. If you believe this is a mistake, please contact the call creator (${callCreator}) or try joining with a different account.`);
              return;
            }
          }

          // Initialize chat if not already connected
          if (!isConnected) {
            try {
              // Connect user to chat with same display name
              await streamClient.connectUser(
                {
                  id: userId,
                  name: displayName,
                  image: '/default-avatar.png',
                  role: 'channel_moderator'
                },
                token
              );

              // Check for existing chat connections
              const existingUser = await streamClient.queryUsers({ id: userId });
              if (existingUser.users.length > 1) {
                await streamClient.disconnectUser();
                setError('Chat already connected in another window');
                return;
              }

              setIsConnected(true);

              // Create/join chat channel with consistent name and config
              const channelId = callName || 'video-chat';
              
              // Initialize with current user as first member
              const members = [{
                user_id: userId,
                role: 'member'
              }];

              // Add call creator if different from current user
              if (callCreator && callCreator !== userId) {
                members.push({
                  user_id: callCreator,
                  role: 'member'
                });
              }

              // Add other intended users
              if (intendedUsers.length > 0) {
                intendedUsers.forEach(user => {
                  const sanitizedUser = user.replace(/[^a-z0-9@_-]/gi, '_');
                  if (sanitizedUser && sanitizedUser !== userId && sanitizedUser !== callCreator) {
                    members.push({
                      user_id: sanitizedUser,
                      role: 'member'
                    });
                  }
                });
              }

              const chatChannel = streamClient.channel('messaging', channelId, {
                name: callName || 'Video Chat',
                image: "/default-avatar.png",
                created_by_id: callCreator || userId,
                members: members,
                public: false,
                private: true
              });

              await chatChannel.watch();
              setChannel(chatChannel);

            } catch (err) {
              console.error('Error connecting chat:', err);
              let errorMessage = 'Failed to connect chat. Please try again or contact support if the issue persists.';
              
              if (err instanceof Error) {
                if (err.message.includes('token') || err.message.includes('auth')) {
                  errorMessage = 'Chat authentication failed. Please try logging out and back in.';
                } else if (err.message.includes('network') || err.message.includes('connection')) {
                  errorMessage = 'Network error connecting to chat. Please check your internet connection.';
                } else if (err.message.includes('duplicate') || err.message.includes('already connected')) {
                  errorMessage = 'Chat is already connected in another window. Please close other instances first.';
                } else {
                  errorMessage = `Chat connection error: ${err.message}. Please try again.`;
                }
              }
              
              setError(errorMessage);
              // Clean up video call if chat fails
              await videoCall.leave();
              setClient(null);
              setCall(null);
            }
          }

        } catch (err) {
          // Log detailed error information
          console.error('Error joining call:', {
            error: err,
            errorName: err instanceof Error ? err.name : 'Unknown',
            errorMessage: err instanceof Error ? err.message : String(err),
            errorStack: err instanceof Error ? err.stack : undefined,
            userId,
            callName,
            isConnected
          });

          // Set user-friendly error message based on error type
          let errorMessage = 'Failed to join call. Please try again or contact support if the issue persists.';
          if (err instanceof Error) {
            if (err.message.includes('permission')) {
              errorMessage = 'Missing permissions to join call. Please ensure you have granted camera and microphone access in your browser settings.';
            } else if (err.message.includes('network')) {
              errorMessage = 'Network connection error. Please check your internet connection and try again. If issues persist, try using a different network or disabling VPN.';
            } else if (err.message.includes('token')) {
              errorMessage = 'Authentication error. Your session may have expired - please try logging out and logging back in. If the issue continues, clear your browser cache.';
            } else if (err.message.includes('capacity')) {
              errorMessage = 'Call room is at maximum capacity. Please try joining later or contact the call creator.';
            } else if (err.message.includes('device')) {
              errorMessage = 'Error accessing camera/microphone. Please check that your devices are properly connected and not in use by another application.';
            } else {
              // Include the actual error message for debugging while keeping it user-friendly
              errorMessage = `Failed to join call: ${err.message}. Please try again or contact support if the issue persists.`;
            }
          }
          setError(errorMessage);

          // Clean up any partial connections
          try {
            if (isConnected) {
              await streamClient.disconnectUser();
              setIsConnected(false);
            }
            if (videoCall) {
              await videoCall.leave();
              setClient(null);
              setCall(null);
            }
          } catch (cleanupErr) {
            console.error('Error cleaning up connection:', cleanupErr);
          }
          return;
        }

      } catch (error) {
        console.error('Error initializing:', error);
        if (error instanceof Error) {
          setError(`Failed to connect: ${error.message}`);
        }
      }
    };

    initializeVideo();
  }, [token, userId, userName, isConnected, callName, intendedUsers, callCreator]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!client || !call) return <div>Connecting to video...</div>;
  if (!auth.currentUser) return <div>Please login to access video</div>;

  const { theme } = useTheme();
  const chatTheme = theme === 'dark' ? 'str-chat__theme-dark' : 'str-chat__theme-light';

  const LayoutMap = {
    Speaker: {
      component: SpeakerLayout,
      title: "Speaker layout with spotlight",
      props: {
        participantsBarPosition: 'bottom' as const,
        groupSize: 3,
        scrollable: true,
        participantScrollable: true,
        showParticipantsBar: true,
        participantsPagination: {
          enabled: true,
          pageSize: 3,
          showPagination: true
        }
      },
    },
    PaginatedGrid: {
      component: PaginatedGridLayout,
      title: "Paginated grid layout", 
      props: {
        groupSize: 4,
        participantsBarPosition: 'right' as const
      },
    },
  };

  const Stage = () => {
    const [selectedLayout, setSelectedLayout] = 
      useState<keyof typeof LayoutMap>("PaginatedGrid");
    const { useHasOngoingScreenShare, useParticipants } = useCallStateHooks();
    const hasOngoingScreenshare = useHasOngoingScreenShare();
    const participants = useParticipants();
    const { call } = useCall();

    const [showParticipantsList, setShowParticipantsList] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const participantsPerPage = 3;

    const LayoutComponent = LayoutMap[selectedLayout].component;
    const componentProps = LayoutMap[selectedLayout].props;

    useEffect(() => {
      if (hasOngoingScreenshare) return setSelectedLayout("Speaker");
      return setSelectedLayout("PaginatedGrid");
    }, [hasOngoingScreenshare]);

    const indexOfLastParticipant = currentPage * participantsPerPage;
    const indexOfFirstParticipant = indexOfLastParticipant - participantsPerPage;
    const currentParticipants = participants.slice(indexOfFirstParticipant, indexOfLastParticipant);
    const totalPages = Math.ceil(participants.length / participantsPerPage);

    return (
      <div className="flex flex-col w-full h-full">
        <Card className="border-4 rounded-none p-2">
          <div className="flex justify-between items-center p-4 bg-[#272a30] border-b border-gray-600">
            <div className="text-xl font-semibold">
              {callName || 'Video Call'}
            </div>
            <div className="flex items-center gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className="flex items-center gap-2 px-3 py-1 rounded bg-gray-700 hover:bg-gray-600"
                  >
                    <span>Participants ({participants.length})</span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-72">
                  <div className="bg-[#272a30] p-4">
                    <h3 className="text-lg font-semibold mb-4">Participants</h3>
                    <ScrollArea className="h-[calc(100%-120px)]">
                      {currentParticipants.map((participant) => (
                        <Card 
                          key={participant.userId} 
                          className="mb-2 p-3 bg-gray-800 hover:bg-gray-700 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                              {participant.name?.[0] || participant.userId[0]}
                            </div>
                            <div>
                              <div className="font-medium">{participant.name || participant.userId}</div>
                              <div className="text-sm text-gray-400">
                                {participant.isSpeaking ? 'Speaking' : 'Connected'}
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </ScrollArea>
                    <div className="flex justify-between mt-4 pt-2 border-t border-gray-600">
                      <button 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-2 py-1 bg-gray-700 rounded disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <span>{currentPage} / {totalPages}</span>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-2 py-1 bg-gray-700 rounded disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </Card>
        <div className="relative flex-1 pt-3">
          <LayoutComponent {...componentProps} />
          {showParticipantsList && (
            <div className="absolute right-0 top-0 w-72 h-full bg-[#272a30] border-l border-gray-600 p-4">
              <h3 className="text-lg font-semibold mb-4">Participants</h3>
              <ScrollArea className="h-[calc(100%-120px)]">
                {currentParticipants.map((participant) => (
                  <Card 
                    key={participant.userId} 
                    className="mb-2 p-3 bg-gray-800 hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                        {participant.name?.[0] || participant.userId[0]}
                      </div>
                      <div>
                        <div className="font-medium">{participant.name || participant.userId}</div>
                        <div className="text-sm text-gray-400">
                          {participant.isSpeaking ? 'Speaking' : 'Connected'}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </ScrollArea>
              <div className="flex justify-between mt-4 pt-2 border-t border-gray-600">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-2 py-1 bg-gray-700 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span>{currentPage} / {totalPages}</span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-2 py-1 bg-gray-700 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-full">
      <div className="w-3/4">
        <Card className="h-full overflow-hidden">
          <StreamVideo client={client}>
            <StreamTheme>
              <StreamCall call={call}>
                <div style={{ transform: 'scale(0.9)' }}>
                  <Stage />
                  <CallControls />
                  {/* <CancelCallButton onClick={async () => {
                    await call.endCall();
                    window.location.href = '/cohort';
                  }} /> */}
                </div>
              </StreamCall>
            </StreamTheme>
          </StreamVideo>
        </Card>
      </div>
      
      <div className="w-1/3 pl-1">
        <Card className="h-full border-4 p-2">
          <Chat client={streamClient} theme={chatTheme}>
            {channel && (
              <Channel channel={channel}>
                <Window>
                  <div>
                    <Card className="border-4 rounded-lg">
                      <ChannelHeader />
                    </Card>
                  </div>
                  <MessageList />
                  <Card className="border-4 rounded-lg">
                    <MessageInput />
                  </Card>
                </Window>
                <Thread />
              </Channel>
            )}
          </Chat>
        </Card>
      </div>
    </div>
  );
}

export default VideoView;