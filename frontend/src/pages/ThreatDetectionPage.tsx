import React, { useState } from 'react';
import { UnifiedThreatResult } from '../types';
import { analyzeUnifiedInput } from '../services/cyberEngine';
import { DEMO_PRESETS } from '../services/mockData';
import { CyberCard } from '../components/common/CyberCard';
import { ThreatBadge } from '../components/common/ThreatBadge';
import { LiveScanAnimation } from '../components/common/LiveScanAnimation';
import { 
  ShieldAlert, 
  Link2, 
  FileText, 
  UserX, 
  Image as ImageIcon, 
  Video, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  Terminal, 
  AlertTriangle,
  Download,
  Sparkles
} from 'lucide-react';

interface ThreatDetectionProps {
  initialResult?: UnifiedThreatResult | null;
  onRunScan: (res: UnifiedThreatResult) => void;
  onInvestigate: (res: UnifiedThreatResult) => void;
}

export const ThreatDetectionPage: React.FC<ThreatDetectionProps> = ({
  initialResult,
  onRunScan,
  onInvestigate,
}) => {
  const [inputType, setInputType] = useState<'text' | 'url' | 'image' | 'video' | 'social' | 'account'>('url');
  const [inputVal, setInputVal] = useState(DEMO_PRESETS.phishingUrl);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<UnifiedThreatResult | null>(initialResult || null);

  const handleTabChange = (type: 'text' | 'url' | 'image' | 'video' | 'social' | 'account') => {
    setInputType(type);
    if (type === 'url') setInputVal(DEMO_PRESETS.phishingUrl);
    else if (type === 'text') setInputVal(DEMO_PRESETS.aiText);
    else if (type === 'social') setInputVal(DEMO_PRESETS.fakeProfile);
    else if (type === 'image' || type === 'video') setInputVal('sample_executive_asset.mp4');
    else setInputVal('Account_ID_#99482');
  };

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    setIsScanning(true);
    setResult(null);

    setTimeout(() => {
      const res = analyzeUnifiedInput(inputVal, inputType);
      setResult(res);
      setIsScanning(false);
      onRunScan(res);
    }, 1200);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="bg-slate-900/60 p-5 rounded-2xl border border-cyan-500/20 backdrop-blur-md">
        <h1 className="text-xl font-extrabold text-slate-100 font-mono tracking-wide flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-cyan-400" />
          AI Multi-Vector Threat Analyzer
        </h1>
        <p className="text-xs text-slate-400 mt-1 font-mono">
          Unified heuristic neural pipeline for Text, URLs, Media, Social Profiles, and Account Identifiers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Selector & Form */}
        <div className="lg:col-span-5 space-y-4">
          <CyberCard title="Input Vector Submission" subtitle="Select content vector to analyze">
            {/* Input Vector Tabs */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <button
                onClick={() => handleTabChange('url')}
                className={`p-2.5 rounded-xl text-xs font-mono flex flex-col items-center gap-1 transition-all ${
                  inputType === 'url' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-neon-cyan' : 'bg-slate-950 text-slate-400 border border-slate-800'
                }`}
              >
                <Link2 className="w-4 h-4" />
                <span>URL</span>
              </button>

              <button
                onClick={() => handleTabChange('text')}
                className={`p-2.5 rounded-xl text-xs font-mono flex flex-col items-center gap-1 transition-all ${
                  inputType === 'text' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-neon-cyan' : 'bg-slate-950 text-slate-400 border border-slate-800'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Text / Mail</span>
              </button>

              <button
                onClick={() => handleTabChange('social')}
                className={`p-2.5 rounded-xl text-xs font-mono flex flex-col items-center gap-1 transition-all ${
                  inputType === 'social' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-neon-cyan' : 'bg-slate-950 text-slate-400 border border-slate-800'
                }`}
              >
                <UserX className="w-4 h-4" />
                <span>Social Profile</span>
              </button>

              <button
                onClick={() => handleTabChange('image')}
                className={`p-2.5 rounded-xl text-xs font-mono flex flex-col items-center gap-1 transition-all ${
                  inputType === 'image' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-neon-cyan' : 'bg-slate-950 text-slate-400 border border-slate-800'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Image</span>
              </button>

              <button
                onClick={() => handleTabChange('video')}
                className={`p-2.5 rounded-xl text-xs font-mono flex flex-col items-center gap-1 transition-all ${
                  inputType === 'video' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-neon-cyan' : 'bg-slate-950 text-slate-400 border border-slate-800'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>Video</span>
              </button>

              <button
                onClick={() => handleTabChange('account')}
                className={`p-2.5 rounded-xl text-xs font-mono flex flex-col items-center gap-1 transition-all ${
                  inputType === 'account' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-neon-cyan' : 'bg-slate-950 text-slate-400 border border-slate-800'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Account Info</span>
              </button>
            </div>

            <form onSubmit={handleAnalyze} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  TARGET ASSET / CONTENT PAYLOAD
                </label>
                {inputType === 'text' ? (
                  <textarea
                    rows={4}
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Paste text content or raw payload..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 font-mono"
                  />
                ) : (
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Enter URL, handle, or filename..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 font-mono"
                  />
                )}
              </div>

              {/* 1-Click Demo Presets Bar */}
              <div className="pt-2 border-t border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 block mb-1.5">1-CLICK DEMO SCENARIOS:</span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setInputType('url');
                      setInputVal(DEMO_PRESETS.phishingUrl);
                    }}
                    className="text-[10px] bg-slate-950 hover:bg-slate-800 text-cyan-300 px-2 py-1 rounded border border-slate-800 font-mono"
                  >
                    Phishing URL
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setInputType('text');
                      setInputVal(DEMO_PRESETS.aiText);
                    }}
                    className="text-[10px] bg-slate-950 hover:bg-slate-800 text-cyan-300 px-2 py-1 rounded border border-slate-800 font-mono"
                  >
                    AI BEC Text
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setInputType('social');
                      setInputVal(DEMO_PRESETS.fakeProfile);
                    }}
                    className="text-[10px] bg-slate-950 hover:bg-slate-800 text-cyan-300 px-2 py-1 rounded border border-slate-800 font-mono"
                  >
                    Fake Handle
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isScanning || !inputVal.trim()}
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono shadow-neon-cyan flex items-center justify-center gap-2 transition-all"
              >
                <span>RUN AI THREAT ANALYSIS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </CyberCard>
        </div>

        {/* Right Column: Scan Loading or Detailed Results Output */}
        <div className="lg:col-span-7 space-y-4">
          {isScanning ? (
            <LiveScanAnimation statusText={`Executing neural inspection on ${inputType.toUpperCase()} vector...`} progressPercent={78} />
          ) : result ? (
            <CyberCard glow={result.riskScore > 70 ? 'red' : 'cyan'}>
              {/* Result Summary Bar */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 mb-6">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <ThreatBadge severity={result.threatLevel} size="lg" />
                    <span className="text-base font-bold text-slate-100 font-mono">
                      {result.classification}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-cyan-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                    EVALUATED AT: {result.evaluatedAt}
                  </span>
                </div>

                {/* Score Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800/80 font-mono text-xs">
                  <div>
                    <span className="text-slate-500 text-[10px] block">RISK SCORE</span>
                    <span className={`text-xl font-bold ${result.riskScore > 70 ? 'text-red-400' : 'text-emerald-400'}`}>
                      {result.riskScore}%
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">CONFIDENCE</span>
                    <span className="text-xl font-bold text-cyan-300">
                      {result.confidence}%
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">VECTOR TYPE</span>
                    <span className="text-sm font-bold text-slate-200 uppercase">
                      {result.inputType}
                    </span>
                  </div>
                </div>
              </div>

              {/* Detection Explanation */}
              <div className="mb-6">
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Detection Heuristic Explanation
                </h4>
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 leading-relaxed font-sans">
                  {result.explanation}
                </div>
              </div>

              {/* Indicators of Compromise (IoCs) */}
              <div className="mb-6">
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" /> Cataloged Indicators of Compromise
                </h4>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs text-cyan-300">
                  {result.indicators.map((ioc, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-slate-900/80 p-2 rounded border border-slate-850">
                      <span className="text-cyan-500 font-bold">&gt;</span>
                      <span>{ioc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Action Box */}
              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/40 mb-6">
                <h4 className="text-xs font-mono text-cyan-300 uppercase tracking-wider mb-1 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Recommended Action Protocol
                </h4>
                <p className="text-xs text-slate-200 leading-relaxed">{result.recommendation}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => onInvestigate(result)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-cyan-500/30 font-mono text-xs font-semibold transition-colors"
                >
                  Full Forensic Breakdown
                </button>
                <button
                  onClick={() => alert(`Enforcing quarantine policy on ${result.targetSubject}...`)}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-slate-950 font-bold text-xs font-mono shadow-neon-red transition-all"
                >
                  Quarantine & Block Target
                </button>
              </div>
            </CyberCard>
          ) : (
            <div className="rounded-2xl bg-slate-900/40 border border-slate-800 p-12 text-center flex flex-col items-center justify-center">
              <ShieldAlert className="w-12 h-12 text-slate-600 mb-3" />
              <h3 className="text-sm font-semibold text-slate-300 font-mono">No Active Threat Inspection</h3>
              <p className="text-xs text-slate-500 max-w-sm mt-1 font-mono">
                Select an input vector on the left and click "RUN AI THREAT ANALYSIS" to view risk score and IoC indicators.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
