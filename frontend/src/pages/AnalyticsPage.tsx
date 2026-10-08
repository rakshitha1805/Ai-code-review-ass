import React from 'react';
import { BarChart3, TrendingUp, Clock, ShieldCheck, Zap, Award } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-400" /> Analytics & Technical Debt Tracking
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Longitudinal code quality trends, velocity metrics, and technical debt estimations.
        </p>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/80 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Code Review Velocity</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-100">4.2 min / PR</h3>
          <p className="text-[11px] text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> 3.5x faster than manual review
          </p>
        </div>

        <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/80 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Remediation Speed</span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-100">18.5 hrs</h3>
          <p className="text-[11px] text-slate-400">Avg time to resolve Critical finding</p>
        </div>

        <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/80 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Codebase Security Rating</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <h3 className="text-2xl font-extrabold text-emerald-400">Grade A-</h3>
          <p className="text-[11px] text-slate-400">Top 10% Industry Benchmark</p>
        </div>
      </div>

      {/* Visual Quality Trend Box */}
      <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/80 space-y-4">
        <h3 className="text-sm font-bold text-slate-100">Codebase Quality Trend (Last 30 Days)</h3>
        
        {/* Simple CSS-rendered trend bar visualization */}
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
              <span>Security Hardening</span>
              <span className="text-emerald-400">92% (+5%)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
              <span>SOLID Architecture Adherence</span>
              <span className="text-blue-400">84% (+8%)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '84%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
              <span>Test Coverage & Maintainability</span>
              <span className="text-amber-400">78%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
