import { describe, it, expect } from '@jest/globals';

import { PullRequestReviewersParser } from './pull-request-reviewers-parser.js';

describe('PullRequestReviewersParser~parseReviewersAddedTime - method to get object of reviewer ids with their added date', () => {
  it('should return an empty object when pullRequestThreads is empty', () => {
    const result = PullRequestReviewersParser.parseReviewersAddedTime([]);

    expect(result).toEqual({});
  });

  it('should return an empty object when thread does not have properties or identities', () => {
    const result = PullRequestReviewersParser.parseReviewersAddedTime([{}]);

    expect(result).toEqual({});
  });

  it('should return an object with reviewer id and added date when thread has a reviewer added', () => {
    const threads = [
      {
        properties: { CodeReviewReviewersUpdatedAddedIdentity: { $value: '1' } },
        identities: { 1: { id: '1', displayName: 'Reviewer 1' } },
        publishedDate: '2022-01-01',
      },
      {
        properties: {
          CodeReviewVoteResult: {
            $type: 'System.String',
            $value: '10',
          },
        },
        comments: [{ author: { id: '1', displayName: 'Reviewer 1' } }],
        identities: { 1: { id: '1', displayName: 'Reviewer 1' } },
      },
    ];

    const result = PullRequestReviewersParser.parseReviewersAddedTime(threads);

    expect(result).toEqual({ 1: '2022-01-01' });
  });

  it('should return an object with reviewer id and latest added date before the reviewer voted for the PR (reviewer not added after voting)', () => {
    const threads = [
      {
        properties: { CodeReviewReviewersUpdatedAddedIdentity: { $value: '1' } },
        identities: { 1: { id: '1', displayName: 'Reviewer 1' } },
        publishedDate: '2022-01-01',
      },
      {
        properties: { CodeReviewReviewersUpdatedAddedIdentity: { $value: '1' } },
        identities: { 1: { id: '1', displayName: 'Reviewer 1' } },
        publishedDate: '2022-01-02',
      },
      {
        properties: {
          CodeReviewVoteResult: {
            $type: 'System.String',
            $value: '10',
          },
        },
        comments: [{ author: { id: '1', displayName: 'Reviewer 1' } }],
        identities: { 1: { id: '1', displayName: 'Reviewer 1' } },
      },
    ];

    const result = PullRequestReviewersParser.parseReviewersAddedTime(threads);

    expect(result).toEqual({ 1: '2022-01-02' });
  });

  it('should return an object with reviewer id and latest added date before the reviewer voted for the PR (reviewer added after voting)', () => {
    const threads = [
      {
        properties: { CodeReviewReviewersUpdatedAddedIdentity: { $value: '1' } },
        identities: { 1: { id: '1', displayName: 'Reviewer 1' } },
        publishedDate: '2022-01-01',
      },
      {
        properties: { CodeReviewReviewersUpdatedAddedIdentity: { $value: '1' } },
        identities: { 1: { id: '1', displayName: 'Reviewer 1' } },
        publishedDate: '2022-01-02',
      },
      {
        properties: {
          CodeReviewVoteResult: {
            $type: 'System.String',
            $value: '10',
          },
        },
        comments: [{ author: { id: '1', displayName: 'Reviewer 1' } }],
        identities: { 1: { id: '1', displayName: 'Reviewer 1' } },
      },
      {
        properties: { CodeReviewReviewersUpdatedAddedIdentity: { $value: '1' } },
        identities: { 1: { id: '1', displayName: 'Reviewer 1' } },
        publishedDate: '2022-01-03',
      },
    ];

    const result = PullRequestReviewersParser.parseReviewersAddedTime(threads);

    expect(result).toEqual({ 1: '2022-01-02' });
  });

  it('should return an object with reviewer ids and latest added dates when thread has multiple reviewers added', () => {
    const threads = [
      {
        properties: { CodeReviewReviewersUpdatedAddedIdentity: { $value: '1' } },
        identities: { 1: { id: '1', displayName: 'Reviewer 1' } },
        publishedDate: '2022-01-01',
      },
      {
        properties: { CodeReviewReviewersUpdatedAddedIdentity: { $value: '1' } },
        identities: { 1: { id: '1', displayName: 'Reviewer 1' } },
        publishedDate: '2022-01-02',
      },
      {
        properties: { CodeReviewReviewersUpdatedAddedIdentity: { $value: '1' } },
        identities: { 1: { id: '2', displayName: 'Reviewer 2' } },
        publishedDate: '2022-01-03',
      },
      {
        properties: {
          CodeReviewVoteResult: {
            $type: 'System.String',
            $value: '10',
          },
        },
        comments: [{ author: { id: '1', displayName: 'Reviewer 1' } }],
        identities: { 1: { id: '1', displayName: 'Reviewer 1' } },
      },
      {
        properties: { CodeReviewReviewersUpdatedAddedIdentity: { $value: '1' } },
        identities: { 1: { id: '1', displayName: 'Reviewer 1' } },
        publishedDate: '2022-01-04',
      },
    ];

    const result = PullRequestReviewersParser.parseReviewersAddedTime(threads);

    expect(result).toEqual({ 1: '2022-01-02', 2: '2022-01-03' });
  });

  it('should return an object with reviewer ids and added dates when thread has policy added reviewers', () => {
    const thread = {
      properties: { CodeReviewRequiredReviewerExampleReviewerIdentities: { $value: "['1','2']" } },
      identities: { 1: { id: '1', displayName: 'Reviewer 1' }, 2: { id: '2', displayName: 'Reviewer 2' } },
      publishedDate: '2022-01-01',
    };

    const result = PullRequestReviewersParser.parseReviewersAddedTime([thread]);

    expect(result).toEqual({ 1: '2022-01-01', 2: '2022-01-01' });
  });

  it('should return an object with reviewer ids and latest added dates when thread has policy added reviewers and a reviewer added again', () => {
    const threads = [
      {
        properties: { CodeReviewRequiredReviewerExampleReviewerIdentities: { $value: "['1','2']" } },
        identities: { 1: { id: '1', displayName: 'Reviewer 1' }, 2: { id: '2', displayName: 'Reviewer 2' } },
        publishedDate: '2022-01-01',
      },
      {
        properties: { CodeReviewReviewersUpdatedAddedIdentity: { $value: '1' } },
        identities: { 1: { id: '1', displayName: 'Reviewer 1' } },
        publishedDate: '2022-01-02',
      },
    ];

    const result = PullRequestReviewersParser.parseReviewersAddedTime(threads);

    expect(result).toEqual({ 1: '2022-01-02', 2: '2022-01-01' });
  });

  it('should return an object with reviewer ids and latest added dates before voted when thread has policy added reviewers and a reviewer added again after voted', () => {
    const threads = [
      {
        properties: { CodeReviewRequiredReviewerExampleReviewerIdentities: { $value: "['1','2']" } },
        identities: { 1: { id: '1', displayName: 'Reviewer 1' }, 2: { id: '2', displayName: 'Reviewer 2' } },
        publishedDate: '2022-01-01',
      },
      {
        properties: { CodeReviewReviewersUpdatedAddedIdentity: { $value: '1' } },
        identities: { 1: { id: '1', displayName: 'Reviewer 1' } },
        publishedDate: '2022-01-02',
      },
      {
        properties: {
          CodeReviewVoteResult: {
            $type: 'System.String',
            $value: '10',
          },
        },
        comments: [{ author: { id: '1', displayName: 'Reviewer 1' } }],
        identities: { 1: { id: '1', displayName: 'Reviewer 1' } },
      },
      {
        properties: { CodeReviewReviewersUpdatedAddedIdentity: { $value: '1' } },
        identities: { 1: { id: '1', displayName: 'Reviewer 1' } },
        publishedDate: '2022-01-03',
      },
    ];

    const result = PullRequestReviewersParser.parseReviewersAddedTime(threads);

    expect(result).toEqual({ 1: '2022-01-02', 2: '2022-01-01' });
  });

  it('should return an object with reviewer ids and latest added dates when thread has policy added reviewers and normal added reviewer', () => {
    const threads = [
      {
        properties: { CodeReviewRequiredReviewerExampleReviewerIdentities: { $value: "['1','2']" } },
        identities: { 1: { id: '1', displayName: 'Reviewer 1' }, 2: { id: '2', displayName: 'Reviewer 2' } },
        publishedDate: '2022-01-01',
      },
      {
        properties: { CodeReviewReviewersUpdatedAddedIdentity: { $value: '1' } },
        identities: { 1: { id: '1', displayName: 'Reviewer 1' } },
        publishedDate: '2022-01-02',
      },
      {
        properties: { CodeReviewReviewersUpdatedAddedIdentity: { $value: '1' } },
        identities: { 1: { id: '3', displayName: 'Reviewer 3' } },
        publishedDate: '2022-01-03',
      },
    ];

    const result = PullRequestReviewersParser.parseReviewersAddedTime(threads);

    expect(result).toEqual({ 1: '2022-01-02', 2: '2022-01-01', 3: '2022-01-03' });
  });

  it('should return an object with reviewer ids and latest added dates when thread has policy added reviewers and normal reviewer added multiple times', () => {
    const threads = [
      {
        properties: { CodeReviewRequiredReviewerExampleReviewerIdentities: { $value: "['1','2']" } },
        identities: { 1: { id: '1', displayName: 'Reviewer 1' }, 2: { id: '2', displayName: 'Reviewer 2' } },
        publishedDate: '2022-01-01',
      },
      {
        properties: { CodeReviewReviewersUpdatedAddedIdentity: { $value: '1' } },
        identities: { 1: { id: '1', displayName: 'Reviewer 1' } },
        publishedDate: '2022-01-02',
      },
      {
        properties: { CodeReviewReviewersUpdatedAddedIdentity: { $value: '1' } },
        identities: { 1: { id: '3', displayName: 'Reviewer 3' } },
        publishedDate: '2022-01-03',
      },
      {
        properties: { CodeReviewReviewersUpdatedAddedIdentity: { $value: '1' } },
        identities: { 1: { id: '3', displayName: 'Reviewer 3' } },
        publishedDate: '2022-01-04',
      },
      {
        properties: { CodeReviewReviewersUpdatedAddedIdentity: { $value: '1' } },
        identities: { 1: { id: '2', displayName: 'Reviewer 2' } },
        publishedDate: '2022-01-05',
      },
    ];

    const result = PullRequestReviewersParser.parseReviewersAddedTime(threads);

    expect(result).toEqual({ 1: '2022-01-02', 2: '2022-01-05', 3: '2022-01-04' });
  });

  it('should return an object with reviewer ids and latest added dates before voted when thread has policy added reviewers and normal reviewer added multiple times even after a policy added reviewer voted', () => {
    const threads = [
      {
        properties: { CodeReviewRequiredReviewerExampleReviewerIdentities: { $value: "['1','2']" } },
        identities: { 1: { id: '1', displayName: 'Reviewer 1' }, 2: { id: '2', displayName: 'Reviewer 2' } },
        publishedDate: '2022-01-01',
      },
      {
        properties: { CodeReviewReviewersUpdatedAddedIdentity: { $value: '1' } },
        identities: { 1: { id: '1', displayName: 'Reviewer 1' } },
        publishedDate: '2022-01-02',
      },
      {
        properties: { CodeReviewReviewersUpdatedAddedIdentity: { $value: '1' } },
        identities: { 1: { id: '3', displayName: 'Reviewer 3' } },
        publishedDate: '2022-01-03',
      },
      {
        properties: { CodeReviewReviewersUpdatedAddedIdentity: { $value: '1' } },
        identities: { 1: { id: '2', displayName: 'Reviewer 2' } },
        publishedDate: '2022-01-04',
      },
      {
        properties: {
          CodeReviewVoteResult: {
            $type: 'System.String',
            $value: '10',
          },
        },
        comments: [{ author: { id: '3', displayName: 'Reviewer 3' } }],
        identities: { 1: { id: '3', displayName: 'Reviewer 3' } },
      },
      {
        properties: { CodeReviewReviewersUpdatedAddedIdentity: { $value: '1' } },
        identities: { 1: { id: '3', displayName: 'Reviewer 3' } },
        publishedDate: '2022-01-05',
      },
    ];

    const result = PullRequestReviewersParser.parseReviewersAddedTime(threads);

    expect(result).toEqual({ 1: '2022-01-02', 2: '2022-01-04', 3: '2022-01-03' });
  });
});
