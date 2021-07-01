const express = require("express");

const router = new express.Router();
const locationController = require("../../controllers/api/v1/locationController");

router.get("/", locationController.getAllLocations);
router.get("/:id", locationController.getLocation);
router.post("/", locationController.createLocation);
router.patch("/:id", locationController.updateLocation);
router.delete("/:id", locationController.deleteLocation);

module.exports = router;