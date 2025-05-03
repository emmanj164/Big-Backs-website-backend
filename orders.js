const express = require('express');
const { pool } = require('./db');

const router = express.Router();

// Create new order
router.post('/', async (req, res) => {
  const { student_name, items, total, payment, change_amount } = req.body;
  const order_number = 'ORD-' + Date.now();
  
  try {
    await pool.query(
      'INSERT INTO Orders (order_number, student_name, total, payment, change_amount, items) VALUES (?, ?, ?, ?, ?, ?)',
      [order_number, student_name, total, payment, change_amount, JSON.stringify(items)]
    );
    res.status(201).json({ order_number });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    const [orders] = await pool.query('SELECT * FROM Orders ORDER BY order_date DESC');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;