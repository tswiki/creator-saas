
import { SetStateAction, useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Badge } from "./badge";
import { Button } from "./button";
import { MessageCircle, Users2, X } from "lucide-react";
import { Input } from "./input";
import DiscordApp from '../spaces/discordView';
import VidView from '../spaces/videoView';

import {
  Chat,
  Channel,
  ChannelList,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  useCreateChatClient,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";

const useAuthenticatedUser = () => {
  const [userId, setUserId] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const { auth } = require('@/firebase/firebaseConfig');
    
    const unsubscribe = auth.onAuthStateChanged(async (user: { uid: SetStateAction<null>; getIdToken: () => any; }) => {
      if (user) {
        // Set user ID from Firebase auth
        setUserId(user.uid);
        
        // Get ID token for Stream Chat auth
        try {
          const token = await user.getIdToken();
          setAuthToken(token);
        } catch (error) {
          console.error("Error getting auth token:", error);
        }
      } else {
        setUserId(null);
        setAuthToken(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return { userId, authToken };
};


// Input import can be removed since it's not used
export function SpacesView() {
  const [spaces] = useState([
    {
      id: 1,
      name: "Live Streams",
      description: "Join weekly live coding sessions and interactive workshops",
      members: 2341,
      messages: 15678,
      type: "public"
    },
    {
      id: 2,
      name: "Discord Community",
      description: "Connect with other developers, share resources and get help",
      members: 8934,
      messages: 234567,
      type: "public" 
    },
    {
      id: 3,
      name: "Premium Mentorship",
      description: "Exclusive access to 1-on-1 mentoring and advanced content",
      members: 156,
      messages: 4532,
      type: "private"
    },
    {
      id: 4,
      name: "YouTube Live",
      description: "Watch and interact during live YouTube tutorial recordings",
      members: 12453,
      messages: 89234,
      type: "public"
    },
    {
      id: 5,
      name: "Study Groups",
      description: "Join focused study groups for different tech topics",
      members: 342,
      messages: 7845,
      type: "private"
    },
    {
      id: 6,
      name: "Office Hours",
      description: "Weekly Q&A sessions and code reviews with mentors",
      members: 567,
      messages: 3421,
      type: "public"
    }
  ]);

  const [activeSpace, setActiveSpace] = useState(null);

  const handleJoinSpace = (space: { id?: number; name: any; description?: string; members?: number; messages?: number; type?: string; }) => {
    setActiveSpace(space.name);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pt-10">
      {!activeSpace ? (
        <Card>
          <CardHeader>
            <CardTitle>Spaces</CardTitle>
            <CardDescription>Join conversations in topic-focused spaces</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {spaces.map((space) => (
                <Card key={space.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{space.name}</h3>
                          <p className="text-sm text-muted-foreground">{space.description}</p>
                        </div>
                        <Badge variant={space.type === "public" ? "default" : "secondary"}>
                          {space.type}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-4">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Users2 className="h-4 w-4" />
                            <span>{space.members}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MessageCircle className="h-4 w-4" />
                            <span>{space.messages}</span>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleJoinSpace(space)}
                        >
                          Join Space
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {activeSpace === "Live Streams" && (
            <div className="h-[calc(100vh-4rem)]">
            <Card className="h-full">
              <VidView/>
            </Card>
          </div>
          )}
          {activeSpace === "Discord Community" && (
            <div className="h-[calc(100vh-4rem)]">
              <Card className="h-full">
                <DiscordApp/>
              </Card>
            </div>
          )}
          {activeSpace === "Premium Mentorship" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Premium Mentorship</CardTitle>
                  <CardDescription>1-on-1 mentoring sessions</CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setActiveSpace(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <TelegramView />
              </CardContent>
            </Card>
          )}
          {activeSpace === "YouTube Live" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Activity Feed</CardTitle>
                  <CardDescription>Recent events and updates</CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setActiveSpace(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 border rounded-lg">
                    <Avatar>
                      <AvatarImage src="/avatars/sarah.jpg" />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-sm text-gray-500">Started a new course: Advanced React Patterns</p>
                      <div className="flex items-center mt-2 space-x-2">
                        <Badge variant="secondary">Course</Badge>
                        <span className="text-xs text-gray-400">2 hours ago</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 border rounded-lg">
                    <Avatar>
                      <AvatarImage src="/avatars/mike.jpg" />
                      <AvatarFallback>MP</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">Mike Peters</p>
                      <p className="text-sm text-gray-500">Completed project milestone: E-commerce Dashboard</p>
                      <div className="flex items-center mt-2 space-x-2">
                        <Badge variant="secondary">Project</Badge>
                        <span className="text-xs text-gray-400">5 hours ago</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 border rounded-lg">
                    <Avatar>
                      <AvatarImage src="/avatars/alex.jpg" />
                      <AvatarFallback>AK</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">Alex Kim</p>
                      <p className="text-sm text-gray-500">Shared a resource: "Ultimate Guide to TypeScript"</p>
                      <div className="flex items-center mt-2 space-x-2">
                        <Badge variant="secondary">Resource</Badge>
                        <span className="text-xs text-gray-400">1 day ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          {activeSpace === "Study Groups" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Study Groups</CardTitle>
                  <CardDescription>Topic-focused study groups</CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setActiveSpace(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <UIUXView />
              </CardContent>
            </Card>
          )}
          {activeSpace === "Office Hours" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Office Hours</CardTitle>
                  <CardDescription>Q&A and code reviews</CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setActiveSpace(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <UIUXView />
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}

const TelegramView = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "Emily Brown",
      avatar: "/avatars/emily.jpg",
      content: "Welcome to the Telegram group!",
      timestamp: "3:15 PM"
    }
  ]);

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Telegram Group</CardTitle>
          <CardDescription>Instant updates and discussions</CardDescription>
        </div>
        <Button variant="ghost" size="icon">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex gap-3">
              <Avatar>
                <AvatarImage src={message.avatar} />
                <AvatarFallback>{message.user[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{message.user}</span>
                  <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                </div>
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full gap-2">
          <Input placeholder="Type a message..." className="flex-1" />
          <Button>Send</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const UIUXView = () => {
  const userId  = process.env.USER_ID_STREAMIO;
  const apiKey = process.env.NEXT_PUBLIC_STREAMIO_API_KEY;
  const authToken = process.env.JWT_AUTH_TOKEN;

  const filters = { type: 'messaging', members: { $in: [userId] } };
  const options = { presence: true, state: true, watch: true };
  const sort = { last_updated: -1 };

  // Move client creation to useMemo to prevent infinite re-renders
  const client = useMemo(() => {
    if (!apiKey || !authToken || !userId) return null;
    
    return useCreateChatClient({
      apiKey: apiKey,
      tokenOrProvider: authToken,
      userData: { id: userId },
    });
  }, [apiKey, authToken, userId]);

  if (!client || !userId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-[600px]">
      <Chat client={client}>
        <div className="flex h-full">
          <div className="w-1/4 border-r">
            <ChannelList 
              filters={filters}
              sort={sort}
              options={options}
            />
          </div>
          <div className="flex-1">
            <Channel>
              <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput focus />
              </Window>
              <Thread />
            </Channel>
          </div>
        </div>
      </Chat>
    </div>
  );
};

export default SpacesView;
