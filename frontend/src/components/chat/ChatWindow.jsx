import React, { useState, useRef, useEffect } from 'react';
import { useHealth } from '../../context/HealthContext';
import { consultAI } from '../../services/geminiService';
import { MessageBubble } from './MessageBubble';
import { QuickPrompts } from './QuickPrompts';
import { Send, Bot, Sparkles, RefreshCw, AlertOctagon } from 'lucide-react';
import { TRIAGE_LEVELS } from '../../data/medicalKnowledge';

export function ChatWindow() {
  const { chatMessages, addChatMessage, clearChatHistory, userProfile, vitalsLogs, apiKey, setActiveEmergencyAlert } = useHealth();
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isLoading]);

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim() || isLoading) return;

    // 1. Add user message
    addChatMessage({
      sender: 'user',
      text: query
    });
    setInputText('');
    setIsLoading(true);

    try {
      // 2. Call AI Consultation engine
      const aiResponse = await consultAI(query, chatMessages, userProfile, vitalsLogs, apiKey);

      // Check if emergency flagged
      if (aiResponse.triageLevel?.level === 'EMERGENCY') {
        setActiveEmergencyAlert({
          message: 'Critical emergency signs flagged in chat evaluation. Call 911 or visit emergency services immediately.'
        });
      }

      // 3. Add AI message
      addChatMessage({
        sender: 'ai',
        text: aiResponse.text,
        triageLevel: aiResponse.triageLevel,
        quickSuggestions: [
          'What lifestyle adjustments can improve this?',
          'Should I schedule an appointment with my primary doctor?',
          'What warning signs mean I should go to Urgent Care?'
        ]
      });
    } catch (err) {
      addChatMessage({
        sender: 'ai',
        text: 'I encountered a temporal network delay. However, based on safety protocol, please ensure you monitor your symptoms and seek clinical care if discomfort persists.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-2">
              <span>Clinical AI Assistant</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {apiKey ? 'Powered by Google Gemini 2.5 Flash' : 'Simulated Medical Knowledge Engine'}
            </p>
          </div>
        </div>

        <button
          onClick={clearChatHistory}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs flex items-center gap-1.5 transition-colors"
          title="Clear Conversation"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="hidden sm:inline">Clear Chat</span>
        </button>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50 dark:bg-slate-950/50 border-x border-slate-200 dark:border-slate-800 space-y-4">
        
        {/* Render quick prompts when chat has few messages */}
        {chatMessages.length <= 1 && (
          <QuickPrompts onSelectPrompt={(promptText) => handleSendMessage(promptText)} />
        )}

        {chatMessages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            onSelectSuggestion={(suggestionText) => handleSendMessage(suggestionText)}
          />
        ))}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex items-center gap-3 text-slate-400 text-xs p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-fit animate-pulse">
            <Bot className="w-4 h-4 text-teal-500 animate-spin" />
            <span>Analyzing health context & medical literature...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box Area */}
      <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-b-2xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask about symptoms, lab results, medications, or health vitals..."
            disabled={isLoading}
            className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="px-5 py-3 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold rounded-xl text-sm flex items-center gap-2 shadow-sm transition-all shrink-0"
          >
            <span>Send</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
}
