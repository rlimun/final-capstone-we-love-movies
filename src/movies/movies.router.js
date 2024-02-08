const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");

// TODO: Add your routes here
router
    .route('/')
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed);

module.exports = router;
