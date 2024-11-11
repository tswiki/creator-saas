"use client";

import React, { useState, useRef, useEffect } from 'react';
import {
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  User,
  X,
  PlaySquare,
  Menu,
  Send,
  Trash2
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import HeroVideoDialog from "@/components/ui/hero-video-dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Video {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  url: string;
  thumbnail: string;
  likes: number;
  dislikes: number;
  comments: Comment[];
  shares: number;
  creator: string;
  creatorInfo: string;
  isFollowing: boolean;
  userInteraction?: 'like' | 'dislike' | null;
}

interface Comment {
  id: number;
  user: string;
  text: string;
  timestamp: string;
  isUserComment?: boolean;
}

const VideoInterface = () => {
  const [videos, setVideos] = useState<Video[]>([
    {
      id: 1,
      title: "Exploring the Mountains",
      description: "A breathtaking journey through the rocky mountains.",
      shortDescription: "A breathtaking journey through the rocky mountains. #nature #adventure",
      url: "https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb",
      thumbnail: "https://startup-template-sage.vercel.app/hero-light.png",
      likes: 120,
      dislikes: 5,
      comments: [
        { id: 1, user: "HikerPro", text: "Amazing trail recommendation!", timestamp: "2h ago" },
      ],
      shares: 32,
      creator: "John Doe",
      creatorInfo: "Nature Enthusiast",
      isFollowing: false,
      userInteraction: null
    }
  ]);

  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShowComments(false);
    }
  };

  useEffect(() => {
    if (showComments) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showComments]);

  const handleLike = (videoId: number) => {
    setVideos(prevVideos => prevVideos.map(video => {
      if (video.id === videoId) {
        if (video.userInteraction === 'like') {
          return { ...video, likes: video.likes - 1, userInteraction: null };
        } else {
          return {
            ...video,
            likes: video.likes + 1,
            dislikes: video.userInteraction === 'dislike' ? video.dislikes - 1 : video.dislikes,
            userInteraction: 'like'
          };
        }
      }
      return video;
    }));
  };

  const handleDislike = (videoId: number) => {
    setVideos(prevVideos => prevVideos.map(video => {
      if (video.id === videoId) {
        if (video.userInteraction === 'dislike') {
          return { ...video, dislikes: video.dislikes - 1, userInteraction: null };
        } else {
          return {
            ...video,
            dislikes: video.dislikes + 1,
            likes: video.userInteraction === 'like' ? video.likes - 1 : video.likes,
            userInteraction: 'dislike'
          };
        }
      }
      return video;
    }));
  };

  const addComment = () => {
    if (!newComment.trim()) return;
    
    setVideos(prevVideos => prevVideos.map((video, idx) => {
      if (idx === activeVideoIndex) {
        return {
          ...video,
          comments: [
            ...video.comments,
            {
              id: Date.now(),
              user: "You",
              text: newComment,
              timestamp: "Just now",
              isUserComment: true
            }
          ]
        };
      }
      return video;
    }));
    setNewComment('');
  };

  const deleteComment = (commentId: number) => {
    setVideos(prevVideos => prevVideos.map((video, idx) => {
      if (idx === activeVideoIndex) {
        return {
          ...video,
          comments: video.comments.filter(comment => comment.id !== commentId)
        };
      }
      return video;
    }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black p-4">
      <div className="w-full max-w-[min(90vw,1200px)]">
        {videos.map((video, index) => (
          <Card key={video.id} className="mx-auto w-full mb-6">
            <CardHeader className="space-y-2 text-center p-4 md:p-6">
              <CardTitle className="text-xl md:text-2xl line-clamp-2">{video.title}</CardTitle>
              <CardDescription className="line-clamp-2">{video.shortDescription}</CardDescription>
            </CardHeader>
            
            <CardContent className="relative p-0">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <div className="absolute inset-0">
                  <HeroVideoDialog
                    className="w-full h-full"
                    animationStyle="from-center"
                    videoSrc={video.url}
                    thumbnailSrc={video.thumbnail}
                    thumbnailAlt={video.title}
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col items-center gap-4 p-4 md:p-6">
              <div className="flex flex-wrap justify-center gap-4 w-full max-w-2xl">
                <Button 
                  variant={video.userInteraction === 'like' ? 'default' : 'outline'}
                  className="flex-1 min-w-[120px] max-w-[150px]"
                  onClick={() => handleLike(video.id)}
                >
                  <ThumbsUp className="w-5 h-5 mr-2" /> 
                  <span>{video.likes}</span>
                </Button>
                <Button 
                  variant={video.userInteraction === 'dislike' ? 'default' : 'outline'}
                  className="flex-1 min-w-[120px] max-w-[150px]"
                  onClick={() => handleDislike(video.id)}
                >
                  <ThumbsDown className="w-5 h-5 mr-2" /> 
                  <span>{video.dislikes}</span>
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setShowComments(!showComments)}
                  className="flex-1 min-w-[120px] max-w-[150px]"
                >
                  <MessageCircle className="w-5 h-5 mr-2" /> 
                  <span>{video.comments.length}</span>
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[150px]">
                      <PlaySquare className="w-5 h-5 mr-2" />
                      <span>Info</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent 
                    className="w-[min(90vw,384px)] p-4 md:p-6"
                    sideOffset={5}
                    align="center"
                  >
                    <h4 className="font-medium mb-2">Video Info</h4>
                    <p className="text-sm">{video.description}</p>
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[150px]">
                      <Menu className="w-5 h-5 mr-2" />
                      <span>Videos</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent 
                    className="w-[min(90vw,384px)] p-4 md:p-6"
                    sideOffset={5}
                    align="center"
                  >
                    <ScrollArea className="h-[min(60vh,400px)]">
                      {videos.map((v, i) => (
                        <div 
                          key={v.id}
                          className="flex items-center gap-4 p-4 hover:bg-gray-100 cursor-pointer rounded-lg"
                          onClick={() => setActiveVideoIndex(i)}
                        >
                          <img 
                            src={v.thumbnail} 
                            alt={v.title} 
                            className="w-20 h-20 md:w-24 md:h-24 object-cover rounded"
                          />
                          <div>
                            <h5 className="font-medium">{v.title}</h5>
                            <p className="text-sm text-gray-600">{v.creator}</p>
                          </div>
                        </div>
                      ))}
                    </ScrollArea>
                  </PopoverContent>
                </Popover>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {showComments && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div ref={modalRef} className="w-full max-w-[min(90vw,768px)] bg-gray-900 rounded-lg">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h2 className="text-lg md:text-xl font-bold text-white">Comments</h2>
              <Button
                variant="ghost"
                onClick={() => setShowComments(false)}
                className="text-white hover:bg-gray-800"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 max-h-[60vh]">
              {videos[activeVideoIndex].comments.map((comment) => (
                <div key={comment.id} className="border-b border-gray-700 py-4 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-white" />
                      <span className="font-semibold text-white">{comment.user}</span>
                      <span className="text-gray-400 text-sm">{comment.timestamp}</span>
                    </div>
                    {comment.isUserComment && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteComment(comment.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <p className="text-white pl-7">{comment.text}</p>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-700">
              <div className="flex gap-2">
                <Input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && addComment()}
                />
                <Button onClick={addComment}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoInterface;
