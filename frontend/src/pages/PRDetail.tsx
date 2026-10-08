import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { PullRequest } from '../types';
import { ScoreBadge } from '../components/ScoreBadge';
import { SeverityBadge } from '../components/SeverityBadge';
import { DiffViewer } from '../components/DiffViewer';
import { ReviewCommentCard } from '../components/ReviewCommentCard';
import { AIChatDrawer } from '../components/AIChatDrawer';
import {
  GitPullRequest,
  ShieldAlert,
  Layers,
  FileText,
  MessageSquare,
  Download,
  Play,
  ArrowLeft,
  RefreshCw,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const PRDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const prId = parseInt(id || '0');

  const [pr, setPr] = useState<PullRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'diff' | 'security' | 'architecture'>('diff');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [generatingPdf, setGeneratingPdf] = useState(false);

  const fetchPRDetail = async () => {
    setLoading(true);
    try {
      const data = await api.getPullRequestDetail(prId);
      setPr(data);
    } catch (err) {
      console.error('Failed to load PR detail', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (prId) fetchPRDetail();
  }, [prId]);

  const handleExportPDF = async () => {
    if (!pr) return;
    setGeneratingPdf(true);
    try {
      const report = await api.generatePDFReport(pr.id);
      if (report?.pdf_filename) {
        window.open(api.getPDFDownloadUrl(report.pdf_filename), '_blank');
      }
    } catch (err) {
      console.error('Failed to generate PDF report', err);
    } finally {
      setGeneratingPdf(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-400">
        <RefreshCw className="w-8 h-8 mx-auto animate-spin text-blue-500 mb-2" />
        <p>Loading Pull Request Review Analysis...</p>
      </div>
    );
  }

  if (!pr) {
    return (
      <div className="p-8 text-center text-rose-400">
        <p>Pull Request not found.</p>
        <Link to="/pull-requests" className="mt-4 inline-block text-xs text-blue-400 underline">
          Back to Pull Requests
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link to="/pull-requests" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition">
        <ArrowLeft className="w-4 h-4" /> Back to Pull Requests List
      </Link>

      {/* PR Header Card */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <img src={pr.author_avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=user"} alt="Avatar" className="w-12 h-12 rounded-full border border-slate-700 bg-slate-800" />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  PR #{pr.number}
                </span>
                <h2 className="text-xl font-extrabold text-slate-100">{pr.title}</h2>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Opened by <strong className="text-slate-200">{pr.author}</strong> | Branch: <span className="text-blue-400">{pr.head_branch}</span> &rarr; <span className="text-slate-300">{pr.base_branch}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsChatOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-600/20 hover:bg-cyan-600 text-cyan-400 hover:text-white text-xs font-semibold border border-cyan-500/30 transition"
            >
              <Sparkles className="w-4 h-4" /> Ask CodeGuard AI
            </button>
            <button
              onClick={handleExportPDF}
              disabled={generatingPdf}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/20 transition disabled:opacity-50"
            >
              {generatingPdf ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              Export PDF Report
            </button>
          </div>
        </div>

        {/* Audit Score Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Overall Health</span>
            <ScoreBadge score={pr.overall_score} size="lg" />
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Security Score</span>
            <ScoreBadge score={pr.security_score} size="lg" />
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Code Quality</span>
            <ScoreBadge score={pr.quality_score} size="lg" />
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Architecture</span>
            <ScoreBadge score={pr.architecture_score} size="lg" />
          </div>
        </div>

        {/* AI Executive Summary */}
        {pr.summary && (
          <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/20 space-y-1">
            <div className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> AI Executive Summary
            </div>
            <p className="text-xs text-blue-200/90 leading-relaxed">
              {pr.summary}
            </p>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('diff')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === 'diff'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" /> Code Diff & Review Comments ({pr.review_comments?.length || 0})
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === 'security'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <ShieldAlert className="w-4 h-4" /> Security Findings ({pr.security_findings?.length || 0})
        </button>

        <button
          onClick={() => setActiveTab('architecture')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === 'architecture'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" /> Architecture Audit ({pr.architecture_findings?.length || 0})
        </button>
      </div>

      {/* Tab 1: Diff Viewer & Review Cards */}
      {activeTab === 'diff' && (
        <div className="space-y-6">
          <DiffViewer diffData={pr.diff_data} comments={pr.review_comments} />

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-400" /> AI Review Suggestions ({pr.review_comments?.length || 0})
            </h3>
            {pr.review_comments?.map(comment => (
              <ReviewCommentCard key={comment.id} comment={comment} onResolve={fetchPRDetail} />
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Security Findings */}
      {activeTab === 'security' && (
        <div className="space-y-4">
          {pr.security_findings?.length === 0 ? (
            <div className="p-8 text-center text-emerald-400 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
              <CheckCircle2 className="w-10 h-10 mx-auto mb-2" />
              <p className="font-semibold text-sm">No security vulnerabilities detected in this Pull Request!</p>
            </div>
          ) : (
            pr.security_findings?.map(sf => (
              <div key={sf.id} className="p-5 rounded-xl border border-slate-800 bg-slate-900/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <SeverityBadge severity={sf.severity} />
                    <span className="text-sm font-bold text-slate-100">{sf.vulnerability_type}</span>
                    {sf.cve_id && <span className="text-xs font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-800">{sf.cve_id}</span>}
                  </div>
                  <span className="text-xs font-semibold text-rose-400">Risk Score: {sf.risk_score}/100</span>
                </div>
                <p className="text-xs text-slate-300">{sf.description}</p>
                {sf.raw_snippet && (
                  <pre className="p-3 rounded bg-slate-950 text-xs font-mono text-rose-300 border border-slate-800 overflow-x-auto">
                    <code>{sf.raw_snippet}</code>
                  </pre>
                )}
                <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-500/20 text-xs text-blue-200">
                  <strong>Recommendation:</strong> {sf.recommendation}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 3: Architecture Audit */}
      {activeTab === 'architecture' && (
        <div className="space-y-4">
          {pr.architecture_findings?.length === 0 ? (
            <div className="p-8 text-center text-emerald-400 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
              <CheckCircle2 className="w-10 h-10 mx-auto mb-2" />
              <p className="font-semibold text-sm">No architectural principle violations found in this PR!</p>
            </div>
          ) : (
            pr.architecture_findings?.map(af => (
              <div key={af.id} className="p-5 rounded-xl border border-slate-800 bg-slate-900/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <SeverityBadge severity={af.severity} />
                    <span className="text-sm font-bold text-slate-100">{af.principle_violated}</span>
                  </div>
                  <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                    Component: {af.component}
                  </span>
                </div>
                <p className="text-xs text-slate-300">{af.description}</p>
                <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-xs text-emerald-200">
                  <strong>Suggested Pattern:</strong> {af.design_pattern_suggested || 'Dependency Injection'} &mdash; {af.recommendation}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* AI Chat Drawer */}
      <AIChatDrawer isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} prId={pr.id} prTitle={pr.title} />
    </div>
  );
};
