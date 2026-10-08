import React, { useState } from 'react';
import { UserProfile } from '../types';
import { CyberCard } from '../components/common/CyberCard';
import { 
  User, 
  Lock, 
  Bell, 
  Key, 
  Moon, 
  Sun, 
  CheckCircle2, 
  Copy, 
  RefreshCw, 
  Eye, 
  EyeOff,
  LogOut
} from 'lucide-react';

interface SettingsProps {
  user: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
  onOpenAuth: () => void;
}

export const SettingsPage: React.FC<SettingsProps> = ({
  user,
  onUpdateUser,
  onOpenAuth,
}) => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [themeMode, setThemeMode] = useState<'dark' | 'cyberpunk' | 'slate'>('dark');

  const [emailNotif, setEmailNotif] = useState(user.notificationPreferences.criticalEmail);
  const [slackNotif, setSlackNotif] = useState(user.notificationPreferences.slackWebhook);
  const [weeklyNotif, setWeeklyNotif] = useState(user.notificationPreferences.weeklyReport);

  const handleCopyKey = () => {
    navigator.clipboard.writeText(user.apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="bg-slate-900/60 p-5 rounded-2xl border border-cyan-500/20 backdrop-blur-md">
        <h1 className="text-xl font-extrabold text-slate-100 font-mono tracking-wide flex items-center gap-2">
          <User className="w-6 h-6 text-cyan-400" />
          SOC User Profile & System Preferences
        </h1>
        <p className="text-xs text-slate-400 mt-1 font-mono">
          Manage multi-factor auth, API access keys, alert webhooks, and visual interface themes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* User Profile Card */}
        <div className="lg:col-span-6 space-y-4">
          <CyberCard title="Analyst Identity & Organization" subtitle="SOC Tier 3 Account Details">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-cyan-400 shadow-neon-cyan"
              />
              <div>
                <h3 className="text-base font-bold text-slate-100">{user.name}</h3>
                <p className="text-xs text-cyan-400 font-mono">{user.role}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{user.organization}</p>
              </div>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-[10px] text-slate-500 mb-1">EMAIL ADDRESS</label>
                <input
                  type="text"
                  readOnly
                  value={user.email}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-500 mb-1">MULTI-FACTOR AUTHENTICATION (2FA)</label>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Hardware YubiKey Active
                  </span>
                  <button className="text-cyan-400 hover:underline">Manage 2FA</button>
                </div>
              </div>
            </div>
          </CyberCard>

          {/* Theme Preferences */}
          <CyberCard title="Interface Theme Mode" subtitle="Customize dashboard dark mode aesthetics">
            <div className="grid grid-cols-3 gap-3 font-mono text-xs">
              <button
                onClick={() => setThemeMode('dark')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                  themeMode === 'dark' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-neon-cyan' : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                <Moon className="w-4 h-4" />
                <span>Deep Navy (Default)</span>
              </button>

              <button
                onClick={() => setThemeMode('cyberpunk')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                  themeMode === 'cyberpunk' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-neon-cyan' : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                <Moon className="w-4 h-4 text-purple-400" />
                <span>Cyberpunk Glow</span>
              </button>

              <button
                onClick={() => setThemeMode('slate')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                  themeMode === 'slate' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-neon-cyan' : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                <Sun className="w-4 h-4 text-amber-300" />
                <span>Clean Slate</span>
              </button>
            </div>
          </CyberCard>
        </div>

        {/* API Settings & Notifications Card */}
        <div className="lg:col-span-6 space-y-4">
          <CyberCard title="REST API Keys & Integration" subtitle="Secret token for CyberShield REST endpoints">
            <div className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-[10px] text-slate-500 mb-1">LIVE PRODUCTION API KEY</label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type={showApiKey ? 'text' : 'password'}
                      readOnly
                      value={user.apiKey}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 pr-10 font-mono text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  <button
                    onClick={handleCopyKey}
                    className="px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 hover:bg-slate-800 text-xs flex items-center gap-1"
                  >
                    <Copy className="w-4 h-4" />
                    <span>{copied ? 'COPIED!' : 'COPY'}</span>
                  </button>
                </div>
              </div>
            </div>
          </CyberCard>

          {/* Notification Preferences */}
          <CyberCard title="Notification Preferences" subtitle="Configure automated alert triggers">
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div>
                  <span className="text-slate-200 block font-bold">Critical Alert Immediate Email</span>
                  <span className="text-[10px] text-slate-500">Dispatch email upon 🔴 CRITICAL severity trigger</span>
                </div>
                <input
                  type="checkbox"
                  checked={emailNotif}
                  onChange={(e) => setEmailNotif(e.target.checked)}
                  className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div>
                  <span className="text-slate-200 block font-bold">Slack SOC Channel Webhook</span>
                  <span className="text-[10px] text-slate-500">Post threat telemetry to #soc-alerts</span>
                </div>
                <input
                  type="checkbox"
                  checked={slackNotif}
                  onChange={(e) => setSlackNotif(e.target.checked)}
                  className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div>
                  <span className="text-slate-200 block font-bold">Weekly Executive Security Report</span>
                  <span className="text-[10px] text-slate-500">Receive weekly PDF aggregate analytics</span>
                </div>
                <input
                  type="checkbox"
                  checked={weeklyNotif}
                  onChange={(e) => setWeeklyNotif(e.target.checked)}
                  className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
                />
              </div>
            </div>
          </CyberCard>

          {/* Account Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={onOpenAuth}
              className="px-4 py-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-500/40 font-mono text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out / Switch Account</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
