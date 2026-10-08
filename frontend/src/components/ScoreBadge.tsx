import React from 'react';

interface ScoreBadgeProps {
  score: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score, label, size = 'md' }) => {
  let colorBg = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
  if (score < 60) {
    colorBg = 'bg-rose-500/10 text-rose-400 border-rose-500/30';
  } else if (score < 80) {
    colorBg = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
  }

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm font-semibold',
    lg: 'px-4 py-2 text-base font-bold'
  };

  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full border ${colorBg} ${sizeClasses[size]}`}>
      {label && <span className="opacity-80 font-normal">{label}:</span>}
      <span>{score}/100</span>
    </div>
  );
};
