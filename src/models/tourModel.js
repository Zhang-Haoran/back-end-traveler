const { Schema, model } = require('mongoose');
const moment = require('moment');
const Joi = require('joi');
const { number } = require('joi');

const tourSchema = new Schema({
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  introduction: {
    type: String,
    required: true,
  },
  highlights: [
    {
      type: String,
    },
  ],
  included: [
    {
      type: String,
      required: true,
    },
  ],
  itinerary: [
    {
      image: String,
      route: String,
    },
  ],
  price: {
    type: Number,
    validate: {
      validator: (price) =>
        !Joi.number().precision(2).positive().validate(price, { convert: false }).error,
      msg: 'Please input correct price',
    },
  },
  map: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
    },
  },
  startDate: {
    type: String,
    required: true,
    validate: {
      validator: (date) => moment(date, 'DD/MM/YYYY', true).isValid,
      msg: 'Invalid Date format',
    },
  },
  endDate: {
    type: String,
    required: true,
    validate: {
      validator: (date) =>
        moment(date, 'DD/MM/YYYY', true).isValid() &&
        moment(date, 'DD/MM/YYYY').isSameOrAfter(moment()),
      msg: 'Invalid Date format',
    },
  },
});

module.exports = model('Tour', tourSchema);
