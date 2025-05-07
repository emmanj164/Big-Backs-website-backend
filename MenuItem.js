// models/MenuItem.js
const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  item_name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image_url: { type: String }
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
