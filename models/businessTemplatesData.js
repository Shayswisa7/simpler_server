const mongoose = require('mongoose');
const BusinessTemplatesDataSechema = mongoose.Schema({
  type: {
    type: String,
    require: [true, 'Please anter an type of format!'],
  },
  obj: {},
});

const BusinessTemplatesData = (module.exports = mongoose.model(
  'business_data',
  BusinessTemplatesDataSechema
));
