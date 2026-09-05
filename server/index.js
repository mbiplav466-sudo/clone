import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import healthRoutes from './routes/health.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/health', healthRoutes);

// Healthcheck endpoint
app.get('/api/ping', (req, res) => {
  res.json({ status: 'ok', serverTime: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(` HealthPulse REST API Server running at http://localhost:${PORT}`);
});
