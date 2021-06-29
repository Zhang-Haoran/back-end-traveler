const express = require("express");
const router = new express.Router();
const bookingsControllers = require("../../../controllers/api/v1/bookings");

router.get("/", bookingsControllers.index);
router.put("/:id", bookingsControllers.update);
router.delete("/:id", bookingsControllers.destroy);
router.post("/", bookingsControllers.store);
router.get("/:id", bookingsControllers.show);

module.exports = router;
