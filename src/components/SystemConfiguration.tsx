
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Computer, Database, Server, Settings } from 'lucide-react';

interface SystemConfig {
  operatingSystem: string;
  database: string;
  webServers: string[];
}

const SystemConfiguration = () => {
  const [config, setConfig] = useState<SystemConfig>({
    operatingSystem: '',
    database: '',
    webServers: []
  });

  const operatingSystems = [
    'Windows 10',
    'Windows 11',
    'Windows Server 2019',
    'Windows Server 2022',
    'Ubuntu 20.04 LTS',
    'Ubuntu 22.04 LTS',
    'Red Hat Enterprise Linux 8',
    'Red Hat Enterprise Linux 9',
    'CentOS 7',
    'CentOS 8',
    'macOS Monterey',
    'macOS Ventura',
    'macOS Sonoma'
  ];

  const databases = [
    'MySQL 5.7',
    'MySQL 8.0',
    'PostgreSQL 13',
    'PostgreSQL 14',
    'PostgreSQL 15',
    'Oracle Database 19c',
    'Oracle Database 21c',
    'Microsoft SQL Server 2019',
    'Microsoft SQL Server 2022',
    'MongoDB 5.0',
    'MongoDB 6.0',
    'Redis 6',
    'Redis 7'
  ];

  const webServers = [
    'Apache HTTP Server 2.4',
    'Nginx 1.20',
    'Nginx 1.22',
    'Microsoft IIS 10',
    'Tomcat 9',
    'Tomcat 10',
    'Node.js 16',
    'Node.js 18',
    'Node.js 20'
  ];

  const handleWebServerChange = (webServer: string, checked: boolean) => {
    setConfig(prev => ({
      ...prev,
      webServers: checked 
        ? [...prev.webServers, webServer]
        : prev.webServers.filter(ws => ws !== webServer)
    }));
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl overflow-hidden">
      <CardHeader className="bg-slate-800 text-white px-8 py-6">
        <CardTitle className="text-xl font-medium flex items-center gap-3">
          <Settings className="w-6 h-6" />
          System Configuration
        </CardTitle>
        <p className="text-slate-300 text-sm font-light mt-2">
          Optional - helps provide more targeted recommendations
        </p>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        {/* Operating System */}
        <div className="space-y-3">
          <Label className="text-base font-medium text-slate-700 flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Computer className="w-4 h-4 text-blue-600" />
            </div>
            Operating System
          </Label>
          <Select 
            value={config.operatingSystem} 
            onValueChange={(value) => setConfig(prev => ({ ...prev, operatingSystem: value }))}
          >
            <SelectTrigger className="h-12 bg-slate-50 border-slate-200 rounded-xl text-slate-700 font-medium">
              <SelectValue placeholder="Select your operating system" />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200 shadow-xl rounded-xl">
              {operatingSystems.map((os) => (
                <SelectItem key={os} value={os} className="py-3 px-4 hover:bg-slate-50 rounded-lg mx-1">
                  {os}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Database */}
        <div className="space-y-3">
          <Label className="text-base font-medium text-slate-700 flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Database className="w-4 h-4 text-green-600" />
            </div>
            Database
          </Label>
          <Select 
            value={config.database} 
            onValueChange={(value) => setConfig(prev => ({ ...prev, database: value }))}
          >
            <SelectTrigger className="h-12 bg-slate-50 border-slate-200 rounded-xl text-slate-700 font-medium">
              <SelectValue placeholder="Select your database" />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200 shadow-xl rounded-xl">
              {databases.map((db) => (
                <SelectItem key={db} value={db} className="py-3 px-4 hover:bg-slate-50 rounded-lg mx-1">
                  {db}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Web Servers */}
        <div className="space-y-4">
          <Label className="text-base font-medium text-slate-700 flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <Server className="w-4 h-4 text-orange-600" />
            </div>
            Web Servers
            <span className="text-xs text-slate-500 font-normal">(multiple selection)</span>
          </Label>
          <div className="bg-slate-50 rounded-xl p-4 space-y-3 max-h-64 overflow-y-auto">
            {webServers.map((webServer) => (
              <div key={webServer} className="flex items-center space-x-3 p-2 hover:bg-white rounded-lg transition-colors">
                <Checkbox
                  id={webServer}
                  checked={config.webServers.includes(webServer)}
                  onCheckedChange={(checked) => handleWebServerChange(webServer, checked as boolean)}
                  className="border-slate-300 data-[state=checked]:bg-slate-800 data-[state=checked]:border-slate-800"
                />
                <Label 
                  htmlFor={webServer} 
                  className="text-sm text-slate-700 cursor-pointer font-medium flex-1"
                >
                  {webServer}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Current Selection Summary */}
        {(config.operatingSystem || config.database || config.webServers.length > 0) && (
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <h4 className="text-base font-semibold text-slate-800 mb-3">Current Selection</h4>
            <div className="space-y-2">
              {config.operatingSystem && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Computer className="w-4 h-4" />
                  <span className="font-medium">OS:</span> {config.operatingSystem}
                </div>
              )}
              {config.database && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Database className="w-4 h-4" />
                  <span className="font-medium">Database:</span> {config.database}
                </div>
              )}
              {config.webServers.length > 0 && (
                <div className="flex items-start gap-2 text-sm text-slate-600">
                  <Server className="w-4 h-4 mt-0.5" />
                  <div>
                    <span className="font-medium">Web Servers:</span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {config.webServers.map((server) => (
                        <span key={server} className="bg-white px-2 py-1 rounded-md text-xs border border-slate-200">
                          {server}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SystemConfiguration;
