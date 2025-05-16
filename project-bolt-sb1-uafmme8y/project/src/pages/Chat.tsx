import React, { useState, useRef, useEffect } from 'react';
import { Send, AlertCircle, Bot } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatProps {
  darkMode: boolean;
}

const Chat: React.FC<ChatProps> = ({ darkMode }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your EduMax AI assistant. How can I help with your studies today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(input);
      setMessages(prevMessages => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          text: aiResponse,
          sender: 'ai',
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  const generateAIResponse = (query: string): string => {
    // Mock AI response based on user query
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('hello') || lowerQuery.includes('hi')) {
      return "Hello! How can I help with your learning today?";
    } else if (lowerQuery.includes('math') || lowerQuery.includes('equation')) {
      return "I'd be happy to help with math! What specific concept or problem are you working on?";
    } else if (lowerQuery.includes('history') || lowerQuery.includes('historical')) {
      return "History is fascinating! I can provide information on historical events, figures, or time periods. What would you like to know?";
    } else if (lowerQuery.includes('science') || lowerQuery.includes('physics') || lowerQuery.includes('chemistry')) {
      return "Science questions are my specialty! I can explain concepts, formulas, or help with problems in physics, chemistry, biology, and more.";
    } else if (lowerQuery.includes('flashcard') || lowerQuery.includes('quiz') || lowerQuery.includes('test')) {
      return "I can help create study materials like flashcards, quizzes, or practice tests. What subject are you studying?";
    } else if (lowerQuery.includes('explain') || lowerQuery.includes('how') || lowerQuery.includes('what')) {
      return "I'll do my best to explain this topic clearly. Let me break it down: This concept involves understanding the fundamental principles and their applications. Would you like me to go into more detail on any specific aspect?";
    } else {
      return "That's an interesting question! I'm here to help with any subject you're studying. Could you provide a bit more context so I can give you the best possible answer?";
    }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-10rem)]">
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">AI Chat Assistant</h1>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Ask any question about your studies or academic topics
          </p>
        </div>

        <div className={`
          flex-1 overflow-y-auto rounded-lg p-4 mb-4
          ${darkMode ? 'bg-gray-800' : 'bg-white'}
          shadow-sm
        `}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`
                  flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}
                `}
              >
                <div className={`
                  max-w-[80%] rounded-2xl px-4 py-3 
                  ${message.sender === 'user' 
                    ? darkMode 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-indigo-500 text-white' 
                    : darkMode 
                      ? 'bg-gray-700 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }
                  ${message.sender === 'ai' ? 'rounded-tl-none' : 'rounded-tr-none'}
                `}>
                  {message.sender === 'ai' && (
                    <div className="flex items-center mb-1">
                      <Bot size={16} className="mr-1" />
                      <span className="text-xs font-medium">EduMax AI</span>
                      <span className="ml-2 text-xs opacity-70">{formatTime(message.timestamp)}</span>
                    </div>
                  )}
                  <p>{message.text}</p>
                  {message.sender === 'user' && (
                    <div className="flex justify-end mt-1">
                      <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className={`
                  rounded-2xl rounded-tl-none px-4 py-3 
                  ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}
                `}>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-current animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about your studies..."
            className={`
              w-full p-4 pr-12 rounded-lg 
              ${darkMode 
                ? 'bg-gray-800 text-white border-gray-700 focus:border-indigo-500' 
                : 'bg-white text-gray-800 border-gray-200 focus:border-indigo-500'
              }
              border focus:ring-2 focus:ring-indigo-200 focus:outline-none
              transition-colors duration-200
            `}
          />
          <button 
            type="submit" 
            className={`
              absolute right-3 top-1/2 transform -translate-y-1/2
              p-2 rounded-full
              ${darkMode 
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                : 'bg-indigo-500 hover:bg-indigo-600 text-white'
              }
              transition-colors duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
            disabled={!input.trim() || isTyping}
          >
            <Send size={18} />
          </button>
        </form>

        <div className="mt-3 text-center">
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <AlertCircle size={12} className="inline mr-1" />
            EduMax AI is designed to assist with learning but may not always provide complete or accurate information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;