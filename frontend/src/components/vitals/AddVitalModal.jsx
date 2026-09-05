import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { useHealth } from '../../context/HealthContext';
import { Plus, Activity } from 'lucide-react';

export function AddVitalModal({ isOpen, onClose }) {
  const { addVitalLog } = useHealth();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    systolic: 120,
    diastolic: 80,
    heartRate: 70,
    bloodGlucose: 95,
    spo2: 98,
    sleepHours: 7.5,
    weight: 78.5,
    waterMl: 2500
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addVitalLog(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Log Daily Health Vitals">
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Systolic BP (mmHg)</label>
            <input
              type="number"
              value={formData.systolic}
              onChange={(e) => setFormData(prev => ({ ...prev, systolic: e.target.value }))}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Diastolic BP (mmHg)</label>
            <input
              type="number"
              value={formData.diastolic}
              onChange={(e) => setFormData(prev => ({ ...prev, diastolic: e.target.value }))}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Heart Rate (bpm)</label>
            <input
              type="number"
              value={formData.heartRate}
              onChange={(e) => setFormData(prev => ({ ...prev, heartRate: e.target.value }))}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Fasting Glucose (mg/dL)</label>
            <input
              type="number"
              value={formData.bloodGlucose}
              onChange={(e) => setFormData(prev => ({ ...prev, bloodGlucose: e.target.value }))}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">SpO2 (%)</label>
            <input
              type="number"
              value={formData.spo2}
              onChange={(e) => setFormData(prev => ({ ...prev, spo2: e.target.value }))}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Sleep (hrs)</label>
            <input
              type="number"
              step="0.5"
              value={formData.sleepHours}
              onChange={(e) => setFormData(prev => ({ ...prev, sleepHours: e.target.value }))}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Weight (kg)</label>
            <input
              type="number"
              step="0.1"
              value={formData.weight}
              onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
              required
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-sm"
          >
            Save Vitals Log
          </button>
        </div>

      </form>
    </Modal>
  );
}
