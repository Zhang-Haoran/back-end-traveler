const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    _id: {
      type: String,
      uppercase: true,
    },
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
      default: 'Tell us about your experience',
      comment: {
        validator: (price) => !Joi.string().alphanum().max(300).validate(comment).error,
      msg: 'Words limit: 300 max',
      }
    }
  },
  {
    timestamps: true,
    id: false
  }
);

// Review -> Reviews
module.exports = model('Review', schema);
