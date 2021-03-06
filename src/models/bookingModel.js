const { Schema, model } = require('mongoose');

const bookingSchema = new Schema({
  tour: {
    type: Schema.Types.ObjectId,
    ref: 'Tour',
  },
  user: {
    type: Schema.Types.String,
    ref: 'User',
  },
  price: {
    type: Number,
    required: [true, 'Booking must have a price'],
    validate: {
      validator(value) {
        return value > 0;
      },
      message: 'Price need more than 0',
    },
  },
  timestamps: true,
});
module.exports = model('Booking', bookingSchema);
