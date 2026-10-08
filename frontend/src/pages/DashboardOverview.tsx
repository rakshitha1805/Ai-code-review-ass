import React, { useState, useEffect } from 'react';
import { NavigationTab, RealTimeFeedEvent, SecurityAlert } from '../types';
import { CyberCard } from '../components/common/CyberCard';
import { ThreatBadge } from '../components/common/ThreatBadge';
import { CircularProgress } from '../components/common/CircularProgress';
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  Activity, 
  Link2, 
  Bot, 
  UserX, 
  Image as ImageIcon, 
  Play, 
  Pause, 
  ArrowUpRight, 
  Filter, 
  RefreshCw,
  Zap,
  Globe
} from 'lucide-react';

interface DashboardOverviewProps {
  setActiveTab: (tab: NavigationTab) => void;
  securityScore: number;
  stats: {
    criticalThreats: number;
    highRiskThreats: number;
    suspiciousActivities: number;
    blockedAttacks: number;
    phishingAttempts: number;
    detectedBots: number;
  };
  feedEvents: RealTimeFeedEvent[];
  onInvestigateAlert: (alert: SecurityAlert | any) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  setActiveTab,
  securityScore,
  stats,
  feedEvents,
  onInvestigateAlert,
}) => {
  const [isFeedLive, setIsFeedLive] = useState(true);
  const [events, setEvents] = useState<RealTimeFeedEvent[]>(feedEvents);

  // Simulate real-time streaming event pulse
  useEffect(() => {
    if (!isFeedLive) return;

    const interval = setInterval(() => {
      const randomTypes = [
        { type: 'Phishing URL Flagged', severity: 'CRITICAL', status: 'Blocked' },
        { type: 'AI Content Synthesized', severity: 'MEDIUM', status: 'Flagged' },
        { type: 'Botnet Credential Stuffing', severity: 'HIGH', status: 'Quarantined' },
        { type: 'Deepfake Media Detected', severity: 'HIGH', status: 'Quarantined' },
        { type: 'Suspicious Login Anomaly', severity: 'LOW', status: 'Monitoring' },
      ];
      const pick = randomTypes[Math.floor(Math.random() * randomTypes.length)];
      const randomIP = `${Math.floor(Math.random() * 200 + 10)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;

      const newEvt: RealTimeFeedEvent = {
        id: `evt-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        threatType: pick.type,
        severity: pick.severity as any,
        source: `${randomIP} (Node #${Math.floor(Math.random() * 900 + 100)})`,
        status: pick.status as any,
        action: 'Automated Heuristic Enforcement',
      };

      setEvents((prev) => [newEvt, ...prev.slice(0, 14)]);
    }, 4500);

    return () => clearInterval(interval);
  }, [isFeedLive]);

  return (
    <div className="space-y-6 font-sans">
      {/* Overview Top Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-cyan-500/20 backdrop-blur-md">
        <div>
          <h1 className="text-xl font-extrabold text-slate-100 tracking-wide flex items-center gap-2 font-mono">
            SOC Operations Command Center
            <span className="text-xs font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
              LIVE SOC TIER 3
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Real-time threat detection, AI multi-vector monitoring, and automated response pipeline.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('threat-detection')}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono shadow-neon-cyan flex items-center gap-1.5 transition-all"
          >
            <Zap className="w-4 h-4" />
            <span>Launch Multi-Vector Scan</span>
          </button>

          <button
            onClick={() => setActiveTab('attack-map')}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-cyan-500/30 text-xs font-mono flex items-center gap-1.5 transition-all"
          >
            <Globe className="w-4 h-4" />
            <span>Live Cyber Map</span>
          </button>
        </div>
      </div>

      {/* Main Stats Header: Security Score + Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Security Score Widget (0-100) */}
        <div className="lg:col-span-4 rounded-2xl bg-slate-900/80 border border-cyan-500/30 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-neon-cyan">
          <div className="absolute top-3 left-3 text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> System Security Score
          </div>

          <div className="my-2">
            <CircularProgress 
              score={securityScore} 
              size={170} 
              strokeWidth={14} 
              inverseColors={true}
              label="SCORE" 
              sublabel="Status: Protected" 
            />
          </div>

          <div className="w-full mt-2 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Postural Integrity</span>
            <span className="text-emerald-400 font-bold">OPTIMAL (92/100)</span>
          </div>
        </div>

        {/* 6 Threat Summary Cards Grid */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {/* Card 1: Critical Threats */}
          <div className="rounded-xl bg-red-950/20 border border-red-500/30 p-4 transition-all hover:border-red-400">
            <div className="flex items-center justify-between text-xs font-mono text-red-400 mb-1">
              <span>Critical Threats</span>
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div className="text-2xl font-bold font-mono text-slate-100 glow-text-red">
              {stats.criticalThreats}
            </div>
            <div className="text-[10px] text-red-400/80 font-mono mt-1">Requires immediate SOC action</div>
          </div>

          {/* Card 2: High-Risk Threats */}
          <div className="rounded-xl bg-orange-950/20 border border-orange-500/30 p-4 transition-all hover:border-orange-400">
            <div className="flex items-center justify-between text-xs font-mono text-orange-400 mb-1">
              <span>High-Risk Threats</span>
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="text-2xl font-bold font-mono text-slate-100">
              {stats.highRiskThreats}
            </div>
            <div className="text-[10px] text-orange-400/80 font-mono mt-1">Active quarantine enforcement</div>
          </div>

          {/* Card 3: Suspicious Activities */}
          <div className="rounded-xl bg-amber-950/20 border border-amber-500/30 p-4 transition-all hover:border-amber-400">
            <div className="flex items-center justify-between text-xs font-mono text-amber-300 mb-1">
              <span>Suspicious Activities</span>
              <Activity className="w-4 h-4" />
            </div>
            <div className="text-2xl font-bold font-mono text-slate-100">
              {stats.suspiciousActivities}
            </div>
            <div className="text-[10px] text-amber-300/80 font-mono mt-1">Under AI behavior audit</div>
          </div>

          {/* Card 4: Blocked Attacks */}
          <div className="rounded-xl bg-cyan-950/20 border border-cyan-500/30 p-4 transition-all hover:border-cyan-400">
            <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-1">
              <span>Blocked Attacks</span>
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-2xl font-bold font-mono text-cyan-400 glow-text-cyan">
              {stats.blockedAttacks.toLocaleString()}
            </div>
            <div className="text-[10px] text-cyan-400/80 font-mono mt-1">Auto-mitigated at edge</div>
          </div>

          {/* Card 5: Phishing Attempts */}
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 transition-all hover:border-cyan-500/30">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
              <span>Phishing Scans</span>
              <Link2 className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-slate-100">
              {stats.phishingAttempts}
            </div>
            <div className="text-[10px] text-slate-500 font-mono mt-1">Domains sinkholed</div>
          </div>

          {/* Card 6: Detected Bots */}
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 transition-all hover:border-cyan-500/30">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
              <span>Detected Bots</span>
              <Bot className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-slate-100">
              {stats.detectedBots}
            </div>
            <div className="text-[10px] text-slate-500 font-mono mt-1">Credential stuffers blocked</div>
          </div>
        </div>
      </div>

      {/* Real-Time Threat Feed Section */}
      <CyberCard
        glow="cyan"
        header={
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2.5">
              <span className="flex h-2.5 w-2.5 relative">
                {isFeedLive && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>}
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isFeedLive ? 'bg-cyan-400' : 'bg-slate-500'}`}></span>
              </span>
              <h3 className="font-bold text-slate-100 text-sm font-mono tracking-wide">
                Real-Time Threat Telemetry Feed
              </h3>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs">
              <button
                onClick={() => setIsFeedLive(!isFeedLive)}
                className={`px-3 py-1 rounded-lg border flex items-center gap-1.5 transition-colors ${
                  isFeedLive
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                    : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                {isFeedLive ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                <span>{isFeedLive ? 'PAUSE FEED' : 'RESUME FEED'}</span>
              </button>
            </div>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 text-[11px] uppercase tracking-wider">
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Threat Type</th>
                <th className="py-2.5 px-3">Severity</th>
                <th className="py-2.5 px-3">Source Vector</th>
                <th className="py-2.5 px-3">Enforcement Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {events.map((evt, idx) => (
                <tr 
                  key={evt.id} 
                  className={`hover:bg-slate-900/90 transition-colors ${
                    idx === 0 ? 'bg-cyan-500/5 animate-pulse-glow' : ''
                  }`}
                >
                  <td className="py-3 px-3 text-slate-400 text-[11px]">{evt.timestamp}</td>
                  <td className="py-3 px-3 text-slate-100 font-semibold">{evt.threatType}</td>
                  <td className="py-3 px-3">
                    <ThreatBadge severity={evt.severity} size="sm" />
                  </td>
                  <td className="py-3 px-3 text-slate-300 text-[11px]">{evt.source}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      evt.status === 'Blocked' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                      evt.status === 'Quarantined' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
                      evt.status === 'Flagged' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    }`}>
                      {evt.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => onInvestigateAlert({
                        id: evt.id,
                        name: evt.threatType,
                        timestamp: evt.timestamp,
                        source: evt.source,
                        target: 'Internal Infrastructure Endpoint',
                        riskScore: evt.severity === 'CRITICAL' ? 95 : 78,
                        severity: evt.severity,
                        status: 'active',
                        recommendedAction: evt.action,
                        iocs: ['Source IP logged', 'Automated heuristic rule triggered'],
                        category: 'phishing',
                      })}
                      className="text-cyan-400 hover:text-cyan-300 hover:underline text-[11px] font-mono flex items-center justify-end gap-1 ml-auto"
                    >
                      <span>Investigate</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
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
