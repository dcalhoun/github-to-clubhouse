const { json } = require('micro');
const { parseRequest } = require('./src/github');

module.exports = async (req, res) => {
  const body = await json(req);
  const event = parseRequest(req.headers['x-github-event'], body);
  return `>>>>> ${event}`;
};
