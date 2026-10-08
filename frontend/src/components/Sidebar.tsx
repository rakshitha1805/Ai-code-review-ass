import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderGit2,
  GitPullRequest,
  ShieldAlert,
  Layers,
  BarChart3,
  Settings,
  FileText
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/repositories', label: 'Repositories', icon: FolderGit2 },
    { to: '/pull-requests', label: 'Pull Requests', icon: GitPullRequest },
    { to: '/security', label: 'Security Scanner', icon: ShieldAlert },
    { to: '/architecture', label: 'Architectural Review', icon: Layers },
    { to: '/analytics', label: 'Analytics & Debt', icon: BarChart3 },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-slate-800 bg-[#0B0F17] flex flex-col justify-between p-4 min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        <div>
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            Main Navigation
          </p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                      isActive
                        ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 font-semibold'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer info box */}
      <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
        <div className="flex items-center justify-between font-semibold text-slate-300 mb-1">
          <span>AI Engine</span>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">Online</span>
        </div>
        <p className="text-slate-400 text-[11px] leading-tight">
          Gemini 2.5 Flash + Rule Engine Active
        </p>
      </div>
    </aside>
  );
};
