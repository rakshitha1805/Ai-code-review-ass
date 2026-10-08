import React, { useState, useEffect } from 'react';
import { INITIAL_ATTACK_NODES } from '../services/mockData';
import { AttackNode, ThreatCategory, ThreatSeverity } from '../types';
import { CyberCard } from '../components/common/CyberCard';
import { ThreatBadge } from '../components/common/ThreatBadge';
import { 
  Globe, 
  Filter, 
  ShieldAlert, 
  Zap, 
  Activity, 
  Play, 
  Pause, 
  RefreshCw 
} from 'lucide-react';

export const AttackVisualizationPage: React.FC = () => {
  const [nodes, setNodes] = useState<AttackNode[]>(INITIAL_ATTACK_NODES);
  const [filterType, setFilterType] = useState<string>('all');
  const [isLiveStream, setIsLiveStream] = useState(true);
  const [selectedNode, setSelectedNode] = useState<AttackNode | null>(INITIAL_ATTACK_NODES[0]);

  // Simulate new attack stream arrivals
  useEffect(() => {
    if (!isLiveStream) return;

    const interval = setInterval(() => {
      const locations = [
        { name: 'Tokyo, JP', lat: 35.6762, lng: 139.6503, ip: '172.16.0.42', country: 'Japan' },
        { name: 'Frankfurt, DE', lat: 50.1109, lng: 8.6821, ip: '185.220.101.4', country: 'Germany' },
        { name: 'San Francisco, US', lat: 37.7749, lng: -122.4194, ip: '10.0.10.88', country: 'United States' },
        { name: 'Singapore, SG', lat: 1.3521, lng: 103.8198, ip: '118.201.12.5', country: 'Singapore' },
        { name: 'London, UK', lat: 51.5074, lng: -0.1278, ip: '10.0.4.15', country: 'United Kingdom' },
        { name: 'Sydney, AU', lat: -33.8688, lng: 151.2093, ip: '192.168.10.5', country: 'Australia' },
      ];

      const types: ThreatCategory[] = ['phishing', 'malware', 'bot', 'account', 'deepfake', 'ddos'];
      const severities: ThreatSeverity[] = ['CRITICAL', 'HIGH', 'MEDIUM'];

      const src = locations[Math.floor(Math.random() * locations.length)];
      let tgt = locations[Math.floor(Math.random() * locations.length)];
      while (tgt.name === src.name) {
        tgt = locations[Math.floor(Math.random() * locations.length)];
      }

      const newAttack: AttackNode = {
        id: `atk-${Date.now()}`,
        source: src,
        target: tgt,
        type: types[Math.floor(Math.random() * types.length)],
        severity: severities[Math.floor(Math.random() * severities.length)],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' UTC',
      };

      setNodes((prev) => [newAttack, ...prev.slice(0, 10)]);
    }, 3500);

    return () => clearInterval(interval);
  }, [isLiveStream]);

  const filteredNodes = nodes.filter((n) => {
    if (filterType === 'all') return true;
    if (filterType === 'critical') return n.severity === 'CRITICAL';
    return n.type === filterType;
  });

  return (
    <div className="space-y-6 font-sans">
      <div className="bg-slate-900/60 p-5 rounded-2xl border border-cyan-500/20 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-100 font-mono tracking-wide flex items-center gap-2">
            <Globe className="w-6 h-6 text-cyan-400 animate-pulse" />
            Real-Time Cyberattack Visualization Map
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Interactive global threat stream tracking origin and destination nodes, attack vectors, and live severity paths.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setIsLiveStream(!isLiveStream)}
            className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-colors ${
              isLiveStream ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-slate-900 text-slate-400 border-slate-800'
            }`}
          >
            {isLiveStream ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isLiveStream ? 'STREAMING LIVE' : 'STREAM PAUSED'}</span>
          </button>
        </div>
      </div>

      {/* Requirement 11 Filters Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 font-mono text-xs">
        <span className="text-slate-400 text-xs flex items-center gap-1 mr-2">
          <Filter className="w-3.5 h-3.5 text-cyan-400" /> Filter Map:
        </span>
        {[
          { id: 'all', label: 'All Threats' },
          { id: 'phishing', label: 'Phishing' },
          { id: 'malware', label: 'Malware' },
          { id: 'bot', label: 'Bot Attacks' },
          { id: 'account', label: 'Account Attacks' },
          { id: 'deepfake', label: 'Deepfake' },
          { id: 'critical', label: 'Critical Only' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilterType(f.id)}
            className={`px-3 py-1.5 rounded-xl border transition-all shrink-0 ${
              filterType === f.id
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-neon-cyan'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Map SVG Canvas Card */}
        <div className="lg:col-span-8">
          <CyberCard glow="cyan" className="overflow-hidden">
            <div className="relative w-full h-[420px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
              {/* Background Grid Pattern */}
              <div className="absolute inset-0 cyber-grid-bg opacity-40" />

              {/* World Map SVG Paths Overlay */}
              <svg viewBox="0 0 1000 500" className="w-full h-full opacity-60 pointer-events-none">
                {/* Simplified Continents Graphic Paths */}
                <path
                  d="M150,120 Q200,80 280,100 T320,180 T250,260 T180,240 Z"
                  fill="#1E293B"
                  stroke="#334155"
                  strokeWidth="1"
                />
                <path
                  d="M300,280 Q340,290 380,380 T300,450 T260,350 Z"
                  fill="#1E293B"
                  stroke="#334155"
                  strokeWidth="1"
                />
                <path
                  d="M480,100 Q550,80 620,120 T580,220 T490,180 Z"
                  fill="#1E293B"
                  stroke="#334155"
                  strokeWidth="1"
                />
                <path
                  d="M490,230 Q540,240 580,350 T500,420 T460,300 Z"
                  fill="#1E293B"
                  stroke="#334155"
                  strokeWidth="1"
                />
                <path
                  d="M650,90 Q800,60 880,140 T780,280 T660,200 Z"
                  fill="#1E293B"
                  stroke="#334155"
                  strokeWidth="1"
                />
                <path
                  d="M800,320 Q880,340 850,420 T780,400 Z"
                  fill="#1E293B"
                  stroke="#334155"
                  strokeWidth="1"
                />

                {/* Animated Attack Rays Connecting Origin and Destination */}
                {filteredNodes.map((atk, i) => {
                  // Approximate longitude to X (0-1000), latitude to Y (0-500)
                  const x1 = ((atk.source.lng + 180) / 360) * 1000;
                  const y1 = ((90 - atk.source.lat) / 180) * 500;
                  const x2 = ((atk.target.lng + 180) / 360) * 1000;
                  const y2 = ((90 - atk.target.lat) / 180) * 500;

                  const midX = (x1 + x2) / 2;
                  const midY = (y1 + y2) / 2 - 50; // Curve arc control point

                  const color = atk.severity === 'CRITICAL' ? '#EF4444' : atk.severity === 'HIGH' ? '#F97316' : '#00F0FF';

                  return (
                    <g key={atk.id}>
                      {/* Curved Attack Path Ray */}
                      <path
                        d={`M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`}
                        fill="none"
                        stroke={color}
                        strokeWidth={i === 0 ? "2.5" : "1.5"}
                        strokeDasharray="6 6"
                        opacity={i === 0 ? 0.9 : 0.6}
                      />
                      {/* Origin Node Glowing Circle */}
                      <circle cx={x1} cy={y1} r="4" fill={color} className="animate-ping opacity-75" />
                      <circle cx={x1} cy={y1} r="3" fill={color} />

                      {/* Destination Target Circle */}
                      <circle cx={x2} cy={y2} r="5" fill="#10B981" />
                    </g>
                  );
                })}
              </svg>

              {/* Map Floating HUD Info */}
              <div className="absolute top-3 left-3 bg-slate-900/90 p-2.5 rounded-xl border border-cyan-500/30 font-mono text-[11px] text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>ACTIVE NODES: {filteredNodes.length}</span>
                </div>
              </div>
            </div>
          </CyberCard>
        </div>

        {/* Right Attack Stream Ticker */}
        <div className="lg:col-span-4 space-y-4">
          <CyberCard title="Live Attack Event Stream" subtitle="Select attack event to inspect telemetry">
            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1 font-mono text-xs">
              {filteredNodes.map((atk) => (
                <div
                  key={atk.id}
                  onClick={() => setSelectedNode(atk)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedNode?.id === atk.id
                      ? 'bg-cyan-500/15 border-cyan-400 shadow-neon-cyan'
                      : 'bg-slate-950 border-slate-800 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <ThreatBadge severity={atk.severity} size="sm" />
                    <span className="text-[10px] text-slate-500">{atk.timestamp}</span>
                  </div>
                  <div className="text-slate-200 font-bold truncate capitalize">
                    {atk.type} Attack Vector
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
                    <span>From: {atk.source.name}</span>
                    <span>To: {atk.target.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </CyberCard>
        </div>
      </div>
    </div>
  );
};
