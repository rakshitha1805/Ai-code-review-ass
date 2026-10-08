import React from 'react';
import { ShieldCheck, GitPullRequest, Search, Bell } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="h-16 border-b border-slate-800 bg-[#0B0F17]/90 backdrop-blur sticky top-0 z-40 px-6 flex items-center justify-between">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 p-0.5 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-blue-400" />
          </div>
        </div>
        <div>
          <h1 className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-blue-400 bg-clip-text text-transparent">
            CodeGuard AI
          </h1>
          <p className="text-[10px] text-slate-400 font-mono">Automated Code Review & Security Auditor</p>
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="hidden md:flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 w-80 text-xs">
        <Search className="w-4 h-4 text-slate-500" />
        <input
          type="text"
          placeholder="Search repositories, PRs, security CVEs..."
          className="bg-transparent border-none text-slate-200 focus:outline-none w-full placeholder:text-slate-500"
        />
      </div>

      {/* Right User Bar */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>GitHub Webhook Live</span>
        </div>

        <button className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500"></span>
        </button>

        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <img
            src="https://api.dicebear.com/7.x/bottts/svg?seed=admin"
            alt="User avatar"
            className="w-8 h-8 rounded-full border border-slate-700 bg-slate-800"
          />
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-slate-200">Admin Lead</p>
            <p className="text-[10px] text-slate-400">Security Lead</p>
          </div>
        </div>
      </div>
    </header>
  );
};
