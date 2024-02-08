const knex = require("../db/connection");

async function list(is_showing) {
  return knex("movies")
    .select("movies.*")
    .modify((queryBuilder) => {
      if (is_showing) {
        queryBuilder
          .join(
            "movies_theaters",
            "movies.movie_id",
            "movies_theaters.movie_id"
          )
          .where({ "movies_theaters.is_showing": true })
          .groupBy("movies.movie_id");
      }
    });
}

function create(movie) {
  return knex("movies")
    .insert(movie)
    .returning("*")
    .then((createdMovies) => createdMovies[0]);
}

async function read(movieId) {
  // TODO: Add your code here
  return knex("movies")
    .select("*")
    .where({ movie_id: movieId}).first();
}

module.exports = {
  list,
  read,
  create,
};
