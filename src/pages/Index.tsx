
import ChatInterface from "@/components/ChatInterface";
import SystemConfiguration from "@/components/SystemConfiguration";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            System Compatibility Assistant
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get expert answers about operating systems, databases, and web servers compatibility
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          <div className="lg:col-span-1">
            <SystemConfiguration />
          </div>
          <div className="lg:col-span-3">
            <ChatInterface />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
