import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { DashboardMetrics } from '../types';
import { ScoreBadge } from '../components/ScoreBadge';
import { SeverityBadge } from '../components/SeverityBadge';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  GitPullRequest,
  FolderGit2,
  Clock,
  ArrowRight,
  RefreshCw,
  Sparkles,
  TrendingUp,
  Award
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMetrics = async () => {
    setLoading(true);
    try {
      const data = await api.getDashboardMetrics();
      setMetrics(data);
    } catch (err) {
      console.error('Failed to load dashboard metrics', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-400">
        <RefreshCw className="w-8 h-8 mx-auto animate-spin text-blue-500 mb-2" />
        <p>Loading CodeGuard AI Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/40 via-slate-900 to-cyan-900/30 border border-blue-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-400 text-xs font-semibold mb-1">
            <Sparkles className="w-4 h-4" /> CodeGuard AI Security & Quality Overview
          </div>
          <h2 className="text-xl font-bold text-white">Repository Health & PR Review Command Center</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Automated deep code inspection, secret scanning, SOLID architecture violation checks, and real-time pull request reviews.
          </p>
        </div>
        <button
          onClick={fetchMetrics}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs shadow-lg shadow-blue-500/20 transition self-start md:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh Analytics
        </button>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Repos */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400">Connected Repos</p>
            <h3 className="text-2xl font-extrabold text-slate-100 mt-1">{metrics?.total_repositories || 0}</h3>
            <p className="text-[11px] text-slate-500 mt-1">Active Webhooks</p>
          </div>
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <FolderGit2 className="w-6 h-6" />
          </div>
        </div>

        {/* Pull Requests */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400">Pull Requests Analyzed</p>
            <h3 className="text-2xl font-extrabold text-slate-100 mt-1">{metrics?.total_pull_requests || 0}</h3>
            <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +12% this week
            </p>
          </div>
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <GitPullRequest className="w-6 h-6" />
          </div>
        </div>

        {/* Critical Alerts */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400">Critical Vulnerabilities</p>
            <h3 className="text-2xl font-extrabold text-rose-400 mt-1">{metrics?.critical_security_alerts || 0}</h3>
            <p className="text-[11px] text-rose-400/80 mt-1">Requires Immediate Fix</p>
          </div>
          <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <ShieldAlert className="w-6 h-6" />
          </div>
        </div>

        {/* Technical Debt */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400">Technical Debt</p>
            <h3 className="text-2xl font-extrabold text-amber-400 mt-1">{metrics?.technical_debt_hours || 0} hrs</h3>
            <p className="text-[11px] text-slate-500 mt-1">Estimated Remediation</p>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Audit Score Summary Bar */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
        <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
          <Award className="w-4 h-4 text-blue-400" /> Platform Audit Health Averages
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Average Security Score</span>
            <ScoreBadge score={metrics?.avg_security_score || 0} size="md" />
          </div>
          <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Average Code Quality</span>
            <ScoreBadge score={metrics?.avg_quality_score || 0} size="md" />
          </div>
          <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Architecture Score</span>
            <ScoreBadge score={metrics?.avg_architecture_score || 0} size="md" />
          </div>
        </div>
      </div>

      {/* Recent Pull Requests */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/80 overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <GitPullRequest className="w-4 h-4 text-blue-400" /> Recent Pull Request Reviews
          </h3>
          <Link to="/pull-requests" className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1">
            View All PRs <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-slate-800/60">
          {metrics?.recent_prs.map(pr => (
            <div key={pr.id} className="p-4 hover:bg-slate-800/40 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <img src={pr.author_avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=user"} alt="Avatar" className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700" />
                <div>
                  <div className="flex items-center gap-2">
                    <Link to={`/pull-requests/${pr.id}`} className="text-sm font-semibold text-slate-100 hover:text-blue-400 transition">
                      #{pr.number} - {pr.title}
                    </Link>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {pr.state}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 font-mono">
                    Author: {pr.author} | {pr.head_branch} &rarr; {pr.base_branch}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <ScoreBadge score={pr.overall_score} label="Score" size="sm" />
                <Link
                  to={`/pull-requests/${pr.id}`}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition"
                >
                  Inspect Review
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
