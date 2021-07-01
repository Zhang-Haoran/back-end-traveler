const Review = require('../../../models/review');

async function index(req, res) {
  const reviews = await Review.find().exec();
  return res.json(reviews);
}

async function show(req, res) {
  const { id } = req.params;
  const review = await Review.findById(id).exec();
  if (!review) {
    return res.sendStatus(404);
  }
  return res.json(review);
}

async function update(req, res) {
  const { id } = req.params;
  const { rating, comment } = req.body;
  const review = await Review.findByIdAndUpdate(
    id,
    { rating, comment },
    { new: true, runValidators: true },
    (err) => {
      if (err) {
        return res.status(422).json(err);
      }
    },
  ).exec();
  if (!review) {
    return res.sendStatus(404);
  }
  return res.json(review);
}

async function destroy(req, res) {
  const { id } = req.params;
  const review = await Review.findByIdAndDelete(id).exec();
  if (!review) {
    return res.sendStatus(404);
  }
  return res.status(204).send(review);
}

async function store(req, res) {
  const { rating, comment } = req.body;
  const review = new Review({ rating, comment });
  try {
    await review.save();
    res.status(201).json(review);
  } catch (e) {
    res.status(400).send(e);
  }
}

module.exports = {
  index,
  show,
  destroy,
  store,
  update,
};
