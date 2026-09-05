// Sample data for vitals history, active medications, sample lab reports, and profile

export const INITIAL_USER_PROFILE = {
  name: 'Alex Johnson',
  age: 42,
  gender: 'Male',
  heightCm: 178,
  weightKg: 78.5,
  bloodType: 'O+',
  allergies: ['Penicillin', 'Peanuts'],
  conditions: ['Mild Hypertension', 'Pre-diabetes'],
  emergencyContact: {
    name: 'Sarah Johnson',
    relation: 'Spouse',
    phone: '+1 (555) 234-5678'
  }
};

export const INITIAL_VITALS_LOGS = [
  { id: 'v1', date: '2026-08-30', systolic: 128, diastolic: 84, heartRate: 72, bloodGlucose: 104, spo2: 98, sleepHours: 7.5, weight: 79.0, waterMl: 2200 },
  { id: 'v2', date: '2026-08-31', systolic: 126, diastolic: 82, heartRate: 68, bloodGlucose: 99, spo2: 99, sleepHours: 8.0, weight: 78.8, waterMl: 2500 },
  { id: 'v3', date: '2026-09-01', systolic: 132, diastolic: 86, heartRate: 75, bloodGlucose: 112, spo2: 97, sleepHours: 6.2, weight: 78.9, waterMl: 1800 },
  { id: 'v4', date: '2026-09-02', systolic: 124, diastolic: 80, heartRate: 70, bloodGlucose: 95, spo2: 98, sleepHours: 7.8, weight: 78.6, waterMl: 2400 },
  { id: 'v5', date: '2026-09-03', systolic: 122, diastolic: 79, heartRate: 66, bloodGlucose: 98, spo2: 99, sleepHours: 8.2, weight: 78.5, waterMl: 2600 },
  { id: 'v6', date: '2026-09-04', systolic: 130, diastolic: 85, heartRate: 74, bloodGlucose: 108, spo2: 98, sleepHours: 6.8, weight: 78.6, waterMl: 2100 },
  { id: 'v7', date: '2026-09-05', systolic: 120, diastolic: 78, heartRate: 65, bloodGlucose: 94, spo2: 99, sleepHours: 8.0, weight: 78.5, waterMl: 2700 }
];

export const INITIAL_MEDICATIONS = [
  {
    id: 'm1',
    name: 'Lisinopril',
    dosage: '10 mg',
    frequency: 'Once daily',
    timing: 'Morning (8:00 AM)',
    purpose: 'Blood Pressure Control',
    refillDate: '2026-09-25',
    adherence: 96,
    icon: 'Pill'
  },
  {
    id: 'm2',
    name: 'Metformin',
    dosage: '500 mg',
    frequency: 'Twice daily',
    timing: 'With Meals (8:00 AM, 7:00 PM)',
    purpose: 'Blood Sugar Regulation',
    refillDate: '2026-10-02',
    adherence: 92,
    icon: 'Tablets'
  },
  {
    id: 'm3',
    name: 'Multivitamin Complex',
    dosage: '1 Tablet',
    frequency: 'Once daily',
    timing: 'Breakfast',
    purpose: 'General Wellness',
    refillDate: '2026-11-15',
    adherence: 98,
    icon: 'Syringe'
  }
];

export const SAMPLE_LAB_REPORTS = [
  {
    id: 'lab-cbc-01',
    title: 'Comprehensive Blood Count & Metabolic Panel',
    date: '2026-08-20',
    labName: 'Metro Diagnostic Center',
    orderingPhysician: 'Dr. Emily Vance, MD',
    summary: 'Mildly elevated Fasting Glucose and Borderline High LDL Cholesterol. Normal renal function and hematology.',
    markers: [
      { key: 'glucose', name: 'Fasting Blood Glucose', value: 108, unit: 'mg/dL', status: 'HIGH', note: 'Pre-diabetic threshold (100-125 mg/dL)' },
      { key: 'hba1c', name: 'HbA1c', value: 5.8, unit: '%', status: 'HIGH', note: 'Slightly elevated (Target < 5.7%)' },
      { key: 'total_cholesterol', name: 'Total Cholesterol', value: 215, unit: 'mg/dL', status: 'HIGH', note: 'Desirable < 200 mg/dL' },
      { key: 'ldl', name: 'LDL Cholesterol', value: 128, unit: 'mg/dL', status: 'HIGH', note: 'Optimal < 100 mg/dL' },
      { key: 'hdl', name: 'HDL Cholesterol', value: 52, unit: 'mg/dL', status: 'NORMAL', note: 'Good cardioprotective level' },
      { key: 'triglycerides', name: 'Triglycerides', value: 140, unit: 'mg/dL', status: 'NORMAL', note: 'Within normal limits' },
      { key: 'wbc', name: 'White Blood Cell (WBC)', value: 6.8, unit: 'k/µL', status: 'NORMAL', note: 'No acute immune response' },
      { key: 'hemoglobin', name: 'Hemoglobin', value: 15.2, unit: 'g/dL', status: 'NORMAL', note: 'Healthy oxygen carrying capacity' },
      { key: 'creatinine', name: 'Creatinine', value: 0.9, unit: 'mg/dL', status: 'NORMAL', note: 'Normal kidney filtration' },
      { key: 'tsh', name: 'TSH (Thyroid)', value: 2.1, unit: 'mIU/L', status: 'NORMAL', note: 'Normal thyroid function' }
    ],
    aiRecommendations: [
      'Focus on a low glycemic index diet rich in soluble fiber (oats, legumes, berries).',
      'Engage in 150 minutes of aerobic exercise weekly to improve insulin sensitivity and lower LDL.',
      'Re-check HbA1c and Lipid profile in 3 to 6 months.'
    ]
  },
  {
    id: 'lab-thyroid-02',
    title: 'Thyroid Function Test Panel',
    date: '2026-05-10',
    labName: 'Quest Health Labs',
    orderingPhysician: 'Dr. Michael Chang, MD',
    summary: 'All thyroid markers (TSH, Free T3, Free T4) are within optimal baseline limits.',
    markers: [
      { key: 'tsh', name: 'TSH', value: 1.85, unit: 'mIU/L', status: 'NORMAL', note: 'Optimal range (0.45 - 4.5 mIU/L)' },
      { key: 'free_t4', name: 'Free T4', value: 1.2, unit: 'ng/dL', status: 'NORMAL', note: 'Optimal (0.8 - 1.8 ng/dL)' },
      { key: 'free_t3', name: 'Free T3', value: 3.1, unit: 'pg/mL', status: 'NORMAL', note: 'Optimal (2.3 - 4.2 pg/mL)' }
    ],
    aiRecommendations: [
      'Thyroid metabolism is functioning normally.',
      'Maintain adequate dietary iodine intake from seafood or iodized salt.'
    ]
  }
];

export const INITIAL_CHAT_MESSAGES = [
  {
    id: 'msg-1',
    sender: 'ai',
    timestamp: '10:00 AM',
    text: "Hello Alex! I am **HealthPulse AI**, your medical intelligence & health triage assistant. How can I support your health and well-being today?",
    triageLevel: null,
    quickSuggestions: [
      "I have a mild tension headache and stiff shoulders",
      "Check my medication interactions with Lisinopril",
      "Analyze my latest blood sugar & BP trends",
      "Explain what HbA1c 5.8% means for my health"
    ]
  }
];
