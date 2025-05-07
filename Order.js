const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  order_number: { type: String, required: true },
  student_name: { type: String, required: true },
  order_date: { type: Date, default: Date.now },
  total: { type: Number, required: true },
  payment: { type: Number, required: true },
  change_amount: { type: Number, required: true },
  items: { type: Array, required: true }  // Array of item objects
});

module.exports = mongoose.model('Order', orderSchema);
