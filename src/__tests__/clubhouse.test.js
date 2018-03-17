const {
  markStoryAwaitingCodeReview,
  markStoryInQa,
  markStoryStarted,
} = require('../clubhouse');
const fetch = require('node-fetch');

jest.mock('node-fetch');

const defaultOptions = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
  method: 'PUT',
};

describe('markStoryAwaitingCodeReview', () => {
  it('sets the AWAITING_CODE_REVIEW workflow state ID', () => {
    markStoryAwaitingCodeReview('123');
    expect(fetch).toHaveBeenCalledWith(
      'https://api.clubhouse.io/api/v2/stories/123?token=clubhouse-api-token',
      {
        ...defaultOptions,
        body: JSON.stringify({ workflow_state_id: 'awaiting-code-review-id' }),
      }
    );
  });
});

describe('markStoryInQa', () => {
  it('sets the IN_QA workflow state ID', () => {
    markStoryInQa('123');
    expect(fetch).toHaveBeenCalledWith(
      'https://api.clubhouse.io/api/v2/stories/123?token=clubhouse-api-token',
      {
        ...defaultOptions,
        body: JSON.stringify({ workflow_state_id: 'in-qa-id' }),
      }
    );
  });
});

describe('markStoryStarted', () => {
  it('sets the IN_DEV workflow state ID', () => {
    markStoryStarted('123');
    expect(fetch).toHaveBeenCalledWith(
      'https://api.clubhouse.io/api/v2/stories/123?token=clubhouse-api-token',
      {
        ...defaultOptions,
        body: JSON.stringify({ workflow_state_id: 'in-dev-id' }),
      }
    );
  });
});
