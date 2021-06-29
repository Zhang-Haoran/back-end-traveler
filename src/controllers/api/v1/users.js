const Joi = require('joi');
const User = require('../../../models/user');
const { generateToken } = require('../../../utils/auth');
// POST one user
exports.store = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]+$/)
      .required(),
  });
  const { email, password } = await schema.validateAsync(req.body, {
    allowUnknown: true,
    stripUnknown: true,
    abortEarly: false,
  });

  // check if user already exists
  const existUser = await User.findById(email).exec();
  if (existUser) return res.status(409).send('This email already exist');

  // create user in database
  const user = new User({ _id: email, password });
  await user.hashPassword();
  await user.save();
  const token = generateToken({ email });
  return res.status(201).json({ token, email });
};
