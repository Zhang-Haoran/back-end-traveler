/* eslint-disable import/newline-after-import */
const express = require("express");
const router = new express.Router();

const usersControllers = require("../../controllers/api/v1/users");
router.get("/users", usersControllers.index);
router.put("/users/:id", usersControllers.update);
router.delete("/users/:id", usersControllers.destroy);
router.post("/users", usersControllers.store);
router.get("/users/:id", usersControllers.show);

const locationControllers = require("../../controllers/api/v1/locationController");
router.get("/locations", locationControllers.getAllLocations);
router.get("/location/:id", locationControllers.getLocation);
router.post("/location", locationControllers.createLocation);
router.patch("/location/:id", locationControllers.updateLocation);
router.delete("/location/:id", locationControllers.deleteLocation);


module.exports = router;
