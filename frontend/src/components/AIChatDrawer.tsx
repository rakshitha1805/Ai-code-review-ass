import React, { useState } from 'react';
import { Bot, Send, X, Sparkles, User } from 'lucide-react';
import { api } from '../services/api';

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  prId: number;
  prTitle: string;
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export const AIChatDrawer: React.FC<AIChatDrawerProps> = ({ isOpen, onClose, prId, prTitle }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: `Hello! I am CodeGuard Assistant. Ask me anything about the code review, security findings, or architectural refactoring for PR: "${prTitle}".`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setLoading(true);

    try {
      const responseText = await api.askAIChat(prId, userText);
      setMessages(prev => [...prev, { sender: 'ai', text: responseText }]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'ai', text: 'Sorry, I encountered an error communicating with the AI service.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-slate-900 border-l border-slate-800 shadow-2xl z-50 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-600/20 text-blue-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-100">CodeGuard AI Assistant</h3>
            <p className="text-xs text-slate-400 truncate max-w-[200px]">PR #{prId} - {prTitle}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.sender === 'ai' && (
              <div className="w-7 h-7 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
                <Bot className="w-4 h-4" />
              </div>
            )}
            <div className={`p-3 rounded-xl text-xs leading-relaxed max-w-[80%] ${
              m.sender === 'user'
                ? 'bg-blue-600 text-white rounded-tr-none'
                : 'bg-slate-800/80 text-slate-200 border border-slate-700/50 rounded-tl-none'
            }`}>
              {m.text}
            </div>
            {m.sender === 'user' && (
              <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 flex-shrink-0">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <Bot className="w-4 h-4 animate-bounce text-blue-400" /> CodeGuard is thinking...
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-3 border-t border-slate-800 bg-slate-950 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask a question about this PR..."
          className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="p-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
