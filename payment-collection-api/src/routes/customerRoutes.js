const express = require('express');

const {
  getCustomers,
  getCustomerByAccountNumber,
} = require('../controllers/customerController');

const router = express.Router();

// GET /customers
router.get('/', getCustomers);

// GET /customers/account/ACC1001
router.get('/account/:accountNumber', getCustomerByAccountNumber);

module.exports = router;