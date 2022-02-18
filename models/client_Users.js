const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');
const clientUserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please anter an first name!'],
  },
  lastName: {
    type: String,
    required: [true, 'Please anter an last Name!'],
  },
  mail: {
    type: String,
    required: [true, 'Please anter an email!'],
    unique: [true, 'Please anter an Email that not in the system!'],
    validate: [isEmail, 'Please anter a valid email!'],
  },
  password: {
    type: String,
    required: [true, 'Please anter an password!'],
  },
  phoneNumber: {
    type: String,
    required: [true, 'Please anter an phone number!'],
    unique: [true, 'Please anter an phone number that not in the system!'],
  },
  saveOrderList: {
    type: Array,
    required: [true, 'Please anter an phone number!'],
    default: [],
  },
  friedsList: {
    type: Array,
    required: [true, 'Please anter an phone number!'],
    default: [],
  },
  avatar: Buffer,
});
clientUserSchema.pre('save', function (next) {
  console.log('_____________');
  if (this.isModified('password')) {
    bcrypt.hash(this.password, 12, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      console.log(hash);
      next();
    });
  }
});
clientUserSchema.methods.comparePassword = async function (password) {
  if (!password) throw new Error('Password is mission, can not compare!');

  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    console.log('Error while comparing password!');
  }
};
const ClientUsers = (module.exports = mongoose.model(
  'client_users',
  clientUserSchema
));
