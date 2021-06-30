const express = require("express");
const router = new express.Router();

const reviewsControllers = require("../../controllers/api/v1/reviews");
router.get("/reviews", reviewControllers.index);
router.put("/reviews/:id", reviewControllers.update);
router.delete("/reviews/:id", reviewsControllers.destroy);
router.post("/reviews", reviewsControllers.store);
router.get("/reviews/:id", reviewsControllers.show);

module.exports = router;
