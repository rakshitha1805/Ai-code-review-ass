import React from 'react';
import { Shield } from 'lucide-react';

interface RadarProps {
  size?: number;
  activeHits?: number;
  className?: string;
}

export const RadarAnimation: React.FC<RadarProps> = ({ 
  size = 280, 
  activeHits = 4,
  className = '' 
}) => {
  return (
    <div 
      className={`relative flex items-center justify-center rounded-full bg-slate-950/80 border border-cyan-500/30 overflow-hidden shadow-neon-cyan ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Radar Concentric Rings */}
      <div className="absolute inset-4 rounded-full border border-cyan-500/20" />
      <div className="absolute inset-12 rounded-full border border-cyan-500/20" />
      <div className="absolute inset-20 rounded-full border border-cyan-500/30" />
      <div className="absolute inset-28 rounded-full border border-cyan-500/40" />

      {/* Crosshairs */}
      <div className="absolute w-full h-[1px] bg-cyan-500/20" />
      <div className="absolute h-full w-[1px] bg-cyan-500/20" />

      {/* Rotating Radar Sweep Line */}
      <div 
        className="absolute top-0 left-0 w-full h-full animate-radar-sweep origin-center pointer-events-none"
      >
        <div 
          className="w-1/2 h-1/2 bg-gradient-to-tr from-cyan-500/30 via-cyan-400/10 to-transparent origin-bottom-right"
          style={{ clipPath: 'polygon(100% 100%, 0 0, 100% 0)' }}
        />
      </div>

      {/* Pulsing Target Blips */}
      <div className="absolute top-[28%] left-[62%] flex items-center justify-center">
        <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 shadow-neon-red"></span>
      </div>

      <div className="absolute bottom-[32%] left-[28%] flex items-center justify-center">
        <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-amber-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
      </div>

      <div className="absolute top-[68%] right-[25%] flex items-center justify-center">
        <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-cyan-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-neon-cyan"></span>
      </div>

      {/* Center Shield Core */}
      <div className="z-10 p-3 rounded-full bg-slate-900 border border-cyan-400/60 shadow-neon-cyan flex items-center justify-center">
        <Shield className="w-8 h-8 text-cyan-400 animate-pulse" />
      </div>

      {/* Status Label */}
      <div className="absolute bottom-2 font-mono text-[10px] text-cyan-400 bg-slate-900/90 px-2.5 py-0.5 rounded border border-cyan-500/30">
        RADAR: ACTIVE | {activeHits} TARGETS
      </div>
    </div>
  );
};
