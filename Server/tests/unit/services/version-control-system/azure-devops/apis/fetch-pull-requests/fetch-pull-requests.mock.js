export const SQUADS = [
  {
    squadName: 'SPMT',
    developers: {
      '9e1313a9-2b7c-6556-b441-d1eabfed5d43': 'Developer',
    },
  },
];

export const THREADS = {
  count: 2,
  value: [
    {
      publishedDate: '2024-02-15T11:02:32.32Z',
      comments: [
        {
          author: {
            displayName: 'Reviewer 1',
            id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
          },
          commentType: 'system',
        },
      ],
      properties: {
        CodeReviewVoteResult: {
          $type: 'System.String',
          $value: '-5',
        },
      },
      isDeleted: false,
    },
    {
      publishedDate: '2024-02-16T11:02:32.32Z',
      comments: [
        {
          author: {
            displayName: 'Reviewer 1',
            id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
          },
          commentType: 'system',
        },
      ],
      properties: {
        CodeReviewVoteResult: {
          $type: 'System.String',
          $value: '5',
        },
      },
      isDeleted: false,
    },
  ],
};

export const PULL_REQUESTS_WITH_THREADS = {
  errorCount: 0,
  filteredCount: 0,
  pullRequests: [
    {
      createdBy: {
        displayName: 'Developer',
        id: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
      },
      creationDate: '2024-02-04T10:58:33.4719437Z',
      pullRequestId: 1,
      reviewers: [
        {
          displayName: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
          vote: 10,
        },
      ],
      status: 'active',
      threads: [
        {
          comments: [
            {
              author: {
                displayName: 'Reviewer 1',
                id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
              },
              commentType: 'system',
            },
          ],
          isDeleted: false,
          properties: {
            CodeReviewVoteResult: {
              $type: 'System.String',
              $value: '-5',
            },
          },
          publishedDate: '2024-02-15T11:02:32.32Z',
        },
        {
          comments: [
            {
              author: {
                displayName: 'Reviewer 1',
                id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
              },
              commentType: 'system',
            },
          ],
          isDeleted: false,
          properties: {
            CodeReviewVoteResult: {
              $type: 'System.String',
              $value: '5',
            },
          },
          publishedDate: '2024-02-16T11:02:32.32Z',
        },
      ],
      title: 'Only the reviewers team is required to vote & a member voted for approved.',
    },
    {
      createdBy: {
        displayName: 'Developer',
        id: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
      },
      creationDate: '2024-02-04T10:58:33.4719437Z',
      pullRequestId: 2,
      reviewers: [
        {
          displayName: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
          vote: 10,
        },
      ],
      status: 'active',
      threads: [
        {
          comments: [
            {
              author: {
                displayName: 'Reviewer 1',
                id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
              },
              commentType: 'system',
            },
          ],
          isDeleted: false,
          properties: {
            CodeReviewVoteResult: {
              $type: 'System.String',
              $value: '-5',
            },
          },
          publishedDate: '2024-02-15T11:02:32.32Z',
        },
        {
          comments: [
            {
              author: {
                displayName: 'Reviewer 1',
                id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
              },
              commentType: 'system',
            },
          ],
          isDeleted: false,
          properties: {
            CodeReviewVoteResult: {
              $type: 'System.String',
              $value: '5',
            },
          },
          publishedDate: '2024-02-16T11:02:32.32Z',
        },
      ],
      title: 'Only the reviewers team is required to vote & a member voted for approved.',
    },
    {
      createdBy: {
        displayName: 'Developer',
        id: '9e1313a9-2b7c-6556-b331-e1eabfed5d43',
      },
      creationDate: '2024-02-04T10:58:33.4719437Z',
      pullRequestId: 3,
      reviewers: [
        {
          displayName: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
          vote: 10,
        },
      ],
      status: 'active',
      threads: [
        {
          comments: [
            {
              author: {
                displayName: 'Reviewer 1',
                id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
              },
              commentType: 'system',
            },
          ],
          isDeleted: false,
          properties: {
            CodeReviewVoteResult: {
              $type: 'System.String',
              $value: '-5',
            },
          },
          publishedDate: '2024-02-15T11:02:32.32Z',
        },
        {
          comments: [
            {
              author: {
                displayName: 'Reviewer 1',
                id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
              },
              commentType: 'system',
            },
          ],
          isDeleted: false,
          properties: {
            CodeReviewVoteResult: {
              $type: 'System.String',
              $value: '5',
            },
          },
          publishedDate: '2024-02-16T11:02:32.32Z',
        },
      ],
      title: 'Only the reviewers team is required to vote & a member voted for approved.',
    },
  ],
};

