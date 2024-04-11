import { ServerConfiguration } from '##/configs/server.config.js';

const {
  organization: ORGANIZATION,
  projectName: PROJECT,
  repositoryId: REPOSITORY_ID,
} = ServerConfiguration.versionControl;

export const RAW_CODE_REVIEW_METRICS = [
  {
    pullRequestId: 2626,
    status: 'completed',
    createdBy: {
      displayName: 'Developer',
      id: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
    },
    creationDate: '2024-02-04T10:58:33.4719437Z',
    closedDate: '2024-02-12T11:04:06.3046376Z',
    title: 'Filtered azure completed pull request data with threads data (handled comments, labels)',
    reviewers: [
      {
        vote: 10,
        isRequired: true,
        displayName: 'Reviewer 1',
        id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
      },
      {
        vote: 0,
        displayName: 'Reviewer 2',
        id: '2655af18-ea47-64fa-a782-3c3ccb174079',
      },
      {
        vote: 0,
        displayName: 'Reviewer 3',
        id: '561b83f4-afcd-6b4a-a398-4a4f5a88d431',
      },
    ],
    labels: [
      {
        id: 'f886f8f7-5d76-4498-9aa0-944f0f1b9557',
        name: 'Documentation',
        active: true,
      },
    ],
    threads: [
      {
        publishedDate: '2024-02-12T11:02:32.32Z',
        comments: [
          {
            author: {
              displayName: 'Reviewer 1',
              id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
            },
            content: 'Reviewer 1 voted 10',
            commentType: 'system',
          },
        ],
        properties: {
          CodeReviewVoteResult: {
            $type: 'System.String',
            $value: '10',
          },
        },
        isDeleted: false,
      },
      {
        pullRequestThreadContext: {
          iterationContext: {
            firstComparingIteration: 18,
            secondComparingIteration: 18,
          },
          changeTrackingId: 19,
        },
        publishedDate: '2024-02-12T04:59:12.86Z',
        comments: [
          {
            author: {
              displayName: 'Reviewer 1',
              id: '3c66f2d9-f079-65fd-af3d-0650c193e580',
            },
            content: "NitLet's use the server-config.js here",
            publishedDate: '2024-02-12T04:59:12.86Z',
            commentType: 'text',
          },
          {
            author: {
              displayName: 'Developer',
              id: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
            },
            publishedDate: '2024-02-12T06:45:02.17Z',
            isDeleted: true,
            commentType: 'text',
          },
          {
            author: {
              displayName: 'Reviewer 1',
              id: '3c66f2d9-f079-65fd-af3d-0650c193e580',
            },
            content: "MaJoR: Let's use the server-config.js here",
            publishedDate: '2024-02-12T04:59:12.86Z',
            commentType: 'text',
          },
        ],
        isDeleted: false,
      },
      {
        pullRequestThreadContext: null,
        publishedDate: '2024-02-12T11:04:06.47Z',
        comments: [
          {
            author: {
              displayName: 'Developer',
              id: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
            },
            content: 'Developer updated the pull request status to Completed',
            publishedDate: '2024-02-12T11:04:06.47Z',
          },
        ],
        isDeleted: false,
      },
    ],
  },
];

export const CODE_REVIEW_METRICS = {
  count: 1,
  pullRequests: [
    {
      authorId: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
      closedDate: '2024-02-12T11:04:06.3046376Z',
      createdBy: 'Developer',
      creationDate: '2024-02-04T10:58:33.4719437Z',
      id: 2626,
      mergeTimeInSeconds: 691533,
      threads: [
        {
          comments: [
            {
              authorId: '3c66f2d9-f079-65fd-af3d-0650c193e580',
              authorName: 'Reviewer 1',
              content: "NitLet's use the server-config.js here",
            },
            {
              authorId: '3c66f2d9-f079-65fd-af3d-0650c193e580',
              authorName: 'Reviewer 1',
              content: "MaJoR: Let's use the server-config.js here",
            },
          ],
        },
      ],
      status: 'completed',
      tags: ['Documentation'],
      title: '2626 - Filtered azure completed pull request data with threads data (handled comments, labels)',
      url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2626`,
      votesHistoryTimeline: [
        {
          author: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
          timeOfVote: '2024-02-12T11:02:32.32Z',
          isRequired: true,
          vote: 'approved',
          reviewerAddedTime: '2024-02-04T10:58:33.4719437Z',
        },
      ],
      votesTimeline: [
        {
          author: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
          timeOfVote: '2024-02-12T11:02:32.32Z',
          isRequired: true,
          vote: 'approved',
          reviewerAddedTime: '2024-02-04T10:58:33.4719437Z',
        },
        {
          author: 'Reviewer 2',
          id: '2655af18-ea47-64fa-a782-3c3ccb174079',
          timeOfVote: null,
          isRequired: false,
          vote: 'noVote',
          reviewerAddedTime: '2024-02-04T10:58:33.4719437Z',
        },
        {
          author: 'Reviewer 3',
          id: '561b83f4-afcd-6b4a-a398-4a4f5a88d431',
          timeOfVote: null,
          isRequired: false,
          vote: 'noVote',
          reviewerAddedTime: '2024-02-04T10:58:33.4719437Z',
        },
      ],
    },
  ],
};

export const RAW_CODE_REVIEW_WITHOUT_CLOSED_DATE = [
  {
    pullRequestId: 2620,
    status: 'active',
    createdBy: {
      displayName: 'Developer',
      id: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
    },
    creationDate: '2024-02-12T10:58:33.4719437Z',
    title: 'Active pull request with no reviewers.',
    reviewers: [],
    threads: [],
  },
];

export const CODE_REVIEW_WITHOUT_CLOSED_DATE = {
  count: 1,
  pullRequests: [
    {
      authorId: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
      closedDate: null,
      createdBy: 'Developer',
      creationDate: '2024-02-12T10:58:33.4719437Z',
      id: 2620,
      mergeTimeInSeconds: null,
      threads: [],
      status: 'active',
      tags: [],
      title: '2620 - Active pull request with no reviewers.',
      url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2620`,
      votesHistoryTimeline: [],
      votesTimeline: [],
    },
  ],
};

export const RAW_CODE_REVIEW_NO_VOTE_THREADS = [
  {
    pullRequestId: 2620,
    status: 'completed',
    createdBy: {
      displayName: 'Developer',
      id: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
    },
    creationDate: '2024-02-12T10:58:33.4719437Z',
    closedDate: '2024-02-12T11:04:06.3046376Z',
    title: 'Completed pull request with no reviewers & threads.',
    reviewers: [],
    threads: [],
  },
];

