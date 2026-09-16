const pool = require('../config/database');

// Get all payments
const getPayments = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
        id,
        customer_id,
        payment_date,
        payment_amount,
        status
       FROM payments
       ORDER BY payment_date DESC`
    );

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error('Error fetching payments:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch payments',
    });
  }
};

// Create payment
const createPayment = async (req, res) => {
  try {
    const {
      accountNumber,
      paymentAmount,
    } = req.body;

    // Validation
    if (!accountNumber || !paymentAmount) {
      return res.status(400).json({
        success: false,
        message: 'Account number and payment amount are required',
      });
    }

    if (Number(paymentAmount) <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Payment amount must be greater than 0',
      });
    }

    // Find customer
    const customerResult = await pool.query(
      `SELECT id
       FROM customers
       WHERE account_number = $1`,
      [accountNumber]
    );

    if (customerResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found',
      });
    }

    const customerId = customerResult.rows[0].id;

    // Insert payment
    const paymentResult = await pool.query(
      `INSERT INTO payments
        (customer_id, payment_date, payment_amount, status)
       VALUES
        ($1, NOW(), $2, $3)
       RETURNING
        id,
        customer_id,
        payment_date,
        payment_amount,
        status`,
      [
        customerId,
        paymentAmount,
        'Paid',
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Payment successful',
      data: paymentResult.rows[0],
    });
  } catch (error) {
    console.error('Error creating payment:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to create payment',
    });
  }
};

module.exports = {
  getPayments,
  createPayment,
};