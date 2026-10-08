import React from 'react';
import { SecurityAlert, UnifiedThreatResult, ThreatSeverity } from '../../types';
import { ThreatBadge } from '../common/ThreatBadge';
import { 
  X, 
  ShieldAlert, 
  CheckCircle2, 
  Download, 
  Terminal, 
  AlertTriangle
} from 'lucide-react';

interface InvestigateModalProps {
  targetAlert: SecurityAlert | UnifiedThreatResult | null;
  onClose: () => void;
  onResolve?: (id: string) => void;
}

export const InvestigateModal: React.FC<InvestigateModalProps> = ({
  targetAlert,
  onClose,
  onResolve,
}) => {
  if (!targetAlert) return null;

  const isAlertObj = 'name' in targetAlert;
  const alertItem = isAlertObj ? (targetAlert as SecurityAlert) : null;
  const resultItem = !isAlertObj ? (targetAlert as UnifiedThreatResult) : null;

  const title = alertItem ? alertItem.name : resultItem!.classification;
  const severity: ThreatSeverity = alertItem ? alertItem.severity : resultItem!.threatLevel;
  const score = targetAlert.riskScore;
  const recommendation = alertItem ? alertItem.recommendedAction : resultItem!.recommendation;
  const iocs = alertItem ? alertItem.iocs : resultItem!.indicators;
  const alertId = alertItem ? alertItem.id : 'ANALYSIS DETAILED REPORT';
  const category = alertItem ? alertItem.category : resultItem!.inputType;
  const statusText = alertItem ? alertItem.status.toUpperCase() : 'ANALYZED';
  const timestamp = alertItem ? alertItem.timestamp : resultItem!.evaluatedAt;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden font-sans">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-cyan-500/20 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/40 text-red-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-cyan-400 font-semibold">
                  {alertId}
                </span>
                <ThreatBadge severity={severity} size="sm" />
              </div>
              <h3 className="font-bold text-slate-100 text-base mt-0.5 tracking-wide">{title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 font-mono text-xs">
            <div>
              <span className="text-slate-500 text-[10px] block">RISK SCORE</span>
              <span className={`text-base font-bold ${score > 70 ? 'text-red-400' : 'text-amber-300'}`}>
                {score}/100
              </span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">CATEGORY</span>
              <span className="text-cyan-300 font-medium capitalize">
                {category}
              </span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">STATUS</span>
              <span className="text-emerald-400 font-medium">
                {statusText}
              </span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">EVALUATED</span>
              <span className="text-slate-300 font-medium truncate">
                {timestamp}
              </span>
            </div>
          </div>

          {/* Explanation Section */}
          <div>
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Executive Threat Summary
            </h4>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              {alertItem 
                ? `Critical threat event detected targeting ${alertItem.target} from source ${alertItem.source}. High probability of cyberattack or malicious payload injection.`
                : resultItem?.explanation}
            </div>
          </div>

          {/* Indicators of Compromise (IoCs) */}
          <div>
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" /> Indicators of Compromise (IoCs)
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs text-cyan-300">
              {iocs && iocs.length > 0 ? (
                iocs.map((ioc, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-slate-900/80 p-2 rounded border border-slate-850">
                    <span className="text-cyan-500 select-none">&gt;</span>
                    <span>{ioc}</span>
                  </div>
                ))
              ) : (
                <div className="text-slate-500">No IoCs cataloged.</div>
              )}
            </div>
          </div>

          {/* Recommended Action */}
          <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30">
            <h4 className="text-xs font-mono text-cyan-300 uppercase tracking-wider mb-1 font-semibold">
              Recommended Defensive Procedure
            </h4>
            <p className="text-xs text-slate-200 leading-relaxed font-sans">{recommendation}</p>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 border-t border-cyan-500/20 bg-slate-950 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono border border-slate-800 transition-colors"
          >
            Close Window
          </button>

          <div className="flex items-center gap-2">
            {alertItem && onResolve && alertItem.status !== 'resolved' && (
              <button
                onClick={() => {
                  onResolve(alertItem.id);
                  onClose();
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 shadow-neon-emerald transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Mark as Resolved</span>
              </button>
            )}

            <button
              onClick={() => {
                window.alert(`Exporting official SOC incident report for ${title}...`);
              }}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 shadow-neon-cyan transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export Forensic Bundle</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
