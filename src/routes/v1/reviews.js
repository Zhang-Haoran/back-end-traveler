const express = require("express");
const router = new express.Router();

const Controllers = require("../../controllers/api/v1/");
router.get("/", reviewControllers.index);
router.put("/:id", reviewControllers.update);
router.delete("/:id", Controllers.destroy);
router.post("/", Controllers.store);
router.get("/:id", Controllers.show);

module.exports = router;
