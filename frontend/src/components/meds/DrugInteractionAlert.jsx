import React from 'react';
import { AlertTriangle, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Card } from '../ui/Card';

export function DrugInteractionAlert({ alerts = [] }) {
  if (alerts.length === 0) {
    return (
      <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 flex items-center gap-3">
        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <div>
          <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
            No Active Drug Interactions Detected
          </h4>
          <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
            All current active prescriptions appear compatible based on standard pharmacological matrices.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`p-4 rounded-2xl border ${
            alert.severity === 'HIGH'
              ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-900 text-rose-900 dark:text-rose-200'
              : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-900 text-amber-900 dark:text-amber-200'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-xl shrink-0 ${alert.severity === 'HIGH' ? 'bg-rose-200 text-rose-800' : 'bg-amber-200 text-amber-800'}`}>
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider">
                  {alert.severity} SEVERITY DRUG WARNING: {alert.drugA} + {alert.drugB}
                </h4>
              </div>
              <p className="text-xs font-semibold mt-1">
                Effect: {alert.effect}
              </p>
              <p className="text-[11px] opacity-90 mt-0.5 leading-relaxed">
                Mechanism: {alert.mechanism}
              </p>
              <p className="text-[11px] font-medium mt-2 underline">
                Recommended Action: {alert.action}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
