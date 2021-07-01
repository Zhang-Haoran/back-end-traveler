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
} = require('../../controllers/api/v1/usersControllers');

router.get('/', index);
router.put('/:id', update);
router.delete('/:id', destroy);
router.post('/', store);
router.get('/:id', show);

router.post('/:userId/bookings/:bookingId', addBookingToUser)
router.delete('/:userId/bookings/:bookingId', deleteBookingFromUser)

module.exports = router;