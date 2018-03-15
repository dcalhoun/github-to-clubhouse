const fetch = require('node-fetch');

const API = 'https://api.clubhouse.io/api/v2/stories';

const IN_DEV = 500000007;
const AWAITING_CODE_REVIEW = 500000030;
const IN_QA = 500000016;

const updateStory = (id, body) =>
  fetch(`${API}/${id}`, { method: 'PUT', ...body });

exports.markStoryAwaitingCodeReview = id =>
  updateStory(id, { workflow_state_id: AWAITING_CODE_REVIEW });

exports.markStoryInQa = id => updateStory(id, { workflow_state_id: IN_QA });

exports.markStoryStarted = id => updateStory(id, { workflow_state_id: IN_DEV });
