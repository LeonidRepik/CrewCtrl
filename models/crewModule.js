const mongoose = require('mongoose');
const FLightSchema = require('./flightModule');

const crewMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    default: '',
    required: true,
  },
  role: {
    type: String,
    enum: ['pilot', 'second_pilot', 'flight_attendant'],
    required: true,
  },
  FlightNumber: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    default: 'repiklleonid@gmail.com',
  },
  flightHours: {
    total: {
      type: Number,
      default: 0,
    },
    thisMonth: {
      type: Number,
      default: 0,
    },
    available: {
      type: String,
      enum: ['available', 'Unavailable', 'PTO'],
      default: 'Unavailable',
    },
  },
  likesEmails: {
    type: Boolean,
    default: true,
  },
  certifications: {
    type: [String],
    default: [],
  },
  flightRecord: [
    {
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
    },
  ],
});

// Middleware to check flight hours before saving
crewMemberSchema.pre('save', function (next) {
  const totalHoursLimit = 1500;
  const monthlyHoursLimit = 100;

  if (
    this.flightHours.total > totalHoursLimit ||
    this.flightHours.thisMonth > monthlyHoursLimit
  ) {
    this.flightHours.available = 'Unavailable';
  }

  next();
});

const Crew = mongoose.model('Crew', crewMemberSchema);

module.exports = Crew;
