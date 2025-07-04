
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Database, Server, Computer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  content: string;
  type: 'user' | 'bot';
  category?: 'os' | 'database' | 'server';
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your system compatibility assistant. Ask me anything about operating systems, databases, and web servers compatibility!",
      type: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const detectCategory = (message: string): 'os' | 'database' | 'server' | undefined => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('database') || lowerMessage.includes('mysql') || lowerMessage.includes('postgresql') || lowerMessage.includes('mongodb')) {
      return 'database';
    }
    if (lowerMessage.includes('server') || lowerMessage.includes('apache') || lowerMessage.includes('nginx') || lowerMessage.includes('web server')) {
      return 'server';
    }
    if (lowerMessage.includes('operating system') || lowerMessage.includes('windows') || lowerMessage.includes('linux') || lowerMessage.includes('macos') || lowerMessage.includes('ubuntu')) {
      return 'os';
    }
    return undefined;
  };

  const generateBotResponse = (userMessage: string, category?: 'os' | 'database' | 'server'): string => {
    const responses = {
      os: [
        "For operating system compatibility, I'd recommend checking the specific system requirements. Most modern applications support Windows 10+, macOS 10.14+, and major Linux distributions.",
        "Operating system compatibility depends on your specific use case. What particular OS combination are you working with?",
        "Cross-platform compatibility is crucial. Consider using containerization with Docker for consistent environments across different operating systems."
      ],
      database: [
        "Database compatibility often depends on the specific versions and drivers. What database systems are you looking to integrate?",
        "For database compatibility, ensure your application supports the database connector and version. Popular databases like PostgreSQL, MySQL, and MongoDB have excellent cross-platform support.",
        "Database migration and compatibility can be complex. Consider using ORM frameworks that abstract database differences."
      ],
      server: [
        "Web server compatibility varies by technology stack. Apache and Nginx are widely compatible across platforms. What's your server setup?",
        "For web server compatibility, consider your application's requirements, SSL support, and performance needs. Both Apache and Nginx offer excellent compatibility.",
        "Server compatibility includes considering load balancing, caching, and security features. What specific server features do you need?"
      ]
    };

    if (category && responses[category]) {
      return responses[category][Math.floor(Math.random() * responses[category].length)];
    }

    return "I'd be happy to help with your compatibility question! Could you provide more specific details about the operating system, database, or web server you're working with?";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      type: 'user',
      category: detectCategory(inputValue),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(inputValue, userMessage.category),
        type: 'bot',
        category: userMessage.category,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getCategoryIcon = (category?: 'os' | 'database' | 'server') => {
    switch (category) {
      case 'os':
        return <Computer className="w-3 h-3" />;
      case 'database':
        return <Database className="w-3 h-3" />;
      case 'server':
        return <Server className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getCategoryLabel = (category?: 'os' | 'database' | 'server') => {
    switch (category) {
      case 'os':
        return 'Operating System';
      case 'database':
        return 'Database';
      case 'server':
        return 'Web Server';
      default:
        return null;
    }
  };

  return (
    <Card className="bg-white border-gray-200 shadow-sm">
      <CardContent className="p-6">
        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto mb-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900 border border-gray-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {message.type === 'user' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                  {message.category && (
                    <Badge variant="secondary" className="text-xs bg-gray-200 text-gray-700 border-gray-300">
                      {getCategoryIcon(message.category)}
                      <span className="ml-1">{getCategoryLabel(message.category)}</span>
                    </Badge>
                  )}
                </div>
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 border border-gray-200 max-w-xs lg:max-w-md px-4 py-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about OS, database, or web server compatibility..."
            className="flex-1 bg-white border-gray-300 placeholder-gray-500 text-gray-900 focus:border-blue-500"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white border-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInputValue("What operating systems are compatible with Docker?")}
            className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 text-xs"
          >
            <Computer className="w-3 h-3 mr-1" />
            OS Compatibility
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInputValue("Which databases work best with Node.js applications?")}
            className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 text-xs"
          >
            <Database className="w-3 h-3 mr-1" />
            Database Options
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInputValue("Apache vs Nginx compatibility comparison")}
            className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 text-xs"
          >
            <Server className="w-3 h-3 mr-1" />
            Web Servers
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
