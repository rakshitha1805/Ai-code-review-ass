import React from 'react';
import { Shield, Cpu } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const CyberShieldLogo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md',
  showText = true 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-cyan-500/30 rounded-lg blur-md animate-pulse-glow" />
        <div className={`relative bg-slate-900 border border-cyan-400/50 rounded-lg p-1.5 shadow-neon-cyan flex items-center justify-center`}>
          <Shield className={`${sizeClasses[size]} text-cyan-400`} />
          <Cpu className="w-3.5 h-3.5 text-blue-400 absolute center" />
        </div>
      </div>
      {showText && (
        <div className="flex flex-col">
          <div className={`font-bold tracking-tight text-white ${textClasses[size]} flex items-center gap-1`}>
            <span>Cyber</span>
            <span className="text-cyan-400 glow-text-cyan">Shield</span>
            <span className="bg-cyan-500/20 text-cyan-300 text-xs px-1.5 py-0.5 rounded border border-cyan-500/30 font-mono ml-1">
              AI
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono tracking-wider -mt-1 uppercase">
            SOC Threat Intelligence
          </span>
        </div>
      )}
    </div>
  );
};
