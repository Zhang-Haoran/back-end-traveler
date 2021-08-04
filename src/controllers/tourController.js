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
  const tour = new Tour({
    title,
    subtitle,
    city,
    state,
    map,
    introduction,
    highlights,
    included,
    itinerary,
    price,
    image,
    startDate,
    endDate,
  });
  if (moment(startDate, 'DD/MM/YYYY').isAfter(moment(endDate, 'DD/MM/YYYY')))
    return res.status(400).send('End date should not be prior to the start date');
  try {
    await tour.save();
    res.status(201).json(tour);
  } catch (error) {
    res.status(400).send(error);
  }
};
