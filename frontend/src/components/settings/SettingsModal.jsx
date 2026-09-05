import React, { useState } from 'react';
import { useHealth } from '../../context/HealthContext';
import { Modal } from '../ui/Modal';
import { Key, ShieldCheck, RefreshCw, Check, Sparkles } from 'lucide-react';

export function SettingsModal({ isOpen, onClose }) {
  const { apiKey, setApiKey, userProfile, updateUserProfile, clearChatHistory } = useHealth();
  const [inputKey, setInputKey] = useState(apiKey);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setApiKey(inputKey.trim());
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="AI Engine & App Settings">
      <div className="space-y-6">
        
        {/* Gemini API Key Section */}
        <div className="p-4 rounded-2xl bg-teal-50/50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/60">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h4 className="font-semibold text-slate-800 dark:text-slate-100">Google Gemini API Integration</h4>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
            Enter your Google Gemini API key to enable live AI reasoning with Gemini 2.5 Flash. If left empty, HealthPulse operates seamlessly using the built-in clinical simulation engine.
          </p>

          <form onSubmit={handleSave} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Gemini API Key
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full px-3.5 py-2 pl-9 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <Key className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-500">
                Key is stored securely in your browser's localStorage.
              </span>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-sm transition-all"
              >
                {saved ? <Check className="w-4 h-4 text-white" /> : null}
                <span>{saved ? 'Saved!' : 'Save Key'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* User Profile Config */}
        <div>
          <h4 className="font-semibold text-slate-800 dark:text-slate-100 text-sm mb-3">Health Profile Settings</h4>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-slate-500 mb-1">Name</label>
              <input
                type="text"
                value={userProfile.name || ''}
                onChange={(e) => updateUserProfile({ name: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
              />
            </div>
            <div>
              <label className="block text-slate-500 mb-1">Age</label>
              <input
                type="number"
                value={userProfile.age || 40}
                onChange={(e) => updateUserProfile({ age: Number(e.target.value) })}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <button
            onClick={clearChatHistory}
            className="flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 font-medium"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Chat History</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-300 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </Modal>
  );
}
