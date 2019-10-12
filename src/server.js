const Git = require('nodegit');

const express = require('express');
const { logger } = require('./utils/logger');
const { REPO_PATH, PORT } = require('./config');
const Routes = require('./api/routes');
const errorMiddleware = require('./middleware/errorMiddleware');

const runServer = async () => {
  const repository = await Git.Repository.open(REPO_PATH);
  const app = express();
  app.use('/', Routes({ repository, logger }));
  app.use(errorMiddleware);
  app.listen(PORT, () => logger.info(`Listening on port ${PORT}!`));
};

try {
  runServer();
} catch (e) {
  logger.error(e);
  process.exit(1);
}
