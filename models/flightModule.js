const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  flightNumber: {
    type: String,
    default: '',
    required: [true, 'Please provide flightNumber field.'],
  },
  aircraftType: {
    type: String,
    default: '',
    required: [true, 'Please provide aircraftType field.'],
  },
  from: {
    type: String,
    default: '',
    required: [true, 'Please provide from field.'],
  },
  to: {
    type: String,
    default: '',
    required: [true, 'Please provide to field.'],
  },
  weather: {
    type: String,
    default: '',
    required: [true, 'Please provide weather field.'],
  },
  specialRequirements: [
    {
      PBN: {
        type: Boolean,
        default: false,
      },
      LVP: {
        type: Boolean,
        default: false,
      },
    },
  ],
  arriving: {
    type: Date,
    required: [true, 'Please provide in field in specialRequirements.'],
  },
  departure: {
    type: Date,
    required: [true, 'Please provide out field in specialRequirements.'],
  },
  crewMembers: [
    {
      member1: {
        type: String,
        default: '',
      },
      member2: {
        type: String,
        default: '',
      },
      member3: {
        type: String,
        default: '',
      },
      cabinCrew: {
        cabin1: {
          type: String,
          default: '',
        },
        cabin2: {
          type: String,
          default: '',
        },
        cabin3: {
          type: String,
          default: '',
        },
        cabin4: {
          type: String,
          default: '',
        },
        cabin5: {
          type: String,
          default: '',
        },
        cabin6: {
          type: String,
          default: '',
        },
      },
    },
  ],
  expireAt: {
    type: Date,
    default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days in milliseconds
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});
flightSchema.pre('save', async function (next) {
  const existingFlight = await this.constructor.findOne({
    flightNumber: this.flightNumber,
  });

  if (existingFlight) {
    const error = new Error(
      'Flight with the same flightNumber already exists.'
    );
    return next(error);
  }

  next();
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
