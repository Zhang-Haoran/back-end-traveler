const Availability = require('../../../../models/tour/availability');
const Tour = require('../../../../models/tour/tour');
const moment = require('moment');

// PUT one tour
exports.update = async (req, res) => {
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
exports.destroy = async (req, res) => {
  const { id } = req.params;
  const tour = await Tour.findByIdAndRemove(id).exec();
  if (!tour) {
    return res.sendStatus(404);
  }
  return res.status(204).json(tour);
};

// POST one tour
exports.store = async (req, res) => {
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
exports.show = async (req, res) => {
  const { id } = req.params;
  const tour = await Tour.findById(id).exec();
  if (!tour) {
    return res.sendStatus(404);
  }
  return res.json(tour);
};

// GET all tours
exports.index = async (req, res) => {
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
// city, title, subtitle, introduction, highlights, included, itinerary, price, startDate, endDate