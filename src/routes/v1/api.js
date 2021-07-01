const express = require('express');

const router = new express.Router();

const availabilityRoute = require('./tour/availabilities');
const tourRoute = require('./tour/tours');
const userRoute = require('./users');
const reviewRoute = require('./reviews');
const authRoute = require('./auth');
const bookingsRoute = require("./booking/bookings");


router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/tours', tourRoute);
router.use('/availabilities', availabilityRoute);
router.use('/reviews', reviewRoute);
router.use('/bookings', bookingsRoute);

module.exports = router;

