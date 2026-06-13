import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  BookOpen, 
  Users, 
  TrendingUp, 
  LogOut, 
  Bell, 
  Menu, 
  X,
  Building
} from 'lucide-react';

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Map paths to human-readable page titles
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Dashboard Overview';
      case '/leads': return 'Leads Management';
      case '/portfolio': return 'Portfolio Management';
      case '/blog': return 'Blog Posts Management';
      case '/team': return 'Team Directory';
      case '/careers': return 'Careers & Job Listings';
      case '/analytics': return 'Performance Analytics';
      default: return 'Nexix Admin';
    }
  };

  const menuSections = [
    {
      title: 'Overview',
      items: [
        { name: 'Dashboard', path: '/', icon: LayoutDashboard }
      ]
    },
    {
      title: 'Data',
      items: [
        { name: 'Leads', path: '/leads', icon: FileText },
        { name: 'Portfolio', path: '/portfolio', icon: Briefcase },
        { name: 'Blog Posts', path: '/blog', icon: BookOpen },
        { name: 'Team', path: '/team', icon: Users },
        { name: 'Careers', path: '/careers', icon: Building }
      ]
    },
    {
      title: 'Analytics',
      items: [
        { name: 'Analytics', path: '/analytics', icon: TrendingUp }
      ]
    }
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const getInitials = () => {
    if (!user || !user.email) return 'AD';
    return user.email.split('@')[0].substring(0, 2).toUpperCase();
  };

  const NavItem = ({ item }) => {
    const isActive = location.pathname === item.path;
    const Icon = item.icon;
    
    return (
      <Link
        to={item.path}
        onClick={() => setMobileSidebarOpen(false)}
        className={`flex items-center px-4 py-2.5 text-sm font-medium border-l-4 transition-all duration-150 ${
          isActive 
            ? 'border-brand text-brand bg-brand-light/30' 
            : 'border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50'
        }`}
      >
        <Icon className={`w-4 h-4 mr-3 transition-colors ${isActive ? 'text-brand' : 'text-gray-400 group-hover:text-gray-500'}`} />
        {item.name}
      </Link>
    );
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Brand Logo */}
      <div className="flex flex-col justify-center px-6 py-6 border-b border-gray-100">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight flex items-center">
          Nexix <span className="text-brand ml-1">Admin</span>
        </h1>
        <span className="text-xs text-gray-400 uppercase tracking-widest font-semibold mt-0.5">Technology</span>
      </div>

      {/* Nav Link Tree */}
      <nav className="flex-1 overflow-y-auto py-4 space-y-6">
        {menuSections.map((section) => (
          <div key={section.title} className="space-y-1">
            <span className="px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
              {section.title}
            </span>
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <NavItem key={item.name} item={item} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer / App Details */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">Nexix Admin v1.0</span>
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" title="System online" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      
      {/* Sidebar - Desktop Layout (Fixed 200px) */}
      <aside className="hidden md:block md:flex-shrink-0 w-[200px] h-full">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar overlay/drawer */}
      {mobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          {/* Backdrop blur click-away */}
          <div 
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileSidebarOpen(false)}
          />
          {/* Slide-out Sidebar Box */}
          <div className="relative flex-1 flex flex-col max-w-[240px] w-full h-full transform transition-transform duration-300 ease-in-out">
            <div className="absolute top-0 right-0 -mr-12 pt-4">
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white bg-slate-800 text-white"
              >
                <X className="h-6 h-6" />
              </button>
            </div>
            <SidebarContent />
          </div>
          <div className="flex-shrink-0 w-14" />
        </div>
      )}

      {/* Main Container Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Topbar */}
        <header className="flex-shrink-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 z-10">
          
          {/* Page Title & Hamburger */}
          <div className="flex items-center">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 -ml-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="ml-2 md:ml-0 text-lg font-semibold text-gray-800 tracking-tight">
              {getPageTitle()}
            </h2>
          </div>

          {/* Widgets (Notifications + Profile Initial + Logout) */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Notification Bell */}
            <button className="p-1.5 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all duration-150 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-brand" />
            </button>

            {/* User Avatar Circle */}
            <div className="flex items-center space-x-2.5">
              <div 
                className="w-8 h-8 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center shadow-premium"
                title={user?.email || 'Admin Profile'}
              >
                {getInitials()}
              </div>
              <span className="hidden sm:inline text-sm font-medium text-gray-700">
                {user?.email?.split('@')[0] || 'Admin'}
              </span>
            </div>

            {/* Divider */}
            <div className="h-4 w-px bg-gray-200" />

            {/* Logout Button */}
            <button 
              onClick={handleLogout}
              className="flex items-center px-3 py-1.5 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-150"
              title="Logout session"
            >
              <LogOut className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </button>

          </div>
        </header>

        {/* Content Pane */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </div>

    </div>
  );
}
