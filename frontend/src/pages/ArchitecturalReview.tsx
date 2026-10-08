import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { ArchitectureFinding } from '../types';
import { SeverityBadge } from '../components/SeverityBadge';
import { Layers, RefreshCw, Box, Cpu, CheckCircle2 } from 'lucide-react';

export const ArchitecturalReview: React.FC = () => {
  const [findings, setFindings] = useState<ArchitectureFinding[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFindings = async () => {
    setLoading(true);
    try {
      const data = await api.getArchitectureFindings();
      setFindings(data);
    } catch (err) {
      console.error('Failed to load architecture findings', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFindings();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-400" /> Architectural Health & SOLID Principles
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Detect SOLID principle violations, tight coupling, circular dependencies, and recommended design patterns.
        </p>
      </div>

      {loading ? (
        <div className="p-8 text-center text-slate-400">
          <RefreshCw className="w-8 h-8 mx-auto animate-spin text-blue-500 mb-2" />
          <p>Analyzing module dependencies...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {findings.map((f) => (
            <div key={f.id} className="p-5 rounded-xl border border-slate-800 bg-slate-900/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SeverityBadge severity={f.severity} />
                  <h3 className="text-sm font-bold text-slate-100">{f.principle_violated}</h3>
                </div>
                <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                  Component: {f.component}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{f.description}</p>

              <div className="p-3.5 rounded-lg bg-blue-950/40 border border-blue-500/20 space-y-1 text-xs text-blue-200">
                <div className="font-semibold text-blue-400 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" /> Recommended Pattern: {f.design_pattern_suggested || 'Strategy / Repository Pattern'}
                </div>
                <p>{f.recommendation}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
