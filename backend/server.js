require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const db = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Database connection test
db.sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    
    // In development mode, auto sync database schemas (simple, non-destructive check)
    if (process.env.NODE_ENV === 'development') {
      // Use alter: true to make sure tables match definitions without dropping data
      db.sequelize.sync({ alter: true })
        .then(() => console.log('Database synchronized.'))
        .catch(err => console.error('Database sync error:', err));
    }
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Basic Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'SugarScan API is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

app.listen(PORT, () => {
  console.log(`SugarScan server is running on port ${PORT}`);
});

module.exports = app;
