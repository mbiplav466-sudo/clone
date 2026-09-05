const express = require('express');
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// ─── GET /api/health/vitals ────────────────────────────────────────────────
router.get('/', (req, res) => {
  try {
    const vitals = db.prepare(
      'SELECT * FROM vitals WHERE user_id = ? ORDER BY recorded_at DESC'
    ).all(req.user.id);
    res.json({ vitals });
  } catch (err) {
    console.error('Get vitals error:', err);
    res.status(500).json({ error: 'Failed to fetch vitals.' });
  }
});

// ─── POST /api/health/vitals ───────────────────────────────────────────────
router.post('/', (req, res) => {
  try {
    const { type, value, unit, note, recorded_at } = req.body;

    if (!type || value === undefined || !unit) {
      return res.status(400).json({ error: 'type, value, and unit are required.' });
    }

    const result = db.prepare(
      'INSERT INTO vitals (user_id, type, value, unit, note, recorded_at) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(req.user.id, type, value, unit, note || null, recorded_at || new Date().toISOString());

    const newVital = db.prepare('SELECT * FROM vitals WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json({ vital: newVital });
  } catch (err) {
    console.error('Add vital error:', err);
    res.status(500).json({ error: 'Failed to add vital.' });
  }
});

// ─── DELETE /api/health/vitals/:id ────────────────────────────────────────
router.delete('/:id', (req, res) => {
  try {
    const result = db.prepare(
      'DELETE FROM vitals WHERE id = ? AND user_id = ?'
    ).run(req.params.id, req.user.id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Vital not found.' });
    }
    res.json({ message: 'Vital deleted.' });
  } catch (err) {
    console.error('Delete vital error:', err);
    res.status(500).json({ error: 'Failed to delete vital.' });
  }
});

module.exports = router;
