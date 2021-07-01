const express = require('express');

const router = new express.Router();
const bookingController = require('../../controllers/api/v1/bookingController');

router.get('/', bookingController.getAllBookings);
router.put('/:id', bookingController.updateBooking);
router.delete('/:id', bookingController.deleteBookinig);
router.post('/', bookingController.createBooking);
router.get('/:id', bookingController.getBooking);

module.exports = router;
