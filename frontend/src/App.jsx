import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { HealthProvider, useHealth } from './context/HealthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { EmergencyBanner } from './components/layout/EmergencyBanner';
import { ChatWindow } from './components/chat/ChatWindow';
import { SymptomChecker } from './components/symptom/SymptomChecker';
import { VitalsDashboard } from './components/vitals/VitalsDashboard';
import { LabReportAnalyzer } from './components/lab/LabReportAnalyzer';
import { MedicationTracker } from './components/meds/MedicationTracker';
import { DoctorSummaryModal } from './components/summary/DoctorSummaryModal';

function MainContent() {
  const { activeTab } = useHealth();

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto pb-24 lg:pb-8">
      {activeTab === 'chat' && <ChatWindow />}
      {activeTab === 'symptoms' && <SymptomChecker />}
      {activeTab === 'vitals' && <VitalsDashboard />}
      {activeTab === 'labs' && <LabReportAnalyzer />}
      {activeTab === 'meds' && <MedicationTracker />}
      {activeTab === 'summary' && <DoctorSummaryModal />}
    </main>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HealthProvider>
          <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
            <EmergencyBanner />
            <Navbar />
            
            <div className="flex-1 flex max-w-7xl w-full mx-auto">
              <Sidebar />
              <MainContent />
            </div>
          </div>
        </HealthProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
