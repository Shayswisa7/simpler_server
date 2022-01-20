const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  id: { type: String, unique: true, required: true },
  phoneNumber: { type: String, unique: true, required: true },
  mail: { type: String, unique: true, required: true },
  bankAccount: { type: String, unique: true, required: true },
  age: { type: String, required: true },
  password: { type: String, required: true },
  workTimes: { type: Array, require: true },
});

const Employee = (module.exports = mongoose.model('employees', employeeSchema));
