# We Love Movies

This project is an API for managing movie reviews. It allows users to perform CRUD (Create, Read, Update, Delete) operations on movies and related entities such as: movie reviews, theaters, and critics. The API is built using Node.js with Express.js framework and interacts with a PostgreSQL database using Knex.js as the query builder.

## Setup
1. Clone repository to your local machine
2. Run `npm install`
3. Set up the PostgreSQL database and configure the connection in knexfile.js.
4. Run the migrations: `npx knex migrate:latest` to create the database schema
5. Run `npm start` to start the server
6. Run `npm test` to run the tests for this project

## Environment Variables
* DATABASE_URL: The URL of the PostgreSQL database.

### Endpoints
Movies
* GET /movies: List all movies.
* GET /movies/:movieId: Get details of a specific movie.
* GET /movies/:movieId/reviews: Get list of reviews for a specific movie.
* GET /movies/:movieId/theaters: Get list of theaters for a specific movie that is currently showing.
* POST /movies: Create a new movie.

Reviews
* GET /reviews: List all reviews.
* GET /reviews/:reviewId: Get details of a specific review.
* PUT /reviews/:reviewId: Update an existing review.
* DELETE /reviews/:reviewId: Delete a review.

Theaters
* GET /theaters: List all theaters.

