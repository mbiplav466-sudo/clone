import React, { useState } from 'react';
import { useHealth } from '../../context/HealthContext';
import { Card, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { DrugInteractionAlert } from './DrugInteractionAlert';
import { AddMedModal } from './AddMedModal';
import { Pill, Plus, Trash2, Calendar, ShieldCheck, AlertTriangle, CheckCircle2 } from 'lucide-react';

export function MedicationTracker() {
  const { medications, deleteMedication, drugInteractions } = useHealth();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <Card className="bg-gradient-to-r from-teal-500/10 via-emerald-500/5 to-transparent border-teal-200 dark:border-teal-900/60">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-teal-600 text-white rounded-2xl shadow-md">
              <Pill className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                Active Medications & Interaction Guard
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Track prescriptions, adherence history, and automatically screen for drug-drug & drug-food interactions.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl text-xs shadow-md transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Medication</span>
          </button>
        </div>
      </Card>

      {/* Drug Interaction Safety Section */}
      <Card>
        <CardHeader>
          <CardTitle icon={ShieldCheck}>Pharmacological Interaction Screen</CardTitle>
        </CardHeader>
        <DrugInteractionAlert alerts={drugInteractions} />
      </Card>

      {/* Active Medications List */}
      <Card>
        <CardHeader>
          <CardTitle icon={Pill}>Active Prescriptions ({medications.length})</CardTitle>
        </CardHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {medications.map((med) => (
            <div
              key={med.id}
              className="p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex justify-between items-start hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">{med.name}</h4>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">
                    {med.dosage}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  {med.frequency} • {med.timing}
                </p>
                <p className="text-[11px] text-slate-500 italic">
                  Purpose: {med.purpose || 'General medical support'}
                </p>
                <div className="flex items-center gap-3 pt-2 text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Refill: {med.refillDate || 'N/A'}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    {med.adherence || 100}% Adherence
                  </span>
                </div>
              </div>

              <button
                onClick={() => deleteMedication(med.id)}
                className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                title="Remove medication"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </Card>

      <AddMedModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
