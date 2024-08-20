const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Must have a name!'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Must have a name!'],
    minlength: 8,
  },
  passwordConfirmation: {
    type: String,
    required: [true, 'Must have a name!'],
    minlength: 8,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords do not match',
    },
  },
  email: {
    type: String,
    required: [true, 'Must have an email!'],
    unique: true,
    lowercase: true,
    validators: [validator.isEmail, 'Please provide a valid email address'],
  },
  manager: {
    type: Boolean,
    default: false,
  },
  photo: String,
});

userSchema.pre('save', async function (next) {
  if (!this.isDirectModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirmation = undefined;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
