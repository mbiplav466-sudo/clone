import React, { useState } from 'react';
import { useHealth } from '../../context/HealthContext';
import { SYMPTOM_CATALOG, BODY_PARTS } from '../../data/medicalKnowledge';
import { evaluateSymptomTriage } from '../../services/geminiService';
import { BodyMap } from './BodyMap';
import { TriageReportModal } from './TriageReportModal';
import { Card, CardHeader, CardTitle } from '../ui/Card';
import { Stethoscope, AlertTriangle, ShieldCheck, Activity, ChevronRight, Sliders, CheckSquare, Square } from 'lucide-react';

export function SymptomChecker() {
  const { userProfile, apiKey } = useHealth();
  const [selectedBodyPart, setSelectedBodyPart] = useState('head');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [severity, setSeverity] = useState(5);
  const [duration, setDuration] = useState('1-2 days');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [triageReport, setTriageReport] = useState(null);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const availableSymptoms = SYMPTOM_CATALOG[selectedBodyPart] || [];

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms(prev => {
      const exists = prev.some(s => s.id === symptom.id);
      if (exists) {
        return prev.filter(s => s.id !== symptom.id);
      } else {
        return [...prev, symptom];
      }
    });
  };

  const handleEvaluate = async () => {
    if (selectedSymptoms.length === 0) return;
    setIsEvaluating(true);

    try {
      const result = await evaluateSymptomTriage({
        bodyPart: BODY_PARTS.find(b => b.id === selectedBodyPart)?.name || selectedBodyPart,
        symptoms: selectedSymptoms,
        severity,
        duration,
        notes: additionalNotes
      }, userProfile, apiKey);

      setTriageReport(result);
      setIsReportOpen(true);
    } catch (e) {
      console.error(e);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <Card className="bg-gradient-to-r from-teal-500/10 via-emerald-500/5 to-transparent border-teal-200 dark:border-teal-900/60">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-teal-600 text-white rounded-2xl shadow-md">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                Interactive Symptom Triage & Risk Assessment
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Select your affected body region and specific symptoms to receive an instant clinical triage evaluation.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Step 1: Body Part Map Selector */}
      <Card>
        <CardHeader>
          <CardTitle icon={Activity}>Step 1: Select Body Area</CardTitle>
        </CardHeader>
        <BodyMap
          selectedPart={selectedBodyPart}
          onSelectPart={(partId) => {
            setSelectedBodyPart(partId);
            setSelectedSymptoms([]);
          }}
        />
      </Card>

      {/* Step 2: Specific Symptoms */}
      <Card>
        <CardHeader>
          <CardTitle icon={CheckSquare}>
            Step 2: Select Specific Symptoms ({selectedSymptoms.length} selected)
          </CardTitle>
        </CardHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {availableSymptoms.map((symptom) => {
            const isChecked = selectedSymptoms.some(s => s.id === symptom.id);
            return (
              <div
                key={symptom.id}
                onClick={() => toggleSymptom(symptom)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-150 flex items-start gap-3 ${
                  isChecked
                    ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-500 text-teal-900 dark:text-teal-100 shadow-sm'
                    : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="mt-0.5 text-teal-600 dark:text-teal-400">
                  {isChecked ? <CheckSquare className="w-5 h-5 fill-teal-600 text-white" /> : <Square className="w-5 h-5 text-slate-400" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold">{symptom.name}</span>
                    {symptom.emergency && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800">
                        Red Flag
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    {symptom.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Step 3: Severity & Duration Form */}
      <Card>
        <CardHeader>
          <CardTitle icon={Sliders}>Step 3: Severity & Duration</CardTitle>
        </CardHeader>

        <div className="space-y-5">
          {/* Severity Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Pain / Severity Level (1 - 10):
              </label>
              <span className={`text-sm font-bold px-3 py-1 rounded-xl ${
                severity >= 8 ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' :
                severity >= 5 ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
              }`}>
                {severity} / 10 {severity >= 8 ? '(Severe)' : severity >= 5 ? '(Moderate)' : '(Mild)'}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={severity}
              onChange={(e) => setSeverity(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>1 (Mild discomfort)</span>
              <span>5 (Moderate pain)</span>
              <span>10 (Unbearable emergency)</span>
            </div>
          </div>

          {/* Duration Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Duration of Symptoms:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {['Just started (<3 hrs)', '1-2 days', '3-7 days', 'More than 1 week'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setDuration(option)}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border transition-colors ${
                    duration === option
                      ? 'bg-teal-600 text-white border-teal-600 font-bold shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Additional Context / Triggers (Optional):
            </label>
            <textarea
              rows="2"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="e.g. Worsens after eating, started after heavy lifting, fever of 101F..."
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              onClick={handleEvaluate}
              disabled={selectedSymptoms.length === 0 || isEvaluating}
              className="w-full py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 disabled:opacity-50 text-white font-bold rounded-2xl text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              {isEvaluating ? (
                <span>Generating Clinical Triage Report...</span>
              ) : (
                <>
                  <span>Evaluate Symptoms & Generate Triage Report</span>
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

        </div>
      </Card>

      {/* Modal Report */}
      <TriageReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        report={triageReport}
      />
    </div>
  );
}
