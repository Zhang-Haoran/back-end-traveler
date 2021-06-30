const express = require("express");
const router = new express.Router();
const availabilityRoute = require("./tour/availabilities");
const tourRoute = require("./tour/tours")
const userRoute = require("./users")

router.use('/users',userRoute);
router.use('/tours', tourRoute);
router.use('/availabilities', availabilityRoute);

module.exports = router;