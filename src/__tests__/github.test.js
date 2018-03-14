const { parseRequest } = require('../github');

describe('parseRequest', () => {
  it('returns undefined', () => {
    expect(parseRequest()).toBe(undefined);
  });

  describe('when "create" event and branch ref_type', () => {
    it('returns "branch"', () => {
      expect(parseRequest('create', { ref_type: 'branch' })).toBe('branch');
    });
  });

  describe('when "pull_request" event and action "opened"', () => {
    it('returns "pullRequestOpened"', () => {
      expect(parseRequest('pull_request', { action: 'opened' })).toBe(
        'pullRequestOpened'
      );
    });
  });

  describe('when "pull_request" event and action "closed"', () => {
    describe('when "merged" is false', () => {
      it('returns undefined', () => {
        expect(parseRequest('pull_request', { action: 'closed' })).toBe(
          undefined
        );
      });
    });

    describe('when "merged" is true', () => {
      it('returns "pullRequestMerged"', () => {
        expect(
          parseRequest('pull_request', {
            action: 'closed',
            pull_request: { merged: true },
          })
        ).toBe('pullRequestMerged');
      });
    });
  });
});
