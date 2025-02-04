import React, { useCallback, useEffect, useMemo } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  NodeProps,
  Node,
  Edge,
  useNodeId,
  useReactFlow,
  Panel
} from '@xyflow/react';
import {
  NodeHeader,
  NodeHeaderTitle,
  NodeHeaderActions,
  NodeHeaderMenuAction,
  NodeHeaderIcon,
  NodeHeaderAction,
} from "@/components/reactflow/node-header";

import '@xyflow/react/dist/style.css';

import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { PlaceholderNode } from "@/components/reactflow/placeholder-node";
import { BaseNode } from '../reactflow/base-node';
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '../ui/dropdown-menu';
import { Mail, MessageSquare, Rocket, Trash } from "lucide-react";
import { useTheme } from 'next-themes';

interface Message {
  type: 'email' | 'sms';
  subject?: string;
  body: string;
  scheduledTime: number;
}

interface Campaign {
  id: string;
  name: string;
  description: string;
  numberOfNodes: number;
  createdAt: string;
  messages: {
    [key: string]: Message;
  }
}

interface NodeData {
  label: string;
  title: string;
  message: Message | null;
  nodeId?: string;
}

const NodeHeaderDeleteAction = () => {
  const id = useNodeId();
  const { setNodes } = useReactFlow();
 
  const handleClick = useCallback(() => {
    setNodes((prevNodes: Node[]) =>
      prevNodes.filter((node: Node) => {
        if (node.id === id) {
          window.setTimeout(() => {
            setNodes((prevNodes: Node[]) => [...prevNodes, node]);
          }, 2000);
          return false;
        }
        return true;
      }),
    );
  }, [setNodes, id]);
 
  return (
    <NodeHeaderAction onClick={handleClick} variant="ghost" label="Delete node">
      <Trash className="h-4 w-4" />
    </NodeHeaderAction>
  );
};

