import React, { useState } from 'react';
import { analyzeDeepfake } from '../services/cyberEngine';
import { DeepfakeAnalysisResult } from '../types';
import { CyberCard } from '../components/common/CyberCard';
import { ThreatBadge } from '../components/common/ThreatBadge';
import { CircularProgress } from '../components/common/CircularProgress';
import { 
  Image as ImageIcon, 
  Video, 
  Upload, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  FileCheck, 
  Info,
  RefreshCw
} from 'lucide-react';

export const DeepfakeDetectionPage: React.FC = () => {
  const [fileName, setFileName] = useState('executive_video_statement.mp4');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('video');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<DeepfakeAnalysisResult>(analyzeDeepfake('executive_video_statement.mp4', 'video'));

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    setIsScanning(true);
    setTimeout(() => {
      setResult(analyzeDeepfake(fileName, mediaType));
      setIsScanning(false);
    }, 900);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="bg-slate-900/60 p-5 rounded-2xl border border-cyan-500/20 backdrop-blur-md">
        <h1 className="text-xl font-extrabold text-slate-100 font-mono tracking-wide flex items-center gap-2">
          <ImageIcon className="w-6 h-6 text-purple-400" />
          Deepfake & Synthetic Media Forensic Scanner
        </h1>
        <p className="text-xs text-slate-400 mt-1 font-mono">
          Detect facial landmark warping, blinking anomaly index, spectral frequency noise, and Diffusion/GAN artifacts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* File Upload / Input Form Card */}
        <div className="lg:col-span-5 space-y-4">
          <CyberCard title="Media Asset Upload" subtitle="Drop image or video asset for deepfake verification">
            <form onSubmit={handleAnalyze} className="space-y-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setMediaType('video')}
                  className={`flex-1 p-2.5 rounded-xl text-xs font-mono flex items-center justify-center gap-2 transition-all ${
                    mediaType === 'video' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-neon-cyan' : 'bg-slate-950 text-slate-400 border border-slate-800'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  <span>Video File</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMediaType('image')}
                  className={`flex-1 p-2.5 rounded-xl text-xs font-mono flex items-center justify-center gap-2 transition-all ${
                    mediaType === 'image' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-neon-cyan' : 'bg-slate-950 text-slate-400 border border-slate-800'
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Image File</span>
                </button>
              </div>

              {/* Upload Drop Zone Simulation */}
              <div className="border-2 border-dashed border-cyan-500/30 rounded-2xl p-6 text-center bg-slate-950/60 hover:border-cyan-400 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-cyan-400 mx-auto mb-2 animate-bounce" />
                <span className="text-xs font-mono text-slate-200 block font-semibold">
                  Click or drag media file to analyze
                </span>
                <span className="text-[10px] font-mono text-slate-500 block mt-1">
                  Supports MP4, AVI, MOV, PNG, JPG (Max 500MB)
                </span>
                <div className="mt-3 inline-block bg-slate-900 px-3 py-1 rounded border border-slate-800 text-[11px] font-mono text-cyan-300">
                  Current Asset: {fileName}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setFileName('q3_executive_statement.mp4');
                    setMediaType('video');
                  }}
                  className="text-[10px] bg-slate-950 text-cyan-400 px-2.5 py-1 rounded border border-slate-800 font-mono"
                >
                  Load Deepfake Video
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFileName('authentic_press_photo.jpg');
                    setMediaType('image');
                  }}
                  className="text-[10px] bg-slate-950 text-emerald-400 px-2.5 py-1 rounded border border-slate-800 font-mono"
                >
                  Load Authentic Media
                </button>
              </div>

              <button
                type="submit"
                disabled={isScanning}
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono shadow-neon-cyan flex items-center justify-center gap-2 transition-all"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>PARSING FACIAL MESH GEOMETRY...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>RUN DEEPFAKE FORENSICS</span>
                  </>
                )}
              </button>
            </form>
          </CyberCard>
        </div>

        {/* Results Visual Output */}
        <div className="lg:col-span-7 space-y-4">
          <CyberCard glow={result.deepfakeProbability > 50 ? 'red' : 'emerald'}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-4 bg-slate-950 rounded-xl border border-slate-800 mb-6">
              <div className="text-center sm:text-left">
                <div className="flex items-center gap-2 mb-1 justify-center sm:justify-start">
                  <ThreatBadge severity={result.riskLevel} size="md" />
                  <span className="text-xs font-mono text-slate-400">MEDIA VECTOR:</span>
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase">{result.mediaType}</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 font-mono">{result.fileName}</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Deepfake Probability: <strong className="text-red-400 font-bold">{result.deepfakeProbability}%</strong>
                </p>
              </div>

              {/* Circular Authenticity Score */}
              <div className="shrink-0">
                <CircularProgress
                  score={result.authenticityScore}
                  size={130}
                  strokeWidth={12}
                  inverseColors={true}
                  label="AUTHENTICITY"
                />
              </div>
            </div>

            {/* Micro Indicators Progress Breakdown */}
            <div className="grid grid-cols-2 gap-3 mb-6 font-mono text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 text-[10px] block">FACIAL INCONSISTENCY</span>
                <span className="text-red-400 font-bold text-sm">{result.facialInconsistencyScore}%</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 text-[10px] block">COMPRESSION ARTIFACTS</span>
                <span className="text-amber-300 font-bold text-sm">{result.compressionArtifactScore}%</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 text-[10px] block">AI GENERATION SCORE</span>
                <span className="text-purple-400 font-bold text-sm">{result.aiGenerationScore}%</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 text-[10px] block">AUDIO-LIP SYNC SCORE</span>
                <span className="text-cyan-300 font-bold text-sm">{result.audioLipSyncScore}%</span>
              </div>
            </div>

            {/* Indicator List */}
            <div className="space-y-2 mb-6 font-mono text-xs">
              <h4 className="text-xs text-slate-400 uppercase tracking-wider">
                Forensic Noise & Boundary Observations
              </h4>
              {result.indicators.map((ind, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-2">
                  <span className="text-purple-400 font-bold">&gt;</span>
                  <span>{ind}</span>
                </div>
              ))}
            </div>

            {/* Mandatory Requirement 10 Disclaimer Box */}
            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs text-amber-200 leading-relaxed font-mono flex items-start gap-2.5">
              <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-amber-300 mb-0.5">LEGAL DISCLAIMER NOTICE:</strong>
                {result.disclaimer}
              </div>
            </div>
          </CyberCard>
        </div>
      </div>
    </div>
  );
};
