import React, { useState } from 'react';
import { NavigationTab, UserProfile } from '../../types';
import { CyberShieldLogo } from './CyberShieldLogo';
import { 
  Bell, 
  Search, 
  Bot, 
  User, 
  Settings, 
  LogOut, 
  ExternalLink,
  Shield,
  Activity,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  user: UserProfile;
  toggleCopilot: () => void;
  isCopilotOpen: boolean;
  alertCount: number;
  onQuickSearch: (query: string) => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  user,
  toggleCopilot,
  isCopilotOpen,
  alertCount,
  onQuickSearch,
  onOpenAuth,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onQuickSearch(searchQuery.trim());
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-cyan-500/20 px-4 lg:px-6 py-3 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left Brand & Navigation switch */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setActiveTab('landing')} 
            className="hover:opacity-90 transition-opacity text-left focus:outline-none"
          >
            <CyberShieldLogo size="md" />
          </button>

          {/* SOC Active System Badge */}
          <div className="hidden md:flex items-center gap-2 bg-slate-900/80 px-3 py-1 rounded-full border border-cyan-500/30 font-mono text-xs text-slate-300">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 font-semibold">SOC ONLINE</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400 flex items-center gap-1">
              <Activity className="w-3 h-3 text-cyan-400" /> 1.4k req/s
            </span>
          </div>
        </div>

        {/* Global Quick Search Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden sm:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Quick scan URL, IP, domain, social profile, or text IoC..."
              className="w-full bg-slate-900/90 border border-slate-800 rounded-lg pl-9 pr-24 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-all font-mono"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-[10px] font-mono px-2 py-1 rounded border border-cyan-500/40 transition-colors"
            >
              SCAN NOW
            </button>
          </div>
        </form>

        {/* Right Navigation & Controls */}
        <div className="flex items-center gap-3">
          {/* Landing vs Dashboard Toggle Button */}
          {activeTab === 'landing' ? (
            <button
              onClick={() => setActiveTab('overview')}
              className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-lg shadow-neon-cyan transition-all"
            >
              <Shield className="w-4 h-4" />
              <span>Launch SOC Dashboard</span>
            </button>
          ) : (
            <button
              onClick={() => setActiveTab('landing')}
              className="hidden sm:flex items-center gap-1 text-slate-400 hover:text-cyan-400 text-xs font-mono px-2.5 py-1.5 rounded-lg border border-slate-800 hover:border-cyan-500/30 transition-colors"
            >
              <span>Landing Page</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          )}

          {/* CyberShield Copilot AI Assistant Trigger */}
          <button
            onClick={toggleCopilot}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium font-mono transition-all ${
              isCopilotOpen
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-neon-cyan'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-800 hover:border-cyan-500/40'
            }`}
            title="Toggle CyberShield Copilot AI Assistant"
          >
            <Bot className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="hidden md:inline">Copilot AI</span>
          </button>

          {/* Alerts Bell Notification Icon */}
          <button
            onClick={() => setActiveTab('alerts')}
            className="relative p-2 text-slate-400 hover:text-cyan-400 bg-slate-900 border border-slate-800 hover:border-cyan-500/30 rounded-lg transition-colors"
            title="View Security Alerts"
          >
            <Bell className="w-4 h-4" />
            {alertCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-slate-950 shadow-neon-red">
                {alertCount}
              </span>
            )}
          </button>

          {/* User Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-colors"
            >
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-7 h-7 rounded-md object-cover border border-cyan-500/40"
              />
              <span className="hidden lg:inline text-xs font-medium text-slate-200">
                {user.name}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-cyan-500/30 shadow-2xl p-2 z-50 text-xs font-sans">
                <div className="px-3 py-2 border-b border-slate-800 mb-1">
                  <p className="font-semibold text-slate-100">{user.name}</p>
                  <p className="text-[11px] text-cyan-400 font-mono mt-0.5">{user.role}</p>
                  <p className="text-[10px] text-slate-500">{user.organization}</p>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('settings');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Profile & Security</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('settings');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Settings className="w-3.5 h-3.5 text-blue-400" />
                  <span>API Keys & Preferences</span>
                </button>
                <div className="border-t border-slate-800 my-1" />
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onOpenAuth();
                  }}
                  className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg flex items-center gap-2 transition-colors font-mono"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Switch User / Auth</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
