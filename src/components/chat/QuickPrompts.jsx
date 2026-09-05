import React from 'react';
import { Sparkles, Activity, ShieldAlert, FileText, Pill } from 'lucide-react';

export function QuickPrompts({ onSelectPrompt }) {
  const prompts = [
    { title: 'Symptom Consultation', prompt: 'I have had a throbbing tension headache and stiff shoulders for 2 days. What should I do?', icon: Activity, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40' },
    { title: 'Medication Check', prompt: 'Are there any potential interactions between my daily Lisinopril and taking OTC Ibuprofen?', icon: Pill, color: 'text-teal-500 bg-teal-50 dark:bg-teal-950/40' },
    { title: 'Lab Report Guidance', prompt: 'Explain what an HbA1c of 5.8% and Fasting Glucose of 108 mg/dL mean for pre-diabetes.', icon: FileText, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/40' },
    { title: 'Emergency Flags', prompt: 'What are the classic red flag signs of a stroke or heart attack?', icon: ShieldAlert, color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/40' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
      {prompts.map((item, idx) => {
        const Icon = item.icon;
        return (
          <button
            key={idx}
            onClick={() => onSelectPrompt(item.prompt)}
            className="flex items-start gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500 dark:hover:border-teal-500/60 hover:shadow-sm text-left transition-all group"
          >
            <div className={`p-2 rounded-xl shrink-0 ${item.color}`}>
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-teal-600 dark:group-hover:text-teal-400">
                {item.title}
              </h5>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                {item.prompt}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
