
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { MessageCircle, Users2, X } from "lucide-react";
import { Input } from "../ui/input";


// Input import can be removed since it's not used
export function SpacesView() {
  const [spaces] = useState([
    {
      id: 1,
      name: "Discord",
      description: "A space for React developers to collaborate and learn",
      members: 156,
      messages: 1234,
      type: "public"
    },
    {
      id: 2, 
      name: "Telegram",
      description: "Deep dive into TypeScript features and best practices",
      members: 89,
      messages: 567,
      type: "private"
    },
    {
      id: 3,
      name: "UI/UX Discussion",
      description: "Share and discuss UI/UX design patterns and principles",
      members: 203,
      messages: 2341,
      type: "public"
    }
  ]);

  const [activeSpace, setActiveSpace] = useState(null);

  const handleJoinSpace = (space) => {
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
          {activeSpace === "Discord" && <DiscordView onClose={() => setActiveSpace(null)} />}
          {activeSpace === "Telegram" && <TelegramView onClose={() => setActiveSpace(null)} />}
          {activeSpace === "UI/UX Discussion" && <UIUXView onClose={() => setActiveSpace(null)} />}
        </>
      )}
    </div>
  );
}

const DiscordView = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "Sarah Wilson",
      avatar: "/avatars/sarah.jpg",
      content: "Hey everyone! Welcome to the Discord space!",
      timestamp: "2:30 PM"
    },
    {
      id: 2, 
      user: "Mike Johnson",
      avatar: "/avatars/mike.jpg", 
      content: "Thanks for having us here. Looking forward to the discussions!",
      timestamp: "2:32 PM"
    }
  ]);

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Discord Community</CardTitle>
          <CardDescription>Connect with fellow developers</CardDescription>
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
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      user: "Alex Thompson",
      avatar: "/avatars/alex.jpg",
      topic: "Modern Design Principles",
      content: "Let's discuss the latest trends in UI/UX design",
      timestamp: "4:00 PM"
    }
  ]);

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>UI/UX Discussion</CardTitle>
          <CardDescription>Share and learn design insights</CardDescription>
        </div>
        <Button variant="ghost" size="icon">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {discussions.map((discussion) => (
            <div key={discussion.id} className="flex gap-3">
              <Avatar>
                <AvatarImage src={discussion.avatar} />
                <AvatarFallback>{discussion.user[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{discussion.user}</span>
                  <span className="text-xs text-muted-foreground">{discussion.timestamp}</span>
                </div>
                <h4 className="font-medium">{discussion.topic}</h4>
                <p className="text-sm">{discussion.content}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full gap-2">
          <Input placeholder="Start a new discussion..." className="flex-1" />
          <Button>Post</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SpacesView;
