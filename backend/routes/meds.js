const express = require('express');
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// ─── GET /api/health/meds ──────────────────────────────────────────────────
router.get('/', (req, res) => {
  try {
    const meds = db.prepare(
      'SELECT * FROM medications WHERE user_id = ? ORDER BY created_at DESC'
    ).all(req.user.id);
    res.json({ meds });
  } catch (err) {
    console.error('Get meds error:', err);
    res.status(500).json({ error: 'Failed to fetch medications.' });
  }
});

// ─── POST /api/health/meds ─────────────────────────────────────────────────
router.post('/', (req, res) => {
  try {
    const { name, dosage, frequency, start_date, end_date, notes } = req.body;

    if (!name || !dosage || !frequency) {
      return res.status(400).json({ error: 'name, dosage, and frequency are required.' });
    }

    const result = db.prepare(
      `INSERT INTO medications (user_id, name, dosage, frequency, start_date, end_date, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).run(req.user.id, name, dosage, frequency, start_date || null, end_date || null, notes || null);

    const newMed = db.prepare('SELECT * FROM medications WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json({ med: newMed });
  } catch (err) {
    console.error('Add med error:', err);
    res.status(500).json({ error: 'Failed to add medication.' });
  }
});

// ─── DELETE /api/health/meds/:id ──────────────────────────────────────────
router.delete('/:id', (req, res) => {
  try {
    const result = db.prepare(
      'DELETE FROM medications WHERE id = ? AND user_id = ?'
    ).run(req.params.id, req.user.id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Medication not found.' });
    }
    res.json({ message: 'Medication deleted.' });
  } catch (err) {
    console.error('Delete med error:', err);
    res.status(500).json({ error: 'Failed to delete medication.' });
  }
});

module.exports = router;
