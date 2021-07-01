const express = require('express');

const router = express.Router();
const { login } = require('../../controllers/api/v1/auth');

// User Login
router.post('/', login);

module.exports = router;
