import React, { useState } from 'react';
import { analyzeAIContent } from '../services/cyberEngine';
import { AIContentAnalysisResult } from '../types';
import { CyberCard } from '../components/common/CyberCard';
import { CircularProgress } from '../components/common/CircularProgress';
import { 
  FileText, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Cpu, 
  RefreshCw, 
  ArrowRight 
} from 'lucide-react';

export const AIContentDetectionPage: React.FC = () => {
  const [inputText, setInputText] = useState(
    'Dear Valued Customer, We have identified an anomalous transaction attempt on your account. To delve further into this issue and prevent account termination, please verify your security credentials immediately using our secure portal.'
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AIContentAnalysisResult>(analyzeAIContent(inputText));

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysis(analyzeAIContent(inputText));
      setIsAnalyzing(false);
    }, 600);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="bg-slate-900/60 p-5 rounded-2xl border border-cyan-500/20 backdrop-blur-md">
        <h1 className="text-xl font-extrabold text-slate-100 font-mono tracking-wide flex items-center gap-2">
          <FileText className="w-6 h-6 text-cyan-400" />
          AI-Generated Content Detector
        </h1>
        <p className="text-xs text-slate-400 mt-1 font-mono">
          Detect machine-synthesized text, LLM phishes, perplexity metrics, and burstiness syntactic variance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Text Card */}
        <div className="lg:col-span-6 space-y-4">
          <CyberCard title="Content Input Inspector" subtitle="Paste text content or email snippet">
            <form onSubmit={handleAnalyze} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  TEXT PAYLOAD
                </label>
                <textarea
                  rows={8}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste text content here..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 font-mono leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">
                  Length: {inputText.trim().split(/\s+/).filter(Boolean).length} words
                </span>
                <button
                  type="button"
                  onClick={() => setInputText('Hey team! Quick update on the release scheduled for tomorrow morning. All regression tests passed cleanly on staging.')}
                  className="text-cyan-400 hover:underline text-[11px]"
                >
                  Load Human Sample Text
                </button>
              </div>

              <button
                type="submit"
                disabled={isAnalyzing || !inputText.trim()}
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono shadow-neon-cyan flex items-center justify-center gap-2 transition-all"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>CALCULATING PERPLEXITY METRICS...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>ANALYZE AI PROBABILITY</span>
                  </>
                )}
              </button>
            </form>
          </CyberCard>
        </div>

        {/* Results Circular Visualization Card */}
        <div className="lg:col-span-6 space-y-4">
          <CyberCard glow={analysis.aiProbability > 50 ? 'red' : 'emerald'}>
            <div className="flex flex-col items-center text-center">
              <h3 className="text-sm font-bold font-mono text-slate-200 mb-4 uppercase tracking-wider">
                Syntactic Generation Probability
              </h3>

              {/* Interactive Circular Progress Visualization */}
              <div className="my-2">
                <CircularProgress
                  score={analysis.aiProbability}
                  size={190}
                  strokeWidth={16}
                  label="AI GENERATED"
                  sublabel={`Human: ${analysis.humanProbability}%`}
                />
              </div>

              {/* Confidence Badge */}
              <div className="mt-2 bg-slate-950 px-3 py-1 rounded-full border border-cyan-500/30 text-xs font-mono text-cyan-300">
                AI Confidence Score: <strong>{analysis.confidence}%</strong>
              </div>

              {/* Analysis Summary */}
              <div className="mt-5 p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 text-left w-full leading-relaxed">
                <div className="font-mono text-cyan-400 font-semibold mb-1 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" /> SYNTACTIC SUMMARY
                </div>
                {analysis.summary}
              </div>

              {/* Heuristic Metrics Table */}
              <div className="mt-4 w-full grid grid-cols-2 gap-3 text-left font-mono text-xs">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">PERPLEXITY SCORE</span>
                  <span className="text-slate-100 font-bold text-sm">{analysis.perplexityScore}</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Lower = LLM Predictable</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 text-[10px] block font-mono">BURSTINESS SCORE</span>
                  <span className="text-slate-100 font-bold text-sm">{analysis.burstinessScore}</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Lower = Uniform Cadence</span>
                </div>
              </div>

              {/* Indicator Bars */}
              <div className="mt-5 w-full text-left space-y-2.5">
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Detection Indicator Signals
                </h4>
                {analysis.indicators.map((ind, i) => (
                  <div key={i} className="bg-slate-950 p-2.5 rounded-xl border border-slate-850 space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-300">{ind.label}</span>
                      <span className={ind.status === 'warning' ? 'text-red-400 font-bold' : 'text-emerald-400'}>
                        {ind.score}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${ind.status === 'warning' ? 'bg-red-500' : 'bg-emerald-500'}`}
                        style={{ width: `${ind.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CyberCard>
        </div>
      </div>
    </div>
  );
};
