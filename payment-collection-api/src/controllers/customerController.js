const pool = require('../config/database');

// Get all customers
const getCustomers = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        id,
        account_number,
        issue_date,
        interest_rate,
        tenure,
        emi_due
       FROM customers
       ORDER BY id`
    );

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error('Error fetching customers:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch customers',
    });
  }
};

// Get customer by account number
const getCustomerByAccountNumber = async (req, res) => {
  try {
    const { accountNumber } = req.params;

    const result = await pool.query(
      `SELECT 
        id,
        account_number,
        issue_date,
        interest_rate,
        tenure,
        emi_due
       FROM customers
       WHERE account_number = $1`,
      [accountNumber]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found',
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error fetching customer:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch customer',
    });
  }
};

module.exports = {
  getCustomers,
  getCustomerByAccountNumber,
};