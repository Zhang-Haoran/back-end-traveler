const express = require('express');

const router = new express.Router();
const usersControllers = require('../../controllers/api/v1/users');

router.post('/users', usersControllers.store);

module.exports = router;
