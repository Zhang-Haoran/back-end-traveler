const Joi = require('joi');
const User = require('../../../models/user');

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

  const existUser = await User.findById(email).exec();

  if (existUser) {
    return res.status(409).send('This email already exist');
  }

  const user = new User({ _id: email, password });
  await user.save();
  return res.status(201).json(user);
};
