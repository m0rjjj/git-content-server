const Git = require('nodegit');

const express = require('express');
const { logger } = require('./utils/logger');
const { getCommitDetails } = require('./utils/commit');
const { REPO_PATH, REMOTE_URL } = require('./config');

const runServer = async () => {
  let repository;
  try {
    repository = await Git.Repository.open(REPO_PATH);
  } catch (err) {
    console.log(err);
    try {
      repository = await Git.Clone(REMOTE_URL, REPO_PATH);
    } catch (err) {
      console.log(err);
    }
  }

  const app = express();
  const port = 3000;

  app.get('/', async (req, res) => {
    try {
      const commit = await repository.getHeadCommit();

      logger.info(getCommitDetails(commit));
      const entry = await commit.getEntry('index.html');
      const blob = await entry.getBlob();
      res.send(blob.toString());
      res.end();
    } catch (err) {
      console.log(err);
    }
  });

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
};

try {
  runServer();
} catch (e) {
  console.log(e);
}
