
"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Mail, Inbox, Send, Star, Archive, Trash, Flag, Badge, FileText, LayoutDashboard, Search, Settings, User, Home, Wrench, Forward, Reply, X, Clock } from 'lucide-react'
import { Card } from '../ui/card'
import { EmailDialog } from './email-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

interface Email {
  id: string
  subject: string
  sender: string
  preview: string
  date: string
  isStarred: boolean
  isArchived: boolean
  isFlagged: boolean
  isDeleted: boolean
  folder: 'inbox' | 'sent' | 'archived' | 'deleted'
}

const dummyEmails: Email[] = [
  {
    id: "1",
    subject: "Welcome to our platform",
    sender: "support@example.com", 
    preview: "Thank you for joining our platform! We're excited to have you...",
    date: "2024-02-15",
    isStarred: false,
    isArchived: false,
    isFlagged: true,
    isDeleted: false,
    folder: 'inbox'
  },
  {
    id: "2",
    subject: "Meeting Follow-up",
    sender: "manager@company.com",
    preview: "Here are the action items from today's meeting...",
    date: "2024-02-14", 
    isStarred: true,
    isArchived: false,
    isFlagged: false,
    isDeleted: false,
    folder: 'inbox'
  }
]


interface Rating {
  id: string;
  feature: string;
  score: number;
  feedback: string;
  date: string;
  category: string;
}

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  isInstalled: boolean;
}

interface AgentMessage {
  id: string;
  content: string;
  timestamp: string;
  type: 'user' | 'agent';
  context?: string;
}

const dummyRatings: Rating[] = [
  {
    id: "1",
    feature: "Code Editor",
    score: 4.8,
    feedback: "Excellent syntax highlighting and intelligent code completion. The integrated debugging tools are invaluable for development workflow.",
    date: "2024-02-10",
    category: "Development Tools",
    userId: "user123",
    usageMetrics: {
      hoursUsed: 120,
      bugsIdentified: 23,
      codeQualityScore: 92
    },
    improvements: [
      "Add real-time collaboration features",
      "Enhance Git integration",
      "Improve startup performance"
    ]
  },
  {
    id: "2", 
    feature: "Project Management",
    score: 4.2,
    feedback: "Strong task tracking capabilities with intuitive Kanban boards. Team collaboration features could be enhanced with better file sharing.",
    date: "2024-02-12",
    category: "Collaboration",
    userId: "user123",
    usageMetrics: {
      projectsManaged: 8,
      tasksCompleted: 156,
      teamMembers: 12
    },
    improvements: [
      "Add resource allocation features",
      "Enhance reporting capabilities",
      "Improve mobile experience"
    ]
  },
  {
    id: "3",
    feature: "Learning Platform",
    score: 4.6,
    feedback: "Comprehensive curriculum with excellent practical exercises. The AI-powered learning path suggestions are particularly helpful.",
    date: "2024-02-14",
    category: "Education",
    userId: "user123",
    usageMetrics: {
      coursesCompleted: 15,
      hoursLearned: 180,
      skillsAcquired: 8
    },
    improvements: [
      "Add peer review system",
      "Introduce more interactive exercises",
      "Expand advanced topics"
    ]
  }
];

const dummyTools: Tool[] = [
  {
    id: "1",
    name: "Code Analyzer Pro",
    description: "Advanced AI-powered code review and optimization tool with real-time suggestions and security vulnerability scanning",
    category: "Development",
    icon: "🔍",
    isInstalled: true,
    version: "2.1.0",
    lastUsed: "2024-02-15T14:30:00",
    metrics: {
      issuesFound: 127,
      optimizationsSuggested: 45,
      timesSaved: "12h 30m"
    },
    features: [
      "Automated code review",
      "Performance optimization",
      "Security scanning",
      "Best practices enforcement"
    ],
    compatibility: ["VS Code", "IntelliJ", "Sublime Text"]
  },
  {
    id: "2",
    name: "DevTime Tracker",
    description: "Comprehensive time tracking solution with project analytics and team productivity insights",
    category: "Productivity",
    icon: "⏱️",
    isInstalled: false,
    version: "1.8.5",
    metrics: {
      projectsTracked: 15,
      totalTimeLogged: "320h",
      productivityScore: 88
    },
    features: [
      "Automatic time tracking",
      "Project analytics",
      "Team dashboards",
      "Integration with popular tools"
    ],
    integrations: ["Jira", "GitHub", "Slack"]
  },
  {
    id: "3",
    name: "TeamSync Hub",
    description: "Collaborative workspace with real-time communication and document sharing capabilities",
    category: "Collaboration",
    icon: "🤝",
    isInstalled: true,
    version: "3.0.1",
    lastUsed: "2024-02-15T16:45:00",
    metrics: {
      activeUsers: 25,
      documentsShared: 234,
      meetingsHosted: 45
    },
    features: [
      "Real-time collaboration",
      "Document management",
      "Video conferencing",
      "Task tracking"
    ],
    integrations: ["Google Workspace", "Microsoft 365", "Dropbox"]
  }
];

