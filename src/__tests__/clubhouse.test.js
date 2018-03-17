const {
  markStoryAwaitingCodeReview,
  markStoryInQa,
  markStoryStarted,
} = require('../clubhouse');
const fetch = require('node-fetch');

jest.mock('node-fetch');

describe('markStoryAwaitingCodeReview', () => {
  it('sets the AWAITING_CODE_REVIEW workflow state ID', () => {
    markStoryAwaitingCodeReview('123');
    expect(fetch).toHaveBeenCalledWith(
      'https://api.clubhouse.io/api/v2/stories/123',
      {
        method: 'PUT',
        workflow_state_id: 'awaiting-code-review-id',
      }
    );
  });
});

describe('markStoryInQa', () => {
  it('sets the IN_QA workflow state ID', () => {
    markStoryInQa('123');
    expect(fetch).toHaveBeenCalledWith(
      'https://api.clubhouse.io/api/v2/stories/123',
      {
        method: 'PUT',
        workflow_state_id: 'in-qa-id',
      }
    );
  });
});

describe('markStoryStarted', () => {
  it('sets the IN_DEV workflow state ID', () => {
    markStoryStarted('123');
    expect(fetch).toHaveBeenCalledWith(
      'https://api.clubhouse.io/api/v2/stories/123',
      {
        method: 'PUT',
        workflow_state_id: 'in-dev-id',
      }
    );
  });
});
