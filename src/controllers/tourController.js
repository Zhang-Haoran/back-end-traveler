const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const Review = require('../models/reviewModel');

// Post tour
exports.postTour = async (req, res) => {
  const {
    city = null,
    state = null,
    title = null,
    subtitle = null,
    introduction = null,
    highlights = null,
    included = null,
    itinerary = null,
    price = null,
    image = null,
    startDate = null,
    endDate = null,
    map = null,
  } = req.body;
};
