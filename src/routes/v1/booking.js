const express = require("express");
const router = new express.Router();
const bookingsControllers = require("../../controllers/api/v1/bookings");

router.get("/bookings", bookingsControllers.getAllBookings);
router.put("/bookings/:id", bookingsControllers.updateBooking);
router.delete("/bookings/:id", bookingsControllers.deleteBooking);
router.post("/bookings", bookingsControllers.createBooking);
router.get("/bookings/:id", bookingsControllers.getBooking);

module.exports = router;
