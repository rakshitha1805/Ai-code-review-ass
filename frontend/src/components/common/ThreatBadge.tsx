import React from 'react';
import { ThreatSeverity } from '../../types';
import { ShieldAlert, AlertTriangle, AlertCircle, Info, ShieldCheck } from 'lucide-react';

interface ThreatBadgeProps {
  severity: ThreatSeverity | string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const ThreatBadge: React.FC<ThreatBadgeProps> = ({ 
  severity, 
  size = 'md',
  showIcon = true 
}) => {
  const sev = (severity || 'LOW').toUpperCase();

  let colors = 'bg-slate-800 text-slate-300 border-slate-700';
  let Icon = Info;

  switch (sev) {
    case 'CRITICAL':
      colors = 'bg-red-500/15 text-red-400 border-red-500/40 shadow-neon-red';
      Icon = ShieldAlert;
      break;
    case 'HIGH':
      colors = 'bg-orange-500/15 text-orange-400 border-orange-500/40';
      Icon = AlertTriangle;
      break;
    case 'MEDIUM':
      colors = 'bg-amber-500/15 text-amber-300 border-amber-500/40';
      Icon = AlertCircle;
      break;
    case 'LOW':
      colors = 'bg-blue-500/15 text-blue-400 border-blue-500/40';
      Icon = Info;
      break;
    case 'SAFE':
    case 'CLEAN':
    case 'PROTECTED':
      colors = 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40 shadow-neon-emerald';
      Icon = ShieldCheck;
      break;
  }

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 font-mono',
    md: 'text-xs px-2.5 py-1 font-mono',
    lg: 'text-sm px-3.5 py-1.5 font-mono font-semibold',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border tracking-wide font-medium ${colors} ${sizeClasses[size]}`}>
      {showIcon && <Icon className={iconSizes[size]} />}
      <span>{sev}</span>
    </span>
  );
};
