import React from 'react';
import { ShieldAlert, AlertTriangle, Info, ShieldCheck } from 'lucide-react';

interface SeverityBadgeProps {
  severity: 'Critical' | 'High' | 'Medium' | 'Low' | string;
}

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({ severity }) => {
  switch (severity) {
    case 'Critical':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
          <ShieldAlert className="w-3.5 h-3.5" /> Critical
        </span>
      );
    case 'High':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-orange-500/15 text-orange-400 border border-orange-500/30">
          <AlertTriangle className="w-3.5 h-3.5" /> High
        </span>
      );
    case 'Medium':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
          <AlertTriangle className="w-3.5 h-3.5" /> Medium
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-500/15 text-blue-400 border border-blue-500/30">
          <Info className="w-3.5 h-3.5" /> Low
        </span>
      );
  }
};
