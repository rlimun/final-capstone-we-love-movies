const theaterService = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  res.json({ data: await theaterService.list() });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
