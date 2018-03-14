const clubhouse = require('../clubhouse');
const fetch = require('node-fetch');

const {
  getIdFromBranch,
  markStoryAwaitingCodeReview,
  markStoryInQa,
  markStoryStarted,
} = clubhouse;

jest.mock('node-fetch');

describe('getIdFromBranch', () => {
  it('returns the id', () => {
    expect(getIdFromBranch('feature/ch123/add-foo-bar')).toBe('123');
  });

  describe('when no match', () => {
    it('returns an empty string', () => {
      expect(getIdFromBranch('feature/123/add-foo-bar')).toBe('');
    });
  });
});

describe('markStoryAwaitingCodeReview', () => {
  it('sets the AWAITING_CODE_REVIEW workflow state ID', () => {
    markStoryAwaitingCodeReview('123');
    expect(fetch).toHaveBeenCalledWith(
      'https://api.clubhouse.io/api/v2/stories/123',
      {
        method: 'PUT',
        workflow_state_id: 500000030,
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
        workflow_state_id: 500000016,
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
        workflow_state_id: 500000007,
      }
    );
  });
});
