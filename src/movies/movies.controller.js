const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const id = Number(req.params.movieId);
  const foundMovie = await moviesService.read(id);
  if (!foundMovie) {
    return res.status(404).json({ error: `Movie with id ${id} not found` });
  }
  res.locals.movie = foundMovie;
  next();
}

async function create(req, res, next) {
  const data = await moviesService.create(req.body.data);
  res.status(201).json({ data });
}

async function read(req, res, next) {
  res.json({ data: res.locals.movie });
}

async function list(req, res, next) {
  const { is_showing } = req.query;
  res.json({ data: await moviesService.list(is_showing) });
}

async function listMovieTheatersById(req, res, next) {
  res.json({ data: await moviesService.listMovieTheatersById(req.params.movieId) });
}

async function listReviewsById(req, res, next) {
  res.json({ data: await moviesService.listReviewsById(req.params.movieId) });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
  create: [asyncErrorBoundary(create)],
  listMovieTheaters: asyncErrorBoundary(listMovieTheatersById),
  listReviews: asyncErrorBoundary(listReviewsById),
};
