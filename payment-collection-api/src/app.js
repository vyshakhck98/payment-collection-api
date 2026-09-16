const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pool = require('./config/database');

const customerRoutes = require('./routes/customerRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Payment Collection API is running',
  });
});

// Database test
app.get('/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');

    res.json({
      success: true,
      message: 'Database connected successfully',
      time: result.rows[0].now,
    });
  } catch (error) {
    console.error('Database error:', error);

    res.status(500).json({
      success: false,
      message: 'Database connection failed',
    });
  }
});

// Customer APIs
app.use('/customers', customerRoutes);

// Payment APIs
app.use('/payments', paymentRoutes);

module.exports = app;