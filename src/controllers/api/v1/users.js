/* eslint-disable no-unused-vars */
const User = require('../../../models/user');
// PUT one user
exports.update = async (req, res) => {};

// DELETE one user
exports.destroy = async (req, res) => {};

// POST one user
exports.store = async (req, res) => {
  // eslint-disable-next-line no-console
  console.log(req.body);
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send({ user });
  } catch (e) {
    res.status(400).send(e);
  }
};

// GET one user
exports.show = async (req, res) => {};

// GET all user
exports.index = async (req, res) => res.status(200).send('Success');
