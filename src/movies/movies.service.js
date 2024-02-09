const knex = require("../db/connection");

function mapCriticProperties(critic) {
  return {
    critic_id: critic.critic_id,
    preferred_name: critic.preferred_name,
    surname: critic.surname,
    organization_name: critic.organization_name,
  };
}

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

async function listMoviesById(movieId) {
  return knex("theaters")
    .select(
      "movies.movie_id",
      "theaters.name",
      "theaters.theater_id",
      "theaters.address_line_1",
      "theaters.address_line_2",
      "theaters.city",
      "theaters.state",
      "theaters.zip",
      "movies_theaters.is_showing"
    )
    .join("movies", "movies.movie_id", "movies_theaters.movie_id")
    .join(
      "movies_theaters",
      "theaters.theater_id",
      "movies_theaters.theater_id"
    )
    .where({ "movies_theaters.is_showing": true })
    .where({ "movies.movie_id": movieId });
}

async function listReviewsById(movieId) {
  const criticProperties = mapCriticProperties("critics");

  return knex("movies")
    .select(
      "reviews.movie_id",
      "reviews.review_id",
      "reviews.content",
      "reviews.score",
      "critics.critic_id",
      "critics.preferred_name",
      "critics.surname",
      "critics.organization_name"
    )
    .join("critics", "reviews.critic_id", "critics.critic_id")
    .join("reviews", "reviews.movie_id", "movies.movie_id")
    .where({ "movies.movie_id": movieId })
    .then((data) => {
      return data.map((item) => {
        return {
          ...item,
          critic: mapCriticProperties(item),
        };
      });
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
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

module.exports = {
  list,
  listMoviesById,
  listReviewsById,
  read,
  create,
};
