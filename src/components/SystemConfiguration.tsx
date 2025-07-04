
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Computer, Database, Server } from 'lucide-react';

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
    <Card className="bg-white border-gray-200 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Computer className="w-5 h-5" />
          Current System Configuration
        </CardTitle>
        <p className="text-sm text-gray-600">Optional - helps provide more targeted advice</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Operating System */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Computer className="w-4 h-4" />
            Operating System
          </Label>
          <Select 
            value={config.operatingSystem} 
            onValueChange={(value) => setConfig(prev => ({ ...prev, operatingSystem: value }))}
          >
            <SelectTrigger className="bg-white border-gray-300">
              <SelectValue placeholder="Select your OS" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200 shadow-lg">
              {operatingSystems.map((os) => (
                <SelectItem key={os} value={os} className="hover:bg-gray-50">
                  {os}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Database */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Database className="w-4 h-4" />
            Database
          </Label>
          <Select 
            value={config.database} 
            onValueChange={(value) => setConfig(prev => ({ ...prev, database: value }))}
          >
            <SelectTrigger className="bg-white border-gray-300">
              <SelectValue placeholder="Select your database" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200 shadow-lg">
              {databases.map((db) => (
                <SelectItem key={db} value={db} className="hover:bg-gray-50">
                  {db}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Web Servers */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Server className="w-4 h-4" />
            Web Servers (multiple selection)
          </Label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {webServers.map((webServer) => (
              <div key={webServer} className="flex items-center space-x-2">
                <Checkbox
                  id={webServer}
                  checked={config.webServers.includes(webServer)}
                  onCheckedChange={(checked) => handleWebServerChange(webServer, checked as boolean)}
                  className="border-gray-300"
                />
                <Label 
                  htmlFor={webServer} 
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  {webServer}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Current Selection Summary */}
        {(config.operatingSystem || config.database || config.webServers.length > 0) && (
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Current Selection:</h4>
            <div className="space-y-1 text-xs text-gray-600">
              {config.operatingSystem && (
                <div>OS: {config.operatingSystem}</div>
              )}
              {config.database && (
                <div>DB: {config.database}</div>
              )}
              {config.webServers.length > 0 && (
                <div>Servers: {config.webServers.join(', ')}</div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SystemConfiguration;
