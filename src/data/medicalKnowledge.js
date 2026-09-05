// Clinical knowledge database for triage, body map symptoms, drug interactions, and lab reference ranges

export const BODY_PARTS = [
  { id: 'head', name: 'Head & Neck', icon: 'Brain', color: 'from-purple-500 to-indigo-600' },
  { id: 'chest', name: 'Chest & Lungs', icon: 'Heart', color: 'from-red-500 to-pink-600' },
  { id: 'abdomen', name: 'Abdomen & Digestive', icon: 'Activity', color: 'from-amber-500 to-orange-600' },
  { id: 'joints', name: 'Joints & Musculoskeletal', icon: 'Bone', color: 'from-emerald-500 to-teal-600' },
  { id: 'skin', name: 'Skin & Dermatology', icon: 'Sun', color: 'from-rose-400 to-red-500' },
  { id: 'mental', name: 'Mental Health & Sleep', icon: 'Smile', color: 'from-blue-500 to-cyan-600' },
  { id: 'systemic', name: 'General / Systemic', icon: 'Thermometer', color: 'from-indigo-500 to-blue-600' }
];

export const SYMPTOM_CATALOG = {
  head: [
    { id: 'h1', name: 'Severe Sudden Headache', emergency: true, description: 'Thunderclap headache or worst headache of your life' },
    { id: 'h2', name: 'Dizziness or Vertigo', emergency: false, description: 'Feeling lightheaded, unsteady, or spinning sensation' },
    { id: 'h3', name: 'Vision Changes / Blurred Vision', emergency: true, description: 'Sudden loss of vision, double vision, or visual aura' },
    { id: 'h4', name: 'Sore Throat / Swallowing Difficulty', emergency: false, description: 'Pain or irritation in throat, difficulty swallowing solids/liquids' },
    { id: 'h5', name: 'Facial Droop or Speech Slurring', emergency: true, description: 'FAST stroke warning signs' },
    { id: 'h6', name: 'Stiff Neck with High Fever', emergency: true, description: 'Inability to flex neck forward accompanied by fever' }
  ],
  chest: [
    { id: 'c1', name: 'Crushing Chest Pain / Pressure', emergency: true, description: 'Sensation of heavy weight on chest radiating to arm/jaw' },
    { id: 'c2', name: 'Shortness of Breath at Rest', emergency: true, description: 'Gasping for air or unable to speak full sentences' },
    { id: 'c3', name: 'Persistent Cough with Blood', emergency: true, description: 'Coughing up rust-colored or bright red sputum' },
    { id: 'c4', name: 'Mild Wheezing or Tightness', emergency: false, description: 'Mild respiratory tightness associated with seasonal allergies or asthma' },
    { id: 'c5', name: 'Palpitations / Rapid Heartbeat', emergency: false, description: 'Fluttering feeling or racing heart' }
  ],
  abdomen: [
    { id: 'a1', name: 'Severe Right Lower Abdominal Pain', emergency: true, description: 'Sharp sudden pain around navel moving to lower right (Appendicitis flag)' },
    { id: 'a2', name: 'Vomiting Blood or Black Stools', emergency: true, description: 'Coffee-ground emesis or dark tarry stools' },
    { id: 'a3', name: 'Nausea & Mild Vomiting', emergency: false, description: 'Upset stomach without high fever or severe dehydration' },
    { id: 'a4', name: 'Bloating & Gas Pain', emergency: false, description: 'Post-prandial fullness or abdominal discomfort' },
    { id: 'a5', name: 'Heartburn / Acid Reflux', emergency: false, description: 'Burning pain behind breastbone after meals' }
  ],
  joints: [
    { id: 'j1', name: 'Inability to Bear Weight after Trauma', emergency: true, description: 'Sudden injury accompanied by joint deformity or bone instability' },
    { id: 'j2', name: 'Swollen, Red, Hot Joint with Fever', emergency: true, description: 'Possible septic arthritis flag' },
    { id: 'j3', name: 'Lower Back Pain', emergency: false, description: 'Aching or stiffness in lower lumbar spine' },
    { id: 'j4', name: 'Morning Stiffness in Hands/Knees', emergency: false, description: 'Joint stiffness lasting 15-30 minutes after waking' }
  ],
  skin: [
    { id: 's1', name: 'Rapidly Spreading Redness with Fever', emergency: true, description: 'Cellulitis or invasive skin infection sign' },
    { id: 's2', name: 'Hives with Lip/Tongue Swelling', emergency: true, description: 'Anaphylaxis warning sign' },
    { id: 's3', name: 'Localized Dry Rash or Eczema', emergency: false, description: 'Itchy dry patches on skin' },
    { id: 's4', name: 'Minor Burn or Insect Bite', emergency: false, description: 'First-degree burn or superficial bite without systemic symptoms' }
  ],
  mental: [
    { id: 'm1', name: 'Severe Anxiety / Panic Attack', emergency: false, description: 'Overwhelming feeling of dread, hyperventilation' },
    { id: 'm2', name: 'Persistent Insomnia', emergency: false, description: 'Difficulty falling or staying asleep >3 nights/week' },
    { id: 'm3', name: 'Brain Fog & Memory Fatigue', emergency: false, description: 'Difficulty concentrating or mental sluggishness' }
  ],
  systemic: [
    { id: 'sys1', name: 'Fever over 103°F (39.4°C)', emergency: true, description: 'High sustained fever unresponsive to antipyretics' },
    { id: 'sys2', name: 'Unexplained Sudden Weight Loss', emergency: false, description: 'Losing >5% body weight over 1-2 months without dieting' },
    { id: 'sys3', name: 'Chronic Fatigue & Weakness', emergency: false, description: 'Persistent exhaustion not relieved by rest' }
  ]
};

