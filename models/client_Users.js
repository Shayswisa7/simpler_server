const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mail: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, unique: true, required: true },
  saveOrderList: [],
  friedsList: [],
});

const Users = (module.exports = mongoose.model('users', userSchema));
