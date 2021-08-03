const User = require('../models/userModel');
// Post User
exports.postUser = async (req, res) => {
  const isDefined =
    req.body.email &&
    req.body.firstName &&
    req.body.lastName &&
    req.body.dateOfBirth &&
    req.body.password;
  if (!isDefined) return res.status(400).send({ error: 'request body invalid' });
  const { email, firstName, lastName, dateOfBirth, password } = req.body;
  const existUser = await User.findById(email).exec();
  if (existUser) return res.status(409).send({ error: 'This email already exist' });
  if (password.length < 6)
    return res.status(400).send({ error: 'Password is at least 6 characters long' });
  const user = new User({
    _id: email,
    firstName,
    lastName,
    dateOfBirth,
    password,
  });
  try {
    await user.save();
    res.status(201).send({ email });
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get Users
exports.getUsers = async (req, res) => {
  const users = await User.find().exec();
  try {
    res.status(200).json(users);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get user by id
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).exec();
  if (!user) return res.status(404).send({ error: 'No record found with that user' });
  try {
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Update user by id
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, req.body, { new: true }).exec();
  if (!user) return res.status(404).send({ error: 'No record found with that user' });
  try {
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete user by id
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id).exec();
  if (!user) return res.status(404).send({ error: 'No record found with that user' });
  try {
    res.sendStatus(204);
  } catch (error) {
    res.status(400).send(error);
  }
};
