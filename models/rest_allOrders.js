const mongoose = require('mongoose');
const allOrdersSche = mongoose.Schema({
  details: {
    price: [
      {
        bread: { type: String, required: true },
        meet: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    date: {
      date: { type: Date, required: true },
      ordertime: { type: Date, required: true },
      completeTime: { type: Date, required: true },
    },
  },
  employee: {
    fullname: { type: String, required: true },
    id: { type: Number, required: true },
  },
});

const AllOrders = (module.exports = mongoose.model('AllOrders', allOrdersSche));
