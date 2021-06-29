const express = require('express');

const router = new express.Router();
const usersControllers = require('../../controllers/api/v1/users');
const authRoute = require('./auth');

router.post('/users', usersControllers.store);
router.use('/auth', authRoute);

module.exports = router;
