import React from 'react';
import { useHealth } from '../../context/HealthContext';
import {
  MessageSquare,
  Stethoscope,
  Activity,
  FileCheck,
  Pill,
  FileText
} from 'lucide-react';

export function Sidebar() {
  const { activeTab, setActiveTab, drugInteractions } = useHealth();

  const navItems = [
    { id: 'chat', label: 'AI Consultation', icon: MessageSquare, badge: null },
    { id: 'symptoms', label: 'Symptom Triage', icon: Stethoscope, badge: 'Interactive' },
    { id: 'vitals', label: 'Vitals & Analytics', icon: Activity, badge: null },
    { id: 'labs', label: 'Lab Analyzer', icon: FileCheck, badge: null },
    { id: 'meds', label: 'Medications', icon: Pill, badge: drugInteractions.length > 0 ? `${drugInteractions.length} Warning` : null, alert: drugInteractions.some(d => d.severity === 'HIGH') },
    { id: 'summary', label: 'Doctor Briefing', icon: FileText, badge: 'Export' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 shrink-0 min-h-[calc(100vh-4rem)]">
        <div className="space-y-1.5">
          <p className="px-3 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
            Main Navigation
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                  isActive
                    ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 shadow-sm border border-teal-200 dark:border-teal-800 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400 dark:text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.alert
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 animate-pulse'
                        : isActive
                        ? 'bg-teal-200/70 text-teal-800 dark:bg-teal-900 dark:text-teal-200'
                        : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Clinical Safety Box */}
        <div className="mt-auto pt-6">
          <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-800 dark:text-amber-300">
            <p className="font-semibold flex items-center gap-1 mb-1">
              <span>🩺</span> Educational Tool
            </p>
            <p className="text-[11px] leading-relaxed text-amber-700 dark:text-amber-400">
              Not intended to diagnose or prescribe. In emergencies, call your local hotline immediately.
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile Navigation Bar (Bottom Sticky) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl text-[10px] font-medium transition-colors ${
                isActive
                  ? 'text-teal-600 dark:text-teal-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
