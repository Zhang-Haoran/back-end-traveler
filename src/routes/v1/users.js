const express = require('express');

const router = new express.Router();
const {
  index,
  update,
  destroy,
  store,
  show,
  addBookingToUser,
  deleteBookingFromUser,
  addReviewToUser,
  deleteReviewFromUser
} = require('../../controllers/api/v1/usersControllers');

router.get('/', index);
router.put('/:id', update);
router.delete('/:id', destroy);
router.post('/', store);
router.get('/:id', show);

router.post('/:userId/bookings/:bookingId', addBookingToUser)
router.delete('/:userId/bookings/:bookingId', deleteBookingFromUser)

router.post('/:userId/reviews/:reviewId', addReviewToUser)
router.delete('/:userId/reviews/:reviewId', deleteReviewFromUser)

module.exports = router;