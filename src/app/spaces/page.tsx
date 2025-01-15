'use client';

import { useChat } from 'ai/react';
import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2 } from 'lucide-react';

export default function Page() {
  const [messageHistory, setMessageHistory] = useState<any[]>([]);
  const { messages, input, handleSubmit, handleInputChange, isLoading } = useChat({
    api: '/api/chat',
    onResponse: (response) => {
      if (response.ok) {
        setMessageHistory(prevMessages => [
          ...prevMessages,
          { role: 'assistant', content: response.text() }
        ]);
        scrollToBottom();
      }
    },
    onFinish: () => {
      setTimeout(scrollToBottom, 100);
    }
  });

  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  // Scroll to bottom on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messageHistory]);

  return (

    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-3xl mx-auto p-4">
      
      
      
      <Card className="flex-1 p-4 mb-4 overflow-hidden">
        <ScrollArea 
          className="h-full pr-4" 
          ref={scrollAreaRef}
        >
          <div className="space-y-4">
            {messageHistory.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'assistant' ? 'justify-start' : 'justify-end'
                }`}
              >
                <div className={`flex gap-3 max-w-[80%] ${
                  message.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'
                }`}>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {message.role === 'assistant' ? 'AI' : 'You'}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className={`rounded-lg p-4 ${
                    message.role === 'assistant' 
                      ? 'bg-secondary' 
                      : 'bg-primary text-primary-foreground'
                  }`}>
                    <div className="whitespace-pre-wrap break-words">
                      {message.content}
                    </div>
                    
                    {message.experimental_attachments?.filter(attachment => 
                      attachment.contentType?.startsWith('image/')
                    ).map((attachment, index) => (
                      <img
                        key={`${message.id}-${index}`}
                        src={attachment.url}
                        alt={attachment.name}
                        className="mt-2 max-w-full rounded"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[80%]">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg p-4 bg-secondary">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </Card>

      <form
        onSubmit={async (event) => {
          event.preventDefault();
          if (!input.trim()) return;
          
          // Add user message to history
          setMessageHistory(prev => [...prev, {
            role: 'user',
            content: input,
            experimental_attachments: files
          }]);
          
          handleSubmit(event, {
            experimental_attachments: files,
          });
          
          setFiles(undefined);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }}
        className="flex gap-4"
      >
        <Input
          type="file"
          onChange={event => {
            if (event.target.files) {
              setFiles(event.target.files);
            }
          }}
          multiple
          ref={fileInputRef}
          className="hidden"
          id="file-upload"
        />
        <div className="flex-1 flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="shrink-0"
          >
            Attach
          </Button>
          <Input
            value={input}
            placeholder="Type your message..."
            onChange={handleInputChange}
            disabled={isLoading}
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Send'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}