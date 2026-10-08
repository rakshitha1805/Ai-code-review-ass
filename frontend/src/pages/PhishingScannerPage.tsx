import React, { useState } from 'react';
import { analyzePhishingInput } from '../services/cyberEngine';
import { PhishingScanResult } from '../types';
import { CyberCard } from '../components/common/CyberCard';
import { ThreatBadge } from '../components/common/ThreatBadge';
import { 
  Link2, 
  Search, 
  ShieldAlert, 
  Lock, 
  Unlock, 
  Globe, 
  Repeat, 
  AlertTriangle,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export const PhishingScannerPage: React.FC = () => {
  const [urlInput, setUrlInput] = useState('https://security-verify-bank-update.com/login/auth?user_ref=8841');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<PhishingScanResult>(analyzePhishingInput('https://security-verify-bank-update.com/login/auth?user_ref=8841'));

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    setIsScanning(true);
    setTimeout(() => {
      setResult(analyzePhishingInput(urlInput));
      setIsScanning(false);
    }, 800);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="bg-slate-900/60 p-5 rounded-2xl border border-cyan-500/20 backdrop-blur-md">
        <h1 className="text-xl font-extrabold text-slate-100 font-mono tracking-wide flex items-center gap-2">
          <Link2 className="w-6 h-6 text-red-400" />
          Phishing & Credential Harvesting Scanner
        </h1>
        <p className="text-xs text-slate-400 mt-1 font-mono">
          Deep URL entropy analysis, domain typosquatting detection, SSL issuer audit, and redirect chain sandbox.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Card */}
        <div className="lg:col-span-5 space-y-4">
          <CyberCard title="URL / Email Message Submission" subtitle="Paste link or text payload">
            <form onSubmit={handleScan} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">SUSPICIOUS URL OR MESSAGE</label>
                <textarea
                  rows={5}
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://example.com or paste email text..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-100 font-mono placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 leading-relaxed"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setUrlInput('https://security-verify-bank-update.com/login/auth?user_ref=8841')}
                  className="text-[10px] bg-slate-950 text-cyan-400 px-2.5 py-1 rounded border border-slate-800 font-mono"
                >
                  Load Phishing URL
                </button>
                <button
                  type="button"
                  onClick={() => setUrlInput('https://cybershield.ai/docs/api-guide')}
                  className="text-[10px] bg-slate-950 text-emerald-400 px-2.5 py-1 rounded border border-slate-800 font-mono"
                >
                  Load Clean Domain
                </button>
              </div>

              <button
                type="submit"
                disabled={isScanning || !urlInput.trim()}
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono shadow-neon-cyan flex items-center justify-center gap-2 transition-all"
              >
                <Search className="w-4 h-4" />
                <span>SCAN URL & DOMAIN REPUTATION</span>
              </button>
            </form>
          </CyberCard>
        </div>

        {/* Scan Results Card */}
        <div className="lg:col-span-7 space-y-4">
          <CyberCard glow={result.riskScore > 70 ? 'red' : 'emerald'}>
            {/* Header Metrics */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <ThreatBadge severity={result.riskLevel} size="md" />
                  <span className="text-xs font-mono text-slate-400">URL STATUS:</span>
                  <span className={`text-xs font-bold font-mono ${result.urlStatus === 'Clean' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {result.urlStatus.toUpperCase()}
                  </span>
                </div>
                <div className="text-xs font-mono text-cyan-300 truncate max-w-md">
                  {result.urlOrMessage}
                </div>
              </div>

              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center font-mono">
                <span className="text-[10px] text-slate-500 block">RISK SCORE</span>
                <span className={`text-2xl font-extrabold ${result.riskScore > 70 ? 'text-red-400 glow-text-red' : 'text-emerald-400'}`}>
                  {result.riskScore}%
                </span>
              </div>
            </div>

            {/* Technical Domain Telemetry Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 font-mono text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 text-[10px] block">DOMAIN AGE</span>
                <span className="text-slate-100 font-bold text-sm">{result.domainAge}</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 text-[10px] block">HTTPS STATUS</span>
                <div className="flex items-center gap-1 mt-0.5">
                  {result.httpsStatus ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" /> SECURE
                    </span>
                  ) : (
                    <span className="text-red-400 font-bold flex items-center gap-1">
                      <Unlock className="w-3.5 h-3.5" /> UNTRUSTED
                    </span>
                  )}
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 text-[10px] block">DOMAIN ENTROPY</span>
                <span className="text-slate-100 font-bold text-sm">{result.domainEntropy} / 5.0</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 text-[10px] block font-mono">REDIRECT HOPS</span>
                <span className="text-slate-100 font-bold text-sm">{result.redirectCount} Hops</span>
              </div>
            </div>

            {/* Typosquatting & Keyword Analysis */}
            {result.typosquattingMatch && (
              <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-500/40 mb-4 font-mono text-xs text-red-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-red-400" />
                  <span>Typosquatting Impersonation Detected: Target mimics <strong>{result.typosquattingMatch}</strong></span>
                </div>
                <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded font-bold">MATCH</span>
              </div>
            )}

            {/* Explanation & Action */}
            <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30 text-xs text-slate-200 leading-relaxed font-sans mb-4">
              <strong className="text-cyan-400 font-mono block mb-1">SOC THREAT ASSESSMENT:</strong>
              {result.recommendation}
            </div>

            {/* Footer Action */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => alert(`Submitted URL ${result.urlOrMessage} to global DNS blacklists...`)}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-slate-950 font-bold text-xs font-mono shadow-neon-red transition-all"
              >
                Sinkhole Domain & Blacklist IP
              </button>
            </div>
          </CyberCard>
        </div>
      </div>
    </div>
  );
};
