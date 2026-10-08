import React from 'react';
import { NavigationTab } from '../../types';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  FileText, 
  UserX, 
  Link2, 
  Bot, 
  Image, 
  Globe, 
  Bell, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  alertCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  alertCount,
}) => {
  const navItems = [
    { id: 'overview' as NavigationTab, label: 'Overview', icon: LayoutDashboard },
    { id: 'threat-detection' as NavigationTab, label: 'AI Threat Detection', icon: ShieldAlert, badge: 'AI Multi-Vector' },
    { id: 'ai-content' as NavigationTab, label: 'AI Content Detection', icon: FileText },
    { id: 'fake-account' as NavigationTab, label: 'Fake Account Detection', icon: UserX },
    { id: 'phishing' as NavigationTab, label: 'Phishing Scanner', icon: Link2 },
    { id: 'bot-detection' as NavigationTab, label: 'Bot Detection', icon: Bot },
    { id: 'deepfake' as NavigationTab, label: 'Deepfake Detection', icon: Image },
    { id: 'attack-map' as NavigationTab, label: 'Attack Visualization', icon: Globe, highlight: true },
    { id: 'alerts' as NavigationTab, label: 'Alerts', icon: Bell, count: alertCount },
    { id: 'analytics' as NavigationTab, label: 'Threat Reports', icon: BarChart3 },
    { id: 'settings' as NavigationTab, label: 'Settings', icon: Settings },
  ];

  return (
    <aside 
      className={`relative bg-slate-950 border-r border-cyan-500/20 flex flex-col justify-between transition-all duration-300 z-30 select-none ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Collapse Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 bg-slate-900 text-cyan-400 border border-cyan-500/40 rounded-full p-1 shadow-neon-cyan hover:bg-slate-800 transition-colors z-40"
        title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
      </button>

      {/* Nav List */}
      <div className="py-4 px-2 space-y-1 overflow-y-auto">
        {!collapsed && (
          <div className="px-3 pb-2 text-[10px] font-mono text-slate-500 tracking-wider uppercase">
            SOC Operations Modules
          </div>
        )}

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-neon-cyan'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80 border border-transparent'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-400'
              }`} />

              {!collapsed && (
                <div className="flex-1 flex items-center justify-between overflow-hidden">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-500/30 font-mono">
                      {item.badge}
                    </span>
                  )}
                  {item.highlight && (
                    <span className="text-[9px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded border border-purple-500/30 font-mono flex items-center gap-0.5">
                      <Sparkles className="w-2.5 h-2.5 text-purple-400" /> LIVE MAP
                    </span>
                  )}
                  {item.count !== undefined && item.count > 0 && (
                    <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.2 rounded-full font-mono font-bold">
                      {item.count}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Sidebar Footer Status */}
      {!collapsed && (
        <div className="p-3 m-2 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] font-mono text-slate-400">
          <div className="flex items-center justify-between text-slate-300 mb-1">
            <span>Threat Feed</span>
            <span className="text-emerald-400 font-bold">STREAMING</span>
          </div>
          <div className="text-[10px] text-slate-500">
            Engine: CyberShield AI 4.2
          </div>
        </div>
      )}
    </aside>
  );
};
