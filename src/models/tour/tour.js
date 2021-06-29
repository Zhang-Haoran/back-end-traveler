const { Schema, model } = require('mongoose');
const moment = require('moment');
const Joi = require('joi');

const tourSchema = new Schema({
  // Here needs to check location collection
  // Relate to location
  city: {
    type: String,
    ref: 'City'
  },

  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  introduction: {
    type: String,
    required: true
  },

  // Optional
  highlights: [{
    type: String
  }],
  // Could create a new collection
  included: [{
    type: String,
    required: true
  }],
  // Daily tour details
  // Could create a new collection
  itinerary: [{
    type: String,
    required: true
  }],

  // Here needs to check availability collection
  // Relate to availability
  availability: [{
    type: Schema.Types.ObjectId,
    ref: 'Availability',
    // required:true
  }],

  price: {
    type: Number,
    required: true,
    validate: {
      validator: (price) => !Joi.number().precision(2).positive()
      .validate(price,{convert:false}).error,
      msg: 'Please input correct price',
    }
  },
  // Check with front-end
  image: {
    data: Buffer,
    contentType: String,
  },
  startDate: {
    type: String,
    required: true,
    validate: {
      validator: (date) => moment(date, "DD/MM/YYYY", true).isValid()
      && moment(date, "DD/MM/YYYY").isSameOrAfter(moment()),
      msg: 'Invalid Date Format'
    },
  },
  endDate: {
    type: String,
    required: true,
    validate: {
      validator: (date) => moment(date, "DD/MM/YYYY", true).isValid()
      && moment(date, "DD/MM/YYYY").isSameOrAfter(moment()),
      msg: 'Invalid Date Format'
    },
  },

  // Here needs to check user collection
  // Relate to users
  bookings: [{
    type: Schema.Types.ObjectId,
    ref: 'Booking'
  }],// relate to booking
})

module.exports = model('Tour', tourSchema);