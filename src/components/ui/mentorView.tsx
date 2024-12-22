import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator, MenubarSub, MenubarSubTrigger, MenubarSubContent } from "@radix-ui/react-menubar";
import { Badge, MapPin, User, Clock, Globe, Wrench, Target, Trophy, Github, Twitter, Linkedin, MessageSquare, UserPlus } from "lucide-react";
import { useState } from "react";
import { Button } from "react-day-picker";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./card";
import { DialogHeader } from "./dialog";


async function refreshSession() {
    try {
      // Get current user
      const user = auth.currentUser;
      if (!user) {
        throw new Error('No user logged in');
      }
  
      // Get fresh ID token
      const idToken = await user.getIdToken(true);
  
      // Call session endpoint to refresh session cookie
      const response = await fetch('/api/auth/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to refresh session');
      }
  
      return true;
    } catch (error) {
      console.error('Error refreshing session:', error);
      return false;
    }
  }

const MyMentorView = () => {
    const [selectedMember, setSelectedMember] = useState<CommunityMember | null>(null);
    const [showProfileDialog, setShowProfileDialog] = useState(false);

    type CommunityMember = {
      email: any;
      id: number;
      name: string;
      role: string;
      type: 'mentor' | 'member';
      company?: string;
      expertise: string[];
      bio: string;
      yearsOfExperience: number;
      interests: string[];
      socials: {
        linkedin?: string;
        twitter?: string;
        github?: string;
        website?: string;
      };
      achievements: string[];
      availability?: string[];
      languages?: string[];
      location?: string;
      timezone?: string;
      rating?: number;
      reviews?: {
        author: string;
        text: string;
        rating: number;
      }[];
    };

    const communityMembers: CommunityMember[] = [
      {
        id: 1,
        name: "Dr. Sarah Wilson",
        role: "Senior Software Engineer",
        type: "mentor",
        company: "Google",
        expertise: ["Web Development", "System Design", "Cloud Architecture"],
        bio: "15+ years of experience in software development and mentoring. Passionate about helping others grow in their tech careers.",
        yearsOfExperience: 15,
        interests: ["Teaching", "Open Source", "Cloud Computing"],
        socials: {
          linkedin: "linkedin.com/in/sarahwilson",
          twitter: "@sarahwilsontech",
          github: "github.com/sarahwilson",
          website: "sarahwilson.dev"
        },
        achievements: [
          "Led 200+ successful mentorship sessions",
          "Published author on system design",
          "Google Developer Expert"
        ],
        availability: ["Mon 9-5 PST", "Wed 1-6 PST", "Fri 9-3 PST"],
        languages: ["English", "Spanish"],
        location: "San Francisco, CA",
        timezone: "PST",
        rating: 4.9,
        reviews: [
          {
            author: "John Doe",
            text: "Amazing mentor! Helped me land my dream job.",
            rating: 5
          }
        ],
        email: undefined
      },
      {
        id: 2,
        name: "Alex Rivera",
        role: "Frontend Developer",
        type: "member",
        company: "Startup XYZ",
        expertise: ["React", "TypeScript", "UI/UX"],
        bio: "Passionate about creating beautiful and accessible web experiences. Always eager to learn and share knowledge.",
        yearsOfExperience: 3,
        interests: ["Web Accessibility", "Design Systems", "JavaScript"],
        socials: {
          github: "github.com/arivera",
          twitter: "@arivera_dev"
        },
        achievements: [
          "Created popular React component library",
          "Regular speaker at local tech meetups"
        ],
        location: "Austin, TX",
        timezone: "CST",
        email: undefined
      },
      {
        id: 3,
        name: "Emily Chen",
        role: "Machine Learning Engineer",
        type: "mentor",
        company: "Tesla",
        expertise: ["AI/ML", "Python", "Data Science"],
        bio: "Working on cutting-edge ML applications. Love to mentor aspiring data scientists and ML engineers.",
        yearsOfExperience: 8,
        interests: ["AI Ethics", "Neural Networks", "Computer Vision"],
        socials: {
          linkedin: "linkedin.com/in/emilychen",
          github: "github.com/echen"
        },
        achievements: [
          "Published ML research papers",
          "Built autonomous systems used in production"
        ],
        availability: ["Tue 10-6 EST", "Thu 1-5 EST"],
        languages: ["English", "Mandarin"],
        location: "Boston, MA",
        timezone: "EST",
        rating: 4.8,
        email: undefined
      },
      {
        id: 4,
        name: "Marcus Johnson",
        role: "DevOps Engineer",
        type: "mentor",
        company: "Amazon",
        expertise: ["Kubernetes", "AWS", "CI/CD", "Docker"],
        bio: "Specializing in cloud infrastructure and DevOps practices. Love helping teams improve their deployment processes.",
        yearsOfExperience: 10,
        interests: ["Infrastructure as Code", "Site Reliability", "Automation"],
        socials: {
          linkedin: "linkedin.com/in/marcusj",
          github: "github.com/mjohnson"
        },
        achievements: [
          "AWS Certified Solutions Architect",
          "Kubernetes Certified Administrator",
          "Built scalable infrastructure for unicorn startups"
        ],
        availability: ["Mon-Thu 6-9pm GMT"],
        languages: ["English"],
        location: "London, UK",
        timezone: "GMT",
        rating: 4.7,
        email: undefined
      }
    ];

    return (
      <div className="max-w-7xl mx-auto space-y-6 pt-10">
        <Card>
          <CardHeader>
            <CardTitle>Community Members</CardTitle>
            <CardDescription>Connect with mentors and fellow developers in our community</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communityMembers.map((member) => (
                <Card key={member.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="text-xl">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-lg">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                        {member.company && (
                          <p className="text-sm text-muted-foreground">at {member.company}</p>
                        )}
                        <div className="flex gap-2 items-center">
                          <Badge variant={member.type === 'mentor' ? 'default' : 'secondary'}>
                            {member.type === 'mentor' ? 'Mentor' : 'Member'}
                          </Badge>
                          {member.rating && (
                            <Badge variant="outline">
                              ⭐ {member.rating}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.slice(0, 3).map((skill, i) => (
                          <Badge key={i} variant="outline">{skill}</Badge>
                        ))}
                      </div>
                    </div>

                    {member.location && (
                      <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{member.location}</span>
                      </div>
                    )}

                    <Button 
                      className="w-full mt-4" 
                      onClick={() => {
                        setSelectedMember(member);
                        setShowProfileDialog(true);
                      }}
                    >
                      View Profile
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
          <DialogContent className="w-[95vw] max-w-7xl">
            <DialogHeader className="p-6 border-b">
              <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                {selectedMember?.name}
                {selectedMember?.type === 'mentor' && (
                  <Badge variant="secondary">Mentor</Badge>
                )}
              </DialogTitle>
              <DialogDescription className="text-lg flex items-center gap-2">
                <span>{selectedMember?.role}</span>
                {selectedMember?.company && (
                  <>
                    <span>•</span>
                    <span>{selectedMember.company}</span>
                  </>
                )}
                {selectedMember?.location && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {selectedMember.location}
                    </span>
                  </>
                )}
              </DialogDescription>
            </DialogHeader>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* About Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      About
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">{selectedMember?.bio}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {selectedMember?.yearsOfExperience} years experience
                      </div>
                      {selectedMember?.timezone && (
                        <div className="flex items-center gap-1">
                          <Globe className="h-4 w-4" />
                          {selectedMember.timezone}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Skills & Expertise Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wrench className="h-5 w-5" />
                      Skills & Expertise
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {selectedMember?.expertise.map((skill, i) => (
                        <Badge key={i} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                    {selectedMember?.languages && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Languages</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedMember.languages.map((language, i) => (
                            <Badge key={i} variant="outline">{language}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Objectives & Goals Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Objectives & Goals
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {selectedMember?.interests.map((interest, i) => (
                        <Badge key={i} variant="secondary">{interest}</Badge>
                      ))}
                    </div>
                    {selectedMember?.achievements && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Key Achievements</h4>
                        {selectedMember.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <Trophy className="h-4 w-4 text-yellow-500" />
                            <span>{achievement}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-6 flex justify-end gap-4">
                <Menubar className="border-none bg-transparent p-0">
                  <MenubarMenu>
                    <MenubarTrigger className="flex cursor-default select-none items-center rounded-sm px-3 py-2 text-sm font-medium outline-none focus:bg-neutral-100 focus:text-neutral-900 data-[state=open]:bg-neutral-100 data-[state=open]:text-neutral-900 dark:focus:bg-neutral-800 dark:focus:text-neutral-50 dark:data-[state=open]:bg-neutral-800 dark:data-[state=open]:text-neutral-50">
                      Actions
                    </MenubarTrigger>
                    <MenubarContent className="min-w-[12rem] overflow-hidden rounded-md border border-neutral-200 bg-white p-1 text-neutral-950 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50">
                      {Object.entries(selectedMember?.socials || {}).map(([platform, url]) => (
                        url && (
                          <MenubarItem 
                            key={platform} 
                            className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-neutral-800 dark:focus:text-neutral-50"
                            onClick={() => window.open(url, '_blank')}
                          >
                            <div className="flex items-center gap-2">
                              {platform === 'github' && <Github className="h-4 w-4" />}
                              {platform === 'twitter' && <Twitter className="h-4 w-4" />}
                              {platform === 'linkedin' && <Linkedin className="h-4 w-4" />}
                              {platform === 'website' && <Globe className="h-4 w-4" />}
                              {platform.charAt(0).toUpperCase() + platform.slice(1)}
                            </div>
                          </MenubarItem>
                        )
                      ))}
                      <MenubarSeparator className="-mx-1 my-1 h-px bg-neutral-100 dark:bg-neutral-800"/>
                      <MenubarSub>
                        <MenubarSubTrigger>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Contact Options
                        </MenubarSubTrigger>
                        <MenubarSubContent>
                          <MenubarItem 
                            onClick={() => {
                              // Handle direct message
                              if (selectedMember) {
                                toast({
                                  title: "Message Started",
                                  description: `Starting chat with ${selectedMember.name}`,
                                  duration: 3000,
                                })
                              }
                            }}
                          >
                            Direct Message
                          </MenubarItem>
                          <MenubarItem
                            onClick={() => {
                              // Handle email
                              if (selectedMember?.email) {
                                window.location.href = `mailto:${selectedMember.email}`
                              }
                            }}
                          >
                            Send Email
                          </MenubarItem>
                        </MenubarSubContent>
                      </MenubarSub>
                      <MenubarSub>
                        <MenubarSubTrigger>
                          <UserPlus className="h-4 w-4 mr-2" />
                          Mentorship
                        </MenubarSubTrigger>
                        <MenubarSubContent>
                          <MenubarItem 
                            onClick={() => {
                              if (selectedMember) {
                                toast({
                                  title: "Mentorship Request Sent",
                                  description: `Your request has been sent to ${selectedMember.name}`,
                                  duration: 3000,
                                })
                              }
                            }}
                          >
                            Request Mentorship
                          </MenubarItem>
                          <MenubarItem
                            onClick={() => {
                              if (selectedMember) {
                                toast({
                                  title: "Schedule Meeting",
                                  description: "Opening calendar to schedule a meeting",
                                  duration: 3000,
                                })
                              }
                            }}
                          >
                            Schedule Meeting
                          </MenubarItem>
                        </MenubarSubContent>
                      </MenubarSub>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  export default MyMentorView;