import React, { useState, useRef, useEffect } from 'react';
import { CopilotMessage, NavigationTab } from '../../types';
import { getCopilotResponse } from '../../services/cyberEngine';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  ShieldAlert, 
  Lock, 
  ChevronRight,
  RefreshCw
} from 'lucide-react';

interface CopilotProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveTab: (tab: NavigationTab) => void;
}

export const CyberShieldCopilot: React.FC<CopilotProps> = ({
  isOpen,
  onClose,
  setActiveTab,
}) => {
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: 'Greetings Analyst. I am CyberShield Copilot, your AI Cybersecurity Assistant. Ask me to verify suspicious links, explain flagged threat vectors, or recommend SOC defense procedures.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedActions: [
        'Is this URL safe?',
        'Why was this account flagged?',
        'What does this threat mean?',
        'How can I protect my organization?'
      ]
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  if (!isOpen) return null;

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: CopilotMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsThinking(true);

    // Simulate AI inference delay
    setTimeout(() => {
      const responseData = getCopilotResponse(query);
      const assistantMsg: CopilotMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: responseData.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: responseData.suggestedActions,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsThinking(false);
    }, 600);
  };

  const handleActionClick = (actionText: string) => {
    if (actionText.includes('Phishing Scanner')) {
      setActiveTab('phishing');
    } else if (actionText.includes('Fake Account')) {
      setActiveTab('fake-account');
    } else if (actionText.includes('Deepfake')) {
      setActiveTab('deepfake');
    } else if (actionText.includes('Alerts')) {
      setActiveTab('alerts');
    } else if (actionText.includes('Score')) {
      setActiveTab('overview');
    } else {
      handleSendMessage(actionText);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-slate-950/95 backdrop-blur-2xl border-l border-cyan-500/30 shadow-2xl flex flex-col font-sans transition-all duration-300">
      {/* Copilot Header */}
      <div className="px-5 py-4 border-b border-cyan-500/20 bg-slate-900/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-400/40 shadow-neon-cyan text-cyan-400">
            <Bot className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-sm tracking-wide flex items-center gap-1.5">
              CyberShield Copilot
              <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.2 rounded border border-cyan-500/30 font-mono">
                AI SOC
              </span>
            </h3>
            <p className="text-[11px] text-slate-400 font-mono">Real-Time Threat Intelligence Assistant</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-cyan-600 text-slate-950 font-medium rounded-tr-none shadow-neon-cyan'
                  : 'bg-slate-900 border border-cyan-500/20 text-slate-200 rounded-tl-none'
              }`}
            >
              {msg.sender === 'assistant' && (
                <div className="flex items-center gap-1.5 mb-1.5 text-cyan-400 text-[10px] font-mono font-semibold">
                  <Sparkles className="w-3 h-3" /> CYBERSHIELD INTELLIGENCE
                </div>
              )}
              <p>{msg.text}</p>
            </div>
            <span className="text-[10px] font-mono text-slate-500 mt-1 px-1">{msg.timestamp}</span>

            {/* Suggested Prompt Action Pills */}
            {msg.suggestedActions && msg.suggestedActions.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5 max-w-[90%]">
                {msg.suggestedActions.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => handleActionClick(action)}
                    className="text-[11px] bg-slate-900 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 rounded-lg px-2.5 py-1 transition-all flex items-center gap-1 font-mono"
                  >
                    <span>{action}</span>
                    <ChevronRight className="w-3 h-3 text-cyan-400" />
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isThinking && (
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono bg-slate-900 p-3 rounded-xl border border-cyan-500/20 w-fit">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>Analyzing security heuristics...</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-4 border-t border-cyan-500/20 bg-slate-900/90">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask Copilot about threats, URLs, or SOC protocols..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 font-mono"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isThinking}
            className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold transition-all shadow-neon-cyan"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <div className="mt-2 text-[10px] text-slate-500 font-mono flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3 text-cyan-400" /> SOC Encrypted Session
          </span>
          <span>Model: Shield-LLM-4</span>
        </div>
      </div>
    </div>
  );
};
