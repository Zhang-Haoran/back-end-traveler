const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  _id: {
    type: String,
    alias: 'email',
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  password: {
    type: String,
  },
});

module.exports = model('User', userSchema);
