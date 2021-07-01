const express = require('express');
const {
  index,
  show,
  store,
  destroy,
  update,
  addAvailabilityToTour,
  deleteAvailabilityFromTour,
  addBookingToTour,
  deleteBookingFromTour
} = require('../../../controllers/api/v1/tours/tours');

const router = express.Router();

router.get('/', index);
router.get('/:id', show);
router.post('/', store);
router.put('/:id', update);
router.delete('/:id', destroy);

router.post('/:tourId/availabilities/:availabilityId', addAvailabilityToTour);
router.delete('/:tourId/availabilities/:availabilityId', deleteAvailabilityFromTour);

router.post('/:tourId/bookings/:bookingId', addBookingToTour);
router.delete('/:tourId/bookings/:bookingId', deleteBookingFromTour);

module.exports = router;
