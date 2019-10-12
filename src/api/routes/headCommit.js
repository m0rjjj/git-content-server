const { getCommitDetails } = require('../../utils/commit');

module.exports = ({ logger, repository }) => async (req, res) => {
  const commit = await repository.getHeadCommit();
  logger.info(getCommitDetails(commit));

  const entry = await commit.getEntry('index.html');
  const blob = await entry.getBlob();

  res.send(blob.toString());
  res.end();
};
