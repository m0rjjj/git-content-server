const Git = require('nodegit');
const { REPO_PATH, REMOTE_URL } = require('./src/config');
const { logger } = require('./src/utils/logger');

async function setup() {
  try {
    logger.info('Opening repo');
    await Git.Repository.open(REPO_PATH);
    logger.info('Repo is ready to use');
  } catch (err) {
    logger.error(err, 'Opening failed');
    try {
      logger.info('Cloning repo');
      await Git.Clone(REMOTE_URL, REPO_PATH);
      logger.info('Repo is ready to use');
    } catch (err) {
      logger.error(err, 'Cloning Failed');
    }
  }
}

setup();
