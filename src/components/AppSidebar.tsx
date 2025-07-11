
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { MessageCircle, BarChart3, User, Settings } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar
} from '@/components/ui/sidebar';

const navigationItems = [
  { title: 'Chat', url: '/', icon: MessageCircle },
  { title: 'Dashboard', url: '/dashboard', icon: BarChart3 },
  { title: 'Profile', url: '/profile', icon: User },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === 'collapsed';

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const getNavClasses = (path: string) => 
    isActive(path) ? "bg-slate-800 text-white" : "hover:bg-slate-100 text-gray-700";

  return (
    <Sidebar 
      className={collapsed ? "w-14" : "w-64"} 
      collapsible="icon"
      variant="sidebar"
    >
      <SidebarContent className="bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
              <Settings className="w-4 h-4 text-white" />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <h2 className="text-lg font-semibold text-gray-900 truncate">SysCompat</h2>
                <p className="text-xs text-gray-500 truncate">System Assistant</p>
              </div>
            )}
          </div>
          <div className="mt-2 flex justify-end">
            <SidebarTrigger className="h-7 w-7" />
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
            {!collapsed ? 'Navigation' : ''}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`flex items-center gap-3 px-4 py-2 mx-2 rounded-lg transition-colors ${getNavClasses(item.url)}`}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      {!collapsed && <span className="font-medium truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
