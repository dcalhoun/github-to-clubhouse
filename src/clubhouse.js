const fetch = require('node-fetch');

const API = 'https://api.clubhouse.io/api/v2/stories';

const updateStory = (id, body) =>
  fetch(`${API}/${id}`, { method: 'PUT', ...body });

exports.markStoryAwaitingCodeReview = id =>
  updateStory(id, { workflow_state_id: process.env.AWAITING_CODE_REVIEW });

exports.markStoryInQa = id =>
  updateStory(id, { workflow_state_id: process.env.IN_QA });

exports.markStoryStarted = id =>
  updateStory(id, { workflow_state_id: process.env.IN_DEV });
