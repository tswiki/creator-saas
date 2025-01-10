
import { SetStateAction, useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Badge } from "./badge";
import { Button } from "./button";
import { Calendar, ChevronLeft, ChevronRight, Clock, Globe, MessageCircle, MessageSquare, Share2, Users, Users2, Video, X } from "lucide-react";
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
import { Carousel, CarouselContent, CarouselItem } from "./carousel";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";

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
      description: "Community activity stream",
      members: 12453,
      messages: 89234,
      type: "public"
    },
    {
      id: 1,
      name: "Conference Room",
      description: "Community videostream", 
      members: 2341,
      messages: 15678,
      type: "public"
    },
    {
      id: 2,
      name: "Discord Community",
      description: "Community chatstream",
      members: 8934,
      messages: 234567,
      type: "public"
    }
  ]);

  const [activeSpace, setActiveSpace] = useState(null);

  const handleJoinSpace = (space: { id?: number; name: any; description?: string; members?: number; messages?: number; type?: string; }) => {
    setActiveSpace(space.name);
  };

  const [currentSlide, setCurrentSlide] = useState(0);

  function prevSlide(event: React.MouseEvent<HTMLButtonElement>): void {
    setCurrentSlide((prev) => (prev - 1 + spaces.length) % spaces.length);
  }

  function nextSlide(event: React.MouseEvent<HTMLButtonElement>): void {
    setCurrentSlide((prev) => (prev + 1) % spaces.length);
  }

  return (
      <div className="fixed h-[calc(100vh-3.5rem)] w-[calc(100vw-16rem)] left-64 top-14 p-4 overflow-hidden"> 
        {!activeSpace ? (
        <Card className="h-full w-full border-2 border-primary"> 
          <div className="flex flex-col items-center">
            <CardHeader>
              <div className="flex justify-center">
                <CardTitle>Spaces</CardTitle>
              </div>
              <CardDescription>Join conversations in topic-focused spaces</CardDescription>
            </CardHeader>
          </div>
          <CardContent>
            <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-2">
              {spaces.map((space) => (
                <div>
                  <Card key={space.id} className="hover:shadow-lg transition-shadow border-2 border-primary max-w-[300px]">
                    <div className="flex justify-center">
                      <CardContent className="p-auto">
                        <div className="pt-4">
                          <div className="flex items-center gap-[2%] pt-[2%]">
                            <div className="h-[8%] w-[8%] rounded-full bg-primary/10 flex items-center justify-center">
                              <Users2 className="h-[75%] w-[75%]" />
                            </div>
                            <div className="flex-grow">
                              <h3 className="font-semibold text-[1vw] pl-5">{space.name}</h3>
                            </div>
                            <Badge variant={space.type === "public" ? "default" : "secondary"} className="text-[0.8vw]">
                              {space.type}
                            </Badge>
                          </div>
                          
                          <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-muted mt-[2%] pt-1">
                            <div className="flex flex-col items-center justify-center h-full p-4 bg-muted/50">
                              <Users2 className="h-12 w-12 mb-2 text-muted-foreground" />
                              <p className="text-sm text-center text-muted-foreground">
                                A space for {space.type} discussions and collaboration
                              </p>
                              <p className="text-xs text-center text-muted-foreground mt-1">
                                Join {space.members} others in meaningful conversations
                              </p>
                            </div>
                          </div>

                          <p className="text-[0.9vw] text-muted-foreground mt-[2%] pt-2">{space.description}</p>

                          <div className="flex justify-between items-center mt-[5%]">
                            <div className="flex gap-[1vw]">
                              <div className="flex items-center gap-[0.5vw] text-[0.8vw] text-muted-foreground">
                                <Users2 className="h-[1vw] w-[1vw]" />
                                <span>{space.members}</span>
                              </div>
                              <div className="flex items-center gap-[0.5vw] text-[0.8vw] text-muted-foreground">
                                <MessageCircle className="h-[1vw] w-[1vw]" />
                                <span>{space.messages}</span>
                              </div>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-[0.8vw] py-[2%] px-[4%] h-auto"
                              onClick={() => handleJoinSpace(space)}
                            >
                              Join Space
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </CardContent>
          <div className="w-fit mx-auto">
            <Dialog>
              <DialogTrigger asChild>
                  <div className="absolute bottom-6 h-12 left-1/2 -translate-x-1/2">
                    <Button variant="outline" className="w-full">
                      View Stats
                    </Button>
                  </div>
              </DialogTrigger>
              <div>
                <Card>
                  <DialogContent className="max-w-2xl h-[60vh] overflow-y-auto">
                    <Card className="w-full p-4 border-0">
                      <div className="flex justify-center">
                        <DialogHeader>
                          <div className="p-2 pl-12">
                            <DialogTitle className="pl-12">Space Statistics</DialogTitle>
                          </div>
                          <DialogDescription>
                            View detailed statistics and information about this space.
                          </DialogDescription>
                        </DialogHeader>
                      </div>
                    </Card>
                    <Card className="w-full p-3 border-0 pt-5">
                      <div className="relative w-full">
                        <div className="flex justify-center items-center">
                          {Array.from({ length: 6 }).map((_, index) => {
                            let distance = Math.abs(currentSlide - index);
                            // Handle wrap-around distances
                            if (distance > 3) {
                              distance = 6 - distance;
                            }
                            
                            const isCenter = distance === 0;
                            let position;
                            
                            // Handle edge cases for infinite scroll effect
                            if (currentSlide === 0 && index === 5) {
                              position = -1;
                            } else if (currentSlide === 5 && index === 0) {
                              position = 1;
                            } else if (index === (currentSlide + 1) % 6) {
                              position = 1;
                            } else if (index === (currentSlide - 1 + 6) % 6) {
                              position = -1;
                            } else {
                              position = 0;
                            }

                            const overlap = position * 70;

                            return (
                              <div
                                key={index}
                                className="absolute transition-all duration-500 w-[40%]"
                                style={{
                                  transform: `translateX(${overlap}%) scale(${isCenter ? 1.2 : 0.9})`,
                                  opacity: isCenter ? 1 : 0.5,
                                  zIndex: isCenter ? 20 : position === -1 ? 10 : 1,
                                  pointerEvents: isCenter ? 'auto' : 'none',
                                  filter: isCenter ? 'none' : 'blur(2px)',
                                  boxShadow: isCenter ? '0 10px 30px -12px rgba(0, 0, 0, 0.25)' : 'none',
                                  transition: 'all 0.5s ease' // Added faster transition
                                }}
                              >
                                <div>
                                  <Card className="border-1">
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="absolute -left-12 top-1/2 -translate-y-1/2 z-30"
                                      onClick={() => setCurrentSlide((prev) => (prev - 1 + 6) % 6)}
                                      >
                                      <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <Card className="w-full border-2 border-primary p-4">
                                      
                                      <div className="space-y-2">
                                        <h4 className="font-semibold text-base border-b pb-2">
                                          {index === 0 && "Stats"}
                                          {index === 1 && "Space Purposes"}
                                          {index === 2 && "Quick Facts"} 
                                          {index === 3 && "More Stats"}
                                          {index === 4 && "Other Stats"}
                                          {index === 5 && "Misc Stats"}
                                        </h4>
                                        <div className="space-y-2">
                                          <div className="flex items-center gap-2">
                                            <Users2 className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">23,728 Members</span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <MessageCircle className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">339,479 Messages</span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <Globe className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">3 Active Spaces</span>
                                          </div>
                                        </div>
                                      </div>
                                    </Card>
                                    <Button
                                      variant="outline"
                                      size="icon" 
                                      className="absolute -right-12 top-1/2 -translate-y-1/2 z-30"
                                      onClick={() => setCurrentSlide((prev) => (prev + 1) % 6)}
                                      >
                                      <ChevronRight className="h-4 w-4" />
                                    </Button>
                                  </Card>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </Card>
                  </DialogContent>
                </Card>
              </div>
            </Dialog>
          </div>
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