export const CODE_REVIEW_NO_VOTE_THREADS = {
  count: 1,
  pullRequests: [
    {
      authorId: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
      closedDate: '2024-02-12T11:04:06.3046376Z',
      createdBy: 'Developer',
      creationDate: '2024-02-12T10:58:33.4719437Z',
      id: 2620,
      mergeTimeInSeconds: 333,
      threads: [],
      status: 'completed',
      tags: [],
      title: '2620 - Completed pull request with no reviewers & threads.',
      url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2620`,
      votesHistoryTimeline: [],
      votesTimeline: [],
    },
  ],
};

export const RAW_CODE_REVIEW_METRICS_THREADS = [
  {
    pullRequestId: 2626,
    status: 'completed',
    createdBy: {
      displayName: 'Developer',
      id: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
    },
    creationDate: '2024-02-04T10:58:33.4719437Z',
    closedDate: '2024-02-12T11:04:06.3046376Z',
    title: 'Filtered azure completed pull request data with threads data (handled comments, labels)',
    reviewers: [
      {
        vote: 10,
        isRequired: true,
        displayName: 'Reviewer 1',
        id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
      },
      {
        vote: 0,
        displayName: 'Reviewer 2',
        id: '2655af18-ea47-64fa-a782-3c3ccb174079',
      },
      {
        vote: 0,
        displayName: 'Reviewer 3',
        id: '561b83f4-afcd-6b4a-a398-4a4f5a88d431',
      },
    ],
    labels: [
      {
        id: 'f886f8f7-5d76-4498-9aa0-944f0f1b9557',
        name: 'Documentation',
        active: true,
      },
    ],
    threads: [
      {
        publishedDate: '2024-02-12T11:02:32.32Z',
        comments: [
          {
            author: {
              displayName: 'Reviewer 1',
              id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
            },
            content: 'Reviewer 1 voted 10',
            commentType: 'system',
          },
        ],
        properties: {
          CodeReviewVoteResult: {
            $type: 'System.String',
            $value: '10',
          },
        },
        isDeleted: false,
      },
      {
        pullRequestThreadContext: {
          iterationContext: {
            firstComparingIteration: 18,
            secondComparingIteration: 18,
          },
          changeTrackingId: 19,
        },
        publishedDate: '2024-02-12T04:59:12.86Z',
        comments: [
          {
            author: {
              displayName: 'Reviewer 1',
              id: '3c66f2d9-f079-65fd-af3d-0650c193e580',
            },
            content: "NitLet's use the server-config.js here",
            publishedDate: '2024-02-12T04:59:12.86Z',
            commentType: 'text',
          },
          {
            author: {
              displayName: 'Developer',
              id: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
            },
            publishedDate: '2024-02-12T06:45:02.17Z',
            isDeleted: true,
            commentType: 'text',
          },
          {
            author: {
              displayName: 'Reviewer 1',
              id: '3c66f2d9-f079-65fd-af3d-0650c193e580',
            },
            content: "MaJoR: Let's use the server-config.js here",
            publishedDate: '2024-02-12T04:59:12.86Z',
            commentType: 'text',
          },
        ],
        isDeleted: false,
      },
      {
        pullRequestThreadContext: null,
        publishedDate: '2024-02-12T11:04:06.47Z',
        comments: [
          {
            author: {
              displayName: 'Developer',
              id: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
            },
            content: 'Developer updated the pull request status to Completed',
            publishedDate: '2024-02-12T11:04:06.47Z',
          },
        ],
        isDeleted: false,
      },
    ],
  },
];

export const CODE_REVIEW_METRICS_THREADS = {
  count: 1,
  pullRequests: [
    {
      authorId: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
      closedDate: '2024-02-12T11:04:06.3046376Z',
      createdBy: 'Developer',
      creationDate: '2024-02-04T10:58:33.4719437Z',
      id: 2626,
      mergeTimeInSeconds: 691533,
      threads: [
        {
          comments: [
            {
              authorId: '3c66f2d9-f079-65fd-af3d-0650c193e580',
              authorName: 'Reviewer 1',
              content: "NitLet's use the server-config.js here",
            },
            {
              authorId: '3c66f2d9-f079-65fd-af3d-0650c193e580',
              authorName: 'Reviewer 1',
              content: "MaJoR: Let's use the server-config.js here",
            },
          ],
        },
      ],
      status: 'completed',
      tags: ['Documentation'],
      title: '2626 - Filtered azure completed pull request data with threads data (handled comments, labels)',
      url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2626`,
      votesHistoryTimeline: [
        {
          author: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
          timeOfVote: '2024-02-12T11:02:32.32Z',
          isRequired: true,
          vote: 'approved',
          reviewerAddedTime: '2024-02-04T10:58:33.4719437Z',
        },
      ],
      votesTimeline: [
        {
          author: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
          timeOfVote: '2024-02-12T11:02:32.32Z',
          isRequired: true,
          vote: 'approved',
          reviewerAddedTime: '2024-02-04T10:58:33.4719437Z',
        },
        {
          author: 'Reviewer 2',
          id: '2655af18-ea47-64fa-a782-3c3ccb174079',
          timeOfVote: null,
          isRequired: false,
          vote: 'noVote',
          reviewerAddedTime: '2024-02-04T10:58:33.4719437Z',
        },
        {
          author: 'Reviewer 3',
          id: '561b83f4-afcd-6b4a-a398-4a4f5a88d431',
          timeOfVote: null,
          isRequired: false,
          vote: 'noVote',
          reviewerAddedTime: '2024-02-04T10:58:33.4719437Z',
        },
      ],
    },
  ],
};

export const RAW_CODE_REVIEW_WITHOUT_LABELS = [
  {
    pullRequestId: 2620,
    status: 'active',
    createdBy: {
      displayName: 'Developer',
      id: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
    },
    creationDate: '2024-02-12T10:58:33.4719437Z',
    title: 'Active pull request with no reviewers.',
    reviewers: [],
    threads: [],
  },
];

export const CODE_REVIEW_WITHOUT_TAGS = {
  count: 1,
  pullRequests: [
    {
      authorId: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
      closedDate: null,
      createdBy: 'Developer',
      creationDate: '2024-02-12T10:58:33.4719437Z',
      id: 2620,
      mergeTimeInSeconds: null,
      threads: [],
      status: 'active',
      tags: [],
      title: '2620 - Active pull request with no reviewers.',
      url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2620`,
      votesHistoryTimeline: [],
      votesTimeline: [],
    },
  ],
};
