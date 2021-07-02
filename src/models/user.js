const { Schema, model } = require('mongoose');
const Joi = require('joi');
const moment = require('moment');
const bcrypt = require('bcryptjs');

const userSchema = new Schema(
  {
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
      required: [true, 'please tell us your date of birth'],
      validate: {
        validator: (date) =>
          moment(date, 'DD/MM/YYYY').isSameOrBefore(moment()),
        msg: 'Invalid Date',
      },
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      required: true,
      default: 'user',
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false, // don't send out passwords in responses
    },
    bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    __v: {
      type: Number,
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    id: false,
  },
);
userSchema.methods.hashPassword = async function () {
  this.password = await bcrypt.hash(this.password, 12);
};

userSchema.methods.validatePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = model('User', userSchema);