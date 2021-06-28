const Availability = require('../../../../models/tour/availability')


// PUT one availability
exports.update = async (req, res) => {
  const {id} = req.params;
  const {date, stock} = req.body;
  const availability = await Availability.findByIdAndUpdate(id, {date, stock}, 
    {new: true, runValidators: true}, (err)=>{
      if(err){
        return res.status(422).json(err)
      }
  }).exec();
  if(!availability){
    return res.sendStatus(404);
  }
  return res.status(200).json(availability);
};

// DELETE one availability
exports.destroy = async (req, res) => {
  const {id} = req.params;
  const availability = await Availability.findByIdAndRemove(id).exec();
  if(!availability){
    return res.sendStatus(404);
  }
  return res.status(204).json(availability);
};

// POST one availability
exports.store = async (req, res) => {
  const {date, stock} = req.body;
  const availability = new Availability({date, stock});
  try {
    await availability.save();
    res.status(201).json(availability);
  } catch (e) {
    res.status(400).send(e);
  }
};

// GET one availability
exports.show = async (req, res) => {
  const {id} = req.params;
  const availability = await Availability.findById(id).exec();
  if(!availability){
    return res.sendStatus(404);
  }
  return res.json(availability);
};

// GET all availability
exports.index = async (req, res) => {
  const availability = await Availability.find().exec();
  return res.json(availability);
};