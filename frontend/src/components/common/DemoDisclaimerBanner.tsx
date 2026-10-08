import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export const DemoDisclaimerBanner: React.FC = () => {
  return (
    <div className="bg-slate-900/90 border-b border-cyan-500/20 px-4 py-2 text-xs text-slate-300 flex items-center justify-between flex-wrap gap-2 font-mono">
      <div className="flex items-center gap-2">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
        </span>
        <span className="text-cyan-400 font-semibold">Defensive SOC Engine Active</span>
        <span className="text-slate-500">|</span>
        <span className="text-slate-400">
          Demo Mode: All threat detection scores and metrics use simulated AI analysis.
        </span>
      </div>
      <div className="flex items-center gap-3 text-[11px] text-slate-400">
        <span className="flex items-center gap-1 text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5" /> Zero Offensive Tools Policy
        </span>
        <span className="bg-cyan-500/10 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
          SOC v4.2-SIM
        </span>
      </div>
    </div>
  );
};