export const TRIAGE_LEVELS = {
  EMERGENCY: {
    level: 'EMERGENCY',
    label: 'Immediate Medical Emergency',
    color: 'bg-red-500 text-white border-red-600',
    badge: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 border-red-300',
    icon: 'AlertTriangle',
    recommendation: 'Call 911 (or your local emergency services) or go to the nearest emergency room immediately.',
    timeframe: 'Right now (0-15 mins)'
  },
  URGENT: {
    level: 'URGENT',
    label: 'Urgent Care Required',
    color: 'bg-amber-500 text-white border-amber-600',
    badge: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300',
    icon: 'Clock',
    recommendation: 'Visit an Urgent Care clinic or contact your doctor for a same-day appointment within 12-24 hours.',
    timeframe: 'Within 12 - 24 hours'
  },
  ROUTINE: {
    level: 'ROUTINE',
    label: 'Routine Medical Consultation',
    color: 'bg-blue-500 text-white border-blue-600',
    badge: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-300',
    icon: 'Calendar',
    recommendation: 'Schedule an appointment with your primary care provider for evaluation.',
    timeframe: 'Within 3 - 7 days'
  },
  SELF_CARE: {
    level: 'SELF_CARE',
    label: 'Self-Care & Home Monitoring',
    color: 'bg-emerald-500 text-white border-emerald-600',
    badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300',
    icon: 'CheckCircle2',
    recommendation: 'Manage symptoms at home with hydration, rest, OTC support, and monitor for changes.',
    timeframe: 'Monitor over 48-72 hours'
  }
};

