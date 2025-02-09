'use client';

import { auth } from '@/firebase/firebaseConfig';
import { Channel, ChannelHeader, Chat, MessageInput, MessageList, Window, Thread, ChannelList } from 'stream-chat-react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { StreamChat, User, Channel as StreamChannel } from 'stream-chat';
import { useRouter } from 'next/navigation';
import { Card } from '../ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { Edit, MessageSquarePlus, MoreVertical, Plus, Share, Trash } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ScrollArea } from '../ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

import "stream-chat-react/dist/css/v2/index.css";
import { useTheme } from 'next-themes';
// import "./chatView.css";

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
  // Connect user and initialize channels


  const channels = [
    { id: 'general-chat', name: 'General Chat' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'content', name: 'Content' }, 
    { id: 'tech', name: 'Tech' }
  ];

  const privateChannels = [
    { 
      id: 'cohort-leads',
      name: 'Cohort Leadership', 
      allowedUsers: [userName, 'admin@revitalise.io', 'program.lead@revitalise.io', 'community.manager@revitalise.io']
    },
    { 
      id: 'mentors-only',
      name: 'Mentor Discussions',
      allowedUsers: [userName, 'mentor1@revitalise.io', 'mentor2@revitalise.io', 'mentor3@revitalise.io', 'admin@revitalise.io'] 
    },
    { 
      id: 'cohort-one',
      name: 'Cohort One Members',
      allowedUsers: [userName, 'member1@revitalise.io', 'member2@revitalise.io', 'mentor1@revitalise.io', 'admin@revitalise.io']
    },
    { 
      id: 'cohort-two', 
      name: 'Cohort Two Members',
      allowedUsers: [userName, 'member3@revitalise.io', 'member4@revitalise.io', 'mentor2@revitalise.io', 'admin@revitalise.io']
    },
    { 
      id: 'tech-support',
      name: 'Technical Support',
      allowedUsers: [userName, 'tech.lead@revitalise.io', 'developer@revitalise.io', 'admin@revitalise.io']
    },
    { 
      id: 'content-team',
      name: 'Content Creation Team',
      allowedUsers: [userName, 'content.lead@revitalise.io', 'writer@revitalise.io', 'designer@revitalise.io', 'admin@revitalise.io']
    }
  ];

  useEffect(() => {
    if (!token || !userId || !auth.currentUser) return;

    const connectUserAndChannels = async () => {
      try {
        // Connect user if not already connected
        if (!isConnected) {
          await streamClient.connectUser(
            {
              id: userId,
              name: userName,
              image: '/default-avatar.png',
              role: 'channel_moderator'
            },
            token
          );
          setIsConnected(true);
        }

        // Initialize channels but only set general-chat as active initially
        for (const channelInfo of channels) {
          let channel = streamClient.channel('messaging', channelInfo.id, {
            name: channelInfo.name,
            image: "/default-avatar.png",
            created_by_id: userId,
            members: [userId],
            public: true
          });
          
          await channel.watch();

          // Set general-chat as the initial active channel
          if (channelInfo.id === 'general-chat') {
            setChannel(channel);
          }
        }

      } catch (error: unknown) {
        console.error('Error:', error);
        if (error instanceof Error) {
          setError(`Failed to connect: ${error.message}`);
        } else {
          setError('Failed to connect: Unknown error occurred');
        }
      }
    };

    connectUserAndChannels();
  }, [token, userId, userName, isConnected, router]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!channel) return <div>Connecting to chat...</div>;
  if (!auth.currentUser) return <div>Please login to access chat</div>;

  const { theme } = useTheme();
  const chatTheme = theme === 'dark' ? 'str-chat__theme-dark' : 'str-chat__theme-light';

  const ChatViewContent = () => {
    return (
      <div className="fixed h-[calc(100vh-3.5rem)] w-[calc(100vw-16rem)] left-64 top-14 p-4 overflow-hidden">
        <Card className="h-full w-full border-2 border-primary">
          <Chat client={streamClient} theme={chatTheme}>
            <div className="flex h-full">
              <Card className="w-1/4 h-full border-none p-2 overflow-hidden rounded-lg">
                <div className="flex flex-col h-full gap-1">
                  <div>
                    <ScrollArea className="h-[40vh] rounded-lg ">
                      <ChannelList 
                        filters={{
                          type: 'messaging',
                          members: { $in: [userId] }
                        }}
                        sort={{ last_message_at: -1 }}
                        options={{
                          limit: 30,
                          state: true,
                          watch: true,
                          presence: true,
                          message_limit: 30
                        }}
                        List={() => (
                          <div className="space-y-2">
                            {channels.map(channelInfo => {
                              const channel = streamClient.channel('messaging', channelInfo.id, {
                                name: channelInfo.name,
                                created_by_id: userId,
                                public: true
                              });
                              return (
                                <div
                                  key={channelInfo.id}
                                  className="p-3 cursor-pointer hover:bg-accent/10 transition-colors rounded-lg"
                                  onClick={() => {
                                    channel.watch().then(() => {
                                      setChannel(channel);
                                    });
                                  }}
                                >
                                  <div className="flex items-center justify-between p-1 border-b border-border/50">
                                    <div className="flex items-center gap-3">
                                      <Avatar>
                                        <AvatarImage src="/default-avatar.png" />
                                        <AvatarFallback>{channelInfo.name[0]}</AvatarFallback>
                                      </Avatar>
                                      <div className="font-medium">{channelInfo.name}</div>
                                    </div>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                          <MoreVertical className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                          <Share className="mr-2 h-4 w-4" />
                                          <span>Share</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <Edit className="mr-2 h-4 w-4" />
                                          <span>Edit</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-600">
                                          <Trash className="mr-2 h-4 w-4" />
                                          <span>Delete</span>
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      />
                    </ScrollArea>
                  </div>

                  <div>
                    <div className="flex items-center justify-between px-7 text-sm">
                      <div className="font-medium text-base">Direct Messages</div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Plus className="h-5 w-5" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="text-center">Create New Chat</DialogTitle>
                            <DialogDescription className="text-center">
                              Create a new chat and invite members to join.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="channelName">Chat Name</Label>
                              <Input id="channelName" placeholder={`${userName}'s channel`} />
                            </div>
                            <div>
                              <Label>Invite Members</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select members" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="user1">User 1</SelectItem>
                                  <SelectItem value="user2">User 2</SelectItem>
                                  <SelectItem value="user3">User 3</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={async () => {
                              const channelNameInput = document.getElementById('channelName') as HTMLInputElement;
                              if (channelNameInput && userId) {
                                const channelId = crypto.randomUUID();
                                const newChannel = {
                                  id: channelId,
                                  name: channelNameInput.value,
                                  allowedUsers: [userName, userId]
                                };

                                const channel = streamClient.channel('messaging', channelId, {
                                  name: channelNameInput.value,
                                  members: [userId],
                                  created_by_id: userId,
                                  public: true
                                });
                                
                                try {
                                  await channel.create();
                                  setChannel(channel);
                                } catch (error) {
                                  console.error('Error creating channel:', error);
                                }
                              }
                            }}>Create Channel</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="h-[34vh] overflow-hidden rounded-lg pb-4">
                      <ScrollArea className="h-[calc(100vh-200px)] rounded-lg ">
                        <ChannelList 
                          filters={{
                            type: 'messaging',
                            members: { $in: [userId] }
                          }}
                          sort={{ last_message_at: -1 }}
                          options={{
                            limit: 30,
                            state: true,
                            watch: true,
                            presence: true,
                            message_limit: 30
                          }}
                          List={() => (
                            <div className="space-y-2">
                              {privateChannels.map(channelInfo => {
                                const channel = streamClient.channel('messaging', channelInfo.id, {
                                  name: channelInfo.name,
                                  created_by_id: userId,
                                  public: true
                                });
                                return (
                                  <div
                                    key={channelInfo.id}
                                    className="p-3 cursor-pointer hover:bg-accent/10 transition-colors rounded-lg"
                                    onClick={() => {
                                      channel.watch().then(() => {
                                        setChannel(channel);
                                      });
                                    }}
                                  >
                                    <div className="flex items-center justify-between p-2 border-b border-border/50">
                                      <div className="flex items-center gap-4">
                                        <Avatar>
                                          <AvatarImage src="/default-avatar.png" />
                                          <AvatarFallback>{channelInfo.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="font-medium">{channelInfo.name}</div>
                                      </div>
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" className="h-8 w-8 p-0">
                                            <MoreVertical className="h-4 w-4" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuItem>
                                            <Share className="mr-2 h-4 w-4" />
                                            <span>Share</span>
                                          </DropdownMenuItem>
                                          <DropdownMenuItem>
                                            <Edit className="mr-2 h-4 w-4" />
                                            <span>Edit</span>
                                          </DropdownMenuItem>
                                          <DropdownMenuItem className="text-red-600">
                                            <Trash className="mr-2 h-4 w-4" />
                                            <span>Delete</span>
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        />
                      </ScrollArea>
                    <div className="" />
                    </div>
                  </div>
                </div>
              </Card>

              <div className="w-3/4 h-full">
                <Card className="border-none h-full p-2 rounded-lg">
                  <Channel channel={channel}>
                    <Window>
                      <ChannelHeader />
                      <MessageList />
                      <Card className="border-none rounded-lg">
                        <MessageInput />
                      </Card>
                    </Window>
                    <Thread />
                  </Channel>
                </Card>
              </div>
            </div>
          </Chat>
        </Card>
      </div>
    );
  }

  return <ChatViewContent />;
};

export default ChannelView;