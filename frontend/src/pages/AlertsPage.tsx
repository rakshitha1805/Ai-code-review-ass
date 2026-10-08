import React, { useState } from 'react';
import { SecurityAlert, ThreatSeverity } from '../types';
import { INITIAL_ALERTS } from '../services/mockData';
import { CyberCard } from '../components/common/CyberCard';
import { ThreatBadge } from '../components/common/ThreatBadge';
import { 
  Bell, 
  CheckCircle2, 
  ShieldAlert, 
  Download, 
  Search, 
  Filter, 
  EyeOff, 
  ArrowUpRight 
} from 'lucide-react';

interface AlertsPageProps {
  onInvestigate: (alert: SecurityAlert) => void;
}

export const AlertsPage: React.FC<AlertsPageProps> = ({ onInvestigate }) => {
  const [alerts, setAlerts] = useState<SecurityAlert[]>(INITIAL_ALERTS);
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');

  const handleResolve = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'resolved' as const } : a))
    );
  };

  const handleIgnore = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'ignored' as const } : a))
    );
  };

  const filteredAlerts = alerts.filter((a) => {
    if (severityFilter === 'ALL') return true;
    return a.severity === severityFilter;
  });

  return (
    <div className="space-y-6 font-sans">
      <div className="bg-slate-900/60 p-5 rounded-2xl border border-cyan-500/20 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-100 font-mono tracking-wide flex items-center gap-2">
            <Bell className="w-6 h-6 text-cyan-400" />
            Intelligent SOC Alert Center
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Severity-ranked security events, automated resolution workflows, and exportable forensic logs.
          </p>
        </div>

        <button
          onClick={() => alert('Generating SOC Executive Incident Report...')}
          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono shadow-neon-cyan flex items-center gap-1.5 transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Export All Alerts Report</span>
        </button>
      </div>

      {/* Requirement 12 Severity Filters Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 font-mono text-xs">
        <span className="text-slate-400 text-xs flex items-center gap-1 mr-2">
          <Filter className="w-3.5 h-3.5 text-cyan-400" /> Severity:
        </span>

        {[
          { id: 'ALL', label: 'All Alerts' },
          { id: 'CRITICAL', label: '🔴 Critical' },
          { id: 'HIGH', label: '🟠 High' },
          { id: 'MEDIUM', label: '🟡 Medium' },
          { id: 'LOW', label: '🔵 Low' },
          { id: 'SAFE', label: '🟢 Safe' },
        ].map((sev) => (
          <button
            key={sev.id}
            onClick={() => setSeverityFilter(sev.id)}
            className={`px-3 py-1.5 rounded-xl border transition-all shrink-0 ${
              severityFilter === sev.id
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-neon-cyan'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            {sev.label}
          </button>
        ))}
      </div>

      {/* Alerts Table */}
      <CyberCard glow="cyan">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 text-[11px] uppercase tracking-wider">
                <th className="py-3 px-3">Alert Name</th>
                <th className="py-3 px-3">Severity</th>
                <th className="py-3 px-3">Time</th>
                <th className="py-3 px-3">Source Vector</th>
                <th className="py-3 px-3">Target Asset</th>
                <th className="py-3 px-3">Risk Score</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredAlerts.map((alert) => (
                <tr key={alert.id} className="hover:bg-slate-900/90 transition-colors">
                  <td className="py-3.5 px-3">
                    <span className="font-bold text-slate-100 block">{alert.name}</span>
                    <span className="text-[10px] text-slate-500">{alert.id}</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <ThreatBadge severity={alert.severity} size="sm" />
                  </td>
                  <td className="py-3.5 px-3 text-slate-400">{alert.timestamp}</td>
                  <td className="py-3.5 px-3 text-slate-300">{alert.source}</td>
                  <td className="py-3.5 px-3 text-slate-300">{alert.target}</td>
                  <td className="py-3.5 px-3">
                    <span className={`font-bold ${alert.riskScore > 70 ? 'text-red-400' : 'text-amber-300'}`}>
                      {alert.riskScore}%
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      alert.status === 'active' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                      alert.status === 'investigating' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      alert.status === 'resolved' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      'bg-slate-800 text-slate-400'
                    }`}>
                      {alert.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onInvestigate(alert)}
                        className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 text-[11px] transition-colors"
                      >
                        Investigate
                      </button>

                      {alert.status !== 'resolved' && (
                        <button
                          onClick={() => handleResolve(alert.id)}
                          className="px-2.5 py-1 rounded bg-emerald-950 hover:bg-emerald-900 text-emerald-400 border border-emerald-500/40 text-[11px] transition-colors"
                          title="Mark as Resolved"
                        >
                          Resolve
                        </button>
                      )}

                      <button
                        onClick={() => handleIgnore(alert.id)}
                        className="p-1 rounded text-slate-500 hover:text-slate-300 transition-colors"
                        title="Ignore Alert"
                      >
                        <EyeOff className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CyberCard>
    </div>
  );
};
