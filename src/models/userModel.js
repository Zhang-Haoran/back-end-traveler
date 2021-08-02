const { Schema, model } = require('mongoose');
const Joi = require('joi');
const moment = require('moment');

const userSchema = new Schema({
  _id: {
    type: String,
    alias: 'email',
    lowercase: true,
    validate: {
      validator: (email) => !Joi.string().email().validate(email).error,
      message: 'Invalid email format',
    },
  },
  firstName: {
    type: String,
    required: [true, 'Please tell us your first name'],
    trim: true,
    minlength: 2,
    maxlength: 20,
  },
  lastName: {
    type: String,
    required: [true, 'Please tell us your last name'],
    trim: true,
    minlength: 2,
    maxlength: 20,
  },
  dateOfBirth: {
    type: String,
    required: [true, 'Please tell us your date of birth'],
    validate: {
      validator: (date) => moment(date, 'DD/MM/YYYY').isSameOrBefore(moment()),
      msg: 'Invalid Date',
    },
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    select: false,
  },
});

module.exports = model('User', userSchema);
