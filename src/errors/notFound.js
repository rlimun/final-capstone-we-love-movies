function notFoundError(req, res, next) {
    return res.status(404).json({ error:  `Path not found: ${req.originalUrl}` });
  }
  
  module.exports = notFoundError;