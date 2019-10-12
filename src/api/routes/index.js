const express = require('express');
const router = express.Router();
const HeadCommit = require('./headCommit');
const Subfolder = require('./subfolder');
function catchAsyncErrors(fn) {
  return (req, res, next) => {
    const routePromise = fn(req, res, next);
    if (routePromise.catch) {
      routePromise.catch(err => next(err));
    }
  };
}

const Routes = ({ repository, logger }) => {
  const headCommit = HeadCommit({ repository, logger });
  const subfolder = Subfolder({ repository, logger });

  router.get('/', catchAsyncErrors(headCommit));
  router.get('/:branchName', catchAsyncErrors(subfolder));

  return router;
};

module.exports = Routes;
