import { ServerConfiguration } from '../../../src/configs/server.config.js';

const {
  organization: ORGANIZATION,
  projectName: PROJECT,
  repositoryId: REPOSITORY_ID,
} = ServerConfiguration.versionControl;

export const AZURE_PULL_REQUESTS_RESPONSE = {
  filteredCount: 15,
  errorCount: 10,
  pullRequests: [
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
    {
      pullRequestId: 2640,
      status: 'completed',
      createdBy: {
        displayName: 'Developer',
        id: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
      },
      creationDate: '2024-02-12T10:58:33.4719437Z',
      closedDate: '2024-02-12T11:04:06.3046376Z',
      title: 'Merged pull request with no reviewers & merged.',
      reviewers: [],
      threads: [],
    },
    {
      pullRequestId: 2621,
      status: 'active',
      createdBy: {
        displayName: 'Developer',
        id: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
      },
      creationDate: '2024-02-12T10:58:33.4719437Z',
      title: 'Active pull request with no vote from reviewers.',
      reviewers: [
        {
          vote: 0,
          isRequired: true,
          displayName: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
        },
      ],
      threads: [],
    },
    {
      pullRequestId: 2641,
      status: 'active',
      createdBy: {
        displayName: 'Developer',
        id: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
      },
      creationDate: '2024-02-12T10:58:33.4719437Z',
      closedDate: '2024-02-12T11:04:06.3046376Z',
      title: 'Merged pull request with no vote from non required reviewers.',
      reviewers: [
        {
          vote: 0,
          displayName: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
        },
      ],
      threads: [],
    },
    {
      pullRequestId: 2622,
      status: 'abandoned',
      createdBy: {
        displayName: 'Developer',
        id: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
      },
      creationDate: '2024-02-14T10:58:33.4719437Z',
      title: 'Abandoned pull request with single reviewer votes timeline .',
      reviewers: [
        {
          vote: 5,
          isRequired: true,
          displayName: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
        },
      ],
      threads: [
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
    },
    {
      pullRequestId: 2623,
      status: 'active',
      createdBy: {
        displayName: 'Developer',
        id: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
      },
      creationDate: '2024-02-04T10:58:33.4719437Z',
      title: 'Only the reviewers team is required to vote & a member voted for approved.',
      reviewers: [
        {
          vote: 10,
          displayName: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
        },
        {
          vote: 0,
          displayName: 'Reviewer 2',
          id: '5f96f2d9-f079-65fd-ae3d-0650c193e581',
        },
        {
          vote: 10,
          isRequired: true,
          displayName: 'Reviewers Team',
          id: '4f96f2d9-f079-65fd-ae3d-0650c193e582',
        },
      ],
      threads: [
        {
          publishedDate: '2024-02-09T11:02:32.32Z',
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
              $value: '10',
            },
          },
          isDeleted: false,
        },
      ],
    },
    {
      pullRequestId: 2623,
      status: 'active',
      createdBy: {
        displayName: 'Developer',
        id: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
      },
      creationDate: '2024-02-04T10:58:33.4719437Z',
      title: 'Active pull request with first review response (no required reviewers).',
      reviewers: [
        {
          vote: -10,
          displayName: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
        },
      ],
      threads: [
        {
          publishedDate: '2024-02-09T11:02:32.32Z',
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
              $value: '-10',
            },
          },
          isDeleted: false,
        },
      ],
    },
    {
      pullRequestId: 2630,
      status: 'completed',
      createdBy: {
        displayName: 'Developer',
        id: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
      },
      creationDate: '2024-02-04T10:58:33.4719437Z',
      closedDate: '2024-02-12T11:04:06.3046376Z',
      title: 'Completed pull request with first review response, approval, merge (no required reviewers).',
      reviewers: [
        {
          vote: 10,
          displayName: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
        },
      ],
      threads: [
        {
          publishedDate: '2024-02-09T11:02:32.32Z',
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
              $value: '10',
            },
          },
          isDeleted: false,
        },
      ],
    },
    {
      pullRequestId: 2624,
      status: 'completed',
      createdBy: {
        displayName: 'Developer',
        id: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
      },
      creationDate: '2024-02-04T10:58:33.4719437Z',
      closedDate: '2024-02-12T11:04:06.3046376Z',
      title: 'Completed pull request - Handle labels, direct approved vote.',
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
      ],
    },
    {
      pullRequestId: 2625,
      status: 'completed',
      createdBy: {
        displayName: 'Developer',
        id: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
      },
      creationDate: '2024-02-14T10:58:33.4719437Z',
      closedDate: '2024-02-17T10:04:06.3046376Z',
      title: 'Completed pull request - Handle first review response, approval, merge times (1 required reviewer).',
      reviewers: [
        {
          vote: 5,
          isRequired: true,
          displayName: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
        },
      ],
      threads: [
        {
          publishedDate: '2024-02-15T11:02:32.32Z',
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
              content: 'Reviewer 1 voted 10',
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
    },
    {
      pullRequestId: 2635,
      status: 'completed',
      createdBy: {
        displayName: 'Developer',
        id: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
      },
      creationDate: '2024-02-04T10:58:33.4719437Z',
      closedDate: '2024-02-14T11:04:06.3046376Z',
      title: 'Completed pull request - Multiple reviewers with 1 non required reviewer wait for author response.',
      reviewers: [
        {
          vote: 10,
          isRequired: true,
          displayName: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
        },
        {
          vote: 5,
          isRequired: true,
          displayName: 'Reviewer 2',
          id: '2655af18-ea47-64fa-a782-3c3ccb174079',
        },
        {
          vote: -5,
          displayName: 'Reviewer 3',
          id: '561b83f4-afcd-6b4a-a398-4a4f5a88d431',
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
          publishedDate: '2024-02-12T21:02:32.32Z',
          comments: [
            {
              author: {
                displayName: 'Reviewer 3',
                id: '561b83f4-afcd-6b4a-a398-4a4f5a88d431',
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
          publishedDate: '2024-02-13T11:02:32.32Z',
          comments: [
            {
              author: {
                displayName: 'Reviewer 2',
                id: '2655af18-ea47-64fa-a782-3c3ccb174079',
              },
              commentType: 'system',
            },
          ],
          properties: {
            CodeReviewVoteResult: {
              $type: 'System.String',
              $value: '-10',
            },
          },
          isDeleted: false,
        },
        {
          publishedDate: '2024-02-13T15:02:32.32Z',
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
              $value: '10',
            },
          },
          isDeleted: false,
        },
        {
          publishedDate: '2024-02-13T21:42:12.32Z',
          comments: [
            {
              author: {
                displayName: 'Reviewer 2',
                id: '2655af18-ea47-64fa-a782-3c3ccb174079',
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
    },
    {
      pullRequestId: 2635,
      status: 'completed',
      createdBy: {
        displayName: 'Developer',
        id: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
      },
      creationDate: '2024-02-04T10:58:33.4719437Z',
      closedDate: '2024-02-14T11:04:06.3046376Z',
      title:
        'Completed pull request - Multiple reviewers with 1 non required reviewer with approved vote after merging',
      reviewers: [
        {
          vote: 10,
          isRequired: true,
          displayName: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
        },
        {
          vote: 5,
          isRequired: true,
          displayName: 'Reviewer 2',
          id: '2655af18-ea47-64fa-a782-3c3ccb174079',
        },
        {
          vote: 5,
          displayName: 'Reviewer 3',
          id: '561b83f4-afcd-6b4a-a398-4a4f5a88d431',
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
          publishedDate: '2024-02-12T21:02:32.32Z',
          comments: [
            {
              author: {
                displayName: 'Reviewer 3',
                id: '561b83f4-afcd-6b4a-a398-4a4f5a88d431',
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
          publishedDate: '2024-02-13T11:02:32.32Z',
          comments: [
            {
              author: {
                displayName: 'Reviewer 2',
                id: '2655af18-ea47-64fa-a782-3c3ccb174079',
              },
              commentType: 'system',
            },
          ],
          properties: {
            CodeReviewVoteResult: {
              $type: 'System.String',
              $value: '-10',
            },
          },
          isDeleted: false,
        },
        {
          publishedDate: '2024-02-13T15:02:32.32Z',
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
              $value: '10',
            },
          },
          isDeleted: false,
        },
        {
          publishedDate: '2024-02-13T21:42:12.32Z',
          comments: [
            {
              author: {
                displayName: 'Reviewer 2',
                id: '2655af18-ea47-64fa-a782-3c3ccb174079',
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
        {
          publishedDate: '2024-02-15T21:02:32.32Z',
          comments: [
            {
              author: {
                displayName: 'Reviewer 3',
                id: '561b83f4-afcd-6b4a-a398-4a4f5a88d431',
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
    },
    {
      pullRequestId: 2629,
      status: 'active',
      createdBy: {
        displayName: 'Developer',
        id: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
      },
      creationDate: '2024-02-04T10:58:33.4719437Z',
      title: 'Active pull request to handle deleted threads (no reviewers)',
      reviewers: [],
      threads: [
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
          isDeleted: true,
        },
      ],
    },
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
    {
      repository: {
        id: 'fe7b3a04-e75f-38d5-97ae-29758b2f020b',
        name: 'Repo_name',
        url: 'https://dev.azure.com/Organization/77a3016e-9f00-4861-bdd8-81ae4d509c2e/_apis/git/repositories/fe7b3a04-e75f-38d5-97ae-29758b2f020b',
        project: {
          id: '77a3016e-9f00-4861-bdd8-81ae4d509c2e',
          name: 'Repo_name',
          state: 'unchanged',
          visibility: 'unchanged',
          lastUpdateTime: '0001-01-01T00:00:00',
        },
      },
      pullRequestId: 2627,
      codeReviewId: 2627,
      status: 'completed',
      createdBy: {
        displayName: 'Developer',
        url: 'https://spsprodcin2.vssps.visualstudio.com/B84933cd1-34bf-45f4-8a18-45cb981e7998/_apis/Identities/9e1313a9-2b7c-6556-b441-d1eabfed5d43',
        id: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
        uniqueName: 'sarvabhotla.g@company.com',
        imageUrl:
          'https://dev.azure.com/Organization/_api/_common/identityImage?id=9e1313a9-2b7c-6556-b441-d1eabfed5d43',
        descriptor: 'aad.OWUxMzEzYTktMmI3Yy03NTU2LWI0NDEtZDFlYWJmZWQ1ZDQz',
      },
      creationDate: '2024-02-12T10:58:33.4719437Z',
      closedDate: '2024-02-12T11:04:06.3046376Z',
      title: 'Original azure completed pull requests data with threads',
      description: 'This is description of the pull request',
      sourceRefName: 'refs/heads/users/dev/branch-name',
      targetRefName: 'refs/heads/main',
      mergeStatus: 'succeeded',
      isDraft: false,
      mergeId: '8dfe9571-70a5-4a85-a791-3d247c8be724',
      lastMergeSourceCommit: {
        commitId: 'd474e4a5c57e7e4c611f1c6674fe74834be25c87',
        url: 'https://dev.azure.com/Organization/77a3016e-9f00-4861-bdd8-81ae4d509c2e/_apis/git/repositories/fe7b3a04-e75f-38d5-97ae-29758b2f020b/commits/d474e4a5c57e7e4c611f1c6674fe74834be25c87',
      },
      lastMergeTargetCommit: {
        commitId: '0da65d2d340517333a0f1e1db9cfbc6b39ebb0e2',
        url: 'https://dev.azure.com/Organization/77a3016e-9f00-4861-bdd8-81ae4d509c2e/_apis/git/repositories/fe7b3a04-e75f-38d5-97ae-29758b2f020b/commits/0da65d2d340517333a0f1e1db9cfbc6b39ebb0e2',
      },
      lastMergeCommit: {
        commitId: 'e5b6efcca5e2e0b111e4e16b3e03550068bb9c47',
        url: 'https://dev.azure.com/Organization/77a3016e-9f00-4861-bdd8-81ae4d509c2e/_apis/git/repositories/fe7b3a04-e75f-38d5-97ae-29758b2f020b/commits/e5b6efcca5e2e0b111e4e16b3e03550068bb9c47',
      },
      reviewers: [
        {
          reviewerUrl:
            'https://dev.azure.com/Organization/77a3016e-9f00-4861-bdd8-81ae4d509c2e/_apis/git/repositories/fe7b3a04-e75f-38d5-97ae-29758b2f020b/pullRequests/2627/reviewers/6f96f2d9-f079-65fd-ae3d-0650c193e580',
          vote: 10,
          hasDeclined: false,
          isRequired: true,
          isFlagged: false,
          displayName: 'Reviewer 1',
          url: 'https://spsprodcin2.vssps.visualstudio.com/B84933cd1-34bf-45f4-8a18-45cb981e7998/_apis/Identities/6f96f2d9-f079-65fd-ae3d-0650c193e580',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
          uniqueName: 'rev1.e@company.com',
          imageUrl:
            'https://dev.azure.com/Organization/_api/_common/identityImage?id=6f96f2d9-f079-65fd-ae3d-0650c193e580',
        },
        {
          reviewerUrl:
            'https://dev.azure.com/Organization/77a3016e-9f00-4861-bdd8-81ae4d509c2e/_apis/git/repositories/fe7b3a04-e75f-38d5-97ae-29758b2f020b/pullRequests/2627/reviewers/2655af18-ea47-64fa-a782-3c3ccb174079',
          vote: 0,
          hasDeclined: false,
          isFlagged: false,
          displayName: 'Reviewer 2',
          url: 'https://spsprodcin2.vssps.visualstudio.com/B84933cd1-34bf-45f4-8a18-45cb981e7998/_apis/Identities/2655af18-ea47-64fa-a782-3c3ccb174079',
          id: '2655af18-ea47-64fa-a782-3c3ccb174079',
          uniqueName: 'rev2.c@company.com',
          imageUrl:
            'https://dev.azure.com/Organization/_api/_common/identityImage?id=2655af18-ea47-64fa-a782-3c3ccb174079',
        },
        {
          reviewerUrl:
            'https://dev.azure.com/Organization/77a3016e-9f00-4861-bdd8-81ae4d509c2e/_apis/git/repositories/fe7b3a04-e75f-38d5-97ae-29758b2f020b/pullRequests/2627/reviewers/561b83f4-afcd-6b4a-a398-4a4f5a88d431',
          vote: 0,
          hasDeclined: false,
          isFlagged: false,
          displayName: 'Reviewer 3',
          url: 'https://spsprodcin2.vssps.visualstudio.com/B84933cd1-34bf-45f4-8a18-45cb981e7998/_apis/Identities/561b83f4-afcd-6b4a-a398-4a4f5a88d431',
          id: '561b83f4-afcd-6b4a-a398-4a4f5a88d431',
          uniqueName: 'vsh.k@company.com',
          imageUrl:
            'https://dev.azure.com/Organization/_api/_common/identityImage?id=561b83f4-afcd-6b4a-a398-4a4f5a88d431',
        },
      ],
      labels: [
        {
          id: 'f886f8f7-5d76-4498-9aa0-944f0f1b9557',
          name: 'Documentation',
          active: true,
        },
        {
          id: 'b20a5d60-5ed1-4ccf-b6ac-0035bd14098e',
          name: 'code',
          active: true,
        },
        {
          id: 'c883a160-2c1f-43dd-8cfa-8c2b34c93cb7',
          name: 'Coding Documentation',
          active: true,
        },
      ],
      url: 'https://dev.azure.com/Organization/77a3016e-9f00-4861-bdd8-81ae4d509c2e/_apis/git/repositories/fe7b3a04-e75f-38d5-97ae-29758b2f020b/pullRequests/2627',
      completionOptions: {
        mergeCommitMessage: 'Merge Commit',
        deleteSourceBranch: true,
        squashMerge: true,
        mergeStrategy: 'squash',
        autoCompleteIgnoreConfigIds: [],
      },
      supportsIterations: true,
      completionQueueTime: '2024-02-12T11:04:05.4792434Z',
      threads: [
        {
          pullRequestThreadContext: null,
          id: 26591,
          publishedDate: '2024-02-12T10:58:33.597Z',
          lastUpdatedDate: '2024-02-12T10:58:33.597Z',
          comments: [
            {
              id: 1,
              parentCommentId: 0,
              author: {
                displayName: 'Developer',
                url: 'https://spsprodcin2.vssps.visualstudio.com/B84933cd1-34bf-45f4-8a18-45cb981e7998/_apis/Identities/9e1313a9-2b7c-6556-b441-d1eabfed5d43',
                id: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
                uniqueName: 'sarvabhotla.g@company.com',
                imageUrl:
                  'https://dev.azure.com/Organization/_apis/GraphProfile/MemberAvatars/aad.OWUxMzEzYTktMmI3Yy03NTU2LWI0NDEtZDFlYWJmZWQ1ZDQz',
                descriptor: 'aad.OWUxMzEzYTktMmI3Yy03NTU2LWI0NDEtZDFlYWJmZWQ1ZDQz',
              },
              content: 'Policy status has been updated',
              publishedDate: '2024-02-12T10:58:33.597Z',
              lastUpdatedDate: '2024-02-12T10:58:33.597Z',
              lastContentUpdatedDate: '2024-02-12T10:58:33.597Z',
              commentType: 'system',
              usersLiked: [],
            },
          ],
          threadContext: null,
          properties: {
            CodeReviewThreadType: {
              $type: 'System.String',
              $value: 'PolicyStatusUpdate',
            },
            CodeReviewPolicyType: {
              $type: 'System.String',
              $value: 'g3d167ab-b0be-447a-8ec8-39368250530e',
            },
            CodeReviewRequiredReviewerExamplePathThatTriggered: {
              $type: 'System.String',
              $value: '//Server/src/services/version-control-system/azure-devops/azure-devops.js',
            },
            CodeReviewRequiredReviewerIsRequired: {
              $type: 'System.String',
              $value: 'False',
            },
            CodeReviewRequiredReviewerNumFilesThatTriggered: {
              $type: 'System.Int32',
              $value: 2,
            },
            CodeReviewRequiredReviewerNumReviewers: {
              $type: 'System.Int32',
              $value: 0,
            },
            CodeReviewRequiredReviewerExampleReviewerIdentities: {
              $type: 'System.String',
              $value: '["1","2"]',
            },
          },
          identities: {
            1: {
              displayName: 'Reviewer 2',
              url: 'https://spsprodcin2.vssps.visualstudio.com/B84933cd1-34bf-45f4-8a18-45cb981e7998/_apis/Identities/2655af18-ea47-64fa-a782-3c3ccb174079',
              id: '2655af18-ea47-64fa-a782-3c3ccb174079',
              uniqueName: 'rev2.c@company.com',
              imageUrl:
                'https://dev.azure.com/Organization/_apis/GraphProfile/MemberAvatars/aad.NzQ5NWFmMTgtZWE0Ny03NGZhLWE3ODItM2MzY2NiMTc0MDc5',
              descriptor: 'aad.NzQ5NWFmMTgtZWE0Ny03NGZhLWE3ODItM2MzY2NiMTc0MDc5',
            },
            2: {
              displayName: 'Reviewer 3',
              url: 'https://spsprodcin2.vssps.visualstudio.com/B84933cd1-34bf-45f4-8a18-45cb981e7998/_apis/Identities/561b83f4-afcd-6b4a-a398-4a4f5a88d431',
              id: '561b83f4-afcd-6b4a-a398-4a4f5a88d431',
              uniqueName: 'vsh.k@company.com',
              imageUrl:
                'https://dev.azure.com/Organization/_apis/GraphProfile/MemberAvatars/aad.MzgyYjgzZjQtYWZjZC03YjRhLWEzOTgtNGE0ZjVhODhkNDMx',
              descriptor: 'aad.MzgyYjgzZjQtYWZjZC03YjRhLWEzOTgtNGE0ZjVhODhkNDMx',
            },
          },
          isDeleted: false,
        },
        {
          pullRequestThreadContext: null,
          id: 26599,
          publishedDate: '2024-02-12T11:02:32.32Z',
          lastUpdatedDate: '2024-02-12T11:02:32.32Z',
          comments: [
            {
              id: 1,
              parentCommentId: 0,
              author: {
                displayName: 'Reviewer 1',
                url: 'https://spsprodcin2.vssps.visualstudio.com/B84933cd1-34bf-45f4-8a18-45cb981e7998/_apis/Identities/6f96f2d9-f079-65fd-ae3d-0650c193e580',
                _links: {
                  avatar: {
                    href: 'https://dev.azure.com/Organization/_apis/GraphProfile/MemberAvatars/aad.M2M2NmYyZDktZjA3OS03NWZkLWFmM2QtMDY1MGMxOTNlNTgw',
                  },
                },
                id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
                uniqueName: 'rev1.e@company.com',
                imageUrl:
                  'https://dev.azure.com/Organization/_apis/GraphProfile/MemberAvatars/aad.M2M2NmYyZDktZjA3OS03NWZkLWFmM2QtMDY1MGMxOTNlNTgw',
                descriptor: 'aad.M2M2NmYyZDktZjA3OS03NWZkLWFmM2QtMDY1MGMxOTNlNTgw',
              },
              content: 'Reviewer 1 voted 10',
              publishedDate: '2024-02-12T11:02:32.32Z',
              lastUpdatedDate: '2024-02-12T11:02:32.32Z',
              lastContentUpdatedDate: '2024-02-12T11:02:32.32Z',
              commentType: 'system',
              usersLiked: [],
            },
          ],
          threadContext: null,
          properties: {
            CodeReviewThreadType: {
              $type: 'System.String',
              $value: 'VoteUpdate',
            },
            CodeReviewVoteResult: {
              $type: 'System.String',
              $value: '10',
            },
            CodeReviewVotedByInitiatorIdentity: {
              $type: 'System.String',
              $value: '1',
            },
            CodeReviewVotedByIdentity: {
              $type: 'System.String',
              $value: '1',
            },
          },
          identities: {
            1: {
              displayName: 'Reviewer 1',
              url: 'https://spsprodcin2.vssps.visualstudio.com/B84933cd1-34bf-45f4-8a18-45cb981e7998/_apis/Identities/6f96f2d9-f079-65fd-ae3d-0650c193e580',
              id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
              uniqueName: 'rev1.e@company.com',
              imageUrl:
                'https://dev.azure.com/Organization/_apis/GraphProfile/MemberAvatars/aad.M2M2NmYyZDktZjA3OS03NWZkLWFmM2QtMDY1MGMxOTNlNTgw',
              descriptor: 'aad.M2M2NmYyZDktZjA3OS03NWZkLWFmM2QtMDY1MGMxOTNlNTgw',
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
          id: 26503,
          publishedDate: '2024-02-12T04:59:12.86Z',
          lastUpdatedDate: '2024-02-12T09:26:10.337Z',
          comments: [
            {
              id: 1,
              parentCommentId: 0,
              author: {
                displayName: 'Reviewer 1',
                url: 'https://spsprodcin2.vssps.visualstudio.com/A94933cd1-34bf-45f4-8a18-45cb981e7998/_apis/Identities/3c66f2d9-f079-65fd-af3d-0650c193e580',
                id: '3c66f2d9-f079-65fd-af3d-0650c193e580',
                uniqueName: 'rev1.e@company.com',
                imageUrl:
                  'https://dev.azure.com/Soliton/_api/_common/identityImage?id=3c66f2d9-f079-65fd-af3d-0650c193e580',
                descriptor: 'aad.M2M2NmYyZDktZjA3OS03NWZkLWFmM2QtMDY1MGMxOTNlNTgw',
              },
              content: "nIt:Let's use the server-config.js here",
              publishedDate: '2024-02-12T04:59:12.86Z',
              lastUpdatedDate: '2024-02-12T06:17:54.393Z',
              lastContentUpdatedDate: '2024-02-12T04:59:12.86Z',
              commentType: 'text',
              usersLiked: [
                {
                  displayName: 'Developer',
                  url: 'https://spsprodcin2.vssps.visualstudio.com/A94933cd1-34bf-45f4-8a18-45cb981e7998/_apis/Identities/9e1313a9-2b7c-6556-b441-d1eabfed5d43',
                  id: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
                  uniqueName: 'sarvabhotla.g@solitontech.com',
                  imageUrl:
                    'https://dev.azure.com/Soliton/_api/_common/identityImage?id=9e1313a9-2b7c-6556-b441-d1eabfed5d43',
                  descriptor: 'aad.OWUxMzEzYTktMmI3Yy03NTU2LWI0NDEtZDFlYWJmZWQ1ZDQz',
                },
              ],
            },
            {
              id: 2,
              parentCommentId: 1,
              author: {
                displayName: 'Developer',
                url: 'https://spsprodcin2.vssps.visualstudio.com/A94933cd1-34bf-45f4-8a18-45cb981e7998/_apis/Identities/9e1313a9-2b7c-6556-b441-d1eabfed5d43',
                id: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
                uniqueName: 'sarvabhotla.g@solitontech.com',
                imageUrl:
                  'https://dev.azure.com/Soliton/_api/_common/identityImage?id=9e1313a9-2b7c-6556-b441-d1eabfed5d43',
                descriptor: 'aad.OWUxMzEzYTktMmI3Yy03NTU2LWI0NDEtZDFlYWJmZWQ1ZDQz',
              },
              publishedDate: '2024-02-12T06:17:51.567Z',
              lastUpdatedDate: '2024-02-12T06:44:09.84Z',
              lastContentUpdatedDate: '2024-02-12T06:44:09.84Z',
              isDeleted: true,
              commentType: 'text',
              usersLiked: [],
            },
            {
              id: 3,
              parentCommentId: 1,
              author: {
                displayName: 'Developer',
                url: 'https://spsprodcin2.vssps.visualstudio.com/A94933cd1-34bf-45f4-8a18-45cb981e7998/_apis/Identities/9e1313a9-2b7c-6556-b441-d1eabfed5d43',
                id: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
                uniqueName: 'sarvabhotla.g@solitontech.com',
                imageUrl:
                  'https://dev.azure.com/Soliton/_api/_common/identityImage?id=9e1313a9-2b7c-6556-b441-d1eabfed5d43',
                descriptor: 'aad.OWUxMzEzYTktMmI3Yy03NTU2LWI0NDEtZDFlYWJmZWQ1ZDQz',
              },
              publishedDate: '2024-02-12T06:45:02.17Z',
              lastUpdatedDate: '2024-02-12T06:55:15.917Z',
              lastContentUpdatedDate: '2024-02-12T06:55:15.917Z',
              isDeleted: true,
              commentType: 'text',
              usersLiked: [],
            },
            {
              id: 4,
              parentCommentId: 1,
              author: {
                displayName: 'Developer',
                url: 'https://spsprodcin2.vssps.visualstudio.com/A94933cd1-34bf-45f4-8a18-45cb981e7998/_apis/Identities/9e1313a9-2b7c-6556-b441-d1eabfed5d43',
                id: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
                uniqueName: 'sarvabhotla.g@solitontech.com',
                imageUrl:
                  'https://dev.azure.com/Soliton/_api/_common/identityImage?id=9e1313a9-2b7c-6556-b441-d1eabfed5d43',
                descriptor: 'aad.OWUxMzEzYTktMmI3Yy03NTU2LWI0NDEtZDFlYWJmZWQ1ZDQz',
              },
              content:
                'removed required joi validation for node environment as we are not getting it from .env when we run this this script it throws required error.',
              publishedDate: '2024-02-12T07:16:53.35Z',
              lastUpdatedDate: '2024-02-12T07:16:53.35Z',
              lastContentUpdatedDate: '2024-02-12T07:16:53.35Z',
              commentType: 'text',
              usersLiked: [],
            },
            {
              id: 5,
              parentCommentId: 0,
              author: {
                displayName: 'Reviewer 1',
                url: 'https://spsprodcin2.vssps.visualstudio.com/A94933cd1-34bf-45f4-8a18-45cb981e7998/_apis/Identities/3c66f2d9-f079-65fd-af3d-0650c193e580',
                id: '3c66f2d9-f079-65fd-af3d-0650c193e580',
                uniqueName: 'rev1.e@company.com',
                imageUrl:
                  'https://dev.azure.com/Soliton/_api/_common/identityImage?id=3c66f2d9-f079-65fd-af3d-0650c193e580',
                descriptor: 'aad.M2M2NmYyZDktZjA3OS03NWZkLWFmM2QtMDY1MGMxOTNlNTgw',
              },
              content: "mAjOrLet's use the server-config.js here",
              publishedDate: '2024-02-12T04:59:12.86Z',
              lastUpdatedDate: '2024-02-12T06:17:54.393Z',
              lastContentUpdatedDate: '2024-02-12T04:59:12.86Z',
              commentType: 'text',
              usersLiked: [
                {
                  displayName: 'Developer',
                  url: 'https://spsprodcin2.vssps.visualstudio.com/A94933cd1-34bf-45f4-8a18-45cb981e7998/_apis/Identities/9e1313a9-2b7c-6556-b441-d1eabfed5d43',
                  id: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
                  uniqueName: 'sarvabhotla.g@solitontech.com',
                  imageUrl:
                    'https://dev.azure.com/Soliton/_api/_common/identityImage?id=9e1313a9-2b7c-6556-b441-d1eabfed5d43',
                  descriptor: 'aad.OWUxMzEzYTktMmI3Yy03NTU2LWI0NDEtZDFlYWJmZWQ1ZDQz',
                },
              ],
            },
          ],
          status: 'fixed',
          threadContext: {
            filePath: '/Tools/SoftwarePracticesMetricsTool/Server/src/scripts/build-docker.js',
            rightFileStart: {
              line: 20,
              offset: 1,
            },
            rightFileEnd: {
              line: 21,
              offset: 1,
            },
          },
          properties: {
            'Microsoft.TeamFoundation.Discussion.SupportsMarkdown': {
              $type: 'System.Int32',
              $value: 1,
            },
            'Microsoft.TeamFoundation.Discussion.UniqueID': {
              $type: 'System.String',
              $value: '1d27300b-8c18-4fcb-b967-d882fadec293',
            },
          },
          identities: null,
          isDeleted: false,
        },
        {
          pullRequestThreadContext: null,
          id: 26600,
          publishedDate: '2024-02-12T11:04:06.47Z',
          lastUpdatedDate: '2024-02-12T11:04:06.47Z',
          comments: [
            {
              id: 1,
              parentCommentId: 0,
              author: {
                displayName: 'Developer',
                url: 'https://spsprodcin2.vssps.visualstudio.com/B84933cd1-34bf-45f4-8a18-45cb981e7998/_apis/Identities/9e1313a9-2b7c-6556-b441-d1eabfed5d43',
                _links: {
                  avatar: {
                    href: 'https://dev.azure.com/Organization/_apis/GraphProfile/MemberAvatars/aad.OWUxMzEzYTktMmI3Yy03NTU2LWI0NDEtZDFlYWJmZWQ1ZDQz',
                  },
                },
                id: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
                uniqueName: 'sarvabhotla.g@company.com',
                imageUrl:
                  'https://dev.azure.com/Organization/_apis/GraphProfile/MemberAvatars/aad.OWUxMzEzYTktMmI3Yy03NTU2LWI0NDEtZDFlYWJmZWQ1ZDQz',
                descriptor: 'aad.OWUxMzEzYTktMmI3Yy03NTU2LWI0NDEtZDFlYWJmZWQ1ZDQz',
              },
              content: 'Developer updated the pull request status to Completed',
              publishedDate: '2024-02-12T11:04:06.47Z',
              lastUpdatedDate: '2024-02-12T11:04:06.47Z',
              lastContentUpdatedDate: '2024-02-12T11:04:06.47Z',
              commentType: 'system',
              usersLiked: [],
              _links: {
                self: {
                  href: 'https://dev.azure.com/Organization/_apis/git/repositories/fe7b3a04-e75f-38d5-97ae-29758b2f020b/pullRequests/2627/threads/26600/comments/1',
                },
                repository: {
                  href: 'https://dev.azure.com/Organization/77a3016e-9f00-4861-bdd8-81ae4d509c2e/_apis/git/repositories/fe7b3a04-e75f-38d5-97ae-29758b2f020b',
                },
                threads: {
                  href: 'https://dev.azure.com/Organization/_apis/git/repositories/fe7b3a04-e75f-38d5-97ae-29758b2f020b/pullRequests/2621/threads/26600',
                },
                pullRequests: {
                  href: 'https://dev.azure.com/Organization/_apis/git/pullRequests/2621',
                },
              },
            },
          ],
          threadContext: null,
          properties: {
            CodeReviewThreadType: {
              $type: 'System.String',
              $value: 'StatusUpdate',
            },
            BypassPolicy: {
              $type: 'System.String',
              $value: 'False',
            },
            CodeReviewStatus: {
              $type: 'System.String',
              $value: 'Completed',
            },
            CodeReviewStatusUpdateAssociatedCommit: {
              $type: 'System.String',
              $value: 'e5b6efcca5e2e0b111e4e16b3e03550068bb9c47',
            },
            CodeReviewStatusUpdatedByIdentity: {
              $type: 'System.String',
              $value: '1',
            },
          },
          identities: {
            1: {
              displayName: 'Developer',
              url: 'https://spsprodcin2.vssps.visualstudio.com/B84933cd1-34bf-45f4-8a18-45cb981e7998/_apis/Identities/9e1313a9-2b7c-6556-b441-d1eabfed5d43',
              id: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
              uniqueName: 'sarvabhotla.g@company.com',
              imageUrl:
                'https://dev.azure.com/Organization/_apis/GraphProfile/MemberAvatars/aad.OWUxMzEzYTktMmI3Yy03NTU2LWI0NDEtZDFlYWJmZWQ1ZDQz',
              descriptor: 'aad.OWUxMzEzYTktMmI3Yy03NTU2LWI0NDEtZDFlYWJmZWQ1ZDQz',
            },
          },
          isDeleted: false,
        },
      ],
    },
  ],
};

export const SERVER_PULL_REQUESTS_RESPONSE = {
  count: 15,
  errorCount: 10,
  filteredCount: 15,
  pullRequests: [
    {
      approvalTimeInSeconds: null,
      authorId: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
      closedDate: null,
      comments: {
        numberOfMajorComments: 0,
        numberOfNitComments: 0,
        totalComments: 0,
      },
      createdBy: 'Developer',
      creationDate: '2024-02-12T10:58:33.4719437Z',
      firstReviewResponseTimeInSeconds: null,
      id: 2620,
      isRequiredReviewers: false,
      mergeTimeInSeconds: null,
      reviewerComments: [],
      status: 'active',
      tags: [],
      title: '2620 - Active pull request with no reviewers.',
      url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2620`,
      votes: {
        approved: 0,
        approvedWithSuggestions: 0,
        noVote: 0,
        rejected: 0,
        waitForAuthor: 0,
      },
      votesHistory: {
        approved: 0,
        approvedWithSuggestions: 0,
        rejected: 0,
        waitForAuthor: 0,
      },
      votesHistoryTimeline: [],
      votesTimeline: [],
    },
    {
      approvalTimeInSeconds: null,
      authorId: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
      closedDate: '2024-02-12T11:04:06.3046376Z',
      comments: {
        numberOfMajorComments: 0,
        numberOfNitComments: 0,
        totalComments: 0,
      },
      createdBy: 'Developer',
      creationDate: '2024-02-12T10:58:33.4719437Z',
      firstReviewResponseTimeInSeconds: null,
      id: 2640,
      isRequiredReviewers: false,
      mergeTimeInSeconds: 333,
      reviewerComments: [],
      status: 'completed',
      tags: [],
      title: '2640 - Merged pull request with no reviewers & merged.',
      url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2640`,
      votes: {
        approved: 0,
        approvedWithSuggestions: 0,
        noVote: 0,
        rejected: 0,
        waitForAuthor: 0,
      },
      votesHistory: {
        approved: 0,
        approvedWithSuggestions: 0,
        rejected: 0,
        waitForAuthor: 0,
      },
      votesHistoryTimeline: [],
      votesTimeline: [],
    },
    {
      approvalTimeInSeconds: null,
      authorId: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
      closedDate: null,
      comments: {
        numberOfMajorComments: 0,
        numberOfNitComments: 0,
        totalComments: 0,
      },
      createdBy: 'Developer',
      creationDate: '2024-02-12T10:58:33.4719437Z',
      firstReviewResponseTimeInSeconds: null,
      id: 2621,
      isRequiredReviewers: true,
      mergeTimeInSeconds: null,
      reviewerComments: [],
      status: 'active',
      tags: [],
      title: '2621 - Active pull request with no vote from reviewers.',
      url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2621`,
      votes: {
        approved: 0,
        approvedWithSuggestions: 0,
        noVote: 1,
        rejected: 0,
        waitForAuthor: 0,
      },
      votesHistory: {
        approved: 0,
        approvedWithSuggestions: 0,
        rejected: 0,
        waitForAuthor: 0,
      },
      votesHistoryTimeline: [],
      votesTimeline: [
        {
          author: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
          timeOfVote: null,
          vote: 'noVote',
        },
      ],
    },
    {
      approvalTimeInSeconds: null,
      authorId: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
      closedDate: '2024-02-12T11:04:06.3046376Z',
      comments: {
        numberOfMajorComments: 0,
        numberOfNitComments: 0,
        totalComments: 0,
      },
      createdBy: 'Developer',
      creationDate: '2024-02-12T10:58:33.4719437Z',
      firstReviewResponseTimeInSeconds: null,
      id: 2641,
      isRequiredReviewers: false,
      mergeTimeInSeconds: null,
      reviewerComments: [],
      status: 'active',
      tags: [],
      title: '2641 - Merged pull request with no vote from non required reviewers.',
      url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2641`,
      votes: {
        approved: 0,
        approvedWithSuggestions: 0,
        noVote: 1,
        rejected: 0,
        waitForAuthor: 0,
      },
      votesHistory: {
        approved: 0,
        approvedWithSuggestions: 0,
        rejected: 0,
        waitForAuthor: 0,
      },
      votesHistoryTimeline: [],
      votesTimeline: [
        {
          author: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
          timeOfVote: null,
          vote: 'noVote',
        },
      ],
    },
    {
      approvalTimeInSeconds: 173039,
      authorId: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
      closedDate: null,
      comments: {
        numberOfMajorComments: 0,
        numberOfNitComments: 0,
        totalComments: 0,
      },
      createdBy: 'Developer',
      creationDate: '2024-02-14T10:58:33.4719437Z',
      firstReviewResponseTimeInSeconds: 86639,
      id: 2622,
      isRequiredReviewers: true,
      mergeTimeInSeconds: null,
      reviewerComments: [],
      status: 'abandoned',
      tags: [],
      title: '2622 - Abandoned pull request with single reviewer votes timeline .',
      url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2622`,
      votes: {
        approved: 0,
        approvedWithSuggestions: 1,
        noVote: 0,
        rejected: 0,
        waitForAuthor: 0,
      },
      votesHistory: {
        approved: 0,
        approvedWithSuggestions: 1,
        rejected: 0,
        waitForAuthor: 1,
      },
      votesHistoryTimeline: [
        {
          author: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
          timeOfVote: '2024-02-15T11:02:32.32Z',
          vote: 'waitForAuthor',
        },
        {
          author: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
          timeOfVote: '2024-02-16T11:02:32.32Z',
          vote: 'approvedWithSuggestions',
        },
      ],
      votesTimeline: [
        {
          author: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
          timeOfVote: '2024-02-16T11:02:32.32Z',
          vote: 'approvedWithSuggestions',
        },
      ],
    },
    {
      approvalTimeInSeconds: 432239,
      authorId: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
      closedDate: null,
      comments: {
        numberOfMajorComments: 0,
        numberOfNitComments: 0,
        totalComments: 0,
      },
      createdBy: 'Developer',
      creationDate: '2024-02-04T10:58:33.4719437Z',
      firstReviewResponseTimeInSeconds: 432239,
      id: 2623,
      isRequiredReviewers: true,
      mergeTimeInSeconds: null,
      reviewerComments: [],
      status: 'active',
      tags: [],
      title: '2623 - Only the reviewers team is required to vote & a member voted for approved.',
      url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2623`,
      votes: {
        approved: 2,
        approvedWithSuggestions: 0,
        noVote: 1,
        rejected: 0,
        waitForAuthor: 0,
      },
      votesHistory: {
        approved: 1,
        approvedWithSuggestions: 0,
        rejected: 0,
        waitForAuthor: 0,
      },
      votesHistoryTimeline: [
        {
          author: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
          timeOfVote: '2024-02-09T11:02:32.32Z',
          vote: 'approved',
        },
      ],
      votesTimeline: [
        {
          author: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
          timeOfVote: '2024-02-09T11:02:32.32Z',
          vote: 'approved',
        },
        {
          author: 'Reviewer 2',
          id: '5f96f2d9-f079-65fd-ae3d-0650c193e581',
          timeOfVote: null,
          vote: 'noVote',
        },
        {
          author: 'Reviewers Team',
          id: '4f96f2d9-f079-65fd-ae3d-0650c193e582',
          timeOfVote: null,
          vote: 'approved',
        },
      ],
    },
    {
      approvalTimeInSeconds: null,
      authorId: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
      closedDate: null,
      comments: {
        numberOfMajorComments: 0,
        numberOfNitComments: 0,
        totalComments: 0,
      },
      createdBy: 'Developer',
      creationDate: '2024-02-04T10:58:33.4719437Z',
      firstReviewResponseTimeInSeconds: 432239,
      id: 2623,
      isRequiredReviewers: false,
      mergeTimeInSeconds: null,
      reviewerComments: [],
      status: 'active',
      tags: [],
      title: '2623 - Active pull request with first review response (no required reviewers).',
      url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2623`,
      votes: {
        approved: 0,
        approvedWithSuggestions: 0,
        noVote: 0,
        rejected: 1,
        waitForAuthor: 0,
      },
      votesHistory: {
        approved: 0,
        approvedWithSuggestions: 0,
        rejected: 1,
        waitForAuthor: 0,
      },
      votesHistoryTimeline: [
        {
          author: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
          timeOfVote: '2024-02-09T11:02:32.32Z',
          vote: 'rejected',
        },
      ],
      votesTimeline: [
        {
          author: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
          timeOfVote: '2024-02-09T11:02:32.32Z',
          vote: 'rejected',
        },
      ],
    },
    {
      approvalTimeInSeconds: null,
      authorId: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
      closedDate: '2024-02-12T11:04:06.3046376Z',
      comments: {
        numberOfMajorComments: 0,
        numberOfNitComments: 0,
        totalComments: 0,
      },
      createdBy: 'Developer',
      creationDate: '2024-02-04T10:58:33.4719437Z',
      firstReviewResponseTimeInSeconds: 432239,
      id: 2630,
      isRequiredReviewers: false,
      mergeTimeInSeconds: 691533,
      reviewerComments: [],
      status: 'completed',
      tags: [],
      title: '2630 - Completed pull request with first review response, approval, merge (no required reviewers).',
      url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2630`,
      votes: {
        approved: 1,
        approvedWithSuggestions: 0,
        noVote: 0,
        rejected: 0,
        waitForAuthor: 0,
      },
      votesHistory: {
        approved: 1,
        approvedWithSuggestions: 0,
        rejected: 0,
        waitForAuthor: 0,
      },
      votesHistoryTimeline: [
        {
          author: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
          timeOfVote: '2024-02-09T11:02:32.32Z',
          vote: 'approved',
        },
      ],
      votesTimeline: [
        {
          author: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
          timeOfVote: '2024-02-09T11:02:32.32Z',
          vote: 'approved',
        },
      ],
    },
    {
      approvalTimeInSeconds: 691439,
      authorId: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
      closedDate: '2024-02-12T11:04:06.3046376Z',
      comments: {
        numberOfMajorComments: 0,
        numberOfNitComments: 0,
        totalComments: 0,
      },
      createdBy: 'Developer',
      creationDate: '2024-02-04T10:58:33.4719437Z',
      firstReviewResponseTimeInSeconds: 691439,
      id: 2624,
      isRequiredReviewers: true,
      mergeTimeInSeconds: 691533,
      reviewerComments: [],
      status: 'completed',
      tags: ['Documentation'],
      title: '2624 - Completed pull request - Handle labels, direct approved vote.',
      url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2624`,
      votes: {
        approved: 1,
        approvedWithSuggestions: 0,
        noVote: 2,
        rejected: 0,
        waitForAuthor: 0,
      },
      votesHistory: {
        approved: 1,
        approvedWithSuggestions: 0,
        rejected: 0,
        waitForAuthor: 0,
      },
      votesHistoryTimeline: [
        {
          author: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
          timeOfVote: '2024-02-12T11:02:32.32Z',
          vote: 'approved',
        },
      ],
      votesTimeline: [
        {
          author: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
          timeOfVote: '2024-02-12T11:02:32.32Z',
          vote: 'approved',
        },
        {
          author: 'Reviewer 2',
          id: '2655af18-ea47-64fa-a782-3c3ccb174079',
          timeOfVote: null,
          vote: 'noVote',
        },
        {
          author: 'Reviewer 3',
          id: '561b83f4-afcd-6b4a-a398-4a4f5a88d431',
          timeOfVote: null,
          vote: 'noVote',
        },
      ],
    },
    {
      approvalTimeInSeconds: 173039,
      authorId: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
      closedDate: '2024-02-17T10:04:06.3046376Z',
      comments: {
        numberOfMajorComments: 0,
        numberOfNitComments: 0,
        totalComments: 0,
      },
      createdBy: 'Developer',
      creationDate: '2024-02-14T10:58:33.4719437Z',
      firstReviewResponseTimeInSeconds: 86639,
      id: 2625,
      isRequiredReviewers: true,
      mergeTimeInSeconds: 255933,
      reviewerComments: [],
      status: 'completed',
      tags: [],
      title:
        '2625 - Completed pull request - Handle first review response, approval, merge times (1 required reviewer).',
      url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2625`,
      votes: {
        approved: 0,
        approvedWithSuggestions: 1,
        noVote: 0,
        rejected: 0,
        waitForAuthor: 0,
      },
      votesHistory: {
        approved: 0,
        approvedWithSuggestions: 1,
        rejected: 0,
        waitForAuthor: 1,
      },
      votesHistoryTimeline: [
        {
          author: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
          timeOfVote: '2024-02-15T11:02:32.32Z',
          vote: 'waitForAuthor',
        },
        {
          author: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
          timeOfVote: '2024-02-16T11:02:32.32Z',
          vote: 'approvedWithSuggestions',
        },
      ],
      votesTimeline: [
        {
          author: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
          timeOfVote: '2024-02-16T11:02:32.32Z',
          vote: 'approvedWithSuggestions',
        },
      ],
    },
    {
      approvalTimeInSeconds: 816219,
      authorId: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
      closedDate: '2024-02-14T11:04:06.3046376Z',
      comments: {
        numberOfMajorComments: 0,
        numberOfNitComments: 0,
        totalComments: 0,
      },
      createdBy: 'Developer',
      creationDate: '2024-02-04T10:58:33.4719437Z',
      firstReviewResponseTimeInSeconds: 691439,
      id: 2635,
      isRequiredReviewers: true,
      mergeTimeInSeconds: 864333,
      reviewerComments: [],
      status: 'completed',
      tags: [],
      title:
        '2635 - Completed pull request - Multiple reviewers with 1 non required reviewer wait for author response.',
      url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2635`,
      votes: {
        approved: 1,
        approvedWithSuggestions: 1,
        noVote: 0,
        rejected: 0,
        waitForAuthor: 1,
      },
      votesHistory: {
        approved: 1,
        approvedWithSuggestions: 1,
        rejected: 1,
        waitForAuthor: 2,
      },
      votesHistoryTimeline: [
        {
          author: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
          timeOfVote: '2024-02-12T11:02:32.32Z',
          vote: 'waitForAuthor',
        },
        {
          author: 'Reviewer 3',
          id: '561b83f4-afcd-6b4a-a398-4a4f5a88d431',
          timeOfVote: '2024-02-12T21:02:32.32Z',
          vote: 'waitForAuthor',
        },
        {
          author: 'Reviewer 2',
          id: '2655af18-ea47-64fa-a782-3c3ccb174079',
          timeOfVote: '2024-02-13T11:02:32.32Z',
          vote: 'rejected',
        },
        {
          author: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
          timeOfVote: '2024-02-13T15:02:32.32Z',
          vote: 'approved',
        },
        {
          author: 'Reviewer 2',
          id: '2655af18-ea47-64fa-a782-3c3ccb174079',
          timeOfVote: '2024-02-13T21:42:12.32Z',
          vote: 'approvedWithSuggestions',
        },
      ],
      votesTimeline: [
        {
          author: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
          timeOfVote: '2024-02-13T15:02:32.32Z',
          vote: 'approved',
        },
        {
          author: 'Reviewer 2',
          id: '2655af18-ea47-64fa-a782-3c3ccb174079',
          timeOfVote: '2024-02-13T21:42:12.32Z',
          vote: 'approvedWithSuggestions',
        },
        {
          author: 'Reviewer 3',
          id: '561b83f4-afcd-6b4a-a398-4a4f5a88d431',
          timeOfVote: '2024-02-12T21:02:32.32Z',
          vote: 'waitForAuthor',
        },
      ],
    },
    {
      approvalTimeInSeconds: 816219,
      authorId: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
      closedDate: '2024-02-14T11:04:06.3046376Z',
      comments: {
        numberOfMajorComments: 0,
        numberOfNitComments: 0,
        totalComments: 0,
      },
      createdBy: 'Developer',
      creationDate: '2024-02-04T10:58:33.4719437Z',
      firstReviewResponseTimeInSeconds: 691439,
      id: 2635,
      isRequiredReviewers: true,
      mergeTimeInSeconds: 864333,
      reviewerComments: [],
      status: 'completed',
      tags: [],
      title:
        '2635 - Completed pull request - Multiple reviewers with 1 non required reviewer with approved vote after merging',
      url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2635`,
      votes: {
        approved: 1,
        approvedWithSuggestions: 2,
        noVote: 0,
        rejected: 0,
        waitForAuthor: 0,
      },
      votesHistory: {
        approved: 1,
        approvedWithSuggestions: 2,
        rejected: 1,
        waitForAuthor: 2,
      },
      votesHistoryTimeline: [
        {
          author: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
          timeOfVote: '2024-02-12T11:02:32.32Z',
          vote: 'waitForAuthor',
        },
        {
          author: 'Reviewer 3',
          id: '561b83f4-afcd-6b4a-a398-4a4f5a88d431',
          timeOfVote: '2024-02-12T21:02:32.32Z',
          vote: 'waitForAuthor',
        },
        {
          author: 'Reviewer 2',
          id: '2655af18-ea47-64fa-a782-3c3ccb174079',
          timeOfVote: '2024-02-13T11:02:32.32Z',
          vote: 'rejected',
        },
        {
          author: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
          timeOfVote: '2024-02-13T15:02:32.32Z',
          vote: 'approved',
        },
        {
          author: 'Reviewer 2',
          id: '2655af18-ea47-64fa-a782-3c3ccb174079',
          timeOfVote: '2024-02-13T21:42:12.32Z',
          vote: 'approvedWithSuggestions',
        },
        {
          author: 'Reviewer 3',
          id: '561b83f4-afcd-6b4a-a398-4a4f5a88d431',
          timeOfVote: '2024-02-15T21:02:32.32Z',
          vote: 'approvedWithSuggestions',
        },
      ],
      votesTimeline: [
        {
          author: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
          timeOfVote: '2024-02-13T15:02:32.32Z',
          vote: 'approved',
        },
        {
          author: 'Reviewer 2',
          id: '2655af18-ea47-64fa-a782-3c3ccb174079',
          timeOfVote: '2024-02-13T21:42:12.32Z',
          vote: 'approvedWithSuggestions',
        },
        {
          author: 'Reviewer 3',
          id: '561b83f4-afcd-6b4a-a398-4a4f5a88d431',
          timeOfVote: '2024-02-15T21:02:32.32Z',
          vote: 'approvedWithSuggestions',
        },
      ],
    },
    {
      approvalTimeInSeconds: null,
      authorId: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
      closedDate: null,
      comments: {
        numberOfMajorComments: 0,
        numberOfNitComments: 0,
        totalComments: 0,
      },
      createdBy: 'Developer',
      creationDate: '2024-02-04T10:58:33.4719437Z',
      firstReviewResponseTimeInSeconds: null,
      id: 2629,
      isRequiredReviewers: false,
      mergeTimeInSeconds: null,
      reviewerComments: [],
      status: 'active',
      tags: [],
      title: '2629 - Active pull request to handle deleted threads (no reviewers)',
      url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2629`,
      votes: {
        approved: 0,
        approvedWithSuggestions: 0,
        noVote: 0,
        rejected: 0,
        waitForAuthor: 0,
      },
      votesHistory: {
        approved: 0,
        approvedWithSuggestions: 0,
        rejected: 0,
        waitForAuthor: 0,
      },
      votesHistoryTimeline: [],
      votesTimeline: [],
    },
    {
      approvalTimeInSeconds: 691439,
      authorId: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
      closedDate: '2024-02-12T11:04:06.3046376Z',
      comments: {
        numberOfMajorComments: 1,
        numberOfNitComments: 1,
        totalComments: 3,
      },
      createdBy: 'Developer',
      creationDate: '2024-02-04T10:58:33.4719437Z',
      firstReviewResponseTimeInSeconds: 691439,
      id: 2626,
      isRequiredReviewers: true,
      mergeTimeInSeconds: 691533,
      reviewerComments: [
        {
          comments: 2,
          reviewer: 'Reviewer 1',
        },
        {
          comments: 1,
          reviewer: 'Developer',
        },
      ],
      status: 'completed',
      tags: ['Documentation'],
      title: '2626 - Filtered azure completed pull request data with threads data (handled comments, labels)',
      url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2626`,
      votes: {
        approved: 1,
        approvedWithSuggestions: 0,
        noVote: 2,
        rejected: 0,
        waitForAuthor: 0,
      },
      votesHistory: {
        approved: 1,
        approvedWithSuggestions: 0,
        rejected: 0,
        waitForAuthor: 0,
      },
      votesHistoryTimeline: [
        {
          author: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
          timeOfVote: '2024-02-12T11:02:32.32Z',
          vote: 'approved',
        },
      ],
      votesTimeline: [
        {
          author: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
          timeOfVote: '2024-02-12T11:02:32.32Z',
          vote: 'approved',
        },
        {
          author: 'Reviewer 2',
          id: '2655af18-ea47-64fa-a782-3c3ccb174079',
          timeOfVote: null,
          vote: 'noVote',
        },
        {
          author: 'Reviewer 3',
          id: '561b83f4-afcd-6b4a-a398-4a4f5a88d431',
          timeOfVote: null,
          vote: 'noVote',
        },
      ],
    },
    {
      approvalTimeInSeconds: 239,
      authorId: '9e1313a9-2b7c-6556-b441-d1eabfed5d43',
      closedDate: '2024-02-12T11:04:06.3046376Z',
      comments: {
        numberOfMajorComments: 1,
        numberOfNitComments: 1,
        totalComments: 5,
      },
      createdBy: 'Developer',
      creationDate: '2024-02-12T10:58:33.4719437Z',
      firstReviewResponseTimeInSeconds: 239,
      id: 2627,
      isRequiredReviewers: true,
      mergeTimeInSeconds: 333,
      reviewerComments: [
        {
          comments: 2,
          reviewer: 'Reviewer 1',
        },
        {
          comments: 3,
          reviewer: 'Developer',
        },
      ],
      status: 'completed',
      tags: ['Documentation', 'code', 'Coding Documentation'],
      title: '2627 - Original azure completed pull requests data with threads',
      url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2627`,
      votes: {
        approved: 1,
        approvedWithSuggestions: 0,
        noVote: 2,
        rejected: 0,
        waitForAuthor: 0,
      },
      votesHistory: {
        approved: 1,
        approvedWithSuggestions: 0,
        rejected: 0,
        waitForAuthor: 0,
      },
      votesHistoryTimeline: [
        {
          author: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
          timeOfVote: '2024-02-12T11:02:32.32Z',
          vote: 'approved',
        },
      ],
      votesTimeline: [
        {
          author: 'Reviewer 1',
          id: '6f96f2d9-f079-65fd-ae3d-0650c193e580',
          timeOfVote: '2024-02-12T11:02:32.32Z',
          vote: 'approved',
        },
        {
          author: 'Reviewer 2',
          id: '2655af18-ea47-64fa-a782-3c3ccb174079',
          timeOfVote: null,
          vote: 'noVote',
        },
        {
          author: 'Reviewer 3',
          id: '561b83f4-afcd-6b4a-a398-4a4f5a88d431',
          timeOfVote: null,
          vote: 'noVote',
        },
      ],
    },
  ],
};
