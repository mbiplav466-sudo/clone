import React from 'react';
import { AlertOctagon, PhoneCall, X } from 'lucide-react';
import { useHealth } from '../../context/HealthContext';

export function EmergencyBanner() {
  const { activeEmergencyAlert, setActiveEmergencyAlert } = useHealth();

  if (!activeEmergencyAlert) return null;

  return (
    <div className="bg-red-600 text-white px-4 py-3 shadow-lg relative z-50 animate-bounceOnce">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-700 rounded-xl shrink-0">
            <AlertOctagon className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <h4 className="font-bold text-sm sm:text-base">Medical Emergency Warning Detected!</h4>
            <p className="text-xs sm:text-sm text-red-100">
              {activeEmergencyAlert.message || 'Severe or life-threatening symptoms flagged. Do not delay emergency evaluation.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href="tel:911"
            className="flex items-center gap-2 px-4 py-1.5 bg-white text-red-700 hover:bg-red-50 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call 911 / 112</span>
          </a>
          <button
            onClick={() => setActiveEmergencyAlert(null)}
            className="p-1.5 text-red-200 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
