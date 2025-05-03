const express = require('express');
const { pool } = require('./db');

const router = express.Router();

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const [items] = await pool.query('SELECT * FROM MenuItems');
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new menu item
router.post('/', async (req, res) => {
  const { item_name, price, category, image_url } = req.body;
  try {
    await pool.query(
      'INSERT INTO MenuItems (item_name, price, category, image_url) VALUES (?, ?, ?, ?)',
      [item_name, price, category, image_url]
    );
    res.status(201).json({ message: 'Item added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;