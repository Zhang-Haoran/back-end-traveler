const Review = require('../models/review');
const User = require('../models/user');
const Tour = require('../models/tour');
const Joi = require('joi');

async function getAllReviews(req, res) {
  const reviews = await Review.find().exec();
  return res.json(reviews);
}

async function getReviewById(req, res) {
  const { id } = req.params;
  const review = await Review.findById(id).populate('users').exec();
  if (!review) {
    return res.sendStatus(404);
  }
  return res.json(review);
}

async function updateReviewById(req, res) {
  const { id } = req.params;
  const { rating, comment } = req.body;
  const review = await Review.findByIdAndUpdate(
    id,
    { rating, comment },
    { new: true }
  ).exec();
  if (!review) {
    return res.sendStatus(404);
  }
  return res.json(review);
}

async function deleteReviewById(req, res) {
  const { id } = req.params;
  const review = await Review.findByIdAndDelete(id).exec();
  if (!review) {
    return res.sendStatus(404);
  }

  await User.updateMany(
    {
      reviews: review._id
    },
    {
      $pull: {
        reviews: review._id
      }
    }
  );

  await Tour.updateMany(
    {
      reviews: review._id
    },
    {
      $pull: {
        reviews: review._id
      }
    }
  );

  return res.sendStatus(204);
}

async function createReview(req, res) {
  // validate data
  const numberValidator = Joi.number().min(1).max(5).required();
  const schema = Joi.object({
    rating: numberValidator,
    comment: Joi.string()
  });
  const {rating,comment} = await schema.validateAsync(req.body, {
    allowUnknown: true,
    stripUnknown: true,
    abortEarly: false
  });
  const existReview = await Review.findById(code).exec();
  if (existReview) {
    // duplicate course code
    return res.sendStatus(409);
  }
  const review = new Review({ _id, rating, comment });
  await review.save();
  return res.status(201).json(review);
}

module.exports = {
  getAllReviews,
  getReviewById,
  updateReviewById,
  deleteReviewById,
  createReview
};