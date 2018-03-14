const acknowledgedUser = sender => sender && sender.login === 'dcalhoun';

exports.parseRequest = (event, body = {}) => {
  switch (true) {
    case acknowledgedUser(body.sender) &&
      event === 'create' &&
      body.ref_type === 'branch':
      return 'branch';
    case acknowledgedUser(body.sender) &&
      event === 'pull_request' &&
      body.action === 'opened':
      return 'pullRequestOpened';
    case acknowledgedUser(body.sender) &&
      event === 'pull_request' &&
      body.action === 'closed' &&
      body.pull_request &&
      body.pull_request.merged === true:
      return 'pullRequestMerged';
    default:
      return undefined;
  }
};
