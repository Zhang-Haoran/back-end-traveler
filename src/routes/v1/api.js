/* eslint-disable import/newline-after-import */
const express = require('express');
const router = new express.Router();
const usersControllers = require('../../controllers/api/v1/users');
const authRoute = require('./auth');
const auth = require('../../middleware/auth');
router.post('/users', auth, usersControllers.store);
router.use('/auth', authRoute);

module.exports = router;