const dummyAgentMessages: AgentMessage[] = [
  {
    id: "1",
    content: "How can I improve my React component performance?",
    timestamp: "2024-02-15T10:30:00",
    type: "user",
    context: "Performance Optimization",
    metadata: {
      projectContext: "E-commerce Dashboard",
      codeSnippet: "const Header = (props) => { ... }",
      priority: "high"
    }
  },
  {
    id: "2",
    content: "I recommend implementing React.memo() for components that re-render frequently with the same props. Would you like to see an example?",
    timestamp: "2024-02-15T10:30:30",
    type: "agent",
    context: "Performance Optimization",
    metadata: {
      confidence: 0.95,
      sources: ["React docs", "Performance best practices"],
      relatedTopics: ["useMemo", "useCallback"]
    }
  },
  {
    id: "3",
    content: "Yes, please show me an example implementation.",
    timestamp: "2024-02-15T10:31:00",
    type: "user",
    context: "Performance Optimization",
    metadata: {
      followUp: true,
      skillLevel: "intermediate",
      learningPath: "React Advanced"
    }
  },
  {
    id: "4",
    content: "Here's an example of React.memo():\n\nconst MemoizedHeader = React.memo(function Header(props) {\n  return <header>{props.title}</header>;\n});\n\nThis will prevent unnecessary re-renders when the props haven't changed.",
    timestamp: "2024-02-15T10:31:30",
    type: "agent",
    context: "Performance Optimization",
    metadata: {
      codeExample: true,
      implementationDifficulty: "medium",
      estimatedTimeToImplement: "10 minutes"
    }
  }
];

