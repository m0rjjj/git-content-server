const { getCommitDetails } = require('../../utils/commit');

module.exports = ({ logger, repository }) => async (req, res) => {
  const branchName = req.params.branchName;
  const fileName = req.query.fileName;
  if (!fileName) {
    throw { status: '404', message: 'Invalid File Name' };
  }
  logger.info('Branch name: ', branchName);

  const commit = await repository.getHeadCommit();
  logger.info(getCommitDetails(commit));

  const entry = await commit.getEntry(fileName);
  const blob = await entry.getBlob();

  res.send(blob.toString());
  res.end();
};
