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
      required: true
    },
    review: {
      type: String,
      default: 'Tell us about your experience'
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    },
    id: false
  }
);

// schema.virtual('code').get(function () {
//   return this._id;
// });

// Review -> Reviews
module.exports = model('Review', schema);
