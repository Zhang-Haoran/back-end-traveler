const express = require("express");
const router = new express.Router();
const usersControllers = require("../../controllers/api/v1/usersControllers");

router.get("/", usersControllers.index);
router.put("/:id", usersControllers.update);
router.delete("/:id", usersControllers.destroy);
router.post("/", usersControllers.store);
router.get("/:id", usersControllers.show);

module.exports = router;
