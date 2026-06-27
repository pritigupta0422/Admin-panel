import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Import Routers
import authRoutes from './routes/authRoutes.js';
import leadsRoutes from './routes/leadsRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import careersRoutes from './routes/careersRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

// Load Env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Middleware
app.use(cors({
  origin: CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Basic Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Register API Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/careers', careersRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ error: 'An unexpected error occurred on the server.' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`========================================`);
  console.log(` Nexix Admin Server running on port ${PORT}`);
  console.log(` Allowed CORS origin: ${CLIENT_URL}`);
  console.log(`========================================`);
});
