const mongoose = require('mongoose');
const allOrdersSche = mongoose.Schema({
  details: {
    itemsAndPrices: [
      {
        drink: {
          type: String,
          required: [true, 'Please anter an drink!'],
          default: '',
        },
        bread: {
          type: String,
          required: [true, 'Please anter an bread!'],
          default: '',
        },
        extra: {
          type: String,
          required: [true, 'Please anter an extra!'],
          default: '',
        },
        meat: {
          type: String,
          required: [true, 'Please anter an meat!'],
          default: '',
        },
        price: {
          type: Number,
          required: [true, 'Please anter an price!'],
          default: 0,
        },
      },
    ],
    date: {
      fullDate: {
        type: Date,
        required: [true, 'Please anter an full date!'],
        default: Date.now(),
      },
      orderTime: {
        type: Date,
        required: [true, 'Please anter an order time!'],
      },
      completeTime: {
        type: Date,
        required: [true, 'Please anter an complete time!'],
        default: Date.now(),
      },
    },
  },
  employee: {
    fullName: {
      type: String,
      required: [true, 'Please anter an full name!'],
    },
    id: {
      type: Number,
      required: [true, 'Please anter an id!'],
    },
  },
});

const AllOrders = (module.exports = mongoose.model('allOrders', allOrdersSche));
