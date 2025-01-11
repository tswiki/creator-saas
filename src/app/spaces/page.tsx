
'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, FolderOpen, File, ChevronRight, TrendingUp, Users, Sparkles, Music } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function MediaExplorePage() {
  const [currentFolder, setCurrentFolder] = useState<string>("root")
  
  const folders = {
    root: {
      name: "Explore",
      subfolders: ["trending", "creators", "effects", "sounds"],
    },
    trending: {
      name: "Trending",
      content: [
        {
          thumbnail: "/default-avatar.png",
          icon: <TrendingUp />,
          title: "Dance Challenges",
          description: "Popular dance trends and challenges",
          stats: {views: "2.1B", posts: "1.2M"},
          items: ["#DanceWithMe", "#ViralDance2024", "#ChoreographyTrend"]
        },
        {
          thumbnail: "/default-avatar.png",
          icon: <TrendingUp />,
          title: "Transition Effects",
          description: "Creative video transitions",
          stats: {views: "1.8B", posts: "890K"},
          items: ["#SmoothTransition", "#OutfitTransition", "#MagicTransition"]
        },
        {
          thumbnail: "/default-avatar.png",
          icon: <TrendingUp />,
          title: "Comedy Skits",
          description: "Viral comedy formats",
          stats: {views: "3.2B", posts: "2.1M"},
          items: ["#ComedyTime", "#SkitLife", "#FunnyMoments"]
        }
      ]
    },
    creators: {
      name: "Creators",
      content: [
        {
          thumbnail: "/default-avatar.png",
          icon: <Users />,
          title: "Creator Tips",
          description: "Growth strategies and content tips",
          stats: {followers: "500K", engagement: "8.2%"},
          items: ["Content Planning", "Audience Growth", "Engagement Tactics"]
        },
        {
          thumbnail: "/default-avatar.png",
          icon: <Users />,
          title: "Essential Tools",
          description: "Popular creator tools and apps",
          stats: {users: "1M+", rating: "4.8"},
          items: ["CapCut", "InShot", "Prequel"]
        }
      ]
    },
    effects: {
      name: "Effects",
      content: [
        {
          thumbnail: "/default-avatar.png",
          icon: <Sparkles />,
          title: "AR Effects",
          description: "Augmented reality filters",
          stats: {uses: "50M+", creators: "1K+"},
          items: ["Face Effects", "Background Effects", "Interactive AR"]
        },
        {
          thumbnail: "/default-avatar.png",
          icon: <Sparkles />,
          title: "Beauty Filters",
          description: "Popular beauty effects",
          stats: {uses: "100M+", variations: "50+"},
          items: ["Glamour", "Natural", "Aesthetic"]
        }
      ]
    },
    sounds: {
      name: "Sounds",
      content: [
        {
          thumbnail: "/default-avatar.png",
          icon: <Music />,
          title: "Trending Sounds",
          description: "Most used audio clips",
          stats: {plays: "500M+", videos: "2M+"},
          items: ["Viral Songs", "Sound Effects", "Voice Overs"]
        },
        {
          thumbnail: "/default-avatar.png",
          icon: <Music />,
          title: "Original Audio",
          description: "Create your own sounds",
          stats: {creators: "10K+", uploads: "50K+"},
          items: ["Voice Recording", "Music Creation", "Sound Mixing"]
        }
      ]
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Explore Short-Form Content</h1>
          <p className="text-muted-foreground">
            Discover trending content, creators, and tools for TikTok and Instagram Reels
          </p>
          
          {/* Search Bar */}
          <div className="flex max-w-lg mx-auto gap-2">
            <Input 
              placeholder="Search trends, sounds, or creators..." 
              className="w-full"
            />
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        {/* Folder Navigation */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Button 
            variant="ghost" 
            className="h-6 px-2"
            onClick={() => setCurrentFolder("root")}
          >
            Home
          </Button>
          {currentFolder !== "root" && (
            <>
              <ChevronRight className="h-4 w-4" />
              <span>{folders[currentFolder as keyof typeof folders].name}</span>
            </>
          )}
        </div>

        {/* Content Area */}
        <div className="grid gap-6">
          {currentFolder === "root" ? (
            // Show folders
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {folders.root.subfolders.map((folder) => (
                <Card 
                  key={folder}
                  className="cursor-pointer hover:bg-accent"
                  onClick={() => setCurrentFolder(folder)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <FolderOpen className="h-6 w-6 text-primary" />
                      <CardTitle className="capitalize">{folders[folder as keyof typeof folders].name}</CardTitle>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            // Show folder contents
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {folders[currentFolder as keyof typeof folders].content.map((item, index) => (
                <ContentCard
                  key={index}
                  {...item}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Component for Content Cards
function ContentCard({ 
  thumbnail, 
  icon, 
  title, 
  description, 
  stats, 
  items 
}: { 
  thumbnail: string,
  icon: React.ReactNode,
  title: string, 
  description: string,
  stats: Record<string, string>,
  items: string[] 
}) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <File className="h-4 w-4" />
          </div>
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-4">
          {Object.entries(stats).map(([key, value]) => (
            <div key={key} className="text-sm">
              <div className="font-bold">{value}</div>
              <div className="text-muted-foreground capitalize">{key}</div>
            </div>
          ))}
        </div>
        <ul className="list-disc pl-4 space-y-2">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  )
}




