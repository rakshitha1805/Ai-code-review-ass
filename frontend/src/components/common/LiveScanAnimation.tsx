import React from 'react';
import { Cpu, ShieldCheck } from 'lucide-react';

interface LiveScanProps {
  statusText?: string;
  progressPercent?: number;
}

export const LiveScanAnimation: React.FC<LiveScanProps> = ({ 
  statusText = "Analyzing threat vectors...",
  progressPercent = 65
}) => {
  return (
    <div className="relative rounded-xl bg-slate-950 border border-cyan-500/30 p-6 overflow-hidden shadow-neon-cyan">
      {/* Animated Laser Scanning Line */}
      <div className="scan-laser" />

      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid-bg opacity-30" />

      <div className="relative z-10 flex flex-col items-center text-center py-6">
        <div className="relative mb-4">
          <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-400/50 flex items-center justify-center animate-pulse">
            <Cpu className="w-8 h-8 text-cyan-400" />
          </div>
          <div className="absolute -inset-1 rounded-full border border-cyan-400/30 animate-ping opacity-20" />
        </div>

        <h4 className="text-lg font-semibold text-slate-100 font-mono tracking-wide mb-1">
          CyberShield AI Analysis Engine
        </h4>
        <p className="text-xs text-cyan-400 font-mono mb-4 animate-pulse">
          {statusText}
        </p>

        {/* Progress Bar */}
        <div className="w-full max-w-xs bg-slate-900 h-2.5 rounded-full border border-slate-800 overflow-hidden mb-2">
          <div 
            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-300 shadow-neon-cyan"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span className="text-[11px] text-slate-400 font-mono">{progressPercent}% Deep Inspection Complete</span>

        {/* Simulated Heuristic Terminal Code Stream */}
        <div className="mt-4 w-full bg-slate-900/90 rounded-lg p-3 text-[11px] font-mono text-slate-400 border border-slate-800 text-left space-y-1">
          <div className="text-cyan-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" /> [0x4F12] Initializing Neural Heuristic Tensor Pipeline...
          </div>
          <div className="text-slate-400">[0x4F18] Inspecting byte entropy & TLS fingerprint...</div>
          <div className="text-amber-400">[0x4F24] Parsing synthetic text & facial geometry vector...</div>
          <div className="text-cyan-300">[0x4F30] Querying global threat database (Zero-day feed)...</div>
        </div>
      </div>
    </div>
  );
};
