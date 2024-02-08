const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");


router
    .route('/')
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed);
router 
    .route("/:movieId")
    .get(controller.read);
    

module.exports = router;
