require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// Import routes
const authRoutes = require('./routes/auth');
const vitalsRoutes = require('./routes/vitals');
const medsRoutes = require('./routes/meds');
const labsRoutes = require('./routes/labs');
const chatRoutes = require('./routes/chat');

const app = express();
const PORT = process.env.PORT || 5001;

// ─── Middleware ────────────────────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Routes ───────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/health/vitals', vitalsRoutes);
app.use('/api/health/meds', medsRoutes);
app.use('/api/health/labs', labsRoutes);
app.use('/api/health/chat', chatRoutes);

// ─── Health Check ─────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'AI Health Assistant Backend is running!',
    timestamp: new Date().toISOString()
  });
});

// ─── 404 Handler ──────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.url} not found.` });
});

// ─── Global Error Handler ─────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error.' });
});

// ─── Start Server ─────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 AI Health Assistant Backend`);
  console.log(`   Running at: http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health\n`);
});
