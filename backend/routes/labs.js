const express = require('express');
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// ─── GET /api/health/labs ──────────────────────────────────────────────────
router.get('/', (req, res) => {
  try {
    const labs = db.prepare(
      'SELECT * FROM labs WHERE user_id = ? ORDER BY created_at DESC'
    ).all(req.user.id);
    res.json({ labs });
  } catch (err) {
    console.error('Get labs error:', err);
    res.status(500).json({ error: 'Failed to fetch lab reports.' });
  }
});

// ─── POST /api/health/labs ─────────────────────────────────────────────────
router.post('/', (req, res) => {
  try {
    const { test_name, result, unit, normal_range, status, lab_date, notes } = req.body;

    if (!test_name || !result) {
      return res.status(400).json({ error: 'test_name and result are required.' });
    }

    const insertResult = db.prepare(
      `INSERT INTO labs (user_id, test_name, result, unit, normal_range, status, lab_date, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(
      req.user.id, test_name, result,
      unit || null, normal_range || null, status || null,
      lab_date || null, notes || null
    );

    const newLab = db.prepare('SELECT * FROM labs WHERE id = ?').get(insertResult.lastInsertRowid);
    res.status(201).json({ lab: newLab });
  } catch (err) {
    console.error('Add lab error:', err);
    res.status(500).json({ error: 'Failed to add lab report.' });
  }
});

// ─── DELETE /api/health/labs/:id ──────────────────────────────────────────
router.delete('/:id', (req, res) => {
  try {
    const result = db.prepare(
      'DELETE FROM labs WHERE id = ? AND user_id = ?'
    ).run(req.params.id, req.user.id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Lab report not found.' });
    }
    res.json({ message: 'Lab report deleted.' });
  } catch (err) {
    console.error('Delete lab error:', err);
    res.status(500).json({ error: 'Failed to delete lab report.' });
  }
});

module.exports = router;
