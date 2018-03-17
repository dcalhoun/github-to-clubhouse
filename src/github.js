const ignoredUser = sender =>
  sender && !process.env.GITHUB_USERS.split(',').includes(sender.login);

const getIdFromString = name => {
  const match = RegExp(/\/ch(\d+)\//, 'g').exec(name);
  return match !== null ? match[1] : '';
};

exports.parseRequest = (event, body = {}) => {
  switch (true) {
    case ignoredUser(body.sender):
      return {};
    case event === 'create' && body.ref_type === 'branch':
      return {
        event: 'branch',
        id: getIdFromString(body.ref),
      };
    case event === 'pull_request' && body.action === 'opened':
      return {
        event: 'pullRequestOpened',
        id: getIdFromString(body.pull_request.head.ref),
      };
    case event === 'pull_request' &&
      body.action === 'closed' &&
      body.pull_request &&
      body.pull_request.merged === true:
      return {
        event: 'pullRequestMerged',
        id: getIdFromString(body.pull_request.head.ref),
      };
    default:
      return {};
  }
};
