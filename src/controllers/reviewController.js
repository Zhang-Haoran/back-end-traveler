const Review = require('../models/reviewModel');
const User = require('../models/userModel');

// Post review
exports.postReview = async (req, res) => {
  const isDefined = req.body.tour && req.body.user && req.body.comment;
  if (!isDefined) return res.status(400).send({ error: 'request body invalid' });
  const { tour, user, comment } = req.body;
  const review = new Review({ tour, user, comment });
  try {
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get reviews
exports.getReviews = async (req, res) => {
  const reviews = await Review.find().populate('user').populate('tour').exec();
  try {
    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get review by user id
exports.getReviewById = async (req, res) => {
  const { id } = req.params.id;
  const review = await Review.findById(id).exec();
  if (!review) return res.sendStatus(404);
  const user = await User.findOne({ firstName: review.user });
  try {
    res.status(200).json(review, user);
  } catch (error) {
    res.status(400).send(error);
  }
};
