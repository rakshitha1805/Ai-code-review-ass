import React, { useState } from 'react';
import { NavigationTab, UnifiedThreatResult } from '../types';
import { analyzeUnifiedInput } from '../services/cyberEngine';
import { RadarAnimation } from '../components/common/RadarAnimation';
import { ThreatBadge } from '../components/common/ThreatBadge';
import { 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Lock, 
  Globe, 
  Cpu, 
  Zap, 
  CheckCircle2, 
  FileText, 
  UserX, 
  Link2, 
  Bot, 
  Image as ImageIcon,
  Activity,
  ChevronRight
} from 'lucide-react';

interface LandingPageProps {
  setActiveTab: (tab: NavigationTab) => void;
  onRunScan: (result: UnifiedThreatResult) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  setActiveTab,
  onRunScan,
}) => {
  const [quickInput, setQuickInput] = useState('');
  const [quickType, setQuickType] = useState<'url' | 'text' | 'social'>('url');
  const [isScanning, setIsScanning] = useState(false);
  const [quickResult, setQuickResult] = useState<UnifiedThreatResult | null>(null);

  const handleQuickScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickInput.trim()) return;

    setIsScanning(true);
    setQuickResult(null);

    setTimeout(() => {
      const result = analyzeUnifiedInput(quickInput, quickType);
      setQuickResult(result);
      setIsScanning(false);
      onRunScan(result);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#070A11] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black pb-16">
      {/* Background Cyber Grid & Glowing Orbs */}
      <div className="fixed inset-0 cyber-grid-bg pointer-events-none opacity-40" />
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-10 right-10 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-mono text-xs shadow-neon-cyan">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>NEXT-GENERATION SOC THREAT PLATFORM v4.2</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              AI-Powered Cybersecurity for a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-200 glow-text-cyan">
                Safer Digital World
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              Detect, analyze, and prevent digital threats in real time with intelligent AI-driven security. Protect your enterprise against deepfakes, phishing attacks, automated botnets, and synthetic content.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setActiveTab('threat-detection')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm font-mono flex items-center gap-2 shadow-neon-cyan transition-all transform hover:-translate-y-0.5"
              >
                <span>Start Threat Analysis</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('overview')}
                className="px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-100 font-semibold text-sm border border-cyan-500/30 hover:border-cyan-400 font-mono flex items-center gap-2 transition-all"
              >
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>Explore Dashboard</span>
              </button>
            </div>

            {/* Key Statistics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-slate-800/80">
              <div className="bg-slate-900/40 p-3.5 rounded-xl border border-slate-800">
                <div className="text-2xl font-bold font-mono text-cyan-400 glow-text-cyan">99.8%</div>
                <div className="text-xs text-slate-400 mt-1 font-mono">Threat Detection</div>
              </div>
              <div className="bg-slate-900/40 p-3.5 rounded-xl border border-slate-800">
                <div className="text-2xl font-bold font-mono text-blue-400 flex items-center gap-1">
                  <span>Real-Time</span>
                </div>
                <div className="text-xs text-slate-400 mt-1 font-mono">SOC Monitoring</div>
              </div>
              <div className="bg-slate-900/40 p-3.5 rounded-xl border border-slate-800">
                <div className="text-2xl font-bold font-mono text-cyan-300">AI-Powered</div>
                <div className="text-xs text-slate-400 mt-1 font-mono">Multi-Vector Scan</div>
              </div>
              <div className="bg-slate-900/40 p-3.5 rounded-xl border border-slate-800">
                <div className="text-2xl font-bold font-mono text-emerald-400">24/7</div>
                <div className="text-xs text-slate-400 mt-1 font-mono">Autonomous Protection</div>
              </div>
            </div>
          </div>

          {/* Hero Right Visual: Interactive Cyber Radar & Nodes */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative p-6 rounded-3xl bg-slate-900/40 border border-cyan-500/20 backdrop-blur-xl shadow-2xl flex flex-col items-center">
              <RadarAnimation size={300} activeHits={6} />
              
              <div className="mt-6 text-center space-y-1">
                <h3 className="font-mono text-sm font-semibold text-slate-200">
                  Global Threat Matrix Active
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Scanning 1.4B network parameters across 180 countries
                </p>
              </div>

              {/* Live Threat Pill Floating Badge */}
              <div className="mt-4 bg-slate-950/90 border border-red-500/40 px-3.5 py-1.5 rounded-full flex items-center gap-2 font-mono text-xs text-red-400 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-red-500 shadow-neon-red" />
                <span>Intercepted: Zero-Day Phishing Domain #8821</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Quick Threat Scanner Widget */}
      <section className="relative max-w-5xl mx-auto px-4 sm:px-6 mb-20">
        <div className="rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-cyan-500/30 p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-400/40 text-cyan-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100 font-mono">Instant AI Threat Analyzer</h3>
              <p className="text-xs text-slate-400 font-mono">Test any URL, suspicious message, or social handle in real time</p>
            </div>
          </div>

          {/* Input Type Selector */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setQuickType('url')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                quickType === 'url'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              URL / Domain
            </button>
            <button
              onClick={() => setQuickType('text')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                quickType === 'text'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              Text / Email Body
            </button>
            <button
              onClick={() => setQuickType('social')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                quickType === 'social'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              Social Handle (@user)
            </button>
          </div>

          <form onSubmit={handleQuickScan} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={quickInput}
              onChange={(e) => setQuickInput(e.target.value)}
              placeholder={
                quickType === 'url'
                  ? 'Paste URL e.g. https://security-verify-bank-update.com'
                  : quickType === 'text'
                  ? 'Paste suspicious email text or message...'
                  : 'Enter social handle e.g. @crypto_support_official_2026'
              }
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 font-mono"
            />
            <button
              type="submit"
              disabled={isScanning}
              className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono shadow-neon-cyan flex items-center justify-center gap-2 transition-all"
            >
              {isScanning ? (
                <>
                  <Activity className="w-4 h-4 animate-spin text-slate-950" />
                  <span>ANALYZING...</span>
                </>
              ) : (
                <>
                  <span>ANALYZE THREAT</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Result Preview Card */}
          {quickResult && (
            <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-cyan-500/40 animate-pulse-glow">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <ThreatBadge severity={quickResult.threatLevel} size="md" />
                  <span className="text-sm font-bold text-slate-100 font-mono">{quickResult.classification}</span>
                </div>
                <span className="text-xs font-mono text-cyan-400">
                  Risk Score: <strong className="text-red-400 text-sm">{quickResult.riskScore}%</strong> | Confidence: {quickResult.confidence}%
                </span>
              </div>
              <p className="text-xs text-slate-300 mb-3">{quickResult.explanation}</p>
              <div className="flex justify-end">
                <button
                  onClick={() => setActiveTab('threat-detection')}
                  className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
                >
                  View Complete Multi-Vector Analysis <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Modular Platform Capabilities Grid */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
            Unified Cyber Defense Modules
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto mt-2">
            Comprehensive artificial intelligence layer protecting all enterprise digital touchpoints
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: AI Content Detection */}
          <div 
            onClick={() => setActiveTab('ai-content')}
            className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:shadow-neon-cyan transition-all cursor-pointer group"
          >
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 w-fit mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-100 text-base mb-2 font-mono group-hover:text-cyan-400 transition-colors">
              AI-Generated Content Detection
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Identify machine-generated text, synthetic phishes, and LLM-crafted social engineering communications.
            </p>
            <span className="text-xs font-mono text-cyan-400 flex items-center gap-1">
              Explore Module <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 2: Fake Account Detection */}
          <div 
            onClick={() => setActiveTab('fake-account')}
            className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:shadow-neon-cyan transition-all cursor-pointer group"
          >
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 w-fit mb-4 group-hover:scale-110 transition-transform">
              <UserX className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-100 text-base mb-2 font-mono group-hover:text-cyan-400 transition-colors">
              Fake Account Sentinel
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Expose brand impersonators, botnet accounts, and suspicious social media handles using activity telemetry.
            </p>
            <span className="text-xs font-mono text-cyan-400 flex items-center gap-1">
              Explore Module <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 3: Phishing Scanner */}
          <div 
            onClick={() => setActiveTab('phishing')}
            className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:shadow-neon-cyan transition-all cursor-pointer group"
          >
            <div className="p-3 rounded-xl bg-red-500/10 text-red-400 w-fit mb-4 group-hover:scale-110 transition-transform">
              <Link2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-100 text-base mb-2 font-mono group-hover:text-cyan-400 transition-colors">
              Phishing Scanner
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Audit suspicious URLs, domain typosquatting, credential harvesting forms, and obfuscated payload redirects.
            </p>
            <span className="text-xs font-mono text-cyan-400 flex items-center gap-1">
              Explore Module <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 4: Bot Detection */}
          <div 
            onClick={() => setActiveTab('bot-detection')}
            className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:shadow-neon-cyan transition-all cursor-pointer group"
          >
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 w-fit mb-4 group-hover:scale-110 transition-transform">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-100 text-base mb-2 font-mono group-hover:text-cyan-400 transition-colors">
              Automated Bot Mitigation
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Distinguish human traffic from automated crawlers, credential stuffers, and DDoS botnets in real time.
            </p>
            <span className="text-xs font-mono text-cyan-400 flex items-center gap-1">
              Explore Module <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 5: Deepfake Detection */}
          <div 
            onClick={() => setActiveTab('deepfake')}
            className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:shadow-neon-cyan transition-all cursor-pointer group"
          >
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 w-fit mb-4 group-hover:scale-110 transition-transform">
              <ImageIcon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-100 text-base mb-2 font-mono group-hover:text-cyan-400 transition-colors">
              Deepfake Media Scanner
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Perform facial geometry inconsistency checks, spectral noise analysis, and GAN/Diffusion detection.
            </p>
            <span className="text-xs font-mono text-cyan-400 flex items-center gap-1">
              Explore Module <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 6: Attack Visualization */}
          <div 
            onClick={() => setActiveTab('attack-map')}
            className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:shadow-neon-cyan transition-all cursor-pointer group"
          >
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit mb-4 group-hover:scale-110 transition-transform">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-100 text-base mb-2 font-mono group-hover:text-cyan-400 transition-colors">
              Live Global Attack Map
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Visualize cyberattack vectors globally in real time with interactive origin-destination attack streams.
            </p>
            <span className="text-xs font-mono text-cyan-400 flex items-center gap-1">
              Explore Module <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </section>

      {/* Enterprise Trust Badges */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-800/80">
        <div className="flex flex-wrap items-center justify-between gap-6 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2 text-cyan-400 font-semibold">
            <ShieldCheck className="w-4 h-4" /> Enterprise Defense Platform
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <span>SOC 2 Type II Certified</span>
            <span>•</span>
            <span>ISO 27001 Compliant</span>
            <span>•</span>
            <span>GDPR Zero-Retention</span>
            <span>•</span>
            <span>Zero-Trust Architecture</span>
          </div>
        </div>
      </section>
    </div>
  );
};
