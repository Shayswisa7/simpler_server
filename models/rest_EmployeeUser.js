const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');
const employeeSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please anter an first name!'],
  },
  lastName: {
    type: String,
    required: [true, 'Please anter an last Name!'],
  },
  rol: {
    type: String,
    required: [true, 'Please anter an rol!'],
  },
  id: {
    type: String,
    unique: [true, 'ID already exist!'],
    required: [true, 'Please anter an id!'],
  },
  phoneNumber: {
    type: String,
    unique: [true, 'Phone number already exist!'],
    required: [true, 'Please anter an phone number!'],
  },
  email: {
    type: String,
    unique: [true, 'Email already exist!'],
    required: [true, 'Please anter an email!'],
    validate: [isEmail, 'Please anter a valid email!'],
  },
  bankAccount: {
    type: String,
    unique: [true, 'bank account already exist!'],
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
    type: String,
    require: [true, 'Please anter an hourly wage!'],
  },
  workTimes: {
    type: Array,
    require: [true, 'Please anter an work times array!'],
    default: [],
  },
});
employeeSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    bcrypt.hash(this.password, 12, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  }
});
employeeSchema.methods.comparePassword = async function (password) {
  if (!password) throw new Error('Password is mission, can not compare!');

  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    console.log('Error while comparing password!');
  }
};
const Employee = (module.exports = mongoose.model(
  'rest_employees',
  employeeSchema
));
