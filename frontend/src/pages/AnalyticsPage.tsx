import React from 'react';
import { CyberCard } from '../components/common/CyberCard';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { BarChart3, TrendingUp, ShieldCheck, Download, Globe } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const threatsOverTime = [
    { day: 'Mon', phishing: 45, malware: 12, bots: 120, deepfakes: 8 },
    { day: 'Tue', phishing: 52, malware: 18, bots: 145, deepfakes: 14 },
    { day: 'Wed', phishing: 88, malware: 24, bots: 210, deepfakes: 22 },
    { day: 'Thu', phishing: 64, malware: 15, bots: 180, deepfakes: 11 },
    { day: 'Fri', phishing: 95, malware: 32, bots: 290, deepfakes: 29 },
    { day: 'Sat', phishing: 30, malware: 8, bots: 90, deepfakes: 5 },
    { day: 'Sun', phishing: 40, malware: 10, bots: 110, deepfakes: 7 },
  ];

  const categoryDistribution = [
    { name: 'Phishing URLs', value: 38, color: '#EF4444' },
    { name: 'Automated Botnets', value: 28, color: '#00F0FF' },
    { name: 'Fake Accounts', value: 16, color: '#F97316' },
    { name: 'AI Deepfakes', value: 12, color: '#8B5CF6' },
    { name: 'Malware Droppers', value: 6, color: '#10B981' },
  ];

  const topTargetedAssets = [
    { asset: 'Corporate SSO Login Portal', attacks: 1420 },
    { asset: 'Executive Email Gateway', attacks: 980 },
    { asset: 'Public REST API (/v1/auth)', attacks: 850 },
    { asset: 'Press Room Media Vault', attacks: 420 },
    { asset: 'Cloud Storage Bucket', attacks: 310 },
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="bg-slate-900/60 p-5 rounded-2xl border border-cyan-500/20 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-100 font-mono tracking-wide flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-cyan-400" />
            Executive Threat Intelligence Analytics
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Historical threat frequency, category breakdown, risk trends, and asset vulnerability telemetry.
          </p>
        </div>

        <button
          onClick={() => alert('Exporting SOC Executive PDF Intelligence Summary...')}
          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono shadow-neon-cyan flex items-center gap-1.5 transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Export Analytics Summary</span>
        </button>
      </div>

      {/* Grid 1: Threats Detected Over Time */}
      <CyberCard title="Threat Velocity Over Time (7-Day Trend)" subtitle="Multi-vector threat detections">
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={threatsOverTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <XAxis dataKey="day" stroke="#64748B" fontSize={11} fontStyle="mono" />
              <YAxis stroke="#64748B" fontSize={11} fontStyle="mono" />
              <Tooltip contentStyle={{ backgroundColor: '#090D16', borderColor: '#00F0FF', borderRadius: '8px', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace' }} />
              <Line type="monotone" dataKey="phishing" name="Phishing Scans" stroke="#EF4444" strokeWidth={2} />
              <Line type="monotone" dataKey="bots" name="Automated Botnets" stroke="#00F0FF" strokeWidth={2} />
              <Line type="monotone" dataKey="malware" name="Malware Droppers" stroke="#10B981" strokeWidth={2} />
              <Line type="monotone" dataKey="deepfakes" name="Deepfake Media" stroke="#8B5CF6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CyberCard>

      {/* Grid 2: Category Distribution & Targeted Assets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Category Pie Chart */}
        <div className="lg:col-span-5">
          <CyberCard title="Threat Category Distribution" subtitle="Percentage breakdown by attack type">
            <div className="h-64 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#090D16', borderColor: '#00F0FF', borderRadius: '8px', fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 font-mono text-[11px] pt-2">
              {categoryDistribution.map((cat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-slate-300">{cat.name}: {cat.value}%</span>
                </div>
              ))}
            </div>
          </CyberCard>
        </div>

        {/* Most Targeted Assets Bar Chart */}
        <div className="lg:col-span-7">
          <CyberCard title="Most Targeted Enterprise Assets" subtitle="Total threat attempts logged">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topTargetedAssets} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                  <XAxis type="number" stroke="#64748B" fontSize={11} fontStyle="mono" />
                  <YAxis dataKey="asset" type="category" width={170} stroke="#64748B" fontSize={10} fontStyle="mono" />
                  <Tooltip contentStyle={{ backgroundColor: '#090D16', borderColor: '#00F0FF', borderRadius: '8px', fontSize: '12px' }} />
                  <Bar dataKey="attacks" fill="#00F0FF" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CyberCard>
        </div>
      </div>
    </div>
  );
};
