const acknowledgedUser = sender => sender && sender.login === 'dcalhoun';

// TODO: Update parseRequest to return event and id
// const id = getIdFromBranch(body.pull_request.head.ref);
exports.parseRequest = (event, body = {}) => {
  switch (true) {
    case acknowledgedUser(body.sender) &&
      event === 'create' &&
      body.ref_type === 'branch':
      return 'branch';
    // TODO: Rename to focus on review requested
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
