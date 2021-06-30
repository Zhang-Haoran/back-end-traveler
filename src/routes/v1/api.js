/* eslint-disable import/newline-after-import */
const express = require("express");
const router = new express.Router();
const availabilityRoute = require("./tour/availabilities");
const tourRoute = require("./tour/tours")

router.use('/tours', tourRoute);
router.use('/availabilities', availabilityRoute);

module.exports = router;