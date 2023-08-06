const mongoose = require('mongoose');
const allOrdersSche = mongoose.Schema({
  details: {
    userPhoneNumber: {
      type: String,
      require: [true, 'Please anter a phone number of user!'],
    },
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
        default: Date.now().toString(),
      },
      orderTime: {
        type: Object,
        required: [true, 'Please anter an order time!'],
      },
      completeTime: {
        type: Date,
        required: [true, 'Please anter an complete time!'],
        default: Date.now().toString(),
      },
      shipping: {
        type: Object,
        require: [true, 'Please anter if the order shipping!'],
      },
      cash: {
        type: Object,
        require: [true, 'Please anter if the order paid in cash!'],
      },
    },
    employees: {
      leader: {
        type: Object,
        required: [
          true,
          'Please anter an object that iclude name & id of shift Manager!',
        ],
      },
      employeesID: {
        type: Array,
        required: [true, 'Please anter an id!'],
      },
    },
  },
});

const AllOrders = (module.exports = mongoose.model(
  'all_orders',
  allOrdersSche
));
