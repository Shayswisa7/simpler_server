const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  id: { type: Number, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mail: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  friedsList: [
    {
      name: { type: String, required: false },
      phoneNumber: { type: String, required: false },
    },
  ],
});

const User = (module.exports = mongoose.model('User', userSchema));
