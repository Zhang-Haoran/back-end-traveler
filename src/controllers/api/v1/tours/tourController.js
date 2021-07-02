const moment = require('moment');
const Availability = require('../../../../models/tour/availability');
const Tour = require('../../../../models/tour/tour');
const Booking = require('../../../../models/booking');
const Review = require('../../../../models/review');

// PUT one tour
exports.updateTour = async (req, res) => {
  const { id } = req.params;
  const { title, subtitle, introduction, highlights, included,
    itinerary, price, startDate, endDate } = req.body;

  if (moment(startDate, "DD/MM/YYYY").isAfter(moment(endDate, "DD/MM/YYYY"))) {
    return res.status(400).send('End date should not be prior to the Start date');
  }

  const tour = await Tour.findByIdAndUpdate(id,
    { title, subtitle, introduction, highlights, included, itinerary, price, startDate, endDate },
    {new: true, runValidators: true}, (err)=>{
      if(err){
        return res.status(422).json(err)
      }
  }).exec();
  if (!tour) {
    return res.sendStatus(404);
  }
  return res.status(200).json(tour);
};

// DELETE one tour
exports.deleteTour = async (req, res) => {
  const { id } = req.params;
  const tour = await Tour.findByIdAndRemove(id).exec();
  if (!tour) {
    return res.sendStatus(404);
  }
  return res.status(204).json(tour);
};

// POST one tour
exports.createTour = async (req, res) => {
  const { title, subtitle, introduction, highlights,
    included, itinerary, price, startDate, endDate } = req.body;

  const tour = new Tour({
    title, subtitle,
    introduction, highlights, included, itinerary, price, startDate, endDate
  });

  if (moment(startDate, "DD/MM/YYYY").isAfter(moment(endDate, "DD/MM/YYYY"))) {
    return res.status(400).send('End date should not be prior to the Start date');
  }
  try {
    await tour.save();
    return res.status(201).json(tour);
  } catch (e) {
    return res.status(400).send(e);
  }
};

// GET one tour
exports.getTour = async (req, res) => {
  const { id } = req.params;
  const tour = await Tour.findById(id)
  .populate('availability').populate('bookings')
  .populate('reviews').populate('city').exec();
  if (!tour) {
    return res.sendStatus(404);
  }
  return res.json(tour);
};

// GET all tours
exports.getAllTours = async (req, res) => {
  const tour = await Tour.find().exec();
  return res.json(tour);
};


exports.addAvailabilityToTour = async (req, res) => {
  const { availabilityId, tourId } = req.params;
  const availability = await Availability.findById(availabilityId).exec();
  const tour = await Tour.findById(tourId).exec();
  if (!availability || !tour) {
    return res.sendStatus(404);
  }
  availability.tour = tour._id;
  tour.availability.addToSet(availability._id);
  await availability.save();
  await tour.save();
  return res.status(200).json(tour);
}

exports.deleteAvailabilityFromTour = async (req, res) => {
  const { availabilityId, tourId } = req.params;
  const availability = await Availability.findById(availabilityId).exec();
  const tour = await Tour.findById(tourId).exec();
  if (!availability || !tour) {
    return res.sendStatus(404);
  }
  availability.tour = null;
  tour.availability.pull(availability._id);
  await availability.save();
  await tour.save();
  return res.status(200).json(tour);
}

exports.addBookingToTour = async(req, res) => {
  const {tourId, bookingId} = req.params;
  const tour = await Tour.findById(tourId).exec();
  const booking = await Booking.findById(bookingId).exec();
  if (!tour || !booking) {
    return res.sendStatus(404);
  }
  tour.bookings.addToSet(booking._id);
  booking.tour = tour._id;
  await booking.save();
  await tour.save();
  return res.status(200).json(tour);
}

exports.deleteBookingFromTour = async(req, res) => {
  const {tourId, bookingId} = req.params;
  const tour = await Tour.findById(tourId).exec();
  const booking = await Booking.findById(bookingId).exec();
  if (!tour || !booking) {
    return res.sendStatus(404);
  }
  tour.bookings.pull(booking._id);
  booking.tour = null;
  await booking.save();
  await tour.save();
  return res.status(200).json(tour);
}

exports.addReviewToTour = async(req, res) => {
  const {tourId, reviewId} = req.params;
  const tour = await Tour.findById(tourId).exec();
  const review = await Review.findById(reviewId).exec();
  if (!tour || !review) {
    return res.sendStatus(404);
  }
  tour.reviews.addToSet(review._id);
  review.tour.addToSet(tour._id);
  await review.save();
  await tour.save();
  return res.status(200).json(tour);
}

exports.deleteReviewFromTour = async(req, res) => {
  const {tourId, reviewId} = req.params;
  const tour = await Tour.findById(tourId).exec();
  const review = await Review.findById(reviewId).exec();
  if (!tour || !review) {
    return res.sendStatus(404);
  }
  tour.reviews.pull(review._id);
  review.tour.pull(tour._id);
  await review.save();
  await tour.save();
  return res.status(200).json(tour);
}
