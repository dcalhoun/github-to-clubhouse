const clubhouse = require('../clubhouse');

const { getIdFromBranch } = clubhouse;

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
