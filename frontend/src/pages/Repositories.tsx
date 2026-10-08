import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Repository } from '../types';
import { ScoreBadge } from '../components/ScoreBadge';
import { FolderGit2, Plus, CheckCircle, Lock, Globe, ExternalLink, RefreshCw, X } from 'lucide-react';

export const Repositories: React.FC = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    full_name: '',
    owner: '',
    description: '',
    language: 'TypeScript'
  });

  const loadRepos = async () => {
    setLoading(true);
    try {
      const data = await api.getRepositories();
      setRepos(data);
    } catch (err) {
      console.error('Failed to load repositories', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRepos();
  }, []);

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.connectRepository(formData);
      setShowModal(false);
      setFormData({ name: '', full_name: '', owner: '', description: '', language: 'TypeScript' });
      loadRepos();
    } catch (err) {
      console.error('Failed to connect repo', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-blue-400" /> Integrated Repositories
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Repositories monitored by CodeGuard AI GitHub Webhook events.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/20 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Connect Repository
        </button>
      </div>

      {/* Repository Grid */}
      {loading ? (
        <div className="p-8 text-center text-slate-400">
          <RefreshCw className="w-8 h-8 mx-auto animate-spin text-blue-500 mb-2" />
          <p>Loading repositories...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((repo) => (
            <div key={repo.id} className="p-5 rounded-xl border border-slate-800 bg-slate-900/80 space-y-4 hover:border-slate-700 transition">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-slate-800 text-blue-400">
                    <FolderGit2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-100 hover:text-blue-400 transition cursor-pointer">
                      {repo.full_name}
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1 mt-0.5">
                      {repo.is_private ? <Lock className="w-3 h-3 text-amber-400" /> : <Globe className="w-3 h-3 text-blue-400" />}
                      {repo.language || 'Codebase'}
                    </span>
                  </div>
                </div>

                <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <CheckCircle className="w-3 h-3" /> Webhook
                </span>
              </div>

              <p className="text-xs text-slate-400 line-clamp-2">
                {repo.description || 'No description provided.'}
              </p>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <ScoreBadge score={repo.quality_score} label="Quality" size="sm" />
                  <ScoreBadge score={repo.security_score} label="Security" size="sm" />
                </div>
                <span className="text-slate-400 font-medium">
                  {repo.open_prs_count || 0} Open PRs
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Connect Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-slate-100">Connect New GitHub Repository</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConnect} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Repository Name (owner/repo)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. facebook/react"
                  value={formData.full_name}
                  onChange={(e) => {
                    const parts = e.target.value.split('/');
                    setFormData({
                      ...formData,
                      full_name: e.target.value,
                      owner: parts[0] || 'owner',
                      name: parts[1] || e.target.value
                    });
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Language</label>
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                >
                  <option value="TypeScript">TypeScript / JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="Go">Go</option>
                  <option value="C++">C++</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Microservice description..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs text-white font-semibold shadow"
                >
                  Connect & Active Webhook
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
