import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { api } from '../services/apiService';
import {
  INITIAL_USER_PROFILE,
  INITIAL_VITALS_LOGS,
  INITIAL_MEDICATIONS,
  SAMPLE_LAB_REPORTS,
  INITIAL_CHAT_MESSAGES
} from '../data/sampleData';
import { checkMedicationInteractions } from '../services/geminiService';

const HealthContext = createContext();

export function HealthProvider({ children }) {
  const { token, currentUser } = useAuth();

  // Local storage fallback for guest mode
  const getInitial = (key, fallback) => {
    try {
      const saved = localStorage.getItem(`healthpulse_${key}`);
      return saved ? JSON.parse(saved) : fallback;
    } catch {
      return fallback;
    }
  };

  const [userProfile, setUserProfile] = useState(() => currentUser || getInitial('profile', INITIAL_USER_PROFILE));
  const [vitalsLogs, setVitalsLogs] = useState(() => getInitial('vitals', INITIAL_VITALS_LOGS));
  const [medications, setMedications] = useState(() => getInitial('meds', INITIAL_MEDICATIONS));
  const [labReports, setLabReports] = useState(() => getInitial('labs', SAMPLE_LAB_REPORTS));
  const [chatMessages, setChatMessages] = useState(() => getInitial('chat', INITIAL_CHAT_MESSAGES));
  
  const [apiKey, setApiKey] = useState(() => {
    try {
      return localStorage.getItem('healthpulse_gemini_key') || '';
    } catch {
      return '';
    }
  });

  const [activeTab, setActiveTab] = useState('chat');
  const [activeEmergencyAlert, setActiveEmergencyAlert] = useState(null);

  // Sync state with authenticated backend API when logged in
  useEffect(() => {
    if (token && currentUser) {
      setUserProfile(currentUser);

      // Fetch user data from REST database
      Promise.all([
        api.getVitals(token).catch(() => ({ vitals: INITIAL_VITALS_LOGS })),
        api.getMeds(token).catch(() => ({ medications: INITIAL_MEDICATIONS })),
        api.getLabs(token).catch(() => ({ labs: SAMPLE_LAB_REPORTS })),
        api.getChats(token).catch(() => ({ chatMessages: INITIAL_CHAT_MESSAGES }))
      ]).then(([vitalsRes, medsRes, labsRes, chatRes]) => {
        if (vitalsRes.vitals?.length > 0) setVitalsLogs(vitalsRes.vitals);
        if (medsRes.medications?.length > 0) setMedications(medsRes.medications);
        if (labsRes.labs?.length > 0) setLabReports(labsRes.labs);
        if (chatRes.chatMessages?.length > 0) setChatMessages(chatRes.chatMessages);
      });
    }
  }, [token, currentUser]);

  // Derived state: Active Drug Interactions
  const drugInteractions = checkMedicationInteractions(medications);

  // Derived state: Latest Vitals
  const latestVital = vitalsLogs[vitalsLogs.length - 1] || {};

  // Derived state: Health Score Calculation
  const calculateHealthScore = () => {
    let score = 85;
    if (!latestVital) return score;

    if (latestVital.systolic > 140) score -= 15;
    else if (latestVital.systolic > 130) score -= 8;

    if (latestVital.bloodGlucose > 125) score -= 12;
    else if (latestVital.bloodGlucose > 100) score -= 5;

    if (latestVital.sleepHours < 6) score -= 10;
    else if (latestVital.sleepHours >= 7.5) score += 5;

    if (drugInteractions.some(d => d.severity === 'HIGH')) score -= 15;

    return Math.max(30, Math.min(100, score));
  };

  const healthScore = calculateHealthScore();

  // Handlers
  const addVitalLog = async (newLog) => {
    const entry = {
      date: newLog.date || new Date().toISOString().split('T')[0],
      systolic: Number(newLog.systolic),
      diastolic: Number(newLog.diastolic),
      heartRate: Number(newLog.heartRate),
      bloodGlucose: Number(newLog.bloodGlucose),
      spo2: Number(newLog.spo2),
      sleepHours: Number(newLog.sleepHours),
      weight: Number(newLog.weight),
      waterMl: Number(newLog.waterMl) || 2000
    };

    if (token) {
      try {
        const res = await api.addVital(entry, token);
        setVitalsLogs(prev => [...prev, res.vital]);
        return;
      } catch (e) {
        console.error('API Error adding vital:', e);
      }
    }

    setVitalsLogs(prev => [...prev, { id: `v-${Date.now()}`, ...entry }]);
  };

  const deleteVitalLog = async (id) => {
    if (token) {
      try {
        await api.deleteVital(id, token);
      } catch (e) {
        console.error('API Error deleting vital:', e);
      }
    }
    setVitalsLogs(prev => prev.filter(v => v.id !== id));
  };

  const addMedication = async (med) => {
    const entry = {
      name: med.name,
      dosage: med.dosage,
      frequency: med.frequency,
      timing: med.timing,
      purpose: med.purpose,
      refillDate: med.refillDate || 'Not specified',
      adherence: 100
    };

    if (token) {
      try {
        const res = await api.addMed(entry, token);
        setMedications(prev => [...prev, res.medication]);
        return;
      } catch (e) {
        console.error('API Error adding med:', e);
      }
    }

    setMedications(prev => [...prev, { id: `m-${Date.now()}`, ...entry }]);
  };

  const deleteMedication = async (id) => {
    if (token) {
      try {
        await api.deleteMed(id, token);
      } catch (e) {
        console.error('API Error deleting med:', e);
      }
    }
    setMedications(prev => prev.filter(m => m.id !== id));
  };

  const addLabReport = async (report) => {
    if (token) {
      try {
        const res = await api.addLab(report, token);
        setLabReports(prev => [res.lab, ...prev]);
        return;
      } catch (e) {
        console.error('API Error adding lab:', e);
      }
    }
    setLabReports(prev => [report, ...prev]);
  };

  const addChatMessage = async (msg) => {
    const message = {
      id: `msg-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ...msg
    };
    
    const newChatList = [...chatMessages, message];
    setChatMessages(newChatList);

    if (token) {
      try {
        await api.saveChats(newChatList, token);
      } catch (e) {
        console.error('API Error saving chats:', e);
      }
    }
  };

  const clearChatHistory = async () => {
    setChatMessages(INITIAL_CHAT_MESSAGES);
    if (token) {
      try {
        await api.saveChats(INITIAL_CHAT_MESSAGES, token);
      } catch (e) {
        console.error('API Error clearing chats:', e);
      }
    }
  };

  const updateUserProfile = (updated) => {
    setUserProfile(prev => ({ ...prev, ...updated }));
  };

  return (
    <HealthContext.Provider
      value={{
        userProfile,
        updateUserProfile,
        vitalsLogs,
        addVitalLog,
        deleteVitalLog,
        latestVital,
        medications,
        addMedication,
        deleteMedication,
        drugInteractions,
        labReports,
        addLabReport,
        chatMessages,
        addChatMessage,
        clearChatHistory,
        apiKey,
        setApiKey,
        activeTab,
        setActiveTab,
        healthScore,
        activeEmergencyAlert,
        setActiveEmergencyAlert
      }}
    >
      {children}
    </HealthContext.Provider>
  );
}

export function useHealth() {
  const context = useContext(HealthContext);
  if (!context) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
}
