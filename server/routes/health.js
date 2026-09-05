import express from 'express';
import { db } from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Apply auth middleware to all health data routes
router.use(authenticateToken);

// --- VITALS ---
router.get('/vitals', (req, res) => {
  const vitals = db.getVitals(req.user.id);
  res.json({ vitals });
});

router.post('/vitals', (req, res) => {
  const newLog = {
    id: `v_${Date.now()}`,
    date: req.body.date || new Date().toISOString().split('T')[0],
    systolic: Number(req.body.systolic),
    diastolic: Number(req.body.diastolic),
    heartRate: Number(req.body.heartRate),
    bloodGlucose: Number(req.body.bloodGlucose),
    spo2: Number(req.body.spo2),
    sleepHours: Number(req.body.sleepHours),
    weight: Number(req.body.weight),
    waterMl: Number(req.body.waterMl) || 2000
  };
  const created = db.addVital(req.user.id, newLog);
  res.status(201).json({ vital: created });
});

router.delete('/vitals/:id', (req, res) => {
  db.deleteVital(req.user.id, req.params.id);
  res.json({ success: true, message: 'Vital log deleted' });
});

// --- MEDICATIONS ---
router.get('/meds', (req, res) => {
  const meds = db.getMedications(req.user.id);
  res.json({ medications: meds });
});

router.post('/meds', (req, res) => {
  const newMed = {
    id: `m_${Date.now()}`,
    name: req.body.name,
    dosage: req.body.dosage,
    frequency: req.body.frequency,
    timing: req.body.timing,
    purpose: req.body.purpose,
    refillDate: req.body.refillDate || 'Not specified',
    adherence: 100
  };
  const created = db.addMedication(req.user.id, newMed);
  res.status(201).json({ medication: created });
});

router.delete('/meds/:id', (req, res) => {
  db.deleteMedication(req.user.id, req.params.id);
  res.json({ success: true, message: 'Medication deleted' });
});

// --- LAB REPORTS ---
router.get('/labs', (req, res) => {
  const labs = db.getLabs(req.user.id);
  res.json({ labs });
});

router.post('/labs', (req, res) => {
  const created = db.addLab(req.user.id, req.body);
  res.status(201).json({ lab: created });
});

// --- CHAT MESSAGES ---
router.get('/chat', (req, res) => {
  const messages = db.getChats(req.user.id);
  res.json({ chatMessages: messages });
});

router.post('/chat', (req, res) => {
  const saved = db.saveChats(req.user.id, req.body.messages || []);
  res.json({ chatMessages: saved });
});

export default router;
