const express = require("express");
const router = new express.Router();
const usersControllers = require("../../controllers/api/v1/usersControllers");

router.get("/users", usersControllers.index);
router.put("/users/:id", usersControllers.update);
router.delete("/users/:id", usersControllers.destroy);
router.post("/users", usersControllers.store);
router.get("/users/:id", usersControllers.show);

module.exports = router;