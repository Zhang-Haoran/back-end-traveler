const Review = require('../../../models/review');

async function index(req, res) {
  const reviews = await Review.find().exec();
  return res.json(reviews);
}

async function show(req, res) {
  const { id } = req.params;
  const review = await Review.findById(id).populate('users').exec();
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
    { new: true }
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

async function store(req, res) {
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
  index,
  show,
  destroy,
  store,
  update
};