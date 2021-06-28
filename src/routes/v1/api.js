/* eslint-disable import/newline-after-import */
const express = require("express");
const router = new express.Router();
// const usersControllers = require("../../controllers/api/v1/users");
const availabilityRoute = require("./tour/availabilities");
const tourRoute = require("./tour/tours")

// router.get("/users", usersControllers.index);
// router.put("/users/:id", usersControllers.update);
// router.delete("/users/:id", usersControllers.destroy);
// router.post("/users", usersControllers.store);
// router.get("/users/:id", usersControllers.show);

router.use('/tours', tourRoute);
router.use('/availabilities', availabilityRoute);

module.exports = router;