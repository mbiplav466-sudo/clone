import React from 'react';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { AlertOctagon, Clock, CheckCircle2, AlertTriangle, FileText, Calendar, ChevronRight } from 'lucide-react';
import { useHealth } from '../../context/HealthContext';

export function TriageReportModal({ isOpen, onClose, report }) {
  const { setActiveTab, setActiveEmergencyAlert } = useHealth();
  if (!report) return null;

  const { triageConfig, summary, potentialCauses = [], redFlagsToWatch = [], recommendedActions = [], questionsForDoctor = [] } = report;

  const isEmergency = triageConfig?.level === 'EMERGENCY';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Clinical Triage Assessment" maxWidth="max-w-3xl">
      <div className="space-y-6">
        
        {/* Triage Status Banner */}
        <div className={`p-5 rounded-2xl border ${triageConfig?.color || 'bg-slate-800 text-white'} shadow-md`}>
          <div className="flex items-center justify-between gap-4 mb-2">
            <div className="flex items-center gap-2.5">
              {isEmergency ? (
                <AlertOctagon className="w-7 h-7 text-white animate-pulse" />
              ) : (
                <Clock className="w-6 h-6 text-white" />
              )}
              <h3 className="text-lg font-bold tracking-tight">{triageConfig?.label}</h3>
            </div>
            <span className="text-xs font-semibold px-3 py-1 bg-white/20 rounded-full text-white backdrop-blur-sm">
              {triageConfig?.timeframe}
            </span>
          </div>
          <p className="text-sm opacity-95 leading-relaxed font-medium">
            {triageConfig?.recommendation}
          </p>

          {isEmergency && (
            <div className="mt-4 pt-3 border-t border-white/20 flex gap-3">
              <a
                href="tel:911"
                className="px-4 py-2 bg-white text-red-700 hover:bg-red-50 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm"
              >
                <span>Call Emergency Services (911)</span>
              </a>
            </div>
          )}
        </div>

        {/* Clinical Summary */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
            Assessment Summary
          </h4>
          <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
            {summary}
          </p>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Differential Causes */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Potential Differential Considerations</span>
            </h4>
            <ul className="space-y-2">
              {potentialCauses.map((cause, idx) => (
                <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                  <span>{cause}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Red Flags Warning */}
          <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60">
            <h4 className="text-sm font-semibold text-rose-800 dark:text-rose-300 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Red Flags (Escalate Care If Present)</span>
            </h4>
            <ul className="space-y-2">
              {redFlagsToWatch.map((flag, idx) => (
                <li key={idx} className="text-xs text-rose-700 dark:text-rose-400 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span>{flag}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Recommended Actions & Questions for Doctor */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Recommended Next Steps</span>
            </h4>
            <div className="space-y-1.5">
              {recommendedActions.map((action, idx) => (
                <p key={idx} className="text-xs text-slate-600 dark:text-slate-300 pl-6 relative">
                  <span className="absolute left-1 text-emerald-500 font-bold">•</span>
                  {action}
                </p>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>Questions to Ask Your Doctor</span>
            </h4>
            <div className="space-y-1.5">
              {questionsForDoctor.map((q, idx) => (
                <p key={idx} className="text-xs text-slate-600 dark:text-slate-300 pl-6 relative italic">
                  <span className="absolute left-1 text-blue-500 font-bold">?</span>
                  "{q}"
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex justify-between items-center pt-2">
          <button
            onClick={() => {
              onClose();
              setActiveTab('chat');
            }}
            className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
          >
            <span>Discuss this report in AI Consultation</span>
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold hover:bg-slate-800 transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </Modal>
  );
}