const CustomNode = ({ data }: NodeProps) => {
  const { theme } = useTheme();
  const nodeData = data as unknown as NodeData;
  const icon = nodeData.message?.type === 'email' ? '📧' : nodeData.message?.type === 'sms' ? '📱' : '🚀';
  
  return (
    <BaseNode className={cn(
      "px-3 py-2",
      theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-200 text-black'
    )}>
      <NodeHeader className={cn(
        "-mx-3 -mt-2 border-b",
        theme === 'dark' ? 'border-neutral-800' : 'border-neutral-200'
      )}>
        <NodeHeaderIcon>
          {nodeData.message?.type === 'email' ? (
            <Mail className="h-4 w-4" />
          ) : nodeData.message?.type === 'sms' ? (
            <MessageSquare className="h-4 w-4" />
          ) : (
            <Rocket className="h-4 w-4" />
          )}
        </NodeHeaderIcon>
        <NodeHeaderTitle>{nodeData.title}</NodeHeaderTitle>
        <NodeHeaderActions>
          <NodeHeaderMenuAction label="Node options">
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
          </NodeHeaderMenuAction>
          <NodeHeaderDeleteAction />
        </NodeHeaderActions>
      </NodeHeader>
      <div className="text-sm mt-2">{nodeData.label}</div>
      {nodeData.message && (
        <div className={cn(
          "text-xs mt-1",
          theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
        )}>
          Scheduled: {nodeData.message.scheduledTime}h
        </div>
      )}
    </BaseNode>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

interface NodeData {
  [key: string]: unknown;
  title: string;
  label: string;
  message: Message | null;
  nodeId?: string;
}

const generateNodesAndEdges = (campaign: Campaign): { nodes: Node<NodeData>[]; edges: Edge[] } => {
  const nodes: Node<NodeData>[] = [];
  const edges: Edge[] = [];
  
  // Add start node
  nodes.push({
    id: 'start',
    type: 'custom',
    position: { x: 400, y: 50 },
    data: { 
      title: 'Campaign Start',
      label: campaign.name,
      message: null
    }
  });

  // Add message nodes
  let y = 150;
  Object.entries(campaign.messages).forEach(([nodeId, message], index) => {
    const x = 400 + (index % 2 === 0 ? -150 : 150);
    
    nodes.push({
      id: nodeId,
      type: 'custom',
      position: { x, y },
      data: { 
        title: message.type === 'email' ? message.subject || 'Email Message' : 'SMS Message',
        label: message.body,
        message,
        nodeId
      },
      draggable: true,
      connectable: true,
    });

    if (message.scheduledTime === 0) {
      edges.push({
        id: `e-start-${nodeId}`,
        source: 'start',
        target: nodeId,
        animated: true
      });
    }

    Object.entries(campaign.messages).forEach(([prevId, prevMessage]) => {
      if (prevMessage.scheduledTime < message.scheduledTime) {
        edges.push({
          id: `e-${prevId}-${nodeId}`,
          source: prevId,
          target: nodeId,
          animated: true
        });
      }
    });

    if (index % 2 === 1) y += 100;
  });

  return { nodes, edges };
};

const NodeEditor = ({ 
  data, 
  onSave, 
  onClose,
  className 
}: { 
  data: {
    label: string;
    title: string;
    message: Message | null;
    nodeId?: string;
  };
  onSave: (updatedMessage: Message) => Promise<void>;
  onClose?: ()=> void;
  className?: string;
}) => {
  const { theme } = useTheme();
  const [message, setMessage] = useState<Message>(() => ({
    ...data.message!,
    lastUpdated: new Date().toISOString()
  }));
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof Message, string>>>({});

  useEffect(() => {
    if (data.message) {
      setMessage(data.message);
      setErrors({});
    }
  }, [data.message]);

  const validateMessage = () => {
    const newErrors: Partial<Record<keyof Message, string>> = {};
    
    if (!message.body?.trim()) {
      newErrors.body = 'Message body is required';
    }
    
    if (message.type === 'email' && !message.subject?.trim()) {
      newErrors.subject = 'Subject is required for emails';
    }
    
    if (message.scheduledTime < 0) {
      newErrors.scheduledTime = 'Time must be positive';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!data.nodeId || !validateMessage()) return;
    
    setIsSaving(true);
    try {
      const updatedMessage = {
        ...message,
        lastUpdated: new Date().toISOString()
      };
      await onSave(updatedMessage);
      if (onClose) onClose();
    } catch (error) {
      console.error('Failed to save message:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to save changes'
      }));
    } finally {
      setIsSaving(false);
    }
  };

  const updateMessage = <K extends keyof Message>(
    key: K, 
    value: Message[K]
  ) => {
    setMessage(prev => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: undefined }));
    }
  };

  return (
    <div className={cn(
      "space-y-4",
      className,
      theme === 'dark' ? 'text-white' : 'text-black'
    )}>
      <SheetHeader>
        <SheetTitle className={theme === 'dark' ? 'text-white' : 'text-black'}>Edit Message Node</SheetTitle>
      </SheetHeader>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Message Type</Label>
          <Select
            value={message.type}
            onValueChange={(value: 'email' | 'sms') => {
              updateMessage('type', value);
              if (value === 'sms') {
                updateMessage('subject', undefined);
              }
            }}
          >
            <SelectTrigger className={theme === 'dark' ? 'text-white bg-neutral-800' : 'text-black bg-white'}>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="sms">SMS</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {message.type === 'email' && (
          <div className="space-y-2">
            <Label>Subject</Label>
            <Input
              value={message.subject || ''}
              onChange={(e) => updateMessage('subject', e.target.value)}
              placeholder="Enter subject line"
              className={cn(
                errors.subject ? 'border-red-500' : '',
                theme === 'dark' ? 'text-white bg-neutral-800' : 'text-black bg-white'
              )}
            />
            {errors.subject && (
              <p className="text-sm text-red-500">{errors.subject}</p>
            )}
          </div>
        )}

        <div className="space-y-2">
          <Label>Message Content</Label>
          <Textarea
            value={message.body}
            onChange={(e) => updateMessage('body', e.target.value)}
            placeholder="Enter your message"
            className={cn(
              "min-h-[100px]",
              errors.body ? 'border-red-500' : '',
              theme === 'dark' ? 'text-white bg-neutral-800' : 'text-black bg-white'
            )}
          />
          {errors.body && (
            <p className="text-sm text-red-500">{errors.body}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Schedule Delay (hours)</Label>
          <Input
            type="number"
            value={message.scheduledTime}
            onChange={(e) => updateMessage('scheduledTime', parseInt(e.target.value) || 0)}
            min="0"
            className={cn(
              errors.scheduledTime ? 'border-red-500' : '',
              theme === 'dark' ? 'text-white bg-neutral-800' : 'text-black bg-white'
            )}
          />
          {errors.scheduledTime && (
            <p className="text-sm text-red-500">{errors.scheduledTime}</p>
          )}
        </div>

        <Button 
          className="w-full"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
};

export default function App() {
  const { theme } = useTheme();

  const [campaign, setCampaign] = useState<Campaign>({
    id: "camp_123",
    name: "Welcome Series",
    description: "Onboarding flow for new users",
    numberOfNodes: 3,
    createdAt: "2024-01-31T12:00:00Z",
    messages: {
      "node-1": {
        type: "email",
        subject: "Welcome!",
        body: "Thanks for joining",
        scheduledTime: 0
      },
      "node-2": {
        type: "sms",
        body: "Check your email",
        scheduledTime: 24
      },
      "node-3": {
        type: "email",
        subject: "Getting Started",
        body: "Here's what to do next",
        scheduledTime: 48
      }
    }
  });

  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => 
    generateNodesAndEdges(campaign), [campaign]);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    const { nodes: newNodes } = generateNodesAndEdges(campaign);
    setNodes(newNodes);
  }, [campaign, setNodes]);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const handleNodeClick = (event: React.MouseEvent, node: Node) => {
    if ((event.target as HTMLElement).closest('.react-flow__node')) {
      setSelectedNode(node.id);
    }
  };

  const handleMessageUpdate = async (nodeId: string, updatedMessage: Message) => {
    try {
      setCampaign(prev => ({
        ...prev,
        messages: {
          ...prev.messages,
          [nodeId]: updatedMessage
        }
      }));

      setNodes(nds => 
        nds.map(node => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                label: `${updatedMessage.type === 'email' ? '📧' : '📱'} ${updatedMessage.subject || updatedMessage.body}\n(${updatedMessage.scheduledTime}h)`,
                message: updatedMessage
              }
            };
          }
          return node;
        })
      );

      setSelectedNode(null);
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };
  return (
    <div 
      style={{ width: '100vw', height: '100vh', display: 'flex' }} 
      className={theme === 'dark' ? 'bg-neutral-900 text-white' : 'bg-white text-black'}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        fitView
        defaultViewport={{ x: 0, y: 0, zoom: 1.5 }}
        nodeTypes={{
          custom: CustomNode
        }}
        className={theme === 'dark' ? 'text-white' : 'text-black'}
      >
        <Panel position="top-left" className={`header ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
          <h1>Campaign Flow</h1>
        </Panel>
        <Controls className={theme === 'dark' ? 'text-white' : 'text-black'} />
        <MiniMap nodeStrokeWidth={3} className={theme === 'dark' ? 'text-white' : 'text-black'} />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
      
      <div className="pb-5">
        <Sheet 
          open={selectedNode !== null && selectedNode !== 'start'} 
          onOpenChange={(open) => !open && setSelectedNode(null)}
        >
          <SheetContent 
            side="right" 
            className={cn(
              "mt-[4vh] mb-[5vh] mx-2 rounded-lg scale-[0.8] border-2",
              theme === 'dark' ? 'text-white' : 'text-black'
            )}
          >
          {selectedNode && selectedNode !== 'start' && (
            <NodeEditor 
              data={nodes.find(n => n.id === selectedNode)?.data as NodeData || { 
                label: '',
                title: '',
                message: null,
                nodeId: selectedNode
              }}
              onSave={(message) => handleMessageUpdate(selectedNode, message)}
              onClose={() => setSelectedNode(null)}
            />
          )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}