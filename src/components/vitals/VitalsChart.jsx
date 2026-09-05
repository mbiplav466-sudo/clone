import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine
} from 'recharts';

export function VitalsChart({ vitalsLogs = [] }) {
  const [activeMetric, setActiveMetric] = useState('bp'); // 'bp' | 'glucose' | 'heartRate' | 'sleep' | 'weight'

  const formattedData = vitalsLogs.map(v => ({
    ...v,
    displayDate: v.date ? v.date.slice(5) : ''
  }));

  return (
    <div className="space-y-4">
      {/* Metric Selector Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'bp', label: 'Blood Pressure (mmHg)' },
          { id: 'glucose', label: 'Blood Glucose (mg/dL)' },
          { id: 'heartRate', label: 'Heart Rate (bpm)' },
          { id: 'sleep', label: 'Sleep (hours)' },
          { id: 'weight', label: 'Weight (kg)' }
        ].map(m => (
          <button
            key={m.id}
            onClick={() => setActiveMetric(m.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              activeMetric === m.id
                ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Recharts Container */}
      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
            <XAxis dataKey="displayDate" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} domain={['auto', 'auto']} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                borderRadius: '12px',
                border: 'none',
                color: '#fff',
                fontSize: '12px'
              }}
            />

            {activeMetric === 'bp' && (
              <>
                <ReferenceLine y={120} stroke="#10b981" strokeDasharray="3 3" label={{ value: 'Target Systolic (<120)', fill: '#10b981', fontSize: 10 }} />
                <Line type="monotone" dataKey="systolic" name="Systolic" stroke="#f43f5e" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="diastolic" name="Diastolic" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4 }} />
              </>
            )}

            {activeMetric === 'glucose' && (
              <>
                <ReferenceLine y={100} stroke="#10b981" strokeDasharray="3 3" label={{ value: 'Fasting Target (<100)', fill: '#10b981', fontSize: 10 }} />
                <Line type="monotone" dataKey="bloodGlucose" name="Glucose (mg/dL)" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4 }} />
              </>
            )}

            {activeMetric === 'heartRate' && (
              <Line type="monotone" dataKey="heartRate" name="Heart Rate (bpm)" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} />
            )}

            {activeMetric === 'sleep' && (
              <>
                <ReferenceLine y={8} stroke="#3b82f6" strokeDasharray="3 3" label={{ value: '8h Target', fill: '#3b82f6', fontSize: 10 }} />
                <Line type="monotone" dataKey="sleepHours" name="Sleep (hrs)" stroke="#8b5cf6" strokeWidth={2.5} dot={{ r: 4 }} />
              </>
            )}

            {activeMetric === 'weight' && (
              <Line type="monotone" dataKey="weight" name="Weight (kg)" stroke="#06b6d4" strokeWidth={2.5} dot={{ r: 4 }} />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
