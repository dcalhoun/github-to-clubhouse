exports.parseRequest = (event, body) => {
  switch (true) {
    case event === 'create' && body.ref_type === 'branch':
      return 'branch';
    case event === 'pull_request' && body.action === 'opened':
      return 'pullRequestOpened';
    case event === 'pull_request' &&
      body.action === 'closed' &&
      body.pull_request &&
      body.pull_request.merged === true:
      return 'pullRequestMerged';
    default:
      return undefined;
  }
};
