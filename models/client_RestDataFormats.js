const mongoose = require('mongoose');
const RestDataFormatsSechema = mongoose.Schema({
  type: {
    type: String,
    require: [true, 'Please anter an type of format!'],
  },
  obj: {},
});

const RestDataFormats = (module.exports = mongoose.model(
  'rest_data_formats',
  RestDataFormatsSechema
));
