const express = require('express');

const router = new express.Router();
const userController = require('../../controllers/api/v1/userController');

router.get('/', userController.getAllUsers);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/', userController.createUser);
router.get('/:id', userController.getUser);

module.exports = router;
