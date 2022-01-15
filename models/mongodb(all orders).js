const mongoose = require('mongoose');
const Orders = require('./localdb(online orders)');
const allOrdersSche = mongoose.Schema({
  id: '',
  details: [
    {
      price: [
        {
          meet: { type: String, required: true },
          price: { type: Number, required: true },
        },
      ],
      date: {
        date: { type: Date, required: true },
        ordertime: { type: String, required: true },
        completeTime: { type: String, required: true },
      },
    },
  ],
  employee: {
    fullname: { type: String, required: true },
    id: { type: Number, required: true },
  },
});

const AllOrders = (module.exports = mongoose.model('AllOrders', allOrdersSche));
