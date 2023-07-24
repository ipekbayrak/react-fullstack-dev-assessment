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
    type: Date,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Change = mongoose.model('Change', ChangeSchema);

module.exports = Change;
