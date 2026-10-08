import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { CyberShieldLogo } from '../common/CyberShieldLogo';
import { X, Lock, Mail, User, Key, ArrowRight, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('alex.vance@cybershield.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('Alex Vance');
  const [org, setOrg] = useState('CyberShield Global SOC');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful login / account switch
    const mockUser: UserProfile = {
      name: name || 'Analyst Vance',
      email: email || 'analyst@cybershield.ai',
      role: 'SOC Tier 3 Security Lead',
      organization: org || 'Enterprise Security Ops',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      twoFactorEnabled: true,
      apiKey: 'cs_live_9948a72b109e4a81bc920f',
      notificationPreferences: {
        criticalEmail: true,
        slackWebhook: true,
        weeklyReport: true,
      }
    };
    onLoginSuccess(mockUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-lg flex items-center justify-center p-4 font-sans">
      <div className="relative w-full max-w-md bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-cyan-500/20 bg-slate-950 flex items-center justify-between">
          <CyberShieldLogo size="sm" />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <div className="p-6">
          <div className="mb-6 text-center">
            <h3 className="text-lg font-bold text-slate-100 tracking-wide">
              {mode === 'login' && 'SOC Portal Authentication'}
              {mode === 'register' && 'Deploy CyberShield Node'}
              {mode === 'forgot' && 'Reset SOC Credentials'}
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-1">
              {mode === 'login' && 'Enter your multi-factor credentials to access SOC'}
              {mode === 'register' && 'Register an enterprise security organization account'}
              {mode === 'forgot' && 'Send encrypted reset token to registered email'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">FULL NAME</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 font-mono"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">ENTERPRISE EMAIL</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="analyst@cybershield.ai"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 font-mono"
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">SECURITY ACCESS KEY / PASSWORD</label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 font-mono"
                  />
                </div>
              </div>
            )}

            {mode === 'register' && (
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">ORGANIZATION / COMPANY</label>
                <input
                  type="text"
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  placeholder="CyberShield Enterprise"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 font-mono"
                />
              </div>
            )}

            {mode === 'login' && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="text-[11px] font-mono text-cyan-400 hover:underline"
                >
                  Forgot access password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono flex items-center justify-center gap-2 shadow-neon-cyan transition-all"
            >
              <span>
                {mode === 'login' && 'AUTHENTICATE & LOG IN'}
                {mode === 'register' && 'CREATE SOC ACCOUNT'}
                {mode === 'forgot' && 'SEND RESET TOKEN'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Login Bypass Option */}
          <div className="mt-4 pt-4 border-t border-slate-800">
            <button
              onClick={handleSubmit}
              className="w-full py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Instant Demo SOC Login (1-Click)</span>
            </button>
          </div>

          {/* Footer toggle modes */}
          <div className="mt-4 text-center text-xs font-mono text-slate-400">
            {mode === 'login' ? (
              <p>
                Need SOC platform access?{' '}
                <button
                  onClick={() => setMode('register')}
                  className="text-cyan-400 font-bold hover:underline"
                >
                  Register Enterprise Account
                </button>
              </p>
            ) : (
              <p>
                Already have credentials?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="text-cyan-400 font-bold hover:underline"
                >
                  Back to Login
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
