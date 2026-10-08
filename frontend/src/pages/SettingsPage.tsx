import React, { useState } from 'react';
import { Settings as SettingsIcon, Save, Key, Shield, Bot, Sparkles } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('gemini-2.5-flash');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <SettingsIcon className="w-5 h-5 text-blue-400" /> Platform & AI Settings
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Configure AI LLM models, GitHub Webhook credentials, and custom code review guidelines.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* AI Engine Config */}
        <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/80 space-y-4">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Bot className="w-4 h-4 text-blue-400" /> AI LLM Configuration
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Google Gemini / OpenAI API Key
            </label>
            <input
              type="password"
              placeholder="AIzaSy... (Leave empty to use built-in heuristic review engine)"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500 font-mono"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              If left blank, CodeGuard AI automatically uses its high-speed rule-based AST security & quality engine out-of-the-box.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">AI Model Selection</label>
            <select
              value={model}
              onChange={e => setModel(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
            >
              <option value="gemini-2.5-flash">Gemini 2.5 Flash (Fastest, High Reasoning)</option>
              <option value="gemini-1.5-pro">Gemini 1.5 Pro (Deep Code Context)</option>
              <option value="gpt-4o">OpenAI GPT-4o (Fallback)</option>
            </select>
          </div>
        </div>

        {/* GitHub Webhook Config */}
        <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/80 space-y-4">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Key className="w-4 h-4 text-cyan-400" /> GitHub Webhook Security Secret
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Webhook Secret Key</label>
            <input
              type="text"
              readOnly
              value="codeguard_webhook_secret_key"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-400 font-mono"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Configure this secret in your GitHub Repository Settings &rarr; Webhooks &rarr; Secret.
            </p>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-500/20 transition"
          >
            <Save className="w-4 h-4" /> Save Settings
          </button>
          {saved && (
            <span className="text-xs text-emerald-400 font-medium animate-fade-in">
              ✓ Settings saved successfully!
            </span>
          )}
        </div>
      </form>
    </div>
  );
};
