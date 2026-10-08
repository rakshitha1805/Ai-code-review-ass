import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { PullRequest } from '../types';
import { ScoreBadge } from '../components/ScoreBadge';
import { Link } from 'react-router-dom';
import { GitPullRequest, RefreshCw, Play, Search, Filter } from 'lucide-react';

export const PullRequests: React.FC = () => {
  const [prs, setPrs] = useState<PullRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [analyzingId, setAnalyzingId] = useState<number | null>(null);

  const loadPRs = async () => {
    setLoading(true);
    try {
      const data = await api.getPullRequests();
      setPrs(data);
    } catch (err) {
      console.error('Failed to fetch pull requests', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPRs();
  }, []);

  const handleTriggerAnalysis = async (prId: number) => {
    setAnalyzingId(prId);
    try {
      await api.analyzePullRequest(prId);
      setTimeout(() => {
        loadPRs();
        setAnalyzingId(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to trigger analysis', err);
      setAnalyzingId(null);
    }
  };

  const filteredPRs = prs.filter(pr =>
    pr.title.toLowerCase().includes(search.toLowerCase()) ||
    pr.author.toLowerCase().includes(search.toLowerCase()) ||
    pr.head_branch.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <GitPullRequest className="w-5 h-5 text-blue-400" /> Pull Request Audit Stream
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time PR analysis, security risk ratings, and inline AI suggestions.
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 w-full sm:w-72 text-xs">
          <Search className="w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search PR title, author, branch..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent border-none text-slate-200 focus:outline-none w-full placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* PR Table Container */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-8 text-center text-slate-400">
            <RefreshCw className="w-8 h-8 mx-auto animate-spin text-blue-500 mb-2" />
            <p>Fetching pull requests...</p>
          </div>
        ) : filteredPRs.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
            <p>No pull requests found matching criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase font-semibold text-[10px] border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Pull Request</th>
                  <th className="py-3.5 px-4">Branches</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Overall Score</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredPRs.map((pr) => (
                  <tr key={pr.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-4 px-4">
                      <div className="flex items-start gap-3">
                        <img src={pr.author_avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=user"} alt="Avatar" className="w-8 h-8 rounded-full border border-slate-700 bg-slate-800" />
                        <div>
                          <Link to={`/pull-requests/${pr.id}`} className="text-sm font-semibold text-slate-100 hover:text-blue-400 transition">
                            #{pr.number} - {pr.title}
                          </Link>
                          <p className="text-[11px] text-slate-400 mt-0.5">Author: <strong className="text-slate-300">{pr.author}</strong></p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 font-mono text-slate-300">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-blue-400">{pr.head_branch}</span>
                      <span className="mx-1 text-slate-500">&rarr;</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400">{pr.base_branch}</span>
                    </td>

                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        pr.status === 'completed'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : pr.status === 'analyzing'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {pr.status === 'analyzing' || analyzingId === pr.id ? (
                          <>
                            <RefreshCw className="w-3 h-3 animate-spin" /> Analyzing...
                          </>
                        ) : (
                          pr.status
                        )}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <ScoreBadge score={pr.overall_score} size="md" />
                    </td>

                    <td className="py-4 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleTriggerAnalysis(pr.id)}
                        disabled={analyzingId === pr.id}
                        className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white font-medium text-xs transition inline-flex items-center gap-1"
                      >
                        <Play className="w-3 h-3" /> Re-Analyze
                      </button>
                      <Link
                        to={`/pull-requests/${pr.id}`}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition inline-flex items-center"
                      >
                        View Report
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
