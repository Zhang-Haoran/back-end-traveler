const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();
// Create user
router.post('/', userController.postUser);
// Get all users
router.get('/', userController.getUsers);
// Get user by email id
router.get('/:id', userController.getUserById);
// Update user by email id
router.patch('/:id', userController.updateUser);
// Delete user by email id
router.delete('/:id', userController.deleteUser);

module.exports = router;