export const DRUG_INTERACTION_DATABASE = [
  {
    drugA: 'Warfarin',
    drugB: 'Aspirin',
    severity: 'HIGH',
    effect: 'Increased Risk of Severe Bleeding',
    mechanism: 'Both medications impair blood clotting mechanism (anticoagulant + antiplatelet effect).',
    action: 'Avoid concomitant use unless explicitly directed and monitored by a hematologist/cardiologist.'
  },
  {
    drugA: 'Lisinopril',
    drugB: 'Potassium Supplement',
    severity: 'HIGH',
    effect: 'Hyperkalemia (Dangerously High Potassium)',
    mechanism: 'ACE inhibitors like Lisinopril reduce potassium excretion in kidneys.',
    action: 'Monitor serum potassium levels regularly and consult provider before taking OTC potassium.'
  },
  {
    drugA: 'Metformin',
    drugB: 'Alcohol',
    severity: 'MEDIUM',
    effect: 'Increased Risk of Lactic Acidosis & Hypoglycemia',
    mechanism: 'Alcohol alters hepatic gluconeogenesis and increases lactate production under metformin.',
    action: 'Limit or avoid heavy alcohol consumption while on daily Metformin therapy.'
  },
  {
    drugA: 'Ibuprofen',
    drugB: 'Prednisone',
    severity: 'HIGH',
    effect: 'Gastrointestinal Ulceration & Bleeding',
    mechanism: 'Combined NSAID and corticosteroid therapy synergistically damages gastric mucosa.',
    action: 'Take with a gastroprotective proton-pump inhibitor (PPI) if combination is mandatory.'
  },
  {
    drugA: 'Atorvastatin',
    drugB: 'Grapefruit Juice',
    severity: 'MEDIUM',
    effect: 'Statin Toxicity / Muscle Damage (Rhabdomyolysis)',
    mechanism: 'Grapefruit inhibits CYP3A4 enzyme, markedly elevating systemic statin concentrations.',
    action: 'Avoid consuming large quantities of fresh grapefruit or juice while taking Atorvastatin.'
  },
  {
    drugA: 'Levothyroxine',
    drugB: 'Calcium Carbonate',
    severity: 'MEDIUM',
    effect: 'Reduced Thyroid Hormone Absorption',
    mechanism: 'Calcium binds to levothyroxine in stomach, forming an unabsorbable complex.',
    action: 'Separate administration of Levothyroxine and Calcium supplements by at least 4 hours.'
  }
];

export const LAB_REFERENCE_RANGES = [
  { key: 'glucose', name: 'Fasting Blood Glucose', unit: 'mg/dL', min: 70, max: 99, category: 'Metabolic' },
  { key: 'hba1c', name: 'HbA1c (Glycated Hemoglobin)', unit: '%', min: 4.0, max: 5.6, category: 'Metabolic' },
  { key: 'total_cholesterol', name: 'Total Cholesterol', unit: 'mg/dL', min: 125, max: 200, category: 'Lipid' },
  { key: 'hdl', name: 'HDL (Good) Cholesterol', unit: 'mg/dL', min: 40, max: 80, category: 'Lipid' },
  { key: 'ldl', name: 'LDL (Bad) Cholesterol', unit: 'mg/dL', min: 0, max: 100, category: 'Lipid' },
  { key: 'triglycerides', name: 'Triglycerides', unit: 'mg/dL', min: 35, max: 150, category: 'Lipid' },
  { key: 'wbc', name: 'White Blood Cell (WBC)', unit: 'k/µL', min: 4.5, max: 11.0, category: 'Hematology' },
  { key: 'rbc', name: 'Red Blood Cell (RBC)', unit: 'M/µL', min: 4.2, max: 5.8, category: 'Hematology' },
  { key: 'hemoglobin', name: 'Hemoglobin', unit: 'g/dL', min: 13.5, max: 17.5, category: 'Hematology' },
  { key: 'platelets', name: 'Platelets', unit: 'k/µL', min: 150, max: 450, category: 'Hematology' },
  { key: 'tsh', name: 'Thyroid Stimulating Hormone (TSH)', unit: 'mIU/L', min: 0.45, max: 4.5, category: 'Endocrine' },
  { key: 'creatinine', name: 'Serum Creatinine', unit: 'mg/dL', min: 0.6, max: 1.2, category: 'Renal' },
  { key: 'alt', name: 'ALT (Alanine Aminotransferase)', unit: 'U/L', min: 7, max: 56, category: 'Hepatic' }
];
