const knex = require("../db/connection");

const tableName = "reviews";

async function destroy(reviewId) {
  // TODO: Write your code here
  return knex("reviews").where({ review_id: reviewId }).del();
}

async function list(review_id) {
  // TODO: Write your code here
  return knex("reviews")
    .select("*")
    .where({ review_id: reviewId }).first();
}

async function read(reviewId) {
  return knex("reviews")
    .select("*")
    .where({ review_id: reviewId}).first();
}

async function readCritic(critic_id) {
  return knex("critics").where({ critic_id }).first();
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

async function update(review) {
  return knex(tableName)
    .where({ review_id: review.review_id })
    .update({
      score: review.score,
      content: review.content
    })
    .then(() => read(review.review_id))
    .then(setCritic);
}

module.exports = {
  destroy,
  list,
  read,
  update,
};
