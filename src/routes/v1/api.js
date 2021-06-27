/* eslint-disable import/newline-after-import */
const express = require("express");
const router = new express.Router();
const usersControllers = require("../../controllers/api/v1/users");
router.get("/users", usersControllers.index);
router.put("/users/:id", usersControllers.update);
router.delete("/users/:id", usersControllers.destroy);
router.post("/users", usersControllers.store);
router.get("/users/:id", usersControllers.show);

const reviewsControllers = require("../../controllers/api/v1/reviews");
router.get("/reviews", reviewControllers.index);
router.put("/reviews/:id", reviewControllers.update);
router.delete("/reviews/:id", reviewsControllers.destroy);
router.post("/reviews", reviewsControllers.store);
router.get("/reviews/:id", reviewsControllers.show);

module.exports = router;
