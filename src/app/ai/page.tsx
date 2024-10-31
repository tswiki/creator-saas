
"use client";

import { useState } from "react";

export default function AIPage() {
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message to chat
    const newMessages = [...messages, { role: "user", content: inputMessage }];
    setMessages(newMessages);
    setInputMessage("");
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call to AI service
      const response = await new Promise(resolve => 
        setTimeout(() => resolve({ 
          role: "assistant", 
          content: "This is a placeholder response. Integrate your AI service here." 
        }), 1000)
      );
      
      setMessages([...newMessages, response as {role: string, content: string}]);
    } catch (error) {
      console.error("Error getting AI response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl h-[80vh] flex flex-col">
        <h1 className="text-2xl font-bold mb-6">AI Assistant</h1>
        
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                message.role === "user"
                  ? "bg-indigo-100 ml-auto max-w-[80%]"
                  : "bg-gray-100 mr-auto max-w-[80%]"
              }`}
            >
              {message.content}
            </div>
          ))}
          {isLoading && (
            <div className="bg-gray-100 p-4 rounded-lg mr-auto max-w-[80%]">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-indigo-600 text-white px-6 py-4 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