export const PULL_REQUESTS_WITH_THREADS_ERROR = {
  errorCount: 1,
  filteredCount: 0,
  pullRequests: [
    {
      createdBy: {
        displayName: 'Developer',
        id: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
      },
      creationDate: '2024-02-04T10:58:33.4719437Z',
      pullRequestId: 2,
      reviewers: [
        {
          displayName: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
          vote: 10,
        },
      ],
      status: 'active',
      threads: [
        {
          comments: [
            {
              author: {
                displayName: 'Reviewer 1',
                id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
              },
              commentType: 'system',
            },
          ],
          isDeleted: false,
          properties: {
            CodeReviewVoteResult: {
              $type: 'System.String',
              $value: '-5',
            },
          },
          publishedDate: '2024-02-15T11:02:32.32Z',
        },
        {
          comments: [
            {
              author: {
                displayName: 'Reviewer 1',
                id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
              },
              commentType: 'system',
            },
          ],
          isDeleted: false,
          properties: {
            CodeReviewVoteResult: {
              $type: 'System.String',
              $value: '5',
            },
          },
          publishedDate: '2024-02-16T11:02:32.32Z',
        },
      ],
      title: 'Only the reviewers team is required to vote & a member voted for approved.',
    },
    {
      createdBy: {
        displayName: 'Developer',
        id: '9e1313a9-2b7c-6556-b331-e1eabfed5d43',
      },
      creationDate: '2024-02-04T10:58:33.4719437Z',
      pullRequestId: 3,
      reviewers: [
        {
          displayName: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
          vote: 10,
        },
      ],
      status: 'active',
      threads: [
        {
          comments: [
            {
              author: {
                displayName: 'Reviewer 1',
                id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
              },
              commentType: 'system',
            },
          ],
          isDeleted: false,
          properties: {
            CodeReviewVoteResult: {
              $type: 'System.String',
              $value: '-5',
            },
          },
          publishedDate: '2024-02-15T11:02:32.32Z',
        },
        {
          comments: [
            {
              author: {
                displayName: 'Reviewer 1',
                id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
              },
              commentType: 'system',
            },
          ],
          isDeleted: false,
          properties: {
            CodeReviewVoteResult: {
              $type: 'System.String',
              $value: '5',
            },
          },
          publishedDate: '2024-02-16T11:02:32.32Z',
        },
      ],
      title: 'Only the reviewers team is required to vote & a member voted for approved.',
    },
  ],
};

export const PULL_REQUESTS_WITH_THREADS_ERROR_FILTERED = {
  errorCount: 1,
  filteredCount: 1,
  pullRequests: [
    {
      createdBy: {
        displayName: 'Developer',
        id: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
      },
      creationDate: '2024-02-04T10:58:33.4719437Z',
      pullRequestId: 2,
      reviewers: [
        {
          displayName: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
          vote: 10,
        },
      ],
      status: 'active',
      threads: [
        {
          comments: [
            {
              author: {
                displayName: 'Reviewer 1',
                id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
              },
              commentType: 'system',
            },
          ],
          isDeleted: false,
          properties: {
            CodeReviewVoteResult: {
              $type: 'System.String',
              $value: '-5',
            },
          },
          publishedDate: '2024-02-15T11:02:32.32Z',
        },
        {
          comments: [
            {
              author: {
                displayName: 'Reviewer 1',
                id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
              },
              commentType: 'system',
            },
          ],
          isDeleted: false,
          properties: {
            CodeReviewVoteResult: {
              $type: 'System.String',
              $value: '5',
            },
          },
          publishedDate: '2024-02-16T11:02:32.32Z',
        },
      ],
      title: 'Only the reviewers team is required to vote & a member voted for approved.',
    },
  ],
};

export const PULL_REQUESTS_WITH_THREADS_FILTERED = {
  errorCount: 0,
  filteredCount: 1,
  pullRequests: [
    {
      createdBy: {
        displayName: 'Developer',
        id: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
      },
      creationDate: '2024-02-04T10:58:33.4719437Z',
      pullRequestId: 1,
      reviewers: [
        {
          displayName: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
          vote: 10,
        },
      ],
      status: 'active',
      threads: [
        {
          comments: [
            {
              author: {
                displayName: 'Reviewer 1',
                id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
              },
              commentType: 'system',
            },
          ],
          isDeleted: false,
          properties: {
            CodeReviewVoteResult: {
              $type: 'System.String',
              $value: '-5',
            },
          },
          publishedDate: '2024-02-15T11:02:32.32Z',
        },
        {
          comments: [
            {
              author: {
                displayName: 'Reviewer 1',
                id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
              },
              commentType: 'system',
            },
          ],
          isDeleted: false,
          properties: {
            CodeReviewVoteResult: {
              $type: 'System.String',
              $value: '5',
            },
          },
          publishedDate: '2024-02-16T11:02:32.32Z',
        },
      ],
      title: 'Only the reviewers team is required to vote & a member voted for approved.',
    },
    {
      createdBy: {
        displayName: 'Developer',
        id: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
      },
      creationDate: '2024-02-04T10:58:33.4719437Z',
      pullRequestId: 2,
      reviewers: [
        {
          displayName: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
          vote: 10,
        },
      ],
      status: 'active',
      threads: [
        {
          comments: [
            {
              author: {
                displayName: 'Reviewer 1',
                id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
              },
              commentType: 'system',
            },
          ],
          isDeleted: false,
          properties: {
            CodeReviewVoteResult: {
              $type: 'System.String',
              $value: '-5',
            },
          },
          publishedDate: '2024-02-15T11:02:32.32Z',
        },
        {
          comments: [
            {
              author: {
                displayName: 'Reviewer 1',
                id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
              },
              commentType: 'system',
            },
          ],
          isDeleted: false,
          properties: {
            CodeReviewVoteResult: {
              $type: 'System.String',
              $value: '5',
            },
          },
          publishedDate: '2024-02-16T11:02:32.32Z',
        },
      ],
      title: 'Only the reviewers team is required to vote & a member voted for approved.',
    },
  ],
};
