const express = require('express');
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// ─── GET /api/health/chat ──────────────────────────────────────────────────
router.get('/', (req, res) => {
  try {
    const row = db.prepare(
      'SELECT messages FROM chat_history WHERE user_id = ? ORDER BY updated_at DESC LIMIT 1'
    ).get(req.user.id);

    const messages = row ? JSON.parse(row.messages) : [];
    res.json({ messages });
  } catch (err) {
    console.error('Get chat error:', err);
    res.status(500).json({ error: 'Failed to fetch chat history.' });
  }
});

// ─── POST /api/health/chat ─────────────────────────────────────────────────
router.post('/', (req, res) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages must be an array.' });
    }

    const messagesJson = JSON.stringify(messages);
    const existing = db.prepare(
      'SELECT id FROM chat_history WHERE user_id = ?'
    ).get(req.user.id);

    if (existing) {
      db.prepare(
        'UPDATE chat_history SET messages = ?, updated_at = datetime("now") WHERE user_id = ?'
      ).run(messagesJson, req.user.id);
    } else {
      db.prepare(
        'INSERT INTO chat_history (user_id, messages) VALUES (?, ?)'
      ).run(req.user.id, messagesJson);
    }

    res.json({ message: 'Chat history saved.', count: messages.length });
  } catch (err) {
    console.error('Save chat error:', err);
    res.status(500).json({ error: 'Failed to save chat history.' });
  }
});

module.exports = router;
