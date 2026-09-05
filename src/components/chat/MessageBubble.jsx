import React from 'react';
import { Bot, User, AlertTriangle, ShieldCheck, Clock } from 'lucide-react';
import { Badge } from '../ui/Badge';

export function MessageBubble({ message, onSelectSuggestion }) {
  const isAI = message.sender === 'ai';

  return (
    <div className={`flex gap-3 ${isAI ? 'justify-start' : 'justify-end'} mb-4`}>
      {isAI && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-white shrink-0 shadow-sm mt-1">
          <Bot className="w-4 h-4" />
        </div>
      )}

      <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 shadow-sm ${
        isAI
          ? 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100'
          : 'bg-teal-600 text-white font-medium'
      }`}>
        
        {/* Triage Badge header if present */}
        {isAI && message.triageLevel && (
          <div className="mb-2 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <Badge variant={message.triageLevel.level?.toLowerCase() || 'default'}>
              {message.triageLevel.label}
            </Badge>
            <span className="text-[10px] text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {message.triageLevel.timeframe}
            </span>
          </div>
        )}

        {/* Message body text */}
        <div className="text-sm leading-relaxed whitespace-pre-wrap space-y-2">
          {message.text}
        </div>

        {/* Timestamp */}
        <div className={`text-[10px] mt-2 flex items-center justify-end gap-1 ${isAI ? 'text-slate-400' : 'text-teal-100'}`}>
          <span>{message.timestamp}</span>
        </div>

        {/* Quick Follow-up Suggestions */}
        {isAI && message.quickSuggestions && message.quickSuggestions.length > 0 && (
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <p className="text-[11px] font-semibold text-slate-400 mb-2">Suggested Next Steps:</p>
            <div className="flex flex-wrap gap-1.5">
              {message.quickSuggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectSuggestion(suggestion)}
                  className="text-xs bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 px-3 py-1 rounded-full transition-colors text-left"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>

      {!isAI && (
        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white shrink-0 shadow-sm mt-1">
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
}
