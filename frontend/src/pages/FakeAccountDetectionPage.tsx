import React, { useState } from 'react';
import { analyzeFakeAccount } from '../services/cyberEngine';
import { FakeAccountResult } from '../types';
import { CyberCard } from '../components/common/CyberCard';
import { ThreatBadge } from '../components/common/ThreatBadge';
import { 
  UserX, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  UserCheck, 
  Activity, 
  Repeat, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export const FakeAccountDetectionPage: React.FC = () => {
  const [handle, setHandle] = useState('@crypto_support_official_2026');
  const [platform, setPlatform] = useState('Twitter/X');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<FakeAccountResult>(analyzeFakeAccount('@crypto_support_official_2026', 'Twitter/X'));

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handle.trim()) return;

    setIsScanning(true);
    setTimeout(() => {
      setResult(analyzeFakeAccount(handle, platform));
      setIsScanning(false);
    }, 700);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="bg-slate-900/60 p-5 rounded-2xl border border-cyan-500/20 backdrop-blur-md">
        <h1 className="text-xl font-extrabold text-slate-100 font-mono tracking-wide flex items-center gap-2">
          <UserX className="w-6 h-6 text-cyan-400" />
          Fake & Bot Account Sentinel
        </h1>
        <p className="text-xs text-slate-400 mt-1 font-mono">
          Audit social media handles, account age, follower-to-following ratios, and automated spam activity.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Card */}
        <div className="lg:col-span-5 space-y-4">
          <CyberCard title="Account Target Lookup" subtitle="Enter handle or platform profile link">
            <form onSubmit={handleScan} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">PLATFORM</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-500/60"
                >
                  <option value="Twitter/X">Twitter / X</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Telegram">Telegram</option>
                  <option value="TikTok">TikTok</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">HANDLE / PROFILE USERNAME</label>
                <input
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder="@username"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 font-mono placeholder-slate-500 focus:outline-none focus:border-cyan-500/60"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setHandle('@crypto_support_official_2026');
                    setPlatform('Twitter/X');
                  }}
                  className="text-[10px] bg-slate-950 text-cyan-400 px-2.5 py-1 rounded border border-slate-800 font-mono"
                >
                  Load Suspicious Bot
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setHandle('@alexvance');
                    setPlatform('Twitter/X');
                  }}
                  className="text-[10px] bg-slate-950 text-cyan-400 px-2.5 py-1 rounded border border-slate-800 font-mono"
                >
                  Load Verified Human
                </button>
              </div>

              <button
                type="submit"
                disabled={isScanning || !handle.trim()}
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono shadow-neon-cyan flex items-center justify-center gap-2 transition-all"
              >
                <Search className="w-4 h-4" />
                <span>INSPECT ACCOUNT TELEMETRY</span>
              </button>
            </form>
          </CyberCard>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-7 space-y-4">
          <CyberCard glow={result.riskScore > 60 ? 'red' : 'emerald'}>
            {/* Header Result summary */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-slate-500 block uppercase">TARGET HANDLE</span>
                <span className="text-xl font-bold font-mono text-cyan-400">{result.handle}</span>
                <span className="text-xs text-slate-400 ml-2 font-mono">({result.platform})</span>
                <div className="mt-1">
                  <span className="text-sm font-semibold text-slate-100 font-mono">{result.classification}</span>
                </div>
              </div>

              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center font-mono">
                <span className="text-[10px] text-slate-500 block">ACCOUNT RISK SCORE</span>
                <span className={`text-2xl font-extrabold ${result.riskScore > 60 ? 'text-red-400 glow-text-red' : 'text-emerald-400'}`}>
                  {result.riskScore}%
                </span>
              </div>
            </div>

            {/* Key Signal Telemetry Cards */}
            <div className="grid grid-cols-3 gap-3 mb-6 font-mono text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="text-slate-500 text-[10px] flex items-center gap-1 mb-1">
                  <Clock className="w-3 h-3 text-cyan-400" /> Account Age
                </div>
                <span className="text-slate-100 font-bold text-sm">{result.accountAgeDays} Days</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="text-slate-500 text-[10px] flex items-center gap-1 mb-1">
                  <UserCheck className="w-3 h-3 text-cyan-400" /> Profile Complete
                </div>
                <span className="text-slate-100 font-bold text-sm">{result.profileCompleteness}%</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="text-slate-500 text-[10px] flex items-center gap-1 mb-1">
                  <Activity className="w-3 h-3 text-cyan-400" /> Follower Ratio
                </div>
                <span className="text-slate-100 font-bold text-sm">{result.followerFollowingRatio}</span>
              </div>
            </div>

            {/* Individual Risk Factors Breakdown */}
            <div className="space-y-3 mb-6">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Evaluated Behavioral Risk Signals
              </h4>

              {result.riskFactors.map((factor, idx) => (
                <div 
                  key={idx} 
                  className={`p-3.5 rounded-xl border font-mono text-xs flex items-start gap-3 ${
                    factor.severity === 'high' 
                      ? 'bg-red-950/20 border-red-500/30 text-slate-200' 
                      : factor.severity === 'medium'
                      ? 'bg-amber-950/20 border-amber-500/30 text-slate-200'
                      : 'bg-slate-950 border-slate-850 text-slate-300'
                  }`}
                >
                  <div className="mt-0.5">
                    {factor.severity === 'high' ? (
                      <ShieldAlert className="w-4 h-4 text-red-400" />
                    ) : factor.severity === 'medium' ? (
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-100">{factor.name}</span>
                      <span className={`text-[10px] uppercase font-bold px-1.5 py-0.2 rounded ${
                        factor.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                        factor.severity === 'medium' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {factor.severity}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 font-sans">{factor.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Verdict Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30 text-xs text-slate-200 leading-relaxed font-sans">
              <strong className="text-cyan-400 font-mono block mb-1">SOC VERDICT EXPLANATION:</strong>
              {result.verdict}
            </div>
          </CyberCard>
        </div>
      </div>
    </div>
  );
};
