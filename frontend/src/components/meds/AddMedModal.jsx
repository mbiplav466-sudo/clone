import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { useHealth } from '../../context/HealthContext';

export function AddMedModal({ isOpen, onClose }) {
  const { addMedication } = useHealth();
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    frequency: 'Once daily',
    timing: 'Morning',
    purpose: '',
    refillDate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    addMedication(formData);
    setFormData({ name: '', dosage: '', frequency: 'Once daily', timing: 'Morning', purpose: '', refillDate: '' });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Active Medication">
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Medication Name</label>
          <input
            type="text"
            placeholder="e.g. Lisinopril, Metformin, Aspirin"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Dosage</label>
            <input
              type="text"
              placeholder="e.g. 10 mg, 500 mg"
              value={formData.dosage}
              onChange={(e) => setFormData(prev => ({ ...prev, dosage: e.target.value }))}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Frequency</label>
            <select
              value={formData.frequency}
              onChange={(e) => setFormData(prev => ({ ...prev, frequency: e.target.value }))}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
            >
              <option value="Once daily">Once daily</option>
              <option value="Twice daily">Twice daily</option>
              <option value="Three times daily">Three times daily</option>
              <option value="As needed (PRN)">As needed (PRN)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Purpose / Indication</label>
          <input
            type="text"
            placeholder="e.g. High Blood Pressure, Diabetes, Pain relief"
            value={formData.purpose}
            onChange={(e) => setFormData(prev => ({ ...prev, purpose: e.target.value }))}
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Next Refill Date</label>
          <input
            type="date"
            value={formData.refillDate}
            onChange={(e) => setFormData(prev => ({ ...prev, refillDate: e.target.value }))}
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
          />
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
            Save Medication
          </button>
        </div>

      </form>
    </Modal>
  );
}
