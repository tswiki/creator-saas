

import { Button } from "@/components/v0/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/v0/ui/card";
import { Input } from "@/components/v0/ui/input";
import { Search, Filter, Mail, Star, Inbox, Send, Archive, Trash2, Tag, Settings2, Clock, Library, MessagesSquare, ChevronLeft, ChevronRight, Badge, Users, Reply, Forward } from "lucide-react";
import { Textarea } from "./ui/textarea";
import React from 'react';
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import EmailDialog from "./email-dialog";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

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
            <EmailDialog />
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="overflow-hidden">
              {/* Navigation Buttons */}
              <button 
                onClick={prevSlide}
                aria-label="Previous slide"
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-primary/10 hover:bg-primary/20 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next slide" 
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-primary/10 hover:bg-primary/20 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

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
                        <CardContent className="p-4">

                          {selectedReview.filter === 'all' && (
                            <ScrollArea className="h-[calc(100vh-15rem)] overflow-y-auto">
                              <div className="flex gap-4 mb-4">
                                <div className="relative flex-1">
                                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                  <Input placeholder="Search feedback..." className="pl-8" />
                                </div>
                                <Button variant="outline" className="flex items-center gap-2">
                                  <Filter className="h-4 w-4" />
                                  Filter
                                </Button>
                              </div>

                              <div className="space-y-4">
                                {/* Feedback List */}
                                <div className="space-y-4">
                                  <Card className="p-4 border-2 border-primary">
                                    <div className="flex justify-between items-start mb-2">
                                      <div>
                                        <h4 className="font-medium">Critical Performance Issue</h4>
                                        <p className="text-sm text-muted-foreground">Sarah Chen • 1 hour ago</p>
                                      </div>
                                      <Badge>Urgent</Badge>
                                    </div>
                                    <p className="text-sm mb-4">System response times have increased significantly in the past hour. Multiple users reporting delays of 5+ seconds.</p>
                                    <div className="flex gap-2">
                                      <Button variant="outline" size="sm">⚠️ High Priority</Button>
                                      <Button variant="outline" size="sm">👥 15 affected</Button>
                                    </div>
                                  </Card>

                                  <Card className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                      <div>
                                        <h4 className="font-medium">UI Enhancement Success</h4>
                                        <p className="text-sm text-muted-foreground">Mike Johnson • 3 hours ago</p>
                                      </div>
                                      <Badge>Positive</Badge>
                                    </div>
                                    <p className="text-sm mb-4">The new dashboard layout has received overwhelmingly positive feedback. User engagement up by 40%.</p>
                                    <div className="flex gap-2">
                                      <Button variant="outline" size="sm">👍 47</Button>
                                      <Button variant="outline" size="sm">📈 Trending</Button>
                                    </div>
                                  </Card>

                                  <Card className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                      <div>
                                        <h4 className="font-medium">Feature Request Cluster</h4>
                                        <p className="text-sm text-muted-foreground">User Community • 24 hours ago</p>
                                      </div>
                                      <Badge>Trending</Badge>
                                    </div>
                                    <p className="text-sm mb-4">Multiple users requesting dark mode support. This has become the most requested feature this week.</p>
                                    <div className="flex gap-2">
                                      <Button variant="outline" size="sm">🔥 High Demand</Button>
                                      <Button variant="outline" size="sm">👥 89 requests</Button>
                                    </div>
                                  </Card>

                                  <Card className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                      <div>
                                        <h4 className="font-medium">Integration Bug Report</h4>
                                        <p className="text-sm text-muted-foreground">Dev Team • 2 days ago</p>
                                      </div>
                                      <Badge>Bug</Badge>
                                    </div>
                                    <p className="text-sm mb-4">Third-party API integration failing intermittently. Affects approximately 5% of transactions.</p>
                                    <div className="flex gap-2">
                                      <Button variant="outline" size="sm">🐛 In Progress</Button>
                                      <Button variant="outline" size="sm">📊 5% Impact</Button>
                                    </div>
                                  </Card>
                                </div>
                              </div>
                            </ScrollArea>
                          )}
                        {selectedReview.filter === 'featured' && (
                          <ScrollArea className="h-[calc(100vh-20rem)] w-full overflow-auto">
                            <div className="p-4">
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <Card className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                      <div>
                                        <h4 className="font-medium">Advanced Analytics Feature</h4>
                                        <p className="text-sm text-muted-foreground">Product Team • 2 days ago</p>
                                      </div>
                                      <Badge>Featured</Badge>
                                    </div>
                                    <p className="text-sm mb-4">New predictive analytics dashboard enables data-driven decision making with real-time insights.</p>
                                    <div className="flex gap-2">
                                      <Button variant="outline" size="sm">📊 Analytics</Button>
                                      <Button variant="outline" size="sm">✨ New Feature</Button>
                                    </div>
                                  </Card>

                                  <Card className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                      <div>
                                        <h4 className="font-medium">Collaboration Tools Update</h4>
                                        <p className="text-sm text-muted-foreground">UX Team • 1 week ago</p>
                                      </div>
                                      <Badge>Featured</Badge>
                                    </div>
                                    <p className="text-sm mb-4">Introduced real-time collaboration features including shared workspaces and live editing.</p>
                                    <div className="flex gap-2">
                                      <Button variant="outline" size="sm">👥 Collaboration</Button>
                                      <Button variant="outline" size="sm">🔄 Real-time</Button>
                                    </div>
                                  </Card>

                                  <Card className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                      <div>
                                        <h4 className="font-medium">Mobile Integration</h4>
                                        <p className="text-sm text-muted-foreground">Mobile Team • 3 days ago</p>
                                      </div>
                                      <Badge>Featured</Badge>
                                    </div>
                                    <p className="text-sm mb-4">Cross-platform synchronization now available with offline mode support.</p>
                                    <div className="flex gap-2">
                                      <Button variant="outline" size="sm">📱 Mobile</Button>
                                      <Button variant="outline" size="sm">🔄 Sync</Button>
                                    </div>
                                  </Card>

                                  <Card className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                      <div>
                                        <h4 className="font-medium">API Integration Hub</h4>
                                        <p className="text-sm text-muted-foreground">Integration Team • 5 days ago</p>
                                      </div>
                                      <Badge>Featured</Badge>
                                    </div>
                                    <p className="text-sm mb-4">New API hub launched with support for 20+ popular third-party integrations.</p>
                                    <div className="flex gap-2">
                                      <Button variant="outline" size="sm">🔌 Integration</Button>
                                      <Button variant="outline" size="sm">🚀 API Hub</Button>
                                    </div>
                                  </Card>
                                </div>
                              </div>
                            </div>
                          </ScrollArea>
                        )}

                        {selectedReview.filter === 'recent' && (
                          <ScrollArea className="h-[calc(100vh-20rem)] w-full overflow-auto">
                            <div className="p-4">
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <Card className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                      <div>
                                        <h4 className="font-medium">Latest Platform Update</h4>
                                        <p className="text-sm text-muted-foreground">System Update • Just now</p>
                                      </div>
                                      <Badge>Recent</Badge>
                                    </div>
                                    <p className="text-sm mb-4">New features deployed including improved dashboard analytics and reporting tools.</p>
                                    <div className="flex gap-2">
                                      <Button variant="outline" size="sm">🆕 Latest</Button>
                                      <Button variant="outline" size="sm">📊 Analytics</Button>
                                    </div>
                                  </Card>

                                  <Card className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                      <div>
                                        <h4 className="font-medium">Mobile App Release</h4>
                                        <p className="text-sm text-muted-foreground">Dev Team • 2 hours ago</p>
                                      </div>
                                      <Badge>Recent</Badge>
                                    </div>
                                    <p className="text-sm mb-4">Mobile app v2.0 released with offline capabilities and improved UI.</p>
                                    <div className="flex gap-2">
                                      <Button variant="outline" size="sm">📱 Mobile</Button>
                                      <Button variant="outline" size="sm">✨ New UI</Button>
                                    </div>
                                  </Card>

                                  <Card className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                      <div>
                                        <h4 className="font-medium">API Performance Update</h4>
                                        <p className="text-sm text-muted-foreground">Backend Team • 3 hours ago</p>
                                      </div>
                                      <Badge>Recent</Badge>
                                    </div>
                                    <p className="text-sm mb-4">Response times improved by 40% after latest infrastructure upgrades.</p>
                                    <div className="flex gap-2">
                                      <Button variant="outline" size="sm">⚡ Performance</Button>
                                      <Button variant="outline" size="sm">🔧 Backend</Button>
                                    </div>
                                  </Card>

                                  <Card className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                      <div>
                                        <h4 className="font-medium">User Feedback Implementation</h4>
                                        <p className="text-sm text-muted-foreground">Product Team • 4 hours ago</p>
                                      </div>
                                      <Badge>Recent</Badge>
                                    </div>
                                    <p className="text-sm mb-4">Top requested features from last month's survey now live in production.</p>
                                    <div className="flex gap-2">
                                      <Button variant="outline" size="sm">👥 User-Driven</Button>
                                      <Button variant="outline" size="sm">✅ Completed</Button>
                                    </div>
                                  </Card>
                                </div>
                              </div>
                            </div>
                          </ScrollArea>
                        )}

                        {selectedReview.filter === 'by-product' && (
                          <ScrollArea className="h-[calc(100vh-20rem)] w-full overflow-auto">
                            <div className="p-4">
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <Card className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                      <div>
                                        <h4 className="font-medium">Mobile App Feedback</h4>
                                        <p className="text-sm text-muted-foreground">Mobile Team • 2 hours ago</p>
                                      </div>
                                      <Badge>Mobile App</Badge>
                                    </div>
                                    <p className="text-sm mb-4">Users love the new offline mode but request better sync capabilities.</p>
                                    <div className="flex gap-2">
                                      <Button variant="outline" size="sm">📱 Mobile</Button>
                                      <Button variant="outline" size="sm">🔄 Sync</Button>
                                    </div>
                                  </Card>

                                  <Card className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                      <div>
                                        <h4 className="font-medium">Desktop Client Review</h4>
                                        <p className="text-sm text-muted-foreground">Desktop Team • 3 hours ago</p>
                                      </div>
                                      <Badge>Desktop</Badge>
                                    </div>
                                    <p className="text-sm mb-4">Performance improvements needed for large file handling.</p>
                                    <div className="flex gap-2">
                                      <Button variant="outline" size="sm">💻 Desktop</Button>
                                      <Button variant="outline" size="sm">⚡ Performance</Button>
                                    </div>
                                  </Card>

                                  <Card className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                      <div>
                                        <h4 className="font-medium">Web Platform Updates</h4>
                                        <p className="text-sm text-muted-foreground">Web Team • 4 hours ago</p>
                                      </div>
                                      <Badge>Web App</Badge>
                                    </div>
                                    <p className="text-sm mb-4">New dashboard features receiving positive feedback from users.</p>
                                    <div className="flex gap-2">
                                      <Button variant="outline" size="sm">🌐 Web</Button>
                                      <Button variant="outline" size="sm">✨ UI/UX</Button>
                                    </div>
                                  </Card>

                                  <Card className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                      <div>
                                        <h4 className="font-medium">API Integration Feedback</h4>
                                        <p className="text-sm text-muted-foreground">API Team • 5 hours ago</p>
                                      </div>
                                      <Badge>API</Badge>
                                    </div>
                                    <p className="text-sm mb-4">Third-party integration requests and documentation improvements needed.</p>
                                    <div className="flex gap-2">
                                      <Button variant="outline" size="sm">🔌 API</Button>
                                      <Button variant="outline" size="sm">📚 Docs</Button>
                                    </div>
                                  </Card>
                                </div>
                              </div>
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