const User = require('../../../models/user');
const Booking = require('../../../models/booking');
const { generateToken } = require('../../../utils/auth');

// PUT one user
exports.update = async (req, res) => {
  const { id } = req.params;
  const { email, firstName, lastName, dateOfBirth, password, role } = req.body;
  // get data
  const user = await User.findByIdAndUpdate(
    id,
    { email, firstName, lastName, dateOfBirth, password, role },
    { new: true },
  ).exec();
  if (!user) {
    return res.status(404).send('No record found with that user');
  }
  try {
    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

// DELETE one user
exports.destroy = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id).exec();
  if (!user) {
    return res.status(404).send('No record found with that user');
  }
  try {
    return res.sendStatus(204);
  } catch (e) {
    res.status(400).send(e);
  }
};

// POST one user
exports.store = async (req, res) => {
  // get data
  const { email, firstName, lastName, dateOfBirth, password, role } = req.body;
  // check if user already exists
  const existUser = await User.findById(email).exec();
  if (existUser) {
    return res.status(409).send('This email already exist');
  }
  // create user in database
  const user = new User({
    _id: email,
    firstName,
    lastName,
    dateOfBirth,
    password,
    role,
  });
  await user.hashPassword();
  try {
    await user.save();
    const token = generateToken({ email });
    res.status(201).send({ token, email });
  } catch (e) {
    res.status(400).send(e);
  }
};

// GET one user
exports.show = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(404).send('No record found with that user');
  }
  try {
    return res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

// GET all users
exports.index = async (req, res) => {
  const users = await User.find().exec();
  try {
    res.status(200).json(users);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.addBookingToUser = async(req, res) => {
  const {userId, bookingId} = req.params;
  const user = await User.findById(userId).exec();
  const booking = await Booking.findById(bookingId).exec();
  if (!user || !booking) {
    return res.sendStatus(404);
  }
  user.bookings.addToSet(booking._id);
  booking.user = user._id;
  await booking.save();
  await user.save();
  return res.status(200).json(booking);
}

exports.deleteBookingFromUser = async(req, res) => {
  const {userId, bookingId} = req.params;
  const user = await User.findById(userId).exec();
  const booking = await Booking.findById(bookingId).exec();
  if (!user || !booking) {
    return res.sendStatus(404);
  }
  user.bookings.pull(booking._id);
  booking.user = null;
  await booking.save();
  await user.save();
  return res.status(200).json(booking);
}