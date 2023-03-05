const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  item: {
    type: String,
    required: [true, 'Item must have a name'],
    maxlength: [50, 'Item name should contain no more than 50 characters'],
  },
  description: {
    type: String,
    maxlength: [100, 'Item name should contain no more than 100 characters'],
  },
  amount: {
    type: Number,
    required: [true, 'Item must have an equivalent price'],
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  creator: String,
});

const Orders = mongoose.model('Orders', orderSchema);

module.exports = Orders;
