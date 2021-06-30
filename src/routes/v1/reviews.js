const express = require("express");

const router = new express.Router();
const reviewControllers = require("../../controllers/api/v1/reviews");

router.get("/", reviewControllers.index);
router.put("/:id", reviewControllers.update);
router.delete("/:id", reviewControllers.destroy);
router.post("/", reviewControllers.store);
router.get("/:id", reviewControllers.show);

module.exports = router;