const User = require('../../../models/user');
const Joi = require('joi');

// PUT one user
exports.update = async (req, res) => {
  const {id} = req.params;
  const {email, firstName, lastName, dateOfBirth, password, role} = req.body;
  const user = await User.findByIdAndUpdate(
      id, 
      {email, firstName, lastName, dateOfBirth, password, role},
      {new: true}
  ).exec();
  if (!user){
      return res.sendStatus(404);
  }
  return res.json(user).status(200);
};

// DELETE one user
exports.destroy = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id).exec();
  if (!user){
      return res.sendStatus(404);
  }
  return res.sendStatus(204);
};

// POST one user
exports.store = async (req, res) => {
  // validate by joi
  const schema = Joi.object ({
    email: Joi.string().email().required(),
    firstName: Joi.string().min(2).max(20).required(),
    lastName: Joi.string().min(2).max(20).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]+$/).required(),
    dateOfBirth: Joi.string().required(),
    role: Joi.string().min(4).required()
  });
  // get data
  const { email, firstName, lastName, dateOfBirth, password, role } = await schema.validateAsync(req.body, {
    allowUnknown: true, 
    stripUnknown: true, 
    abortEarly: false 
  });

  // check if user already exists 
  const existUser = await User.findById(email).exec();
  if(existUser) {
        return res.status(409).send('This email already exist'); 
  }
  // create user in database
  const user = new User({_id:email, email, firstName, lastName, dateOfBirth, password, role});
  console.log(user)
  await user.save();
  return res.status(201).json(user); 
  // try {
  //   await user.save();
  //   return res.status(201).json(user);
  // } catch (e) {
  //   res.status(400).send(e);
  // }
};

// GET one user
exports.show = async (req, res) => {
  const {id} = req.params;
  const user = await User.findById(id).exec(); 
  if(!user) {
      return res.status(404);
  }
  return res.json(user);
};

// GET all user
exports.index = async (req, res) => {
  const users = await User.find().exec();
  return res.json(users);
};
