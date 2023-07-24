const mongoose = require('mongoose');

const ChangeSchema = new mongoose.Schema({
  propertyA: {
    type: Number,
    required: true,
    min: 5,
    max: 9
  },
  propertyB: {
    type: String,
    required: true,
    enum: ['value1', 'value2']
  },
  propertyC: {
    type: String,
    required: true,
    maxlength: [10, 'PropertyC should be equal to or less than 10 characters long.']
  }
});

const Change = mongoose.model('Change', ChangeSchema);

module.exports = Change;
