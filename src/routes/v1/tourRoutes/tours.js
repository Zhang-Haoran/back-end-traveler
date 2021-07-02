const express = require('express');
const tourController = require('../../../controllers/api/v1/tours/tourController')

const router = express.Router();

router.get('/', tourController.getAllTours);
router.get('/:id', tourController.getTour);
router.post('/', tourController.createTour);
router.put('/:id', tourController.updateTour);
router.delete('/:id', tourController.deleteTour);

router.post('/:tourId/availabilities/:availabilityId', tourController.addAvailabilityToTour);
router.delete('/:tourId/availabilities/:availabilityId', tourController.deleteAvailabilityFromTour)

router.post('/:tourId/bookings/:bookingId', tourController.addBookingToTour);
router.delete('/:tourId/bookings/:bookingId', tourController.deleteBookingFromTour);

router.post('/:tourId/reviews/:reviewId', tourController.addReviewToTour);
router.delete('/:tourId/reviews/:reviewId', tourController.deleteReviewFromTour);

module.exports = router;
