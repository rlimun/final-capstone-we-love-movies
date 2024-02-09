const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");


router
    .route("/:movieId/theaters")
    .get(controller.listMovies);
router
    .route("/:movieId/reviews")
    .get(controller.listReviews);
router 
    .route("/:movieId")
    .get(controller.read);
router
    .route('/')
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed);





module.exports = router;
