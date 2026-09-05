import React from 'react';
import { BODY_PARTS } from '../../data/medicalKnowledge';
import { Brain, Heart, Activity, Bone, Sun, Smile, Thermometer } from 'lucide-react';

const ICON_MAP = {
  Brain,
  Heart,
  Activity,
  Bone,
  Sun,
  Smile,
  Thermometer
};

export function BodyMap({ selectedPart, onSelectPart }) {
  return (
    <div className="space-y-4">
      <div className="text-center sm:text-left">
        <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          Select Symptom Region
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Click on the body area where you are experiencing pain, discomfort, or abnormal symptoms.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {BODY_PARTS.map((part) => {
          const IconComponent = ICON_MAP[part.icon] || Activity;
          const isSelected = selectedPart === part.id;
          return (
            <button
              key={part.id}
              onClick={() => onSelectPart(part.id)}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-200 text-center ${
                isSelected
                  ? 'bg-gradient-to-br from-teal-500 to-emerald-600 text-white border-teal-600 shadow-md shadow-teal-500/20 scale-[1.02]'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-teal-400 dark:hover:border-teal-600 hover:shadow-sm'
              }`}
            >
              <div className={`p-2.5 rounded-xl mb-2 ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-teal-600 dark:text-teal-400'}`}>
                <IconComponent className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold leading-tight">{part.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
