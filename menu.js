const express = require('express');
const MenuItem = require('./models/MenuItem');

const router = express.Router();

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new menu item
router.post('/', async (req, res) => {
  const { item_name, price, category, image_url } = req.body;
  try {
    const newItem = new MenuItem({ item_name, price, category, image_url });
    await newItem.save();
    res.status(201).json({ message: 'Item added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
