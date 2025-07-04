import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Database, Server, Computer, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
    <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl overflow-hidden">
      <CardHeader className="bg-slate-800 text-white px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-medium">AI Assistant</h2>
            <p className="text-slate-300 text-sm font-light">Ask me about system compatibility</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto mb-6 space-y-4 pr-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-6 py-4 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-slate-800 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-800 shadow-md'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    message.type === 'user' ? 'bg-white/20' : 'bg-slate-800/10'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-3 h-3" />
                    ) : (
                      <Bot className="w-3 h-3" />
                    )}
                  </div>
                  {message.category && (
                    <Badge variant="secondary" className="text-xs bg-white/20 text-current border-0 font-medium">
                      {getCategoryIcon(message.category)}
                      <span className="ml-1">{getCategoryLabel(message.category)}</span>
                    </Badge>
                  )}
                </div>
                <p className="text-sm leading-relaxed font-medium">{message.content}</p>
                <p className={`text-xs mt-2 ${message.type === 'user' ? 'text-white/60' : 'text-slate-500'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-100 text-slate-800 shadow-md max-w-xs lg:max-w-md px-6 py-4 rounded-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center bg-slate-800/10">
                    <Bot className="w-3 h-3" />
                  </div>
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex gap-3 mb-6">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about OS, database, or web server compatibility..."
            className="flex-1 h-12 bg-slate-50 border-slate-200 rounded-xl placeholder-slate-500 text-slate-800 font-medium focus:border-slate-800 focus:ring-slate-800"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="h-12 px-6 bg-slate-800 hover:bg-slate-700 text-white border-0 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInputValue("What operating systems are compatible with Docker?")}
            className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 rounded-xl font-medium h-10"
          >
            <Computer className="w-4 h-4 mr-2" />
            OS Compatibility
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInputValue("Which databases work best with Node.js applications?")}
            className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100 rounded-xl font-medium h-10"
          >
            <Database className="w-4 h-4 mr-2" />
            Database Options
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInputValue("Apache vs Nginx compatibility comparison")}
            className="bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100 rounded-xl font-medium h-10"
          >
            <Server className="w-4 h-4 mr-2" />
            Web Servers
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
