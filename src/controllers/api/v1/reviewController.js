const Review = require('../../../models/review');

exports.createReview = async (req, res) => {
  const { rating, comment } = req.body;
  const review = new Review({ rating, comment });
  try {
    await review.save();
    res.status(201).json(review);
  } catch (e) {
    res.status(400).send(e);
  }
}

exports.getAllReviews = async (req, res) => {
  const reviews = await Review.find()
  .populate('user').populate('tour').exec();
  return res.json(reviews);
}

exports.getReview = async (req, res) => {
  const { id } = req.params;
  const review = await Review.findById(id)
  .populate('user').populate('tour').exec();
  if (!review) {
    return res.sendStatus(404);
  }
  return res.json(review);
}

exports.updateReview = async (req, res) => {
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

exports.deleteReview = async (req, res) => {
  const { id } = req.params;
  const review = await Review.findByIdAndDelete(id).exec();
  if (!review) {
    return res.sendStatus(404);
  }
  return res.status(204).send(review);
}