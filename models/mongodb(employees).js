const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  id: { type: Number, required: true },
  phoneNumber: { type: Number, required: true },
  mail: { type: String, required: true },
  bankAccount: { type: String, required: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
});

const Employee = (module.exports = mongoose.modules(
  'Employee',
  employeeSchema
));
