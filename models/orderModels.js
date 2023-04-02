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
  tag: {
    type: String,
    required: [true, 'order must have a tag.'],
  },
  itemsCount: {
    type: Number,
  },
  amount: {
    type: Number,
  },
  dateCreated: {
    type: String,
    default: new Date(),
  },
  merchant: String,
  cancelled: {
    type: Boolean,
    default: false,
  },
  fulfilled: {
    type: Boolean,
    default: false,
  },
});

const Orders = mongoose.model('Orders', orderSchema);

module.exports = Orders;
