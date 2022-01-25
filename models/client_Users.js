const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');
const userSchema = new mongoose.Schema({
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
    unique: [true, 'Please anter an phone number that not in the system!'],
    default: [],
  },
  friedsList: {
    type: Array,
    required: [true, 'Please anter an phone number!'],
    unique: [true, 'Please anter an phone number that not in the system!'],
    default: [],
  },
  avatar: Buffer,
});
//לסדר את פר
userSchema.pre('save', function (next) {
  console.log('_____________');
  if (this.isModified('password')) {
    bcrypt.hash(this.password, 8, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  }
});

userSchema.pre('save', true, (next) => {
  console.log('_______________');
  next();
});

userSchema.methods.comparePassword = async function (password) {
  if (!password) throw new Error('Password is mission, can not compare!');

  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    console.log('Error while comparing password!');
  }
};
const Users = (module.exports = mongoose.model('users', userSchema));
