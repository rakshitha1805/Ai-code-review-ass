import React, { useState } from 'react';
import { ReviewComment } from '../types';
import { SeverityBadge } from './SeverityBadge';
import { CheckCircle2, Copy, Check, AlertCircle, FileCode, Lightbulb } from 'lucide-react';
import { api } from '../services/api';

interface ReviewCommentCardProps {
  comment: ReviewComment;
  onResolve?: () => void;
}

export const ReviewCommentCard: React.FC<ReviewCommentCardProps> = ({ comment, onResolve }) => {
  const [copied, setCopied] = useState(false);
  const [resolved, setResolved] = useState(comment.status === 'resolved');

  const copyCode = () => {
    if (comment.example_code) {
      navigator.clipboard.writeText(comment.example_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleResolve = async () => {
    try {
      await api.resolveComment(comment.id);
      setResolved(true);
      if (onResolve) onResolve();
    } catch (err) {
      console.error('Failed to resolve comment', err);
    }
  };

  return (
    <div className={`rounded-xl border transition-all ${resolved ? 'border-slate-800 bg-slate-900/40 opacity-75' : 'border-slate-800 bg-slate-900/90 shadow-lg hover:border-slate-700'}`}>
      {/* Card Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between gap-3 bg-slate-950/40 rounded-t-xl">
        <div className="flex items-center gap-3">
          <SeverityBadge severity={comment.severity} />
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
            {comment.category}
          </span>
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
            <FileCode className="w-3.5 h-3.5 text-blue-400" /> {comment.file_path} : L{comment.line_number || 1}
          </span>
        </div>
        {!resolved ? (
          <button
            onClick={handleResolve}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 px-2.5 py-1 rounded-md transition"
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Mark Resolved
          </button>
        ) : (
          <span className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" /> Resolved
          </span>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 space-y-4">
        <div>
          <h4 className="text-base font-semibold text-slate-100 flex items-center gap-2">
            {comment.title}
          </h4>
          <p className="mt-1.5 text-sm text-slate-300 leading-relaxed">
            {comment.description}
          </p>
        </div>

        {/* Why it Matters */}
        <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 mb-1">
            <AlertCircle className="w-4 h-4" /> Why It Matters
          </div>
          <p className="text-xs text-amber-200/90 leading-relaxed">
            {comment.why_it_matters}
          </p>
        </div>

        {/* Suggested Fix */}
        {comment.suggested_fix && (
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 mb-1">
              <Lightbulb className="w-4 h-4" /> Recommended Fix
            </div>
            <p className="text-sm text-slate-300">
              {comment.suggested_fix}
            </p>
          </div>
        )}

        {/* Code Snippet */}
        {comment.example_code && (
          <div className="relative rounded-lg bg-slate-950 border border-slate-800 overflow-hidden">
            <div className="px-3 py-1.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">Proposed Implementation</span>
              <button
                onClick={copyCode}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
              <code>{comment.example_code}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
