const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const methodNotAllowed = require("../errors/methodNotAllowed");

async function reviewExists(req, res, next) {
  // TODO: Write your code here
  const id = Number(req.params.reviewId);
  const foundReview = await reviewsService.read(id);
  if (!foundReview) {
    return res.status(404).json({ error: `Review with id ${id} not found` });
  }
  res.locals.review = foundReview;
  next();
}

async function destroy(req, res) {
  // TODO: Write your code here

  await reviewsService.destroy(res.locals.review.review_id);
  console.log('destroy', res.locals.review.review_id);
  res.sendStatus(204);
}

async function list(req, res) {
  // TODO: Write your code here
 // console.log('got here',  res.json({ data: await reviewsService.read(res.locals.review.review_id)}));
  res.json({ data: await reviewsService.read(res.locals.review.review_id)});
}


function hasMovieIdInPath(req, res, next) {
  if (req.params.movieId) {
    return next();
  }
  methodNotAllowed(req, res, next);
}

function noMovieIdInPath(req, res, next) {
  if (req.params.movieId) {
    return methodNotAllowed(req, res, next);
  }
  next();
}

async function update(req, res) {
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };

  const data = await reviewsService.update(updatedReview);
  res.json({ data });
}

module.exports = {
  destroy: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(destroy),
  ],
 // list: [hasMovieIdInPath, asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(list)],
  update: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(update),
  ],
};
