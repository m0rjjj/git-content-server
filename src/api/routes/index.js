const express = require('express');
const router = express.Router();
const HeadCommit = require('./headCommit');

const Routes = ({ repository, logger }) => {
  const headCommit = HeadCommit({ repository, logger });
  router.get('/', headCommit);

  return router;
};

module.exports = Routes;
