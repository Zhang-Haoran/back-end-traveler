const express = require('express');
const user = require('../controllers/userController');

const router = express.Router();
router.post('/', user.postUser);

module.exports = router;
