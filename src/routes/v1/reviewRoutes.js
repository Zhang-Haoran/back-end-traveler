const express = require('express');

const router = new express.Router();
const reviewController = require('../../controllers/api/v1/reviewController');

router.get('/', reviewController.getAllReviews);
router.put('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);
router.post('/', reviewController.createReview);
router.get('/:id', reviewController.getReview);

module.exports = router;
