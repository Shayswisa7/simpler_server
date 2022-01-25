const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please anter an first name!'],
  },
  lastName: { type: String, required: [true, 'Please anter an last Name!'] },
  rol: {
    type: String,
    required: [true, 'Please anter an rol!'],
  },
  id: {
    type: String,
    unique: true,
    required: [true, 'Please anter an id!'],
  },
  phoneNumber: {
    type: String,
    unique: true,
    required: [true, 'Please anter an phone number!'],
  },
  mail: {
    type: String,
    unique: true,
    required: [true, 'Please anter an email!'],
  },
  bankAccount: {
    type: String,
    unique: true,
  },
  age: {
    type: String,
    required: [true, 'Please anter an age!'],
  },
  password: {
    type: String,
    required: [true, 'Please anter an password!'],
  },
  hourlyWage: {
    type: Object,
    require: [true, 'Please anter an hourly wage!'],
    default: {},
  },
  workTimes: {
    type: Array,
    require: [true, 'Please anter an work times array!'],
    default: [],
  },
});

const Employee = (module.exports = mongoose.model(
  'rest_employees',
  employeeSchema
));
