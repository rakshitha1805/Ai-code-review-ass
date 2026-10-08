import React from 'react';

interface CyberCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: 'cyan' | 'blue' | 'red' | 'emerald' | 'none';
  header?: React.ReactNode;
  headerIcon?: React.ReactNode;
  title?: string;
  subtitle?: string;
  cornerPins?: boolean;
}

export const CyberCard: React.FC<CyberCardProps> = ({
  children,
  className = '',
  glow = 'none',
  header,
  headerIcon,
  title,
  subtitle,
  cornerPins = true,
}) => {
  const glowClasses = {
    cyan: 'border-cyan-500/30 hover:border-cyan-400/60 hover:shadow-neon-cyan',
    blue: 'border-blue-500/30 hover:border-blue-400/60 hover:shadow-neon-blue',
    red: 'border-red-500/30 hover:border-red-400/60 hover:shadow-neon-red',
    emerald: 'border-emerald-500/30 hover:border-emerald-400/60 hover:shadow-neon-emerald',
    none: 'border-slate-800/80 hover:border-slate-700/80',
  };

  return (
    <div className={`relative rounded-xl bg-slate-900/60 backdrop-blur-md border ${glowClasses[glow]} transition-all duration-300 ${className}`}>
      {/* Corner Cyber Pins */}
      {cornerPins && (
        <>
          <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t-2 border-l-2 border-cyan-400/70 rounded-tl" />
          <div className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t-2 border-r-2 border-cyan-400/70 rounded-tr" />
          <div className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b-2 border-l-2 border-cyan-400/70 rounded-bl" />
          <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b-2 border-r-2 border-cyan-400/70 rounded-br" />
        </>
      )}

      {/* Card Header if title provided */}
      {(title || header) && (
        <div className="px-5 py-4 border-b border-slate-800/80 flex items-center justify-between">
          {header ? (
            header
          ) : (
            <div className="flex items-center gap-2.5">
              {headerIcon && <div className="text-cyan-400">{headerIcon}</div>}
              <div>
                <h3 className="font-semibold text-slate-100 text-sm tracking-wide">{title}</h3>
                {subtitle && <p className="text-xs text-slate-400 font-mono mt-0.5">{subtitle}</p>}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Card Body */}
      <div className="p-5">{children}</div>
    </div>
  );
};