export default function EmailInbox() {
  const [emails, setEmails] = useState<Email[]>(dummyEmails)
  const [selectedView, setSelectedView] = useState<string>('mail')
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [ratings, setRatings] = useState<Rating[]>(dummyRatings)
  const [tools, setTools] = useState<Tool[]>(dummyTools)
  const [agentMessages, setAgentMessages] = useState<AgentMessage[]>(dummyAgentMessages)

  const filterEmails = () => {
    switch(selectedView) {
      case 'inbox':
        return emails.filter(e => !e.isArchived && !e.isDeleted && e.folder === 'inbox')
      case 'mail':
        return emails
      case 'rating':
        return ratings
      case 'tools':
        return tools
      case 'heji-shindo':
        return agentMessages
      default:
        return [emails]
    }
  }

  const views = [
    { id: 'mail', label: 'Mail', icon: Mail, folder: 'mail' },
    { id: 'rating', label: 'Rating', icon: Star, folder: 'rating' },
    { id: 'tools', label: 'Tools', icon: Wrench, folder: 'tools' },
    { id: 'heji-shindo', label: 'Heji Shindo', icon: User, folder: 'heji-shindo' }
  ]

  return (
    <div className="fixed h-[calc(100vh-3.5rem)] w-[calc(100vw-16rem)] left-64 top-14 p-4 overflow-hidden">
      <Card className="h-full w-full">
        <div className="flex h-full" onClick={(e) => {
          // Close selected view when clicking outside
          if (e.target === e.currentTarget) {
            setSelectedEmail(null);
          }
        }}>
          {/* Email Sidebar */}
          <Card className="w-60 bg-background shadow-none border-0">
            <div className="p-4 space-y-2 justify">
              <h2 className="text-sm font-semibold text-muted-foreground mb-2">Main Tools</h2>
              <div className="justify-start ml-5 mr-5">
                <EmailDialog />
              </div>
              {views.map((view) => (
                <div className="ml-5 mr-5">
                  <Button
                    key={view.id}
                    variant={selectedView === view.id ? "secondary" : "ghost"}
                    className="w-full flex items-center justify-start"
                    onClick={() => {
                      setSelectedView(view.id);
                      setSelectedEmail(null); // Reset selected email when changing views
                    }}
                  >
                    <view.icon className="h-4 w-4" />
                    <span className="ml-2">{view.label}</span>
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Email Content */}
          <Card className="flex-1 flex flex-col bg-background shadow-none border-0">
            <Card className="p-4 shadow-none">
              <div className="flex justify-center items-center">
                <h2 className="text-lg font-semibold">
                  {views.find(v => v.id === selectedView)?.label}
                </h2>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedEmail(null)}>
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedEmail(null)}>
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
            
            <ScrollArea className="flex-1">
              <div className="space-y-4 p-4">
                {filterEmails().map((item: any) => (
                  <Card
                    key={item.id}
                    className={`p-4 hover:bg-muted/50 cursor-pointer transition-colors ${selectedEmail?.id === item.id ? 'ring-2 ring-primary' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEmail(selectedEmail?.id === item.id ? null : item);
                    }}
                  >
                    {selectedView === 'mail' && (
                      <div className="flex flex-col space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Avatar>
                              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.sender}`} />
                              <AvatarFallback>{item.sender[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <span className="font-medium">{item.sender}</span>
                              <span className="text-sm text-muted-foreground ml-2">{item.date}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" onClick={(e) => {
                              e.stopPropagation();
                              // Toggle star status
                            }}>
                              <Star className={`h-4 w-4 ${item.isStarred ? 'text-yellow-500 fill-yellow-500' : ''}`} />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={(e) => {
                              e.stopPropagation();
                              // Toggle flag status
                            }}>
                              <Flag className={`h-4 w-4 ${item.isFlagged ? 'text-red-500 fill-red-500' : ''}`} />
                            </Button>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-base font-semibold">{item.subject}</h4>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {item.preview}
                          </p>
                        </div>
                      </div>
                    )}
                    {selectedView === 'rating' && (
                      <div className="space-y-2">
                        <h3 className="font-medium">{item.feature}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Score: {item.score}/5</span>
                          <span className="text-sm text-muted-foreground">{item.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.feedback}</p>
                      </div>
                    )}
                    {selectedView === 'tools' && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{item.icon}</span>
                          <h3 className="font-medium">{item.name}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                        <div className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs inline-block">
                          {item.category}
                        </div>
                      </div>
                    )}
                    {selectedView === 'heji-shindo' && (
                      <div className={`space-y-2 ${item.type === 'agent' ? 'pl-4' : ''}`}>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{item.type === 'user' ? 'You' : 'Heji'}</span>
                          <span className="text-sm text-muted-foreground">
                            {new Date(item.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-sm">{item.content}</p>
                        {item.context && (
                          <div className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs inline-block">
                            {item.context}
                          </div>
                        )}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </Card>

          {/* Selected Email View */}
          {selectedEmail && (
            <Card className="w-1/2 bg-background shadow-none border-0">
              {selectedView === 'mail' && (
                <>
                  <Card className="p-4 shadow-none">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold">{selectedEmail.subject}</h3>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Reply className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Forward className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Archive className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedEmail(null)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      From: {selectedEmail.sender}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Date: {selectedEmail.date}
                    </div>
                  </Card>
                  <Card className="p-4 shadow-none">
                    <p className="text-sm">{selectedEmail.preview}</p>
                    <div className="mt-4">
                      <Textarea placeholder="Write your reply..." className="mb-2" />
                      <Button>Send Reply</Button>
                    </div>
                  </Card>
                </>
              )}

              {selectedView === 'tools' && (
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{selectedEmail.icon}</span>
                      <h3 className="text-xl font-semibold">{selectedEmail.name}</h3>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedEmail(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm mb-4">{selectedEmail.description}</p>
                  <div className="grid gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Features</h4>
                      <ul className="list-disc list-inside text-sm">
                        {selectedEmail.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Usage Metrics</h4>
                      <pre className="bg-muted p-2 rounded text-sm">
                        {JSON.stringify(selectedEmail.metrics, null, 2)}
                      </pre>
                    </div>
                    <Button className="w-full">
                      {selectedEmail.isInstalled ? 'Launch Tool' : 'Install Tool'}
                    </Button>
                  </div>
                </Card>
              )}

              {selectedView === 'heji-shindo' && (
                <Card className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Thread Details</h3>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedEmail(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-muted p-3 rounded">
                      <p className="text-sm">{selectedEmail.content}</p>
                      {selectedEmail.context && (
                        <div className="mt-2 px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs inline-block">
                          {selectedEmail.context}
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Start New Thread</h4>
                      <Textarea placeholder="Add to the conversation..." className="mb-2" />
                      <div className="flex justify-between">
                        <Input placeholder="Context tag" className="w-1/3" />
                        <Button>Send</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {selectedView === 'rating' && (
                <Card className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">{selectedEmail.feature}</h3>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedEmail(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg font-medium">{selectedEmail.score}/5</span>
                        <div className="flex">
                          {[1,2,3,4,5].map(star => (
                            <Star key={star} className={`h-4 w-4 ${star <= selectedEmail.score ? 'fill-primary' : ''}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{selectedEmail.feedback}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Community Rating Distribution</h4>
                      <div className="space-y-1">
                        {[5,4,3,2,1].map(rating => (
                          <div key={rating} className="flex items-center gap-2">
                            <span className="text-sm w-8">{rating}★</span>
                            <div className="h-4 bg-muted rounded-full flex-1">
                              <div className="h-full bg-primary rounded-full" style={{width: `${Math.random() * 100}%`}} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button className="w-full">Update Your Rating</Button>
                  </div>
                </Card>
              )}
            </Card>
          )}
        </div>
      </Card>
    </div>
  )
}
