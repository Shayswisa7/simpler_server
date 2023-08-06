const mongoose = require('mongoose');

// Serving Schema
const allFullOrdersDataSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please anter an full name!'],
  },
  id_phoneNumber: {
    type: String,
    required: [true, 'Please anter an phone number!'],
  },
  orders: {
    type: Array,
    required: [true, 'Please anter an orders!'],
  },
  shipping: {
    type: Object,
    require: [true, 'Please anter an shipping!'],
    default: [],
  },
  cash: {
    type: Object,
    require: [true, 'Please anter if piad in cash!'],
  },
  orderTime: {
    type: Date,
    required: [true, 'Please anter an order time!'],
    default: Date.now(),
  },
  price: {
    type: Array,
    require: [true, 'Please anter an price!'],
  },
});

const AllFullOrdersData = (module.exports = mongoose.model(
  'all_fullOrders_data',
  allFullOrdersDataSchema
));
