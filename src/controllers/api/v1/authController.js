const { generateToken } = require('../../../utils/auth');
const User = require('../../../models/user');

// User login
exports.login = async (req, res) => {
  // Check if email or password is empty
  const isDefined = req.body.email && req.body.password;
  if (!isDefined) return res.status(400).send({ error: 'Email or password not defined' });

  // Check if the user is register in database
  const { email, password } = req.body;
  const user = await User.findOne({ _id: email }).select('password').exec();
  if (!user) return res.status(404).json({ error: 'Email not found' });

  // Check if the password is correct
  const validatePassword = await user.validatePassword(password);
  if (!validatePassword) return res.status(401).json({ error: 'Invalid password' });

  return res.status(200).json({ token: generateToken({ email }), email });
};
