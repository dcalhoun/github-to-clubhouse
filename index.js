require('dotenv').config();
const { json } = require('micro');
const { parseRequest } = require('./src/github');
const {
  markStoryAwaitingCodeReview,
  markStoryInQa,
  markStoryStarted,
} = require('../clubhouse');

module.exports = async (req, res) => {
  const body = await json(req);
  const { event, id } = parseRequest(req.headers['x-github-event'], body);

  switch (event) {
    case 'branch':
      markStoryStarted(id);
      break;
    case 'pullRequestReviewRequested':
      markStoryAwaitingCodeReview(id);
      break;
    case 'pullRequestMerged':
      markStoryInQa(id);
      break;
    default:
  }
};
