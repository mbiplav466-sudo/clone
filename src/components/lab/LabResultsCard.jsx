import React from 'react';
import { Card, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { FileCheck, AlertCircle, CheckCircle, Calendar, Building, Sparkles } from 'lucide-react';

export function LabResultsCard({ report }) {
  if (!report) return null;

  const { title, date, labName, orderingPhysician, summary, markers = [], aiRecommendations = [] } = report;

  const abnormalCount = markers.filter(m => m.status === 'HIGH' || m.status === 'LOW').length;

  return (
    <Card className="space-y-5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">{title}</h3>
            {abnormalCount > 0 ? (
              <Badge variant="urgent">{abnormalCount} Abnormal Markers</Badge>
            ) : (
              <Badge variant="selfcare">All Normal</Badge>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-1">
            <span className="flex items-center gap-1">
              <Building className="w-3.5 h-3.5" />
              {labName}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {date}
            </span>
          </div>
        </div>
      </div>

      {/* Summary Box */}
      <div className="p-4 rounded-2xl bg-teal-50/50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/60">
        <h4 className="text-xs font-bold text-teal-800 dark:text-teal-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <span>Multimodal AI Interpretation</span>
        </h4>
        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          {summary}
        </p>
      </div>

      {/* Lab Markers Table / List */}
      <div>
        <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
          Extracted Biomarkers ({markers.length} Parameters)
        </h4>

        <div className="space-y-2.5">
          {markers.map((marker, idx) => {
            const isHigh = marker.status === 'HIGH';
            const isLow = marker.status === 'LOW';
            const isAbnormal = isHigh || isLow;

            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-all ${
                  isAbnormal
                    ? 'bg-amber-50/60 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/60'
                    : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {isAbnormal ? (
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                  <div>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {marker.name}
                    </span>
                    {marker.note && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {marker.note}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <div className="text-right">
                    <span className={`text-sm font-bold ${isAbnormal ? 'text-amber-700 dark:text-amber-300' : 'text-slate-700 dark:text-slate-300'}`}>
                      {marker.value} {marker.unit}
                    </span>
                  </div>
                  <Badge variant={isHigh ? 'urgent' : isLow ? 'routine' : 'selfcare'}>
                    {marker.status}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Recommendations */}
      {aiRecommendations.length > 0 && (
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
          <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Targeted Action Items & Follow-up:
          </h4>
          <ul className="space-y-1.5 pl-4 text-xs text-slate-600 dark:text-slate-400">
            {aiRecommendations.map((rec, i) => (
              <li key={i} className="list-disc leading-relaxed">
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}

    </Card>
  );
}
