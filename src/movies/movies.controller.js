const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(request, response, next) {
  // TODO: Add your code here.
  const id = req.params.movieId;
    const foundMovie = moviesService.read(id);
    if (!foundMovie) {
        return res.status(404).json({ error: `Movie with id ${id} not found` });
    }
    res.locals.movie = foundMovie;
    next();
}

async function create(request, response, next){
  const data = await moviesService.create(req.body.data);
  res.status(201).json({ data });
}

async function read(request, response) {
  // TODO: Add your code here
  response.json({ data: res.locals.movie });
}

async function list(request, response) {
  // TODO: Add your code here.
  const data = await moviesService.list();
  res.json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
  create: [create],
};
