import React from 'react';
import { useHealth } from '../../context/HealthContext';
import { Card, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { FileText, Printer, Calendar, User, Heart, Pill, FileCheck, ShieldAlert, CheckCircle } from 'lucide-react';

export function DoctorSummaryModal() {
  const { userProfile, vitalsLogs, medications, labReports, drugInteractions, healthScore } = useHealth();

  const handlePrint = () => {
    window.print();
  };

  const latestVital = vitalsLogs[vitalsLogs.length - 1] || {};
  const latestLab = labReports[0] || null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header & Print Action */}
      <Card className="bg-gradient-to-r from-teal-500/10 via-emerald-500/5 to-transparent border-teal-200 dark:border-teal-900/60">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-teal-600 text-white rounded-2xl shadow-md">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                Physician Consultation Briefing Report
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Consolidated clinical summary ready to print or export for your next doctor's appointment.
              </p>
            </div>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 font-bold rounded-2xl text-xs shadow-md transition-all shrink-0"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </Card>

      {/* Printable Clinical Sheet Container */}
      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-6 print:p-0 print:border-none print:shadow-none">
        
        {/* Patient Demographics Banner */}
        <div className="flex flex-col sm:flex-row justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {userProfile.name}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Age: {userProfile.age} | Gender: {userProfile.gender} | Blood Type: {userProfile.bloodType} | Height: {userProfile.heightCm} cm | Weight: {userProfile.weightKg} kg
            </p>
          </div>
          <div className="text-right mt-2 sm:mt-0 text-xs text-slate-500">
            <p className="font-semibold text-teal-600 dark:text-teal-400">HealthPulse AI Briefing</p>
            <p>Generated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Existing Conditions & Allergies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Known Conditions</h4>
            <div className="flex flex-wrap gap-1.5">
              {userProfile.conditions?.map((c, i) => (
                <Badge key={i} variant="primary">{c}</Badge>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Allergies</h4>
            <div className="flex flex-wrap gap-1.5">
              {userProfile.allergies?.map((a, i) => (
                <Badge key={i} variant="emergency">{a}</Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Vitals Summary */}
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500" />
            <span>Recent Vitals Snapshot (7-Day Baseline)</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
              <span className="text-slate-400 font-semibold block">Blood Pressure</span>
              <span className="text-base font-bold text-slate-800 dark:text-slate-100">
                {latestVital.systolic}/{latestVital.diastolic} mmHg
              </span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
              <span className="text-slate-400 font-semibold block">Fasting Glucose</span>
              <span className="text-base font-bold text-slate-800 dark:text-slate-100">
                {latestVital.bloodGlucose} mg/dL
              </span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
              <span className="text-slate-400 font-semibold block">Resting Heart Rate</span>
              <span className="text-base font-bold text-slate-800 dark:text-slate-100">
                {latestVital.heartRate} bpm
              </span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
              <span className="text-slate-400 font-semibold block">Average Sleep</span>
              <span className="text-base font-bold text-slate-800 dark:text-slate-100">
                {latestVital.sleepHours} hrs
              </span>
            </div>
          </div>
        </div>

        {/* Active Medications List */}
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
            <Pill className="w-4 h-4 text-teal-600" />
            <span>Current Active Prescriptions ({medications.length})</span>
          </h3>

          <div className="space-y-2">
            {medications.map((m) => (
              <div key={m.id} className="flex justify-between items-center text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{m.name}</span>
                  <span className="ml-2 text-slate-500">({m.dosage} - {m.frequency})</span>
                </div>
                <span className="text-slate-500 font-medium">For: {m.purpose}</span>
              </div>
            ))}
          </div>

          {drugInteractions.length > 0 && (
            <div className="mt-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 text-xs text-amber-900 dark:text-amber-200">
              <p className="font-bold flex items-center gap-1">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>Screening Warning: {drugInteractions.length} potential interaction noted for review</span>
              </p>
            </div>
          )}
        </div>

        {/* Recent Lab Results */}
        {latestLab && (
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-blue-600" />
              <span>Latest Biomarker Findings ({latestLab.title})</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {latestLab.summary}
            </p>
          </div>
        )}

        {/* Key Questions for Provider */}
        <div className="p-4 rounded-2xl bg-teal-50/40 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/60">
          <h4 className="text-xs font-bold text-teal-800 dark:text-teal-300 uppercase tracking-wider mb-2">
            Suggested Consultation Agenda
          </h4>
          <ol className="list-decimal pl-5 space-y-1 text-xs text-slate-700 dark:text-slate-300">
            <li>Review recent blood glucose trend (averaging {latestVital.bloodGlucose} mg/dL).</li>
            <li>Evaluate blood pressure control stability on current Lisinopril dosage.</li>
            <li>Confirm routine follow-up schedule for HbA1c re-assessment.</li>
          </ol>
        </div>

      </div>
    </div>
  );
}
