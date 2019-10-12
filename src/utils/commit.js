const getCommitDetails = commit => {
  const id = commit.id().toString();
  const author = commit.author();
  const date = commit.date();
  const message = commit.message();

  return {
    id,
    author,
    date,
    message
  };
};

module.exports = {
  getCommitDetails
};
