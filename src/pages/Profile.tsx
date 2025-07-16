
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Computer, Database, Server, User, ChevronDown, Save, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SystemConfig {
  operatingSystem: string;
  database: string;
  webServers: string[];
  useInChat: {
    os: boolean;
    database: boolean;
    webServers: boolean;
  };
}

const Profile = () => {
  const [config, setConfig] = useState<SystemConfig>({
    operatingSystem: '',
    database: '',
    webServers: [],
    useInChat: {
      os: true,
      database: true,
      webServers: true
    }
  });

  const [openOS, setOpenOS] = useState(false);
  const [openDB, setOpenDB] = useState(false);

  const operatingSystems = [
    'Windows 10', 'Windows 11', 'Windows Server 2019', 'Windows Server 2022',
    'Ubuntu 20.04 LTS', 'Ubuntu 22.04 LTS', 'Red Hat Enterprise Linux 8',
    'Red Hat Enterprise Linux 9', 'CentOS 7', 'CentOS 8',
    'macOS Monterey', 'macOS Ventura', 'macOS Sonoma'
  ];

  const databases = [
    'MySQL 5.7', 'MySQL 8.0', 'PostgreSQL 13', 'PostgreSQL 14', 'PostgreSQL 15',
    'Oracle Database 19c', 'Oracle Database 21c', 'Microsoft SQL Server 2019',
    'Microsoft SQL Server 2022', 'MongoDB 5.0', 'MongoDB 6.0', 'Redis 6', 'Redis 7'
  ];

  const webServers = [
    'Apache HTTP Server 2.4', 'Nginx 1.20', 'Nginx 1.22', 'Microsoft IIS 10',
    'Tomcat 9', 'Tomcat 10', 'Node.js 16', 'Node.js 18', 'Node.js 20'
  ];

  const handleWebServerChange = (webServer: string, checked: boolean) => {
    setConfig(prev => ({
      ...prev,
      webServers: checked 
        ? [...prev.webServers, webServer]
        : prev.webServers.filter(ws => ws !== webServer)
    }));
  };

  const removeWebServer = (webServer: string) => {
    setConfig(prev => ({
      ...prev,
      webServers: prev.webServers.filter(ws => ws !== webServer)
    }));
  };

  const handleSave = () => {
    // Save configuration logic here
    console.log('Saving configuration:', config);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-gray-600">Configure your system preferences for personalized chat recommendations</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* System Configuration */}
          <Card className="shadow-lg border border-gray-200/50">
            <CardHeader className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
              <CardTitle className="text-lg font-semibold flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                  <Computer className="w-4 h-4" />
                </div>
                System Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Operating System */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Computer className="w-4 h-4 text-blue-600" />
                    Operating System
                  </Label>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="os-toggle" className="text-sm text-gray-600">Use in chat</Label>
                    <Switch
                      id="os-toggle"
                      checked={config.useInChat.os}
                      onCheckedChange={(checked) => setConfig(prev => ({
                        ...prev,
                        useInChat: { ...prev.useInChat, os: checked }
                      }))}
                    />
                  </div>
                </div>
                <Popover open={openOS} onOpenChange={setOpenOS}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openOS}
                      className="w-full justify-between"
                    >
                      {config.operatingSystem ? config.operatingSystem : "Select operating system"}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search operating systems..." />
                      <CommandList>
                        <CommandEmpty>No operating system found.</CommandEmpty>
                        <CommandGroup>
                          {operatingSystems.map((os) => (
                            <CommandItem
                              key={os}
                              value={os}
                              onSelect={(currentValue) => {
                                setConfig(prev => ({ ...prev, operatingSystem: currentValue === config.operatingSystem ? "" : currentValue }));
                                setOpenOS(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  config.operatingSystem === os ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {os}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Database */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Database className="w-4 h-4 text-green-600" />
                    Database
                  </Label>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="db-toggle" className="text-sm text-gray-600">Use in chat</Label>
                    <Switch
                      id="db-toggle"
                      checked={config.useInChat.database}
                      onCheckedChange={(checked) => setConfig(prev => ({
                        ...prev,
                        useInChat: { ...prev.useInChat, database: checked }
                      }))}
                    />
                  </div>
                </div>
                <Popover open={openDB} onOpenChange={setOpenDB}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openDB}
                      className="w-full justify-between"
                    >
                      {config.database ? config.database : "Select database"}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search databases..." />
                      <CommandList>
                        <CommandEmpty>No database found.</CommandEmpty>
                        <CommandGroup>
                          {databases.map((db) => (
                            <CommandItem
                              key={db}
                              value={db}
                              onSelect={(currentValue) => {
                                setConfig(prev => ({ ...prev, database: currentValue === config.database ? "" : currentValue }));
                                setOpenDB(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  config.database === db ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {db}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Web Servers */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Server className="w-4 h-4 text-orange-600" />
                    Web Servers
                  </Label>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="ws-toggle" className="text-sm text-gray-600">Use in chat</Label>
                    <Switch
                      id="ws-toggle"
                      checked={config.useInChat.webServers}
                      onCheckedChange={(checked) => setConfig(prev => ({
                        ...prev,
                        useInChat: { ...prev.useInChat, webServers: checked }
                      }))}
                    />
                  </div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      <span>
                        {config.webServers.length === 0 
                          ? "Select web servers" 
                          : `${config.webServers.length} selected`
                        }
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-80">
                    {webServers.map((webServer) => (
                      <DropdownMenuCheckboxItem
                        key={webServer}
                        checked={config.webServers.includes(webServer)}
                        onCheckedChange={(checked) => handleWebServerChange(webServer, checked)}
                      >
                        {webServer}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Selected Web Servers Chips */}
                {config.webServers.length > 0 && (
                  <div className="mt-3">
                    <div className="text-xs text-gray-500 mb-2">Selected servers:</div>
                    <div className="flex flex-wrap gap-2">
                      {config.webServers.map((server) => (
                        <Badge
                          key={server}
                          variant="secondary"
                          className="flex items-center gap-1 bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100 transition-colors px-2 py-1"
                        >
                          <span className="text-xs">{server}</span>
                          <button
                            onClick={() => removeWebServer(server)}
                            className="ml-1 hover:bg-orange-200 rounded-full p-0.5 transition-colors"
                            aria-label={`Remove ${server}`}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Button onClick={handleSave} className="w-full bg-slate-800 hover:bg-slate-700">
                <Save className="w-4 h-4 mr-2" />
                Save Configuration
              </Button>
            </CardContent>
          </Card>

          {/* Configuration Preview */}
          <Card className="shadow-lg border border-gray-200/50">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <CardTitle className="text-lg font-semibold flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                Configuration Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="text-sm text-gray-600 mb-4">
                  This configuration will be used to provide personalized recommendations in your chats.
                </div>

                {config.operatingSystem && config.useInChat.os && (
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Computer className="w-4 h-4 text-blue-600" />
                    <div>
                      <div className="font-medium text-blue-900">Operating System</div>
                      <div className="text-sm text-blue-700">{config.operatingSystem}</div>
                    </div>
                  </div>
                )}

                {config.database && config.useInChat.database && (
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <Database className="w-4 h-4 text-green-600" />
                    <div>
                      <div className="font-medium text-green-900">Database</div>
                      <div className="text-sm text-green-700">{config.database}</div>
                    </div>
                  </div>
                )}

                {config.webServers.length > 0 && config.useInChat.webServers && (
                  <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                    <Server className="w-4 h-4 text-orange-600 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium text-orange-900">Web Servers</div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {config.webServers.map((server) => (
                          <Badge key={server} variant="outline" className="text-xs bg-white border-orange-200 text-orange-700">
                            {server}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {(!config.operatingSystem && !config.database && config.webServers.length === 0) && (
                  <div className="text-center py-8 text-gray-500">
                    <Computer className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>Configure your system preferences above to see them here</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
