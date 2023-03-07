const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, 'order must have an Id.'],
  },
  items: {
    type: Array,
    maxlength: [50, 'Item name should contain no more than 50 characters'],
  },
  amount: {
    type: Number,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  merchant: String,
});

const Orders = mongoose.model('Orders', orderSchema);

module.exports = Orders;
