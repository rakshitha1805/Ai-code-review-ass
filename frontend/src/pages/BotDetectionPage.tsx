import React, { useState, useEffect } from 'react';
import { INITIAL_BOT_METRICS } from '../services/mockData';
import { BotTrafficMetrics } from '../types';
import { CyberCard } from '../components/common/CyberCard';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { 
  Bot, 
  Activity, 
  ShieldAlert, 
  Users, 
  Zap, 
  Globe, 
  Filter,
  RefreshCw 
} from 'lucide-react';

export const BotDetectionPage: React.FC = () => {
  const [metrics, setMetrics] = useState<BotTrafficMetrics>(INITIAL_BOT_METRICS);

  // Live traffic RPM jitter simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => {
        const delta = Math.floor(Math.random() * 120) - 60;
        return {
          ...prev,
          requestsPerMin: Math.max(2000, prev.requestsPerMin + delta),
        };
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 font-sans">
      <div className="bg-slate-900/60 p-5 rounded-2xl border border-cyan-500/20 backdrop-blur-md">
        <h1 className="text-xl font-extrabold text-slate-100 font-mono tracking-wide flex items-center gap-2">
          <Bot className="w-6 h-6 text-amber-400" />
          Automated Bot & Rate Limit Mitigation Engine
        </h1>
        <p className="text-xs text-slate-400 mt-1 font-mono">
          Distinguish human traffic from automated headless scrapers, credential stuffers, and botnet surges.
        </p>
      </div>

      {/* Traffic Proportion Cards Header */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono">
        <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-4">
          <div className="text-slate-400 text-xs flex items-center justify-between mb-1">
            <span>HUMAN TRAFFIC</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">{metrics.humanPercent}%</div>
          <div className="w-full bg-slate-950 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-emerald-500 h-full" style={{ width: `${metrics.humanPercent}%` }} />
          </div>
        </div>

        <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-4">
          <div className="text-slate-400 text-xs flex items-center justify-between mb-1">
            <span>AUTOMATED TRAFFIC</span>
            <Bot className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-cyan-400">{metrics.automatedPercent}%</div>
          <div className="w-full bg-slate-950 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-cyan-500 h-full" style={{ width: `${metrics.automatedPercent}%` }} />
          </div>
        </div>

        <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-4">
          <div className="text-slate-400 text-xs flex items-center justify-between mb-1">
            <span>SUSPICIOUS ANOMALIES</span>
            <ShieldAlert className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-2xl font-bold text-red-400 glow-text-red">{metrics.suspiciousPercent}%</div>
          <div className="w-full bg-slate-950 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-red-500 h-full" style={{ width: `${metrics.suspiciousPercent}%` }} />
          </div>
        </div>

        <div className="rounded-xl bg-cyan-950/20 border border-cyan-500/30 p-4">
          <div className="text-cyan-400 text-xs flex items-center justify-between mb-1">
            <span>REQUESTS PER MIN (RPM)</span>
            <Activity className="w-4 h-4 animate-pulse text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-slate-100 glow-text-cyan">{metrics.requestsPerMin.toLocaleString()}</div>
          <div className="text-[10px] text-cyan-400 mt-1 font-mono">Live Edge Rate Limiter Active</div>
        </div>
      </div>

      {/* Real-Time Traffic Graph */}
      <CyberCard
        glow="cyan"
        title="Real-Time Network Traffic Breakdown"
        subtitle="Requests per minute (Human vs Automated vs Suspicious Bot Traffic)"
      >
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={metrics.trafficGraphData}>
              <defs>
                <linearGradient id="humanGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="botGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#00F0FF" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="suspGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <XAxis dataKey="time" stroke="#64748B" fontSize={11} fontStyle="mono" />
              <YAxis stroke="#64748B" fontSize={11} fontStyle="mono" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#090D16', borderColor: '#00F0FF', borderRadius: '8px', fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="human" name="Human Traffic" stroke="#10B981" fillOpacity={1} fill="url(#humanGrad)" />
              <Area type="monotone" dataKey="bot" name="Automated Crawlers" stroke="#00F0FF" fillOpacity={1} fill="url(#botGrad)" />
              <Area type="monotone" dataKey="suspicious" name="Suspicious Botnet" stroke="#EF4444" fillOpacity={1} fill="url(#suspGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CyberCard>

      {/* Top Behavioral Anomalies & IP Activity Table */}
      <CyberCard title="Top Bot Activity Telemetry & Anomaly IP List" subtitle="Monitored in real time at SOC Edge">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 text-[11px] uppercase tracking-wider">
                <th className="py-2.5 px-3">IP Address</th>
                <th className="py-2.5 px-3">Country Node</th>
                <th className="py-2.5 px-3">Rate (RPM)</th>
                <th className="py-2.5 px-3">Fingerprint Classification</th>
                <th className="py-2.5 px-3 text-right">Edge Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {metrics.topAnomalies.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-900/90 transition-colors">
                  <td className="py-3 px-3 text-cyan-400 font-bold">{item.ip}</td>
                  <td className="py-3 px-3 text-slate-300">{item.country}</td>
                  <td className="py-3 px-3 text-amber-300 font-bold">{item.rpm} req/min</td>
                  <td className="py-3 px-3 text-slate-200 font-semibold">{item.botType}</td>
                  <td className="py-3 px-3 text-right">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                      item.status === 'Blocked' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                      item.status === 'Challenged' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    }`}>
                      {item.status.toUpperCase()}
                    </span>
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
