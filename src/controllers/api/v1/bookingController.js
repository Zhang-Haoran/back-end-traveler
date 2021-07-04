const Booking = require('../../../models/booking');

exports.createBooking = async (req, res) => {
  const { paid, price } = req.body;
  const booking = new Booking({ paid, price });
  try {
    await booking.save();
    res.status(201).send({ booking });
  } catch (e) {
    res.status(400).send(e);
  }
}

exports.getBooking = async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findById(id)
  .populate('tour').populate('user').exec();
  if (!booking) {
    return res.sendStatus(404).json('No document found with that ID');
  }
  try {
    res.status(200).json({
      status: 'success',
      data: {
        data: booking,
      },
    });
  } catch (e) {
    res.status(400).send(e);
  }
}

exports.getAllBookings = async (req, res) => {
  const bookings = await Booking.find().exec();
  try {
    res.status(200).json({
      status: 'success',
      data: {
        data: bookings,
      },
    });
  } catch (e) {
    res.status(400).send(e);
  }
}

exports.updateBooking = async (req, res) => {
  const { id } = req.params;
  const { paid, price } = req.body;
  const booking = await Booking.findByIdAndUpdate(id, { paid, price }, { new: true }).exec();
  if (!booking) {
    return res.sendStatus(404).json('No document found with that ID');
  }
  try {
    res.status(200).json({
      status: 'success',
      data: {
        data: booking,
      },
    });
  } catch (e) {
    res.status(400).send(e);
  }
}

exports.deleteBookinig = async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findByIdAndDelete(id).exec();
  if (!booking) {
    return res.sendStatus(404).json('No document found with that ID');
  }
  try {
    res.status(204).json({
      status: 'success',
      data: {
        data: null,
      },
    });
  } catch (e) {
    res.status(400).send(e);
  }
}
