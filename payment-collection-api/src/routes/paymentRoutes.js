const express = require('express');

const {
  getPayments,
  createPayment,
} = require('../controllers/paymentController');

const router = express.Router();

// GET /payments
router.get('/', getPayments);

// POST /payments
router.post('/', createPayment);

module.exports = router;