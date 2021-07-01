const { Schema, model } = require('mongoose');
const Joi = require('joi');

const reviewSchema = new Schema(
  {
    user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    tour: [{ type: Schema.Types.ObjectId, ref: 'Tour' }],
    rating: {
      type: Number,
      required: true,
      validate: {
        validator:(rating)=> !Joi.number().integer().min(1).max(5).validate(rating).error,
        msg: 'Give a rating from 1-5', 
      }
    },
    comment: {
      type: String,
      required: true,
      default: 'Tell us about your experience',
      comment: {
        validator: (price) => !Joi.string().alphanum().max(300).validate(price).error,
      msg: 'Words limit: 300 max',
      }
    }
  },
  {
    timestamps: true,
    id: false
  }
);

module.exports = model('Review', reviewSchema);