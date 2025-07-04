
import ChatInterface from "@/components/ChatInterface";
import SystemConfiguration from "@/components/SystemConfiguration";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-light text-slate-800 mb-6 tracking-tight">
            System Compatibility Assistant
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Get expert guidance on operating systems, databases, and web server compatibility
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
          <div className="lg:col-span-2">
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
