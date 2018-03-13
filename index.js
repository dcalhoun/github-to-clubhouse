const clubhouse = require('./src/clubhouse');
const { json } = require('micro');

module.exports = async (req, res) => {
  const body = await json(req);
  const type = req.headers['x-github-event'];
  if (body.sender && body.sender.login === 'dcalhoun') {
    if (type === 'create' && body.ref_type === 'branch') {
      return `>>>>> ${clubhouse.getIdFromBranch(body.ref)}`;
    }
  }
};
