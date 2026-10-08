import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { SecurityFinding } from '../types';
import { SeverityBadge } from '../components/SeverityBadge';
import { ShieldAlert, RefreshCw, Key, ShieldCheck, AlertOctagon } from 'lucide-react';

export const SecurityFindings: React.FC = () => {
  const [findings, setFindings] = useState<SecurityFinding[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFindings = async () => {
    setLoading(true);
    try {
      const data = await api.getSecurityFindings();
      setFindings(data);
    } catch (err) {
      console.error('Failed to load security findings', err);
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
          <ShieldAlert className="w-5 h-5 text-rose-400" /> Security Vulnerability Scanner
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Exposed secrets, OWASP Top 10 vulnerabilities, and dependency security checks.
        </p>
      </div>

      {loading ? (
        <div className="p-8 text-center text-slate-400">
          <RefreshCw className="w-8 h-8 mx-auto animate-spin text-rose-500 mb-2" />
          <p>Scanning security database...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {findings.map((f) => (
            <div key={f.id} className="p-5 rounded-xl border border-slate-800 bg-slate-900/80 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <SeverityBadge severity={f.severity} />
                  <h3 className="text-sm font-bold text-slate-100">{f.vulnerability_type}</h3>
                  {f.cve_id && (
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      {f.cve_id}
                    </span>
                  )}
                </div>
                <span className="text-xs font-semibold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
                  Risk Score: {f.risk_score}/100
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{f.description}</p>

              {f.raw_snippet && (
                <div className="rounded-lg bg-slate-950 border border-slate-800 overflow-hidden">
                  <div className="px-3 py-1 bg-slate-900 text-[11px] text-slate-400 font-mono border-b border-slate-800">
                    {f.file_path} : L{f.line_number || 1}
                  </div>
                  <pre className="p-3 text-xs font-mono text-rose-300 overflow-x-auto">
                    <code>{f.raw_snippet}</code>
                  </pre>
                </div>
              )}

              <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-200">
                <strong>Remediation Action:</strong> {f.recommendation}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
