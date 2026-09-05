import React, { useState } from 'react';
import { useHealth } from '../../context/HealthContext';
import { analyzeLabReportAI } from '../../services/geminiService';
import { SAMPLE_LAB_REPORTS } from '../../data/sampleData';
import { LabResultsCard } from './LabResultsCard';
import { Card, CardHeader, CardTitle } from '../ui/Card';
import { FileCheck, Upload, FileText, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export function LabReportAnalyzer() {
  const { labReports, addLabReport, apiKey } = useHealth();
  const [selectedReport, setSelectedReport] = useState(labReports[0] || null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleSampleSelect = (sample) => {
    setSelectedReport(sample);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    try {
      const parsedReport = await analyzeLabReportAI(file.name, null, apiKey);
      addLabReport(parsedReport);
      setSelectedReport(parsedReport);
    } catch (err) {
      console.error('Failed to parse lab report:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <Card className="bg-gradient-to-r from-teal-500/10 via-emerald-500/5 to-transparent border-teal-200 dark:border-teal-900/60">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-teal-600 text-white rounded-2xl shadow-md">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                Multimodal Medical Lab Report Reader
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Upload blood work images or choose sample reports to translate complex medical jargon into plain English.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Upload Zone & Presets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Upload Card */}
        <Card className="md:col-span-2 flex flex-col justify-between">
          <CardHeader>
            <CardTitle icon={Upload}>Upload Lab Report / Image</CardTitle>
          </CardHeader>

          <label
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              if (e.dataTransfer.files?.[0]) {
                handleFileUpload({ target: { files: e.dataTransfer.files } });
              }
            }}
            className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
              dragActive
                ? 'border-teal-500 bg-teal-50/50 dark:bg-teal-950/40'
                : 'border-slate-300 dark:border-slate-700 hover:border-teal-400 bg-slate-50/50 dark:bg-slate-800/40'
            }`}
          >
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="p-3 bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 rounded-full mb-3">
              <Upload className="w-6 h-6" />
            </div>
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Drag & Drop your Lab Report or Click to Browse
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Supports PNG, JPG, PDF (CBC, Lipid Panel, Metabolic, Thyroid)
            </p>
            {isAnalyzing && (
              <div className="mt-3 flex items-center gap-2 text-xs text-teal-600 dark:text-teal-400 font-semibold animate-pulse">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Multimodal AI is interpreting biomarkers...</span>
              </div>
            )}
          </label>
        </Card>

        {/* Saved & Sample Reports Picker */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle icon={FileText}>Sample & Saved Reports</CardTitle>
          </CardHeader>

          <div className="space-y-2 overflow-y-auto max-h-64 pr-1">
            {labReports.map((report) => {
              const isSelected = selectedReport?.id === report.id;
              return (
                <button
                  key={report.id}
                  onClick={() => handleSampleSelect(report)}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                    isSelected
                      ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-500 font-semibold text-teal-900 dark:text-teal-100 shadow-sm'
                      : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="truncate max-w-[180px]">{report.title}</span>
                    <span className="text-[10px] text-slate-400">{report.date}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-1">
                    {report.labName}
                  </p>
                </button>
              );
            })}
          </div>
        </Card>

      </div>

      {/* Selected Report Output View */}
      {selectedReport && (
        <LabResultsCard report={selectedReport} />
      )}

    </div>
  );
}
