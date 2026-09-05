import React, { useState } from 'react';
import { useHealth } from '../../context/HealthContext';
import { Card, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { VitalsChart } from './VitalsChart';
import { AddVitalModal } from './AddVitalModal';
import { Activity, Plus, Heart, Flame, Moon, Scale, Droplet, Trash2 } from 'lucide-react';

export function VitalsDashboard() {
  const { vitalsLogs, latestVital, deleteVitalLog, healthScore } = useHealth();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <Card className="bg-gradient-to-r from-teal-500/10 via-emerald-500/5 to-transparent border-teal-200 dark:border-teal-900/60">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-teal-600 text-white rounded-2xl shadow-md">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                Health Vitals & Biometric Dashboard
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Track blood pressure, fasting glucose, heart rate, sleep, and weight trends.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl text-xs shadow-md transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Log Daily Vitals</span>
          </button>
        </div>
      </Card>

      {/* Overview Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        
        {/* Blood Pressure */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Blood Pressure</span>
            <Activity className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-base font-bold text-slate-800 dark:text-slate-100">
            {latestVital.systolic}/{latestVital.diastolic}
          </p>
          <p className="text-[10px] text-slate-500">mmHg (Syst/Diast)</p>
        </div>

        {/* Glucose */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Glucose</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-base font-bold text-slate-800 dark:text-slate-100">
            {latestVital.bloodGlucose}
          </p>
          <p className="text-[10px] text-slate-500">mg/dL (Fasting)</p>
        </div>

        {/* Heart Rate */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Heart Rate</span>
            <Heart className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-base font-bold text-slate-800 dark:text-slate-100">
            {latestVital.heartRate}
          </p>
          <p className="text-[10px] text-slate-500">bpm (Resting)</p>
        </div>

        {/* SpO2 */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">SpO2</span>
            <Droplet className="w-4 h-4 text-cyan-500" />
          </div>
          <p className="text-base font-bold text-slate-800 dark:text-slate-100">
            {latestVital.spo2}%
          </p>
          <p className="text-[10px] text-slate-500">Blood Oxygen</p>
        </div>

        {/* Sleep */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Sleep</span>
            <Moon className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-base font-bold text-slate-800 dark:text-slate-100">
            {latestVital.sleepHours}h
          </p>
          <p className="text-[10px] text-slate-500">Rest Hours</p>
        </div>

        {/* Weight */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Weight</span>
            <Scale className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-base font-bold text-slate-800 dark:text-slate-100">
            {latestVital.weight}
          </p>
          <p className="text-[10px] text-slate-500">kg</p>
        </div>

      </div>

      {/* Analytics Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle icon={Activity}>Interactive Trend Analytics</CardTitle>
        </CardHeader>
        <VitalsChart vitalsLogs={vitalsLogs} />
      </Card>

      {/* Log History Table */}
      <Card>
        <CardHeader>
          <CardTitle icon={Activity}>Vitals Log History ({vitalsLogs.length} Entries)</CardTitle>
        </CardHeader>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase font-semibold">
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">BP (mmHg)</th>
                <th className="py-2.5 px-3">Glucose</th>
                <th className="py-2.5 px-3">HR</th>
                <th className="py-2.5 px-3">SpO2</th>
                <th className="py-2.5 px-3">Sleep</th>
                <th className="py-2.5 px-3">Weight</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {vitalsLogs.slice().reverse().map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-2.5 px-3 font-semibold text-slate-700 dark:text-slate-300">{log.date}</td>
                  <td className="py-2.5 px-3">{log.systolic}/{log.diastolic}</td>
                  <td className="py-2.5 px-3">{log.bloodGlucose} mg/dL</td>
                  <td className="py-2.5 px-3">{log.heartRate} bpm</td>
                  <td className="py-2.5 px-3">{log.spo2}%</td>
                  <td className="py-2.5 px-3">{log.sleepHours}h</td>
                  <td className="py-2.5 px-3">{log.weight} kg</td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => deleteVitalLog(log.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                      title="Delete log entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <AddVitalModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
