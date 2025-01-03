
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
      id: 4,
      name: "Community Feed",
      description: "Watch and interact during live YouTube tutorial recordings",
      members: 12453,
      messages: 89234,
      type: "public"
    },
    {
      id: 1,
      name: "Conference Room",
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
    }
  ]);

  const [activeSpace, setActiveSpace] = useState(null);

  const handleJoinSpace = (space: { id?: number; name: any; description?: string; members?: number; messages?: number; type?: string; }) => {
    setActiveSpace(space.name);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pt-12">
      {!activeSpace ? (
        <Card className="border-2 border-primary"> 
          <div className="flex flex-col items-center">
            <CardHeader>
              <div className="flex justify-center">
                <CardTitle>Spaces</CardTitle>
              </div>
              <CardDescription>Join conversations in topic-focused spaces</CardDescription>
            </CardHeader>
          </div>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {spaces.map((space) => (
                <Card key={space.id} className="hover:shadow-lg transition-shadow border-2 border-primary">
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
          {activeSpace === "Community Feed" && (
            <div className="h-[calc(100vh-4rem)]">
            <Card className="h-full">
              <VidView/>
            </Card>
          </div>
          )}
          {activeSpace === "Discord Community" && (
            <div className="h-[calc(100vh-4rem)]">
              <Card className="h-full border-2 border-primary ">
                <DiscordApp/>
              </Card>
            </div>
          )}
          {activeSpace === "Conference Room" && (
            <div className="h-[calc(100vh-4rem)]">
              <Card className="border-2 border-primary">
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
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default SpacesView;
