export const VOTE = Object.freeze({
  APPROVED: 'approved',
  APPROVED_WITH_SUGGESTIONS: 'approvedWithSuggestions',
  NO_VOTE: 'noVote',
  WAIT_FOR_AUTHOR: 'waitForAuthor',
  REJECTED: 'rejected',
});

export const CODE_TO_VOTE = new Map([
  [10, VOTE.APPROVED],
  [5, VOTE.APPROVED_WITH_SUGGESTIONS],
  [0, VOTE.NO_VOTE],
  [-5, VOTE.WAIT_FOR_AUTHOR],
  [-10, VOTE.REJECTED],
]);

Object.freeze(CODE_TO_VOTE);
