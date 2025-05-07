const express = require('express');
const Order = require('./models/Order');

const router = express.Router();

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ order_date: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new order
router.post('/', async (req, res) => {
  const { order_number, student_name, total, payment, change_amount, items } = req.body;
  try {
    const newOrder = new Order({
      order_number,
      student_name,
      total,
      payment,
      change_amount,
      items
    });
    await newOrder.save();
    res.status(201).json({ message: 'Order created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
