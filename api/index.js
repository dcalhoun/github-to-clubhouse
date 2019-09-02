require('dotenv').config();
const crypto = require('crypto');
const { json } = require('micro');
const { parseRequest } = require('../src/github');
const {
  markStoryAwaitingCodeReview,
  markStoryInQa,
  markStoryStarted,
} = require('../src/clubhouse');

const sign = data =>
  'sha1=' +
  crypto
    .createHmac('sha1', process.env.GITHUB_SECRET)
    .update(data)
    .digest('hex');

const verify = (signature, data) =>
  crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(sign(data)));

module.exports = async (req, res) => {
  const body = await json(req);
  const sig = req.headers['x-hub-signature'];

  if (!verify(sig, JSON.stringify(body))) {
    const err = new Error('Unauthorized');
    err.statusCode = 401;
    throw err;
  }

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

  return { message: 'Okay' };
};
