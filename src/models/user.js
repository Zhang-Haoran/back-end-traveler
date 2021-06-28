const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    alias: 'email',
    lowercase: true,
    validate: {
      validator: (email) => !Joi.string().email().validate(email).error,
      msg: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
