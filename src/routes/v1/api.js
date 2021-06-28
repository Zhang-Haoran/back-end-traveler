const express = require("express");
const router = new express.Router();
const usersControllers = require("../../controllers/api/v1/usersControllers");
const userRoute = require("./users")

router.use('/users',userRoute);

module.exports = router;