

import { Button } from "@/components/v0/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/v0/ui/card";
import { Input } from "@/components/v0/ui/input";
import { Search, Filter, Mail, Star, Inbox, Send, Archive, Trash2, Tag, Settings2, Clock, Library, MessagesSquare, ChevronLeft, ChevronRight, Badge, Users, Reply, Forward, MessageSquare, Activity, PenSquare } from "lucide-react";
import { Textarea } from "./ui/textarea";
import React from 'react';
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import EmailDialog from "./email-dialog";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const ConsoleView = () => {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const totalSlides = 3;

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const [selectedReview, setSelectedReview] = React.useState({
    rating: 0,
    comment: '',
    timestamp: '',
    reviewer: '',
    status: 'all', // Can be 'all', 'featured', 'recent', 'by-product'
    filter: 'all', // Can be 'all', 'featured', 'recent', 'by-product'
    sortBy: 'newest', // Can be 'newest', 'oldest', 'highest', 'lowest'
    mainContent: 'reviews', // Can be 'reviews', 'analytics', 'settings'
    productFilter: 'all' // Used when filter is 'by-product'
  });

  
  const [selectedSetting, setSelectedSetting] = React.useState({
    agentName: 'settings',
    agentRole: '',
    agentBehavior: '',
    customInstructions: '',
    model: 'gpt4',
    temperature: 0.7
  });

  const handleSettingChange = (field: string, value: string | number | File[]) => {
    if (field === 'documents' && Array.isArray(value)) {
      // Handle document uploads
      const files = value as File[];
      const allowedTypes = ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      
      const validFiles = files.filter(file => allowedTypes.includes(file.type));
      
      if (validFiles.length !== files.length) {
        console.warn('Some files were skipped due to invalid file type');
      }

      setSelectedSetting(prev => ({
        ...prev,
        documents: [...(prev.documents || []), ...validFiles]
      }));

    } else {
      // Handle other setting changes
      setSelectedSetting(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  return (
    <div className="fixed h-[calc(100vh-3.5rem)] w-[calc(100vw-16rem)] left-64 top-14 p-4 overflow-y-none">
      <Card className="h-full w-full border-8 border-primary">
        <CardHeader>
          <div className="flex justify-between items-center pt-2">
            <CardTitle>User Console</CardTitle>
            <div className="flex gap-4">
              <div className="relative">
                <Button
                  onClick={() => setActiveSlide(0)}
                  aria-label="Email View"
                  className="rounded-full w-12 h-12 dark:bg-slate-800 bg-slate-200 hover:bg-primary/20 dark:hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-primary flex items-center justify-center transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dark:text-white text-slate-900">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </Button>
              </div>
              <div className="relative">
                <Button 
                  onClick={() => setActiveSlide(1)}
                  aria-label="AI Assistant"
                  className="rounded-full w-12 h-12 dark:bg-slate-800 bg-slate-200 hover:bg-primary/20 dark:hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-primary flex items-center justify-center transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dark:text-white text-slate-900">
                    <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m0 6a4 4 0 0 0-4 4c0 2.21 1.79 4 4 4s4-1.79 4-4c0-2.21-1.79-4-4-4"/>
                    <path d="M15 9l-3 3"/>
                  </svg>
                </Button>
              </div>
              <div className="relative">
                <Button
                  onClick={() => setActiveSlide(2)} 
                  aria-label="Reviews"
                  className="rounded-full w-12 h-12 dark:bg-slate-800 bg-slate-200 hover:bg-primary/20 dark:hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-primary flex items-center justify-center transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dark:text-white text-slate-900">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {/* Email View Slide */}
                <div className={`w-full flex-shrink-0 border-none ${activeSlide === 0 ? 'border-primary' : 'border-transparent'}`}>
                  <div className="grid grid-cols-12 gap-4">
                    {/* Sidebar */}
                    <div className="col-span-3">
                      <Card>
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <div>
                              <EmailDialog />
                            </div>
                            <Button variant="ghost" className="w-full justify-start">
                              <Users className="h-4 w-4 mr-2" />
                              Community
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                              <Inbox className="h-4 w-4 mr-2" />
                              Inbox
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                              <Star className="h-4 w-4 mr-2" />
                              Starred
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                              <Send className="h-4 w-4 mr-2" />
                              Sent
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                              <Archive className="h-4 w-4 mr-2" />
                              Archive
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Main Content */}
                    <div className="col-span-9">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex gap-4 mb-4">
                            <div className="relative flex-1">
                              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input placeholder="Search emails..." className="pl-8" />
                            </div>
                            <Button variant="outline" size="icon">
                              <Filter className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="space-y-2">
                            {/* Email List Items */}
                            <ScrollArea className="h-[calc(100vh-20rem)] overflow-auto">
                              {[1, 2, 3, 4, 5].map((i) => (
                                <Dialog key={i}>
                                  <DialogTrigger asChild>
                                    <Card className="cursor-pointer hover:bg-accent m-2">
                                      <CardContent className="p-4">
                                        <div className="flex justify-between items-center">
                                          <div>
                                            <h4 className="font-medium">Sender Name</h4>
                                            <p className="text-sm text-muted-foreground">Email Subject</p>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <span className="text-sm text-muted-foreground">2:30 PM</span>
                                            <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                                              <Star className="h-4 w-4" />
                                            </Button>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </DialogTrigger>

                                  <DialogContent className="max-w-3xl">
                                    <DialogHeader>
                                      <DialogTitle>Email Subject</DialogTitle>
                                      <DialogDescription>
                                        From: Sender Name &lt;sender@email.com&gt;
                                      </DialogDescription>
                                    </DialogHeader>

                                    <div className="space-y-4">
                                      <div className="prose dark:prose-invert">
                                        <p>
                                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        </p>
                                      </div>

                                      <div className="flex gap-2">
                                        <Button variant="outline">
                                          <Reply className="h-4 w-4 mr-2" />
                                          Reply
                                        </Button>
                                        <Button variant="outline">
                                          <Forward className="h-4 w-4 mr-2" />
                                          Forward
                                        </Button>
                                        <Button variant="outline">
                                          <Archive className="h-4 w-4 mr-2" />
                                          Archive
                                        </Button>
                                        <Button variant="outline">
                                          <Star className="h-4 w-4 mr-2" />
                                          Star
                                        </Button>
                                      </div>

                                      <Textarea 
                                        placeholder="Write your reply..."
                                        className="min-h-[100px]"
                                      />
                                      
                                      <div className="flex justify-end">
                                        <Button>
                                          Send Reply
                                        </Button>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              ))}
                            </ScrollArea>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>

                {/* Agent Configuration Slide */}
                <div className={`w-full flex-shrink-0 border-none ${activeSlide === 1 ? 'border-primary' : 'border-transparent'}`}>
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-3">
                      <Card>
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <Button 
                              variant={selectedSetting.agentName === 'settings' ? 'default' : 'ghost'} 
                              className="w-full justify-start"
                              onClick={() => setSelectedSetting({
                                agentName: 'settings',
                                agentRole: '',
                                agentBehavior: '',
                                customInstructions: '',
                                model: 'gpt4',
                                temperature: 0.7
                              })}
                            >
                              <Settings2 className="h-4 w-4 mr-2" />
                              Agent Settings
                            </Button>
                            <Button 
                              variant={selectedSetting.agentName === 'history' ? 'default' : 'ghost'}
                              className="w-full justify-start"
                              onClick={() => setSelectedSetting({
                                agentName: 'history',
                                agentRole: '',
                                agentBehavior: '',
                                customInstructions: '',
                                model: 'gpt4',
                                temperature: 0.7
                              })}
                            >
                              <Clock className="h-4 w-4 mr-2" />
                              Conversation History
                            </Button>
                            <Button 
                              variant={selectedSetting.agentName === 'context' ? 'default' : 'ghost'}
                              className="w-full justify-start"
                              onClick={() => setSelectedSetting({
                                agentName: 'context',
                                agentRole: '',
                                agentBehavior: '',
                                customInstructions: '',
                                model: 'gpt4',
                                temperature: 0.7
                              })}
                            >
                              <Library className="h-4 w-4 mr-2" />
                              Context Library
                            </Button>
                            <Button 
                              variant={selectedSetting.agentName === 'prompts' ? 'default' : 'ghost'}
                              className="w-full justify-start"
                              onClick={() => setSelectedSetting({
                                agentName: 'prompts',
                                agentRole: '',
                                agentBehavior: '',
                                customInstructions: '',
                                model: 'gpt4',
                                temperature: 0.7
                              })}
                            >
                              <MessagesSquare className="h-4 w-4 mr-2" />
                              Prompt Templates
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    

                    <div className="col-span-9">
                      <Card>
                        <CardContent className="p-4">
                          <div className="h-[calc(100vh-20rem)]">
                            <ScrollArea className="h-[calc(100vh-20rem)] overflow-auto">
                              {selectedSetting.agentName === 'settings' && (
                                <div className="space-y-6">
                                  <Card className="border-2 border-primary">
                                    <CardHeader>
                                      <CardTitle className="text-lg font-medium">Agent Configuration</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="space-y-6">
                                        <div className="space-y-2">
                                          <Label>Model Selection</Label>
                                          <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                              <Button variant="outline" className="w-full justify-between">
                                                <div className="flex items-center">
                                                  {selectedSetting.model === 'gpt4' && (
                                                    <>
                                                      <span>GPT-4</span>
                                                    </>
                                                  )}
                                                  {selectedSetting.model === 'gpt35' && (
                                                    <>
                                                      <span>GPT-3.5</span>
                                                    </>
                                                  )}
                                                  {selectedSetting.model === 'claude' && (
                                                    <>
                                                      <span>Claude</span>
                                                    </>
                                                  )}
                                                  {selectedSetting.model === 'llama' && (
                                                    <>
                                                      <span>Llama 2</span>
                                                    </>
                                                  )}
                                                  {!selectedSetting.model && 'Select model'}
                                                </div>
                                              </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-56">
                                              <DropdownMenuItem onClick={() => handleSettingChange('model', 'gpt4')}>
                                                <div className="flex items-center">
                                                  <span>GPT-4</span>
                                                </div>
                                              </DropdownMenuItem>
                                              <DropdownMenuItem onClick={() => handleSettingChange('model', 'gpt35')}>
                                                <div className="flex items-center">
                                                  <span>GPT-3.5</span>
                                                </div>
                                              </DropdownMenuItem>
                                              <DropdownMenuItem onClick={() => handleSettingChange('model', 'claude')}>
                                                <div className="flex items-center">
                                                  <span>Claude</span>
                                                </div>
                                              </DropdownMenuItem>
                                              <DropdownMenuItem onClick={() => handleSettingChange('model', 'llama')}>
                                                <div className="flex items-center">
                                                  <span>Llama 2</span>
                                                </div>
                                              </DropdownMenuItem>
                                            </DropdownMenuContent>
                                          </DropdownMenu>
                                        </div>

                                        <div className="space-y-2">
                                          <Label>Agent Name</Label>
                                          <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                              <Button variant="outline" className="w-full justify-between">
                                                <div className="flex items-center">
                                                  {selectedSetting.agentName === 'settings' && (
                                                    <>
                                                      <span>Settings</span>
                                                    </>
                                                  )}
                                                  {selectedSetting.agentName === 'agent' && (
                                                    <>
                                                      <span>Agent</span>
                                                    </>
                                                  )}
                                                  {selectedSetting.agentName === 'mentor' && (
                                                    <>
                                                      <span>Mentor</span>
                                                    </>
                                                  )}
                                                  {selectedSetting.agentName === 'expert' && (
                                                    <>
                                                      <span>Expert</span>
                                                    </>
                                                  )}
                                                  {!selectedSetting.agentName && 'Select agent name'}
                                                </div>
                                              </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-56">
                                              <DropdownMenuItem onClick={() => handleSettingChange('agentName', 'settings')}>
                                                <div className="flex items-center">
                                                  <span>Settings</span>
                                                </div>
                                              </DropdownMenuItem>
                                              <DropdownMenuItem onClick={() => handleSettingChange('agentName', 'agent')}>
                                                <div className="flex items-center">
                                                  <span>Agent</span>
                                                </div>
                                              </DropdownMenuItem>
                                              <DropdownMenuItem onClick={() => handleSettingChange('agentName', 'mentor')}>
                                                <div className="flex items-center">
                                                  <span>Mentor</span>
                                                </div>
                                              </DropdownMenuItem>
                                              <DropdownMenuItem onClick={() => handleSettingChange('agentName', 'expert')}>
                                                <div className="flex items-center">
                                                  <span>Expert</span>
                                                </div>
                                              </DropdownMenuItem>
                                            </DropdownMenuContent>
                                          </DropdownMenu>
                                        </div>

                                        <div className="space-y-2">
                                          <Label>Agent Role</Label>
                                          <Input
                                            placeholder="Define the agent's role..."
                                            value={selectedSetting.agentRole}
                                            onChange={(e) => handleSettingChange('agentRole', e.target.value)}
                                          />
                                        </div>

                                        <div className="space-y-2">
                                          <Label>Agent Behavior</Label>
                                          <Textarea
                                            placeholder="Describe how the agent should behave..."
                                            value={selectedSetting.agentBehavior}
                                            onChange={(e) => handleSettingChange('agentBehavior', e.target.value)}
                                            className="min-h-[100px]"
                                          />
                                        </div>

                                        <div className="space-y-2">
                                          <Label>Custom Instructions</Label>
                                          <Textarea
                                            placeholder="Add any custom instructions..."
                                            value={selectedSetting.customInstructions}
                                            onChange={(e) => handleSettingChange('customInstructions', e.target.value)}
                                            className="min-h-[100px]"
                                          />
                                        </div>

                                        <div className="space-y-2">
                                          <div className="flex justify-between items-center">
                                            <Label>Temperature ({selectedSetting.temperature})</Label>
                                            <span className="text-sm text-muted-foreground">Controls randomness</span>
                                          </div>
                                          <Slider 
                                            defaultValue={[selectedSetting.temperature]} 
                                            max={1} 
                                            step={0.1}
                                            onValueChange={(value) => handleSettingChange('temperature', value[0])}
                                          />
                                        </div>

                                        <div className="space-y-2">
                                          <Label>Knowledge Base</Label>
                                          <Input
                                            type="file"
                                            multiple
                                            accept=".pdf,.txt,.doc,.docx"
                                            onChange={(e) => handleSettingChange('documents', Array.from(e.target.files || []))}
                                          />
                                          <p className="text-sm text-muted-foreground">Upload documents to enhance agent knowledge</p>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>
                              )}

                              {selectedSetting.agentName === 'history' && (
                                <div className="space-y-4">
                                  {[1,2,3].map((i) => (
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Card key={i} className="border-2 hover:border-primary cursor-pointer">
                                          <CardContent className="p-4">
                                            <div className="flex justify-between items-center">
                                              <div>
                                                <h4 className="font-medium">Conversation #{i}</h4>
                                                <p className="text-sm text-muted-foreground">2 hours ago</p>
                                              </div>
                                              <Button variant="outline" size="sm">View</Button>
                                            </div>
                                          </CardContent>
                                        </Card>
                                      </DialogTrigger>
                                      <DialogContent className="w-[70vw] h-[70vh] max-w-7xl">
                                        <DialogHeader>
                                          <DialogTitle>Conversation History #{i}</DialogTitle>
                                        </DialogHeader>
                                        <ScrollArea className="h-[calc(90vh-3.5rem)]">
                                          <div className="space-y-6 p-6">
                                            <div className="flex flex-col items-end">
                                              <div className="bg-primary text-primary-foreground rounded-lg p-4 max-w-[80%]">
                                                <div>How can I improve this code?</div>
                                              </div>
                                              <div className="text-sm text-muted-foreground mt-1 mr-2">
                                                User
                                              </div>
                                            </div>
                                            <div className="flex flex-col items-start">
                                              <div className="bg-muted rounded-lg p-4 max-w-[80%]">
                                                <div>Here are some suggestions to improve your code...</div>
                                              </div>
                                              <div className="text-sm text-muted-foreground mt-1 ml-2">
                                                Assistant
                                              </div>
                                            </div>
                                          </div>
                                        </ScrollArea>
                                      </DialogContent>
                                    </Dialog>
                                  ))}
                                </div>
                              )}

                              {selectedSetting.agentName === 'context' && (
                                <div className="space-y-4">
                                  <Card className="border-2 border-primary">
                                    <CardHeader>
                                      <CardTitle className="text-lg font-medium">Creator Resources Library</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="space-y-4">
                                        {[
                                          {
                                            title: 'Content Creation Guides',
                                            categories: ['Video Editing', 'Podcasting', 'Copywriting'],
                                            lastUpdated: '1 day ago'
                                          },
                                          {
                                            title: 'Platform Best Practices',
                                            categories: ['YouTube', 'TikTok', 'Instagram'],
                                            lastUpdated: '3 days ago'
                                          },
                                          {
                                            title: 'Marketing Resources',
                                            categories: ['Social Media Management', 'Email Marketing', 'Brand Strategy'],
                                            lastUpdated: '1 week ago'
                                          },
                                          {
                                            title: 'Design Assets',
                                            categories: ['Motion Graphics', 'Graphic Design'],
                                            lastUpdated: '2 days ago'
                                          }
                                        ].map((resource) => (
                                          <Card key={resource.title} className="border-2">
                                            <CardContent className="p-4">
                                              <div className="flex justify-between items-start">
                                                <div>
                                                  <h4 className="font-medium">{resource.title}</h4>
                                                  <div className="flex flex-wrap gap-1 mt-1">
                                                    {resource.categories.map((category) => (
                                                      <span key={category} className="text-xs bg-muted px-2 py-1 rounded">
                                                        {category}
                                                      </span>
                                                    ))}
                                                  </div>
                                                  <p className="text-sm text-muted-foreground mt-2">
                                                    Last updated {resource.lastUpdated}
                                                  </p>
                                                </div>
                                                <div className="space-x-2">
                                                  <Button variant="outline" size="sm">View</Button>
                                                  <Button variant="outline" size="sm">Edit</Button>
                                                </div>
                                              </div>
                                            </CardContent>
                                          </Card>
                                        ))}
                                        <Button className="w-full" variant="outline">
                                          Add New Resource
                                        </Button>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>
                              )}

                              {selectedSetting.agentName === 'prompts' && (
                                <div className="space-y-4">
                                  <Card className="border-2 border-primary">
                                    <CardHeader>
                                      <CardTitle className="text-lg font-medium">Prompt Templates</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="space-y-4">
                                        {[
                                          {
                                            title: 'Content Strategy',
                                            description: 'Generate content ideas and strategy for your niche'
                                          },
                                          {
                                            title: 'Video Script',
                                            description: 'Create engaging video scripts with hooks and storytelling'
                                          },
                                          {
                                            title: 'Social Caption',
                                            description: 'Write compelling social media captions that drive engagement'
                                          },
                                          {
                                            title: 'SEO Optimization',
                                            description: 'Optimize your content titles and descriptions for search'
                                          },
                                          {
                                            title: 'Thumbnail Design',
                                            description: 'Design guidelines for eye-catching thumbnails'
                                          },
                                          {
                                            title: 'Audience Growth',
                                            description: 'Strategies to grow and engage your target audience'
                                          }
                                        ].map((template) => (
                                          <Card key={template.title} className="border-2">
                                            <CardContent className="p-4">
                                              <div className="flex justify-between items-center">
                                                <div>
                                                  <span className="font-medium">{template.title}</span>
                                                  <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                                                </div>
                                                <Button variant="outline" size="sm">Edit</Button>
                                              </div>
                                            </CardContent>
                                          </Card>
                                        ))}
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>
                              )}

                              {/* <Button 
                                className="w-full border-2 border-primary mt-6"
                                onClick={() => {
                                  toast({
                                    title: "Settings saved",
                                    description: "Your agent settings have been updated successfully."
                                  })
                                }}
                              >
                                Save Changes
                              </Button> */}
                            </ScrollArea>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>

                {/* Feedback View Slide */}
                <div className={`w-full flex-shrink-0 border-none ${activeSlide === 1 ? 'border-primary' : 'border-transparent'}`}>
                  <div className="grid grid-cols-12 gap-4">
                    {/* Sidebar */}
                    <div className="col-span-3">
                      <Card>
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <Button 
                              variant="ghost" 
                              className="w-full justify-start"
                              onClick={() => setSelectedReview(prev => ({...prev, filter: 'all'}))}
                            >
                              <MessagesSquare className="h-4 w-4 mr-2" />
                              All Feedback
                            </Button>
                            <Button 
                              variant="ghost" 
                              className="w-full justify-start"
                              onClick={() => setSelectedReview(prev => ({...prev, filter: 'featured'}))}
                            >
                              <Star className="h-4 w-4 mr-2" />
                              App Features
                            </Button>
                            <Button 
                              variant="ghost" 
                              className="w-full justify-start"
                              onClick={() => setSelectedReview(prev => ({...prev, filter: 'recent'}))}
                            >
                              <Clock className="h-4 w-4 mr-2" />
                              Recent
                            </Button>
                            <Button 
                              variant="ghost" 
                              className="w-full justify-start"
                              onClick={() => setSelectedReview(prev => ({...prev, filter: 'by-product'}))}
                            >
                              <Library className="h-4 w-4 mr-2" />
                              By Product
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Main Content */}
                    <div className="col-span-9">
                      <Card>
                        <CardContent className="p-2">

                          {selectedReview.filter === 'all' && (
                            <div>
                              {/* Stats Row */}
                              <div className="grid grid-cols-3 gap-2 mb-6">
                                {/* Total Reviews */}
                                <Card className="p-4">
                                  <h4 className="font-medium text-lg mb-4 text-center">Total Reviews</h4>
                                  <div className="flex flex-col items-center justify-center">
                                    <span className="text-4xl font-bold my-6">1,247</span>
                                    <div className="text-sm text-muted-foreground">
                                      <span className="text-green-500">+12.5%</span>
                                      <span className="ml-1">increase from previous period</span>
                                    </div>
                                  </div>
                                </Card>

                                {/* Average Rating */}
                                <Card className="p-4">
                                  <h4 className="font-medium text-lg mb-2 text-center">Average Rating</h4>
                                  <div className="flex flex-col items-center justify-center">
                                    <span className="text-4xl font-bold my-6">4.7</span>
                                    <div className="flex text-yellow-400 mt-2 justify-center">
                                      <Star className="h-5 w-5 fill-current" />
                                      <Star className="h-5 w-5 fill-current" />
                                      <Star className="h-5 w-5 fill-current" />
                                      <Star className="h-5 w-5 fill-current" />
                                      <Star className="h-5 w-5 fill-current" />
                                    </div>
                                    <div className="text-sm text-muted-foreground mt-2 text-center">
                                      <span className="text-green-500">+0.2</span>
                                      <span className="ml-1">vs last 30 days</span>
                                    </div>
                                  </div>
                                </Card>

                                {/* Rating Distribution */}
                                <Card className="p-4">
                                  <h4 className="font-medium text-lg text-center">Rating Distribution</h4>
                                  <div className="space-y-2 flex flex-col justify-center">
                                    <div className="flex items-center gap-2 justify-center">
                                      <span className="w-12">5 ★</span>
                                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                                        <div className="bg-yellow-400 rounded-full h-2 w-[70%]"></div>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2 justify-center">
                                      <span className="w-12">4 ★</span>
                                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                                        <div className="bg-yellow-400 rounded-full h-2 w-[20%]"></div>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2 justify-center">
                                      <span className="w-12">3 ★</span>
                                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                                        <div className="bg-yellow-400 rounded-full h-2 w-[5%]"></div>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2 justify-center">
                                      <span className="w-12">2 ★</span>
                                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                                        <div className="bg-yellow-400 rounded-full h-2 w-[3%]"></div>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2 justify-center">
                                      <span className="w-12">1 ★</span>
                                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                                        <div className="bg-yellow-400 rounded-full h-2 w-[2%]"></div>
                                      </div>
                                    </div>
                                  </div>
                                </Card>
                              </div>

                              {/* Reviews List */}
                              <ScrollArea className="h-[calc(100vh-30rem)] w-full overflow-auto">
                                <div className="space-y-4">
                                  {/* Individual Review */}
                                  <Card className="p-4">
                                    <div className="flex gap-4">
                                      {/* User Info Column - 30% */}
                                      <div className="w-[30%]">
                                        <div className="flex items-center gap-3">
                                          <Avatar>
                                            <AvatarImage src="/default-avatar.png" />
                                            <AvatarFallback>JD</AvatarFallback>
                                          </Avatar>
                                          <div>
                                            <h4 className="font-medium">John Doe</h4>
                                            <p className="text-sm text-muted-foreground">Total Reviews: 15</p>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Review Content Column - 70% */}
                                      <div className="w-[70%]">
                                        <div className="flex text-yellow-400 mb-2">
                                          <Star className="h-4 w-4 fill-current" />
                                          <Star className="h-4 w-4 fill-current" />
                                          <Star className="h-4 w-4 fill-current" />
                                          <Star className="h-4 w-4 fill-current" />
                                          <Star className="h-4 w-4 fill-current" />
                                        </div>
                                        <p className="text-sm mb-4">Excellent product! The user interface is intuitive and the features are exactly what I needed for my workflow.</p>
                                        <div className="flex gap-2">
                                          <Button variant="outline" size="sm">
                                            <MessagesSquare className="h-4 w-4 mr-2" />
                                            Message
                                          </Button>
                                          <Button variant="outline" size="sm">
                                            <Star className="h-4 w-4 mr-2" />
                                            Like
                                          </Button>
                                          <Button variant="outline" size="sm">
                                            <Reply className="h-4 w-4 mr-2" />
                                            Reply
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  </Card>

                                  {/* Additional reviews would follow the same pattern */}
                                </div>
                              </ScrollArea>
                            </div>
                          )}
                        {selectedReview.filter === 'featured' && (
                          <ScrollArea className="h-[calc(100vh-20rem)] w-full overflow-auto">
                            <div className="space-y-4">
                              <Card className="p-4">
                                <div className="flex gap-4">
                                  <div className="w-[30%]">
                                    <div className="flex items-center gap-3">
                                      <Avatar>
                                        <AvatarImage src="/default-avatar.png" />
                                        <AvatarFallback>PT</AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <h4 className="font-medium">Product Team</h4>
                                        <p className="text-sm text-muted-foreground">Total Reviews: 42</p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="w-[70%]">
                                    <div className="flex text-yellow-400 mb-2">
                                      <Star className="h-4 w-4 fill-current" />
                                      <Star className="h-4 w-4 fill-current" />
                                      <Star className="h-4 w-4 fill-current" />
                                      <Star className="h-4 w-4 fill-current" />
                                      <Star className="h-4 w-4 fill-current" />
                                    </div>
                                    <p className="text-sm mb-4">New predictive analytics dashboard enables data-driven decision making with real-time insights.</p>
                                    <div className="flex gap-2">
                                      <Button variant="outline" size="sm">
                                        <MessagesSquare className="h-4 w-4 mr-2" />
                                        Message
                                      </Button>
                                      <Button variant="outline" size="sm">
                                        <Star className="h-4 w-4 mr-2" />
                                        Like
                                      </Button>
                                      <Button variant="outline" size="sm">
                                        <Reply className="h-4 w-4 mr-2" />
                                        Reply
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </Card>

                              <Card className="p-4">
                                <div className="flex gap-4">
                                  <div className="w-[30%]">
                                    <div className="flex items-center gap-3">
                                      <Avatar>
                                        <AvatarImage src="/default-avatar.png" />
                                        <AvatarFallback>UX</AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <h4 className="font-medium">UX Team</h4>
                                        <p className="text-sm text-muted-foreground">Total Reviews: 28</p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="w-[70%]">
                                    <div className="flex text-yellow-400 mb-2">
                                      <Star className="h-4 w-4 fill-current" />
                                      <Star className="h-4 w-4 fill-current" />
                                      <Star className="h-4 w-4 fill-current" />
                                      <Star className="h-4 w-4 fill-current" />
                                      <Star className="h-4 w-4 fill-current" />
                                    </div>
                                    <p className="text-sm mb-4">Introduced real-time collaboration features including shared workspaces and live editing.</p>
                                    <div className="flex gap-2">
                                      <Button variant="outline" size="sm">
                                        <MessagesSquare className="h-4 w-4 mr-2" />
                                        Message
                                      </Button>
                                      <Button variant="outline" size="sm">
                                        <Star className="h-4 w-4 mr-2" />
                                        Like
                                      </Button>
                                      <Button variant="outline" size="sm">
                                        <Reply className="h-4 w-4 mr-2" />
                                        Reply
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </Card>
                            </div>
                          </ScrollArea>
                        )}

                        {selectedReview.filter === 'recent' && (
                          <ScrollArea className="h-[calc(100vh-20rem)] w-full overflow-auto">
                            <div className="space-y-4">
                              <Card className="p-4">
                                <div className="flex gap-4">
                                  <div className="w-[30%]">
                                    <div className="flex items-center gap-3">
                                      <Avatar>
                                        <AvatarImage src="/default-avatar.png" />
                                        <AvatarFallback>ST</AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <h4 className="font-medium">System Team</h4>
                                        <p className="text-sm text-muted-foreground">Total Reviews: 156</p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="w-[70%]">
                                    <div className="flex text-yellow-400 mb-2">
                                      <Star className="h-4 w-4 fill-current" />
                                      <Star className="h-4 w-4 fill-current" />
                                      <Star className="h-4 w-4 fill-current" />
                                      <Star className="h-4 w-4 fill-current" />
                                      <Star className="h-4 w-4 fill-current" />
                                    </div>
                                    <p className="text-sm mb-4">New features deployed including improved dashboard analytics and reporting tools.</p>
                                    <div className="flex gap-2">
                                      <Button variant="outline" size="sm">
                                        <MessagesSquare className="h-4 w-4 mr-2" />
                                        Message
                                      </Button>
                                      <Button variant="outline" size="sm">
                                        <Star className="h-4 w-4 mr-2" />
                                        Like
                                      </Button>
                                      <Button variant="outline" size="sm">
                                        <Reply className="h-4 w-4 mr-2" />
                                        Reply
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </Card>

                              <Card className="p-4">
                                <div className="flex gap-4">
                                  <div className="w-[30%]">
                                    <div className="flex items-center gap-3">
                                      <Avatar>
                                        <AvatarImage src="/default-avatar.png" />
                                        <AvatarFallback>DT</AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <h4 className="font-medium">Dev Team</h4>
                                        <p className="text-sm text-muted-foreground">Total Reviews: 89</p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="w-[70%]">
                                    <div className="flex text-yellow-400 mb-2">
                                      <Star className="h-4 w-4 fill-current" />
                                      <Star className="h-4 w-4 fill-current" />
                                      <Star className="h-4 w-4 fill-current" />
                                      <Star className="h-4 w-4 fill-current" />
                                      <Star className="h-4 w-4 fill-current" />
                                    </div>
                                    <p className="text-sm mb-4">Mobile app v2.0 released with offline capabilities and improved UI.</p>
                                    <div className="flex gap-2">
                                      <Button variant="outline" size="sm">
                                        <MessagesSquare className="h-4 w-4 mr-2" />
                                        Message
                                      </Button>
                                      <Button variant="outline" size="sm">
                                        <Star className="h-4 w-4 mr-2" />
                                        Like
                                      </Button>
                                      <Button variant="outline" size="sm">
                                        <Reply className="h-4 w-4 mr-2" />
                                        Reply
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </Card>
                            </div>
                          </ScrollArea>
                        )}

                        {selectedReview.filter === 'by-product' && (
                          <ScrollArea className="h-[calc(100vh-20rem)] w-full overflow-auto">
                            <div className="space-y-4">
                              <Card className="p-4">
                                <div className="flex gap-4">
                                  <div className="w-[30%]">
                                    <div className="flex items-center gap-3">
                                      <Avatar>
                                        <AvatarImage src="/default-avatar.png" />
                                        <AvatarFallback>MT</AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <h4 className="font-medium">Mobile Team</h4>
                                        <p className="text-sm text-muted-foreground">Total Reviews: 67</p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="w-[70%]">
                                    <div className="flex text-yellow-400 mb-2">
                                      <Star className="h-4 w-4 fill-current" />
                                      <Star className="h-4 w-4 fill-current" />
                                      <Star className="h-4 w-4 fill-current" />
                                      <Star className="h-4 w-4 fill-current" />
                                      <Star className="h-4 w-4 fill-current" />
                                    </div>
                                    <p className="text-sm mb-4">Users love the new offline mode but request better sync capabilities.</p>
                                    <div className="flex gap-2">
                                      <Button variant="outline" size="sm">
                                        <MessagesSquare className="h-4 w-4 mr-2" />
                                        Message
                                      </Button>
                                      <Button variant="outline" size="sm">
                                        <Star className="h-4 w-4 mr-2" />
                                        Like
                                      </Button>
                                      <Button variant="outline" size="sm">
                                        <Reply className="h-4 w-4 mr-2" />
                                        Reply
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </Card>

                              <Card className="p-4">
                                <div className="flex gap-4">
                                  <div className="w-[30%]">
                                    <div className="flex items-center gap-3">
                                      <Avatar>
                                        <AvatarImage src="/default-avatar.png" />
                                        <AvatarFallback>DT</AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <h4 className="font-medium">Desktop Team</h4>
                                        <p className="text-sm text-muted-foreground">Total Reviews: 45</p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="w-[70%]">
                                    <div className="flex text-yellow-400 mb-2">
                                      <Star className="h-4 w-4 fill-current" />
                                      <Star className="h-4 w-4 fill-current" />
                                      <Star className="h-4 w-4 fill-current" />
                                      <Star className="h-4 w-4 fill-current" />
                                      <Star className="h-4 w-4 fill-current" />
                                    </div>
                                    <p className="text-sm mb-4">Performance improvements needed for large file handling.</p>
                                    <div className="flex gap-2">
                                      <Button variant="outline" size="sm">
                                        <MessagesSquare className="h-4 w-4 mr-2" />
                                        Message
                                      </Button>
                                      <Button variant="outline" size="sm">
                                        <Star className="h-4 w-4 mr-2" />
                                        Like
                                      </Button>
                                      <Button variant="outline" size="sm">
                                        <Reply className="h-4 w-4 mr-2" />
                                        Reply
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </Card>
                            </div>
                          </ScrollArea>
                        )}

                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
            
            {/* Carousel Navigation */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <button className="w-2 h-2 rounded-full bg-primary"></button>
              <button className="w-2 h-2 rounded-full bg-gray-300"></button>
              <button className="w-2 h-2 rounded-full bg-gray-300"></button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsoleView;