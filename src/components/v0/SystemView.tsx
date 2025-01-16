

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Filter, Mail, Star, Inbox, Send, Archive, Trash2, Tag, Settings2, Clock, Library, MessagesSquare, ChevronLeft, ChevronRight, Badge } from "lucide-react";
import { Textarea } from "../ui/textarea";
import React from 'react';
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";

export const SystemView = () => {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const totalSlides = 3;

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="fixed h-[calc(100vh-3.5rem)] w-[calc(100vw-16rem)] left-64 top-14 p-4 overflow-y-none">
      <Card className="h-full w-full border-2 border-primary">
        <CardHeader>
          <div className="flex justify-between items-center pt-2">
            <CardTitle>User Console</CardTitle>
            <Button className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Compose
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="overflow-hidden">
              {/* Navigation Buttons */}
              <button 
                onClick={prevSlide}
                aria-label="Previous slide"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-primary/10 hover:bg-primary/20 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next slide" 
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-primary/10 hover:bg-primary/20 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-primary"
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
                            <Button variant="ghost" className="w-full justify-start">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Trash
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                              <Tag className="h-4 w-4 mr-2" />
                              Labels
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
                            {[1, 2, 3].map((i) => (
                              <Card key={i} className="cursor-pointer hover:bg-accent">
                                <CardContent className="p-4">
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <h4 className="font-medium">Sender Name</h4>
                                      <p className="text-sm text-muted-foreground">Email Subject</p>
                                    </div>
                                    <span className="text-sm text-muted-foreground">2:30 PM</span>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
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
                            <Button variant="ghost" className="w-full justify-start">
                              <Settings2 className="h-4 w-4 mr-2" />
                              Agent Settings
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                              <Clock className="h-4 w-4 mr-2" />
                              Conversation History
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                              <Library className="h-4 w-4 mr-2" />
                              Context Library
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
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
                          <div className="h-[calc(100vh-20rem)] overflow-y-auto ">
                            <ScrollArea className="h-full p-4">
                              <div className="space-y-4">
                                <div>
                                  <h3 className="text-lg font-medium mb-2">Context Management</h3>
                                  <Textarea 
                                    placeholder="Add context for the agent..."
                                    className="min-h-[100px]"
                                  />
                                </div>

                                <div>
                                  <h3 className="text-lg font-medium mb-2">Prompt Configuration</h3>
                                  <Textarea 
                                    placeholder="Customize agent prompts..."
                                    className="min-h-[100px]"
                                  />
                                </div>

                                <div>
                                  <h3 className="text-lg font-medium mb-2">Conversation Summary</h3>
                                  <Card className="bg-muted">
                                    <CardContent className="p-4">
                                      <div className="space-y-2">
                                        <div className="flex justify-between">
                                          <span className="text-sm font-medium">Total Interactions</span>
                                          <span>127</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-sm font-medium">Average Response Time</span>
                                          <span>2.3s</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-sm font-medium">Common Topics</span>
                                          <span>Code Review, Debugging, Architecture</span>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>

                                <Button className="w-full">
                                  Save Configuration
                                </Button>
                              </div>
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
                            <Button variant="ghost" className="w-full justify-start">
                              <MessagesSquare className="h-4 w-4 mr-2" />
                              All Feedback
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                              <Star className="h-4 w-4 mr-2" />
                              Featured
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                              <Clock className="h-4 w-4 mr-2" />
                              Recent
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                              <Library className="h-4 w-4 mr-2" />
                              By Product
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                              <Settings2 className="h-4 w-4 mr-2" />
                              Settings
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Main Content */}
                    <div className="col-span-9">
                      <Card>
                        <CardContent className="p-4">
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
                              {/* New Feedback Form */}
                              <Card className="border-2 border-primary p-4">
                                <h3 className="font-medium mb-2">Share Your Feedback</h3>
                                <div className="space-y-4">
                                  <div>
                                    <label className="text-sm font-medium">Select Product/Feature</label>
                                    <Select>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Choose product/feature" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="mentorship">Mentorship Program</SelectItem>
                                        <SelectItem value="courses">Online Courses</SelectItem>
                                        <SelectItem value="community">Community Platform</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <Textarea 
                                    placeholder="Share your thoughts, suggestions, or experiences..."
                                    className="min-h-[100px]"
                                  />
                                  <Button className="w-full">Submit Feedback</Button>
                                </div>
                              </Card>

                              {/* Feedback List */}
                              <div className="space-y-4">
                                <Card className="p-4">
                                  <div className="flex justify-between items-start mb-2">
                                    <div>
                                      <h4 className="font-medium">Mentorship Program Feedback</h4>
                                      <p className="text-sm text-muted-foreground">John Doe • 2 days ago</p>
                                    </div>
                                    <Badge>Feature Request</Badge>
                                  </div>
                                  <p className="text-sm mb-4">The mentorship program has been incredibly helpful. Would love to see more interactive coding sessions!</p>
                                  <div className="flex gap-2">
                                    <Button variant="outline" size="sm">👍 15</Button>
                                    <Button variant="outline" size="sm">💬 3</Button>
                                  </div>
                                </Card>

                                <Card className="p-4">
                                  <div className="flex justify-between items-start mb-2">
                                    <div>
                                      <h4 className="font-medium">Community Platform Update</h4>
                                      <p className="text-sm text-muted-foreground">Jane Smith • 1 week ago</p>
                                    </div>
                                    <Badge variant="outline">Improvement</Badge>
                                  </div>
                                  <p className="text-sm mb-4">The new community features are great! The discussion forums are much more organized now.</p>
                                  <div className="flex gap-2">
                                    <Button variant="outline" size="sm">👍 8</Button>
                                    <Button variant="outline" size="sm">💬 5</Button>
                                  </div>
                                </Card>
                              </div>
                            </div>
                          </ScrollArea>
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

export default SystemView;