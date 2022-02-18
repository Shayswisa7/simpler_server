const mongoose = require('mongoose');
const RestDataFormatsSechema = mongoose.Schema({
  type: {
    type: String,
    unique: [true, 'Type of format already exist!'],
    require: [true, 'Please anter an type of format!'],
  },
  obj: {},
  avatar: Buffer,
});

const RestDataFormats = (module.exports = mongoose.model(
  'rest_data_formats',
  RestDataFormatsSechema
));
