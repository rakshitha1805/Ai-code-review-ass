import React, { useState } from 'react';
import { FileCode, Plus, Minus, AlertCircle } from 'lucide-react';
import { ReviewComment } from '../types';
import { ReviewCommentCard } from './ReviewCommentCard';

interface DiffViewerProps {
  diffData?: {
    raw?: string;
    files?: Array<{
      filename: string;
      additions: number;
      deletions: number;
      added_lines: Array<{ line_number: number; content: string }>;
      removed_lines: Array<{ line_number: number; content: string }>;
    }>;
  };
  comments?: ReviewComment[];
}

export const DiffViewer: React.FC<DiffViewerProps> = ({ diffData, comments = [] }) => {
  const files = diffData?.files || [];
  const [selectedFile, setSelectedFile] = useState<string>(files[0]?.filename || '');

  if (!files || files.length === 0) {
    return (
      <div className="p-8 text-center text-slate-400 bg-slate-900/50 rounded-xl border border-slate-800">
        <FileCode className="w-12 h-12 mx-auto text-slate-600 mb-3" />
        <p className="font-medium">No diff files available for preview.</p>
      </div>
    );
  }

  const activeFile = files.find(f => f.filename === selectedFile) || files[0];
  const fileComments = comments.filter(c => c.file_path === activeFile.filename);

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden">
      {/* File Selector Tabs */}
      <div className="flex items-center gap-1 p-2 bg-slate-950 border-b border-slate-800 overflow-x-auto">
        {files.map(f => (
          <button
            key={f.filename}
            onClick={() => setSelectedFile(f.filename)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition ${
              activeFile.filename === f.filename
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>{f.filename}</span>
            <span className="flex items-center text-[10px] gap-1 font-sans">
              <span className="text-emerald-400">+{f.additions}</span>
              <span className="text-rose-400">-{f.deletions}</span>
            </span>
          </button>
        ))}
      </div>

      {/* File Diff Content */}
      <div className="p-4 bg-slate-950 font-mono text-xs overflow-x-auto">
        <div className="text-slate-400 mb-2 pb-2 border-b border-slate-800 font-sans flex items-center justify-between">
          <span>Viewing diff for <strong className="text-slate-200">{activeFile.filename}</strong></span>
          {fileComments.length > 0 && (
            <span className="text-amber-400 flex items-center gap-1 font-medium text-xs">
              <AlertCircle className="w-3.5 h-3.5" /> {fileComments.length} AI Review Suggestion(s)
            </span>
          )}
        </div>

        <div className="space-y-0.5">
          {activeFile.added_lines.map((line, idx) => {
            const lineComment = fileComments.find(c => c.line_number === line.line_number);

            return (
              <React.Fragment key={idx}>
                <div className={`flex items-start gap-3 px-3 py-1 rounded ${lineComment ? 'bg-amber-500/10 border-l-4 border-amber-500' : 'bg-emerald-500/10 text-emerald-300'}`}>
                  <span className="w-8 text-slate-500 select-none text-right">{line.line_number}</span>
                  <span className="text-emerald-400 font-bold select-none">+</span>
                  <pre className="flex-1 font-mono text-emerald-200 whitespace-pre-wrap"><code>{line.content}</code></pre>
                </div>

                {/* Inline Comment if matched */}
                {lineComment && (
                  <div className="my-3 pl-8 pr-2">
                    <ReviewCommentCard comment={lineComment} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
