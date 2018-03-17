const { parseRequest } = require('../github');

const ignoredUser = { sender: { login: 'bob' } };
const acknowledgedUser = { sender: { login: 'john' } };

describe('parseRequest', () => {
  it('returns undefined', () => {
    expect(parseRequest()).toBe(undefined);
  });

  describe('when "create" event and branch ref_type', () => {
    it('returns undefined', () => {
      expect(
        parseRequest('create', { ref_type: 'branch', ...ignoredUser })
      ).toBe(undefined);
    });

    describe('when acknowledged user', () => {
      it('returns "branch"', () => {
        expect(
          parseRequest('create', {
            ref_type: 'branch',
            ref: 'feature/ch123/foo-bar',
            ...acknowledgedUser,
          })
        ).toEqual({ event: 'branch', id: '123' });
      });
    });
  });

  describe('when "pull_request" event and action "opened"', () => {
    it('returns "pullRequestOpened"', () => {
      expect(
        parseRequest('pull_request', { action: 'opened', ...ignoredUser })
      ).toBe(undefined);
    });

    describe('when acknowledged user', () => {
      it('returns "pullRequestOpened"', () => {
        expect(
          parseRequest('pull_request', {
            action: 'opened',
            pull_request: { head: { ref: 'feature/ch123/foo-bar' } },
            ...acknowledgedUser,
          })
        ).toEqual({ event: 'pullRequestOpened', id: '123' });
      });
    });
  });

  describe('when "pull_request" event and action "closed"', () => {
    describe('when "merged" is false', () => {
      it('returns undefined', () => {
        expect(
          parseRequest('pull_request', {
            action: 'closed',
            ...ignoredUser,
          })
        ).toBe(undefined);
      });
    });

    describe('when "merged" is true', () => {
      it('returns undefined', () => {
        expect(
          parseRequest('pull_request', {
            action: 'closed',
            pull_request: { merged: true },
            ...ignoredUser,
          })
        ).toBe(undefined);
      });

      describe('when acknowledged user', () => {
        it('returns "pullRequestMerged"', () => {
          expect(
            parseRequest('pull_request', {
              action: 'closed',
              pull_request: {
                merged: true,
                head: { ref: 'feature/ch123/foo-bar' },
              },
              ...acknowledgedUser,
            })
          ).toEqual({ event: 'pullRequestMerged', id: '123' });
        });
      });
    });
  });
});
