import React from 'react';

interface CircularProgressProps {
  score: number; // 0 - 100
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  inverseColors?: boolean; // if high score is safe vs high score is dangerous
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  score,
  size = 160,
  strokeWidth = 12,
  label,
  sublabel,
  inverseColors = false,
}) => {
  const normalizedScore = Math.max(0, Math.min(100, score));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  // Determine color scale
  let strokeColor = '#00F0FF'; // cyan default
  let textColor = 'text-cyan-400';

  if (!inverseColors) {
    // Normal: High score = High Risk
    if (normalizedScore >= 75) {
      strokeColor = '#EF4444'; // Red
      textColor = 'text-red-400';
    } else if (normalizedScore >= 50) {
      strokeColor = '#F97316'; // Orange
      textColor = 'text-orange-400';
    } else if (normalizedScore >= 25) {
      strokeColor = '#F59E0B'; // Yellow
      textColor = 'text-amber-300';
    } else {
      strokeColor = '#10B981'; // Green
      textColor = 'text-emerald-400';
    }
  } else {
    // Inverted: High score = Safe/Good
    if (normalizedScore >= 80) {
      strokeColor = '#10B981'; // Green
      textColor = 'text-emerald-400';
    } else if (normalizedScore >= 60) {
      strokeColor = '#00F0FF'; // Cyan
      textColor = 'text-cyan-400';
    } else if (normalizedScore >= 40) {
      strokeColor = '#F59E0B'; // Yellow
      textColor = 'text-amber-300';
    } else {
      strokeColor = '#EF4444'; // Red
      textColor = 'text-red-400';
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Track Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1E293B"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-1000 ease-out"
          style={{
            filter: `drop-shadow(0px 0px 8px ${strokeColor}80)`,
          }}
        />
      </svg>
      {/* Inner Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
        <span className={`font-bold font-mono text-3xl tracking-tight ${textColor}`}>
          {normalizedScore}%
        </span>
        {label && <span className="text-xs font-semibold text-slate-300 mt-0.5">{label}</span>}
        {sublabel && <span className="text-[10px] text-slate-400 font-mono mt-0.5">{sublabel}</span>}
      </div>
    </div>
  );
};
