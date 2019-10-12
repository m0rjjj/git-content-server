const { logger } = require('../utils/logger');

module.exports = function(err, _req, res, next) {
  logger.error(err.message);
  res.status(err.status || 500);
  res.json(err);
  res.end();
};
