const { Schema, model } = require('mongoose');
const Joi = require('joi');

const reviewSchema = new Schema({
  user: {
    type: Schema.Types.String,
    ref: 'User',
    required: [true, 'Review must belong to a user'],
  },
  tour: {
    type: Schema.Types.String,
    ref: 'Tour',
    required: [true, 'Review must belong to a tour'],
  },
  comment: {
    type: String,
    required: true,
    default: 'Tell us about your experience',
    comment: {
      validator: (price) => !Joi.string().alphanum().max(300).validate(price).error,
      msg: 'Words limit 300 max',
    },
  },
  timestamps: true,
});
modules.exports = model('Review', reviewSchema);
