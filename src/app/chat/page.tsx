

'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, PlusCircle, BarChart2, Mic, Settings, Search, ArrowDown, Pin } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: string;
  type: 'text' | 'poll' | 'voice';
  timestamp: number;
  pollOptions?: string[];
  pollVotes?: Record<string, number>;
  audioUrl?: string;
  isPinned?: boolean;
  isNew?: boolean;
}

interface User {
  id: string;
  name: string;
  role: 'admin' | 'user';
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showPollModal, setShowPollModal] = useState(false);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [isRecording, setIsRecording] = useState(false);
  const [currentUser] = useState<User>({ id: '1', name: 'Test User', role: 'admin' });
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [pinnedMessages, setPinnedMessages] = useState<Message[]>([]);
  const [lastSeenTimestamp, setLastSeenTimestamp] = useState(Date.now());
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const isNearBottom = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      return scrollHeight - scrollTop - clientHeight < 100;
    }
    return false;
  };

  useEffect(() => {
    if (isNearBottom()) {
      scrollToBottom();
    }
  }, [messages]);

  // Mark messages as seen when user scrolls past them
  useEffect(() => {
    const handleScroll = () => {
      if (chatContainerRef.current) {
        const { scrollTop, clientHeight } = chatContainerRef.current;
        const visibleMessages = messages.filter((msg) => {
          const messageEl = document.getElementById(`message-${msg.id}`);
          if (messageEl) {
            const rect = messageEl.getBoundingClientRect();
            return rect.top >= scrollTop && rect.bottom <= scrollTop + clientHeight;
          }
          return false;
        });
        
        if (visibleMessages.length > 0) {
          const latestTimestamp = Math.max(...visibleMessages.map(m => m.timestamp));
          setLastSeenTimestamp(latestTimestamp);
        }
      }
    };

    chatContainerRef.current?.addEventListener('scroll', handleScroll);
    return () => chatContainerRef.current?.removeEventListener('scroll', handleScroll);
  }, [messages]);

  const filteredMessages = messages.filter(message =>
    message.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: currentUser.name,
      type: 'text',
      timestamp: Date.now(),
      isPinned: false,
      isNew: true
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
  };

  const togglePinMessage = (messageId: string) => {
    setMessages(messages.map(msg => {
      if (msg.id === messageId) {
        const updatedMessage = { ...msg, isPinned: !msg.isPinned };
        if (updatedMessage.isPinned) {
          setPinnedMessages([...pinnedMessages, updatedMessage]);
        } else {
          setPinnedMessages(pinnedMessages.filter(m => m.id !== messageId));
        }
        return updatedMessage;
      }
      return msg;
    }));
  };

  const handleCreatePoll = () => {
    if (!pollQuestion.trim() || pollOptions.some(opt => !opt.trim())) return;
    
    const message: Message = {
      id: Date.now().toString(),
      text: pollQuestion,
      sender: currentUser.name,
      type: 'poll',
      timestamp: Date.now(),
      pollOptions: pollOptions.filter(opt => opt.trim()),
      pollVotes: {},
      isPinned: false,
      isNew: true
    };
    
    setMessages([...messages, message]);
    setShowPollModal(false);
    setPollQuestion('');
    setPollOptions(['', '']);
  };

  const handleVote = (messageId: string, optionIndex: number) => {
    setMessages(messages.map(msg => {
      if (msg.id === messageId && msg.type === 'poll') {
        const votes = msg.pollVotes || {};
        votes[currentUser.id] = optionIndex;
        return { ...msg, pollVotes: votes };
      }
      return msg;
    }));
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];
      
      mediaRecorder.current.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
        const audioUrl = URL.createObjectURL(blob);
        
        const message: Message = {
          id: Date.now().toString(),
          text: 'Voice message',
          sender: currentUser.name,
          type: 'voice',
          timestamp: Date.now(),
          audioUrl,
          isPinned: false,
          isNew: true
        };
        
        setMessages([...messages, message]);
      };
      
      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-screen">
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-bold">Chat Room</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Search className="h-5 w-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>

      {showSearch && (
        <div className="p-2 border-b">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search messages..."
            className="w-full p-2 border rounded"
          />
        </div>
      )}

      {pinnedMessages.length > 0 && (
        <div className="sticky top-0 z-50 flex-shrink-0 p-4 border-b bg-blue-50">
          <h2 className="text-lg font-bold mb-2">Pinned Messages</h2>
          <div className="space-y-2">
            {pinnedMessages.map(message => (
              <div 
                key={`pinned-${message.id}`} 
                className="p-3 bg-white rounded-lg shadow-md border-l-4 border-blue-500"
              >
                <div className="font-medium text-blue-700">{message.sender}</div>
                <div className="font-bold">{message.text}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {filteredMessages.map((message) => (
          <div 
            id={`message-${message.id}`}
            key={message.id} 
            className={`flex flex-col group ${
              message.timestamp > lastSeenTimestamp ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold">{message.sender}</span>
              <span className="text-xs text-gray-500">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
              {message.timestamp > lastSeenTimestamp && (
                <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
                  New
                </span>
              )}
              <button
                onClick={() => togglePinMessage(message.id)}
                className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                  message.isPinned ? 'text-blue-500' : 'text-gray-400'
                }`}
              >
                <Pin className="h-4 w-4" />
              </button>
            </div>
            
            {message.type === 'text' && (
              <div className="bg-white p-3 rounded-lg shadow">{message.text}</div>
            )}
            
            {message.type === 'poll' && (
              <div className="bg-white p-3 rounded-lg shadow">
                <div className="font-medium mb-2">{message.text}</div>
                <div className="space-y-2">
                  {message.pollOptions?.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleVote(message.id, index)}
                      className="w-full text-left p-2 hover:bg-gray-100 rounded transition"
                    >
                      {option}
                      {message.pollVotes && (
                        <span className="float-right">
                          {Object.values(message.pollVotes).filter(v => v === index).length} votes
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {message.type === 'voice' && message.audioUrl && (
              <div className="bg-white p-3 rounded-lg shadow">
                <audio controls src={message.audioUrl} className="w-full" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <button
        onClick={scrollToBottom}
        className="fixed bottom-24 right-8 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
      >
        <ArrowDown className="h-5 w-5" />
      </button>

      {currentUser.role === 'admin' && (
        <div className="flex gap-2 p-2 border-t">
          <button
            onClick={() => setShowPollModal(true)}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <BarChart2 className="h-5 w-5" />
          </button>
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`p-2 hover:bg-gray-100 rounded ${isRecording ? 'text-red-500' : ''}`}
          >
            <Mic className="h-5 w-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded">
            <PlusCircle className="h-5 w-5" />
          </button>
        </div>
      )}

      <div className="p-4 border-t">
        <div className="flex gap-2 max-w-6xl mx-auto">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg"
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>

      {showPollModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-4 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Create Poll</h3>
            <input
              type="text"
              value={pollQuestion}
              onChange={(e) => setPollQuestion(e.target.value)}
              placeholder="Poll question"
              className="w-full p-2 border rounded mb-4"
            />
            {pollOptions.map((option, index) => (
              <input
                key={index}
                type="text"
                value={option}
                onChange={(e) => {
                  const newOptions = [...pollOptions];
                  newOptions[index] = e.target.value;
                  setPollOptions(newOptions);
                }}
                placeholder={`Option ${index + 1}`}
                className="w-full p-2 border rounded mb-2"
              />
            ))}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setPollOptions([...pollOptions, ''])}
                className="text-indigo-600 hover:text-indigo-700"
              >
                Add Option
              </button>
              <div>
                <button
                  onClick={() => setShowPollModal(false)}
                  className="mr-2 px-4 py-2 text-gray-600 hover:text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePoll}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Create Poll
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
// End of Selection





