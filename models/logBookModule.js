const mongoose = require('mongoose');

const logBookSchema = new mongoose.Schema({
  FlyightNumber: {
    type: String,
    default: '',
    required: [true, 'Please provide FlyightNumber field.'],
  },
  AircraftID: {
    type: String,
    default: '',
    required: [true, 'Please provide FlyightID field.'],
  },
  Date: {
    type: Date,
    default: Date.now(),
  },
  AircraftType: {
    type: String,
    default: '',
    required: [true, 'Please provide AircraftType field.'],
  },
  From: {
    type: String,
    default: '',
    required: [true, 'Please provide From field.'],
  },
  To: {
    type: String,
    default: '',
    required: [true, 'Please provide To field.'],
  },
  In: {
    type: String,
    default: '',
  },

  Out: {
    type: String,
    default: '',
  },
});

const LogBook = mongoose.model('LogBook', logBookSchema);

module.exports = LogBook;
