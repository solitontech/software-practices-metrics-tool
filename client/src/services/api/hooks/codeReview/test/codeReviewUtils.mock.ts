import { IFetchedRawCodeReviewResponse } from "../codeReviewTypes";

export const FILTERED_PULL_REQUESTS_MOCK = {
  MOCK_1: {
    FILTERS: [
      {
        squadName: "Squad 1",
        developers: [
          {
            id: "9e1313a9-2b7c-6556-b441-d1eabfed5d43",
            isSelected: true,
            name: "Developer 1",
          },
          {
            id: "9e1313b9-2a7c-6556-b441-d1eabfed5d43",
            isSelected: true,
            name: "Developer 2",
          },
        ],
        reviewers: [
          {
            id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
            isSelected: false,
            name: "Reviewer 1",
          },
          {
            id: "2655af18-ea47-64fa-a782-3c3ccb174079",
            isSelected: false,
            name: "Reviewer 2",
          },
        ],
      },
    ],
    DATA: {
      errorCount: 1,
      pullRequests: [
        {
          authorId: "9e1313a9-2b7c-6556-b441-d1eabfed5d43",
          closedDate: "2024-02-14T11:04:06.3046376Z",
          createdBy: "Developer",
          creationDate: "2024-02-04T10:58:33.4719437Z",
          id: 2635,
          threads: [
            {
              comments: [
                {
                  authorId: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
                  authorName: "Reviewer 1",
                  content: "mAjOrLet's use the server-config.js here",
                },
              ],
            },
          ],
          status: "completed",
          tags: [],
          title:
            "2635 - Completed pull request - Multiple reviewers with 1 non required reviewer with approved vote after merging",
          url: "https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2635",
          votesHistoryTimeline: [
            {
              author: "Reviewer 1",
              id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-12T11:02:32.32Z",
              vote: "waitForAuthor",
            },
            {
              author: "Reviewer 1",
              id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
          ],
          votesTimeline: [
            {
              author: "Reviewer 1",
              id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
          ],
        },
        {
          authorId: "9e1313b9-2a7c-6556-b441-d1eabfed5d43",
          closedDate: "2024-02-14T11:04:06.3046376Z",
          createdBy: "Developer",
          creationDate: "2024-02-04T10:58:33.4719437Z",
          id: 2635,
          threads: [
            {
              comments: [
                {
                  authorId: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
                  authorName: "Reviewer 1",
                  content: "mAjOrLet's use the server-config.js here",
                },
              ],
            },
          ],
          status: "completed",
          tags: [],
          title:
            "2635 - Completed pull request - Multiple reviewers with 1 non required reviewer with approved vote after merging",
          url: "https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2635",
          votesHistoryTimeline: [
            {
              author: "Reviewer 1",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-12T11:02:32.32Z",
              vote: "waitForAuthor",
            },
            {
              author: "Reviewer 1",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
          ],
          votesTimeline: [
            {
              author: "Reviewer 1",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
          ],
        },
      ],
    } as Omit<IFetchedRawCodeReviewResponse, "filteredCount" | "count">,
    RESULT: {
      errorCount: 1,
      pullRequests: [
        {
          authorId: "9e1313a9-2b7c-6556-b441-d1eabfed5d43",
          closedDate: "2024-02-14T11:04:06.3046376Z",
          createdBy: "Developer",
          creationDate: "2024-02-04T10:58:33.4719437Z",
          id: 2635,
          status: "completed",
          tags: [],
          threads: [
            {
              comments: [
                {
                  authorId: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
                  authorName: "Reviewer 1",
                  content: "mAjOrLet's use the server-config.js here",
                },
              ],
            },
          ],
          title:
            "2635 - Completed pull request - Multiple reviewers with 1 non required reviewer with approved vote after merging",
          url: "https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2635",
          votesHistoryTimeline: [
            {
              author: "Reviewer 1",
              id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-12T11:02:32.32Z",
              vote: "waitForAuthor",
            },
            {
              author: "Reviewer 1",
              id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
          ],
          votesTimeline: [
            {
              author: "Reviewer 1",
              id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
          ],
        },
        {
          authorId: "9e1313b9-2a7c-6556-b441-d1eabfed5d43",
          closedDate: "2024-02-14T11:04:06.3046376Z",
          createdBy: "Developer",
          creationDate: "2024-02-04T10:58:33.4719437Z",
          id: 2635,
          status: "completed",
          tags: [],
          threads: [
            {
              comments: [
                {
                  authorId: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
                  authorName: "Reviewer 1",
                  content: "mAjOrLet's use the server-config.js here",
                },
              ],
            },
          ],
          title:
            "2635 - Completed pull request - Multiple reviewers with 1 non required reviewer with approved vote after merging",
          url: "https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2635",
          votesHistoryTimeline: [
            {
              author: "Reviewer 1",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-12T11:02:32.32Z",
              vote: "waitForAuthor",
            },
            {
              author: "Reviewer 1",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
          ],
          votesTimeline: [
            {
              author: "Reviewer 1",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
          ],
        },
      ],
    },
  },
  MOCK_2: {
    FILTERS: [
      {
        squadName: "Squad 1",
        developers: [
          {
            id: "9e1313a9-2b7c-6556-b441-d1eabfed5d43",
            isSelected: true,
            name: "Developer 1",
          },
          {
            id: "9e1313b9-2a7c-6556-b441-d1eabfed5d43",
            isSelected: false,
            name: "Developer 2",
          },
        ],
        reviewers: [
          {
            id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
            isSelected: false,
            name: "Reviewer 1",
          },
          {
            id: "2655af18-ea47-64fa-a782-3c3ccb174079",
            isSelected: false,
            name: "Reviewer 2",
          },
        ],
      },
    ],
    DATA: {
      errorCount: 1,
      pullRequests: [
        {
          authorId: "9e1313a9-2b7c-6556-b441-d1eabfed5d43",
          closedDate: "2024-02-14T11:04:06.3046376Z",
          createdBy: "Developer",
          creationDate: "2024-02-04T10:58:33.4719437Z",
          id: 2635,
          threads: [
            {
              comments: [
                {
                  authorId: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
                  authorName: "Reviewer 1",
                  content: "mAjOrLet's use the server-config.js here",
                },
              ],
            },
          ],
          status: "completed",
          tags: [],
          title:
            "2635 - Completed pull request - Multiple reviewers with 1 non required reviewer with approved vote after merging",
          url: "https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2635",
          votesHistoryTimeline: [
            {
              author: "Reviewer 1",
              id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-12T11:02:32.32Z",
              vote: "waitForAuthor",
            },
            {
              author: "Reviewer 1",
              id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
          ],
          votesTimeline: [
            {
              author: "Reviewer 1",
              id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
          ],
        },
        {
          authorId: "9e1313b9-2a7c-6556-b441-d1eabfed5d43",
          closedDate: "2024-02-14T11:04:06.3046376Z",
          createdBy: "Developer",
          creationDate: "2024-02-04T10:58:33.4719437Z",
          id: 2635,
          threads: [
            {
              comments: [
                {
                  authorId: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
                  authorName: "Reviewer 1",
                  content: "mAjOrLet's use the server-config.js here",
                },
              ],
            },
          ],
          status: "completed",
          tags: [],
          title:
            "2635 - Completed pull request - Multiple reviewers with 1 non required reviewer with approved vote after merging",
          url: "https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2635",
          votesHistoryTimeline: [
            {
              author: "Reviewer 1",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-12T11:02:32.32Z",
              vote: "waitForAuthor",
            },
            {
              author: "Reviewer 1",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
          ],
          votesTimeline: [
            {
              author: "Reviewer 1",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
          ],
        },
      ],
    } as Omit<IFetchedRawCodeReviewResponse, "filteredCount" | "count">,
    RESULT: {
      errorCount: 1,
      pullRequests: [
        {
          authorId: "9e1313a9-2b7c-6556-b441-d1eabfed5d43",
          closedDate: "2024-02-14T11:04:06.3046376Z",
          createdBy: "Developer",
          creationDate: "2024-02-04T10:58:33.4719437Z",
          id: 2635,
          status: "completed",
          tags: [],
          threads: [
            {
              comments: [
                {
                  authorId: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
                  authorName: "Reviewer 1",
                  content: "mAjOrLet's use the server-config.js here",
                },
              ],
            },
          ],
          title:
            "2635 - Completed pull request - Multiple reviewers with 1 non required reviewer with approved vote after merging",
          url: "https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2635",
          votesHistoryTimeline: [
            {
              author: "Reviewer 1",
              id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-12T11:02:32.32Z",
              vote: "waitForAuthor",
            },
            {
              author: "Reviewer 1",
              id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
          ],
          votesTimeline: [
            {
              author: "Reviewer 1",
              id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
          ],
        },
      ],
    },
  },
  MOCK_3: {
    FILTERS: [
      {
        squadName: "Squad 1",
        developers: [
          {
            id: "9e1313a9-2b7c-6556-b441-d1eabfed5d43",
            isSelected: true,
            name: "Developer 1",
          },
          {
            id: "9e1313b9-2a7c-6556-b441-d1eabfed5d43",
            isSelected: true,
            name: "Developer 2",
          },
        ],
        reviewers: [
          {
            id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
            isSelected: false,
            name: "Reviewer 1",
          },
          {
            id: "2655af18-ea47-64fa-a782-3c3ccb174079",
            isSelected: true,
            name: "Reviewer 2",
          },
        ],
      },
    ],
    DATA: {
      errorCount: 1,
      pullRequests: [
        {
          authorId: "9e1313a9-2b7c-6556-b441-d1eabfed5d43",
          closedDate: "2024-02-14T11:04:06.3046376Z",
          createdBy: "Developer",
          creationDate: "2024-02-04T10:58:33.4719437Z",
          id: 2635,
          threads: [
            {
              comments: [
                {
                  authorId: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
                  authorName: "Reviewer 1",
                  content: "mAjOrLet's use the server-config.js here",
                },
              ],
            },
          ],
          status: "completed",
          tags: [],
          title:
            "2635 - Completed pull request - Multiple reviewers with 1 non required reviewer with approved vote after merging",
          url: "https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2635",
          votesHistoryTimeline: [
            {
              author: "Reviewer 1",
              id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-12T11:02:32.32Z",
              vote: "waitForAuthor",
            },
            {
              author: "Reviewer 1",
              id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
          ],
          votesTimeline: [
            {
              author: "Reviewer 1",
              id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
          ],
        },
        {
          authorId: "9e1313b9-2a7c-6556-b441-d1eabfed5d43",
          closedDate: "2024-02-14T11:04:06.3046376Z",
          createdBy: "Developer",
          creationDate: "2024-02-04T10:58:33.4719437Z",
          id: 2635,
          threads: [
            {
              comments: [
                {
                  authorId: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
                  authorName: "Reviewer 1",
                  content: "mAjOrLet's use the server-config.js here",
                },
              ],
            },
          ],
          status: "completed",
          tags: [],
          title:
            "2635 - Completed pull request - Multiple reviewers with 1 non required reviewer with approved vote after merging",
          url: "https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2635",
          votesHistoryTimeline: [
            {
              author: "Reviewer 1",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-12T11:02:32.32Z",
              vote: "waitForAuthor",
            },
            {
              author: "Reviewer 1",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
          ],
          votesTimeline: [
            {
              author: "Reviewer 1",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
          ],
        },
      ],
    } as Omit<IFetchedRawCodeReviewResponse, "filteredCount" | "count">,
    RESULT: {
      errorCount: 1,
      pullRequests: [
        {
          authorId: "9e1313b9-2a7c-6556-b441-d1eabfed5d43",
          closedDate: "2024-02-14T11:04:06.3046376Z",
          createdBy: "Developer",
          creationDate: "2024-02-04T10:58:33.4719437Z",
          id: 2635,
          status: "completed",
          tags: [],
          threads: [
            {
              comments: [
                {
                  authorId: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
                  authorName: "Reviewer 1",
                  content: "mAjOrLet's use the server-config.js here",
                },
              ],
            },
          ],
          title:
            "2635 - Completed pull request - Multiple reviewers with 1 non required reviewer with approved vote after merging",
          url: "https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2635",
          votesHistoryTimeline: [
            {
              author: "Reviewer 1",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-12T11:02:32.32Z",
              vote: "waitForAuthor",
            },
            {
              author: "Reviewer 1",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
          ],
          votesTimeline: [
            {
              author: "Reviewer 1",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
          ],
        },
      ],
    },
  },
  MOCK_4: {
    FILTERS: [
      {
        squadName: "Squad 1",
        developers: [
          {
            id: "9e1313a9-2b7c-6556-b441-d1eabfed5d43",
            isSelected: true,
            name: "Developer 1",
          },
          {
            id: "9e1313b9-2a7c-6556-b441-d1eabfed5d43",
            isSelected: true,
            name: "Developer 2",
          },
        ],
        reviewers: [
          {
            id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
            isSelected: false,
            name: "Reviewer 1",
          },
          {
            id: "2655af18-ea47-64fa-a782-3c3ccb174079",
            isSelected: false,
            name: "Reviewer 2",
          },
        ],
      },
    ],
    DATA: {
      errorCount: 1,
      pullRequests: [
        {
          authorId: "1e1313a9-2b7c-6556-b441-d1eabfed5d43",
          closedDate: "2024-02-14T11:04:06.3046376Z",
          createdBy: "Developer",
          creationDate: "2024-02-04T10:58:33.4719437Z",
          id: 2635,
          threads: [
            {
              comments: [
                {
                  authorId: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
                  authorName: "Reviewer 1",
                  content: "mAjOrLet's use the server-config.js here",
                },
              ],
            },
          ],
          status: "completed",
          tags: [],
          title:
            "2635 - Completed pull request - Multiple reviewers with 1 non required reviewer with approved vote after merging",
          url: "https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2635",
          votesHistoryTimeline: [
            {
              author: "Reviewer 1",
              id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-12T11:02:32.32Z",
              vote: "waitForAuthor",
            },
            {
              author: "Reviewer 1",
              id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
          ],
          votesTimeline: [
            {
              author: "Reviewer 1",
              id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
          ],
        },
        {
          authorId: "2e1313b9-2a7c-6556-b441-d1eabfed5d43",
          closedDate: "2024-02-14T11:04:06.3046376Z",
          createdBy: "Developer",
          creationDate: "2024-02-04T10:58:33.4719437Z",
          id: 2635,
          threads: [
            {
              comments: [
                {
                  authorId: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
                  authorName: "Reviewer 1",
                  content: "mAjOrLet's use the server-config.js here",
                },
              ],
            },
          ],
          status: "completed",
          tags: [],
          title:
            "2635 - Completed pull request - Multiple reviewers with 1 non required reviewer with approved vote after merging",
          url: "https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2635",
          votesHistoryTimeline: [
            {
              author: "Reviewer 1",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-12T11:02:32.32Z",
              vote: "waitForAuthor",
            },
            {
              author: "Reviewer 1",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
          ],
          votesTimeline: [
            {
              author: "Reviewer 1",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
          ],
        },
      ],
    } as Omit<IFetchedRawCodeReviewResponse, "filteredCount" | "count">,
    RESULT: {
      errorCount: 1,
      pullRequests: [],
    },
  },
  MOCK_5: {
    FILTERS: [
      {
        squadName: "Squad 1",
        developers: [
          {
            id: "9e1313a9-2b7c-6556-b441-d1eabfed5d43",
            isSelected: true,
            name: "Developer 1",
          },
          {
            id: "9e1313b9-2a7c-6556-b441-d1eabfed5d43",
            isSelected: true,
            name: "Developer 2",
          },
        ],
        reviewers: [
          {
            id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
            isSelected: true,
            name: "Reviewer 1",
          },
          {
            id: "2655af18-ea47-64fa-a782-3c3ccb174079",
            isSelected: true,
            name: "Reviewer 2",
          },
        ],
      },
    ],
    DATA: {
      errorCount: 1,
      pullRequests: [
        {
          authorId: "9e1313a9-2b7c-6556-b441-d1eabfed5d43",
          closedDate: "2024-02-14T11:04:06.3046376Z",
          createdBy: "Developer",
          creationDate: "2024-02-04T10:58:33.4719437Z",
          id: 2635,
          threads: [
            {
              comments: [
                {
                  authorId: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
                  authorName: "Reviewer 1",
                  content: "mAjOrLet's use the server-config.js here",
                },
              ],
            },
          ],
          status: "completed",
          tags: [],
          title:
            "2635 - Completed pull request - Multiple reviewers with 1 non required reviewer with approved vote after merging",
          url: "https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2635",
          votesHistoryTimeline: [
            {
              author: "Reviewer 1",
              id: "6f96f2d9-f079-65fd-ae3d-0650c193e581",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-12T11:02:32.32Z",
              vote: "waitForAuthor",
            },
            {
              author: "Reviewer 1",
              id: "6f96f2d9-f079-65fd-ae3d-0650c193e581",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
          ],
          votesTimeline: [
            {
              author: "Reviewer 1",
              id: "6f96f2d9-f079-65fd-ae3d-0650c193e581",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
          ],
        },
        {
          authorId: "9e1313b9-2a7c-6556-b441-d1eabfed5d43",
          closedDate: "2024-02-14T11:04:06.3046376Z",
          createdBy: "Developer",
          creationDate: "2024-02-04T10:58:33.4719437Z",
          id: 2635,
          threads: [
            {
              comments: [
                {
                  authorId: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
                  authorName: "Reviewer 1",
                  content: "mAjOrLet's use the server-config.js here",
                },
              ],
            },
          ],
          status: "completed",
          tags: [],
          title:
            "2635 - Completed pull request - Multiple reviewers with 1 non required reviewer with approved vote after merging",
          url: "https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2635",
          votesHistoryTimeline: [
            {
              author: "Reviewer 1",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-12T11:02:32.32Z",
              vote: "waitForAuthor",
            },
            {
              author: "Reviewer 1",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
          ],
          votesTimeline: [
            {
              author: "Reviewer 1",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
          ],
        },
      ],
    } as Omit<IFetchedRawCodeReviewResponse, "filteredCount" | "count">,
    RESULT: {
      errorCount: 1,
      pullRequests: [
        {
          authorId: "9e1313b9-2a7c-6556-b441-d1eabfed5d43",
          closedDate: "2024-02-14T11:04:06.3046376Z",
          createdBy: "Developer",
          creationDate: "2024-02-04T10:58:33.4719437Z",
          id: 2635,
          status: "completed",
          tags: [],
          threads: [
            {
              comments: [
                {
                  authorId: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
                  authorName: "Reviewer 1",
                  content: "mAjOrLet's use the server-config.js here",
                },
              ],
            },
          ],
          title:
            "2635 - Completed pull request - Multiple reviewers with 1 non required reviewer with approved vote after merging",
          url: "https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2635",
          votesHistoryTimeline: [
            {
              author: "Reviewer 1",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-12T11:02:32.32Z",
              vote: "waitForAuthor",
            },
            {
              author: "Reviewer 1",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
          ],
          votesTimeline: [
            {
              author: "Reviewer 1",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
          ],
        },
      ],
    },
  },
  MOCK_6: {
    FILTERS: [
      {
        squadName: "Squad 1",
        developers: [
          {
            id: "9e1313a9-2b7c-6556-b441-d1eabfed5d43",
            isSelected: false,
            name: "Developer 1",
          },
          {
            id: "9e1313b9-2a7c-6556-b441-d1eabfed5d43",
            isSelected: false,
            name: "Developer 2",
          },
        ],
        reviewers: [
          {
            id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
            isSelected: false,
            name: "Reviewer 1",
          },
          {
            id: "2655af18-ea47-64fa-a782-3c3ccb174079",
            isSelected: false,
            name: "Reviewer 2",
          },
        ],
      },
    ],
    DATA: {
      errorCount: 1,
      pullRequests: [
        {
          authorId: "9e1313a9-2b7c-6556-b441-d1eabfed5d43",
          closedDate: "2024-02-14T11:04:06.3046376Z",
          createdBy: "Developer",
          creationDate: "2024-02-04T10:58:33.4719437Z",
          id: 2635,
          threads: [
            {
              comments: [
                {
                  authorId: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
                  authorName: "Reviewer 1",
                  content: "mAjOrLet's use the server-config.js here",
                },
              ],
            },
          ],
          status: "completed",
          tags: [],
          title:
            "2635 - Completed pull request - Multiple reviewers with 1 non required reviewer with approved vote after merging",
          url: "https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2635",
          votesHistoryTimeline: [
            {
              author: "Reviewer 1",
              id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-12T11:02:32.32Z",
              vote: "waitForAuthor",
            },
            {
              author: "Reviewer 1",
              id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
          ],
          votesTimeline: [
            {
              author: "Reviewer 1",
              id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
          ],
        },
        {
          authorId: "9e1313b9-2a7c-6556-b441-d1eabfed5d43",
          closedDate: "2024-02-14T11:04:06.3046376Z",
          createdBy: "Developer",
          creationDate: "2024-02-04T10:58:33.4719437Z",
          id: 2635,
          threads: [
            {
              comments: [
                {
                  authorId: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
                  authorName: "Reviewer 1",
                  content: "mAjOrLet's use the server-config.js here",
                },
              ],
            },
          ],
          status: "completed",
          tags: [],
          title:
            "2635 - Completed pull request - Multiple reviewers with 1 non required reviewer with approved vote after merging",
          url: "https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2635",
          votesHistoryTimeline: [
            {
              author: "Reviewer 1",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-12T11:02:32.32Z",
              vote: "waitForAuthor",
            },
            {
              author: "Reviewer 1",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
          ],
          votesTimeline: [
            {
              author: "Reviewer 1",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
          ],
        },
      ],
    } as Omit<IFetchedRawCodeReviewResponse, "filteredCount" | "count">,
    RESULT: {
      errorCount: 1,
      pullRequests: [],
    },
  },
  MOCK_7: {
    FILTERS: [
      {
        squadName: "Squad 1",
        developers: [
          {
            id: "9e1313a9-2b7c-6556-b441-d1eabfed5d43",
            isSelected: false,
            name: "Developer 1",
          },
          {
            id: "9e1313b9-2a7c-6556-b441-d1eabfed5d43",
            isSelected: false,
            name: "Developer 2",
          },
        ],
        reviewers: [
          {
            id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
            isSelected: true,
            name: "Reviewer 1",
          },
          {
            id: "2655af18-ea47-64fa-a782-3c3ccb174079",
            isSelected: true,
            name: "Reviewer 2",
          },
        ],
      },
    ],
    DATA: {
      errorCount: 1,
      pullRequests: [
        {
          authorId: "9e1313a9-2b7c-6556-b441-d1eabfed5d43",
          closedDate: "2024-02-14T11:04:06.3046376Z",
          createdBy: "Developer",
          creationDate: "2024-02-04T10:58:33.4719437Z",
          id: 2635,
          threads: [
            {
              comments: [
                {
                  authorId: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
                  authorName: "Reviewer 1",
                  content: "mAjOrLet's use the server-config.js here",
                },
              ],
            },
          ],
          status: "completed",
          tags: [],
          title:
            "2635 - Completed pull request - Multiple reviewers with 1 non required reviewer with approved vote after merging",
          url: "https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2635",
          votesHistoryTimeline: [
            {
              author: "Reviewer 1",
              id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-12T11:02:32.32Z",
              vote: "waitForAuthor",
            },
            {
              author: "Reviewer 1",
              id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
          ],
          votesTimeline: [
            {
              author: "Reviewer 1",
              id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
          ],
        },
        {
          authorId: "9e1313b9-2a7c-6556-b441-d1eabfed5d43",
          closedDate: "2024-02-14T11:04:06.3046376Z",
          createdBy: "Developer",
          creationDate: "2024-02-04T10:58:33.4719437Z",
          id: 2635,
          threads: [
            {
              comments: [
                {
                  authorId: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
                  authorName: "Reviewer 1",
                  content: "mAjOrLet's use the server-config.js here",
                },
              ],
            },
          ],
          status: "completed",
          tags: [],
          title:
            "2635 - Completed pull request - Multiple reviewers with 1 non required reviewer with approved vote after merging",
          url: "https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2635",
          votesHistoryTimeline: [
            {
              author: "Reviewer 1",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-12T11:02:32.32Z",
              vote: "waitForAuthor",
            },
            {
              author: "Reviewer 1",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
          ],
          votesTimeline: [
            {
              author: "Reviewer 1",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
          ],
        },
      ],
    } as Omit<IFetchedRawCodeReviewResponse, "filteredCount" | "count">,
    RESULT: {
      errorCount: 1,
      pullRequests: [],
    },
  },
};

export const FILTER_BY_REVIEWERS_MOCKS = {
  MOCK_1: {
    FILTERS: [
      {
        squadName: "Squad 1",
        developers: [
          {
            id: "9e1313a9-2b7c-6556-b441-d1eabfed5d43",
            isSelected: true,
            name: "Developer 1",
          },
          {
            id: "9e1313b9-2a7c-6556-b441-d1eabfed5d43",
            isSelected: true,
            name: "Developer 2",
          },
        ],
        reviewers: [
          {
            id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
            isSelected: false,
            name: "Reviewer 1",
          },
          {
            id: "2655af18-ea47-64fa-a782-3c3ccb174079",
            isSelected: false,
            name: "Reviewer 2",
          },
        ],
      },
    ],
    DATA: {
      errorCount: 1,
      pullRequests: [
        {
          authorId: "9e1313a9-2b7c-6556-b441-d1eabfed5d43",
          closedDate: "2024-02-14T11:04:06.3046376Z",
          createdBy: "Developer",
          creationDate: "2024-02-04T10:58:33.4719437Z",
          id: 2635,
          threads: [
            {
              comments: [
                {
                  authorId: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
                  authorName: "Reviewer 1",
                  content: "nIt:Let's use the server-config.js here",
                },
                {
                  authorId: "9e1313a9-2b7c-6556-b441-d1eabfed5d43",
                  authorName: "Developer",
                  content:
                    "removed required joi validation for node environment as we are not getting it from .env when we run this this script it throws required error.",
                },
                {
                  authorId: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
                  authorName: "Reviewer 1",
                  content: "mAjOrLet's use the server-config.js here",
                },
                {
                  authorId: "2655af18-ea47-64fa-a782-3c3ccb174079",
                  authorName: "Reviewer 2",
                  content: "mAjOrLet's use the server-config.js here",
                },
                {
                  authorId: "561b83f4-afcd-6b4a-a398-4a4f5a88d431",
                  authorName: "Reviewer 3",
                  content: "mAjOrLet's use the server-config.js here",
                },
                {
                  authorId: "561b83f4-afcd-6b4a-a398-4a4f5a88d431",
                  authorName: "Reviewer 3",
                  content: "mAjOrLet's use the server-config.js here",
                },
              ],
            },
          ],
          status: "completed",
          tags: [],
          title:
            "2635 - Completed pull request - Multiple reviewers with 1 non required reviewer with approved vote after merging",
          url: "https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2635",
          votesHistoryTimeline: [
            {
              author: "Reviewer 1",
              id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-12T11:02:32.32Z",
              vote: "waitForAuthor",
            },
            {
              author: "Reviewer 3",
              id: "561b83f4-afcd-6b4a-a398-4a4f5a88d431",
              isRequired: false,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-12T21:02:32.32Z",
              vote: "waitForAuthor",
            },
            {
              author: "Reviewer 2",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T11:02:32.32Z",
              vote: "rejected",
            },
            {
              author: "Reviewer 1",
              id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
            {
              author: "Reviewer 2",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T21:42:12.32Z",
              vote: "approvedWithSuggestions",
            },
            {
              author: "Reviewer 3",
              id: "561b83f4-afcd-6b4a-a398-4a4f5a88d431",
              isRequired: false,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-15T21:02:32.32Z",
              vote: "approvedWithSuggestions",
            },
          ],
          votesTimeline: [
            {
              author: "Reviewer 1",
              id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
            {
              author: "Reviewer 2",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T21:42:12.32Z",
              vote: "approvedWithSuggestions",
            },
            {
              author: "Reviewer 3",
              id: "561b83f4-afcd-6b4a-a398-4a4f5a88d431",
              isRequired: false,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-15T21:02:32.32Z",
              vote: "approvedWithSuggestions",
            },
          ],
        },
      ],
    } as Omit<IFetchedRawCodeReviewResponse, "filteredCount" | "count">,
    RESULT: {
      errorCount: 1,
      pullRequests: [
        {
          approvalTimeInSeconds: 643419,
          authorId: "9e1313a9-2b7c-6556-b441-d1eabfed5d43",
          closedDate: "2024-02-14T11:04:06.3046376Z",
          comments: {
            numberOfMajorComments: 4,
            numberOfNitComments: 1,
            totalComments: 6,
          },
          mergeTimeInSeconds: 691533,
          createdBy: "Developer",
          creationDate: "2024-02-04T10:58:33.4719437Z",
          firstReviewResponseTimeInSeconds: 518639,
          id: 2635,
          reviewerComments: [
            {
              comments: 2,
              reviewer: "Reviewer 1",
            },
            {
              comments: 1,
              reviewer: "Developer",
            },
            {
              comments: 1,
              reviewer: "Reviewer 2",
            },
            {
              comments: 2,
              reviewer: "Reviewer 3",
            },
          ],
          status: "completed",
          tags: [],
          title:
            "2635 - Completed pull request - Multiple reviewers with 1 non required reviewer with approved vote after merging",
          url: "https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2635",
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
            noVote: 0,
            rejected: 1,
            waitForAuthor: 2,
          },
          votesHistoryTimeline: [
            {
              author: "Reviewer 1",
              id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-12T11:02:32.32Z",
              vote: "waitForAuthor",
            },
            {
              author: "Reviewer 3",
              id: "561b83f4-afcd-6b4a-a398-4a4f5a88d431",
              isRequired: false,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-12T21:02:32.32Z",
              vote: "waitForAuthor",
            },
            {
              author: "Reviewer 2",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T11:02:32.32Z",
              vote: "rejected",
            },
            {
              author: "Reviewer 1",
              id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
            {
              author: "Reviewer 2",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T21:42:12.32Z",
              vote: "approvedWithSuggestions",
            },
            {
              author: "Reviewer 3",
              id: "561b83f4-afcd-6b4a-a398-4a4f5a88d431",
              isRequired: false,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-15T21:02:32.32Z",
              vote: "approvedWithSuggestions",
            },
          ],
          votesTimeline: [
            {
              author: "Reviewer 1",
              id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
            {
              author: "Reviewer 2",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T21:42:12.32Z",
              vote: "approvedWithSuggestions",
            },
            {
              author: "Reviewer 3",
              id: "561b83f4-afcd-6b4a-a398-4a4f5a88d431",
              isRequired: false,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-15T21:02:32.32Z",
              vote: "approvedWithSuggestions",
            },
          ],
        },
      ],
    },
  },
  MOCK_2: {
    FILTERS: [
      {
        squadName: "Squad 1",
        developers: [
          {
            id: "9e1313a9-2b7c-6556-b441-d1eabfed5d43",
            isSelected: true,
            name: "Developer 1",
          },
          {
            id: "9e1313b9-2a7c-6556-b441-d1eabfed5d43",
            isSelected: true,
            name: "Developer 2",
          },
        ],
        reviewers: [
          {
            id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
            isSelected: true,
            name: "Reviewer 1",
          },
          {
            id: "2655af18-ea47-64fa-a782-3c3ccb174079",
            isSelected: true,
            name: "Reviewer 2",
          },
        ],
      },
    ],
    DATA: {
      errorCount: 1,
      pullRequests: [
        {
          authorId: "9e1313a9-2b7c-6556-b441-d1eabfed5d43",
          closedDate: "2024-02-14T11:04:06.3046376Z",
          createdBy: "Developer",
          creationDate: "2024-02-04T10:58:33.4719437Z",
          id: 2635,
          threads: [
            {
              comments: [
                {
                  authorId: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
                  authorName: "Reviewer 1",
                  content: "nIt:Let's use the server-config.js here",
                },
                {
                  authorId: "9e1313a9-2b7c-6556-b441-d1eabfed5d43",
                  authorName: "Developer",
                  content:
                    "removed required joi validation for node environment as we are not getting it from .env when we run this this script it throws required error.",
                },
                {
                  authorId: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
                  authorName: "Reviewer 1",
                  content: "mAjOrLet's use the server-config.js here",
                },
                {
                  authorId: "2655af18-ea47-64fa-a782-3c3ccb174079",
                  authorName: "Reviewer 2",
                  content: "mAjOrLet's use the server-config.js here",
                },
                {
                  authorId: "561b83f4-afcd-6b4a-a398-4a4f5a88d431",
                  authorName: "Reviewer 3",
                  content: "mAjOrLet's use the server-config.js here",
                },
                {
                  authorId: "561b83f4-afcd-6b4a-a398-4a4f5a88d431",
                  authorName: "Reviewer 3",
                  content: "mAjOrLet's use the server-config.js here",
                },
              ],
            },
          ],
          status: "completed",
          tags: [],
          title:
            "2635 - Completed pull request - Multiple reviewers with 1 non required reviewer with approved vote after merging",
          url: "https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2635",
          votesHistoryTimeline: [
            {
              author: "Reviewer 1",
              id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-12T11:02:32.32Z",
              vote: "waitForAuthor",
            },
            {
              author: "Reviewer 3",
              id: "561b83f4-afcd-6b4a-a398-4a4f5a88d431",
              isRequired: false,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-12T21:02:32.32Z",
              vote: "waitForAuthor",
            },
            {
              author: "Reviewer 2",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T11:02:32.32Z",
              vote: "rejected",
            },
            {
              author: "Reviewer 1",
              id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
            {
              author: "Reviewer 2",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T21:42:12.32Z",
              vote: "approvedWithSuggestions",
            },
            {
              author: "Reviewer 3",
              id: "561b83f4-afcd-6b4a-a398-4a4f5a88d431",
              isRequired: false,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-15T21:02:32.32Z",
              vote: "approvedWithSuggestions",
            },
          ],
          votesTimeline: [
            {
              author: "Reviewer 1",
              id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
            {
              author: "Reviewer 2",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T21:42:12.32Z",
              vote: "approvedWithSuggestions",
            },
            {
              author: "Reviewer 3",
              id: "561b83f4-afcd-6b4a-a398-4a4f5a88d431",
              isRequired: false,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-15T21:02:32.32Z",
              vote: "approvedWithSuggestions",
            },
          ],
        },
      ],
    } as Omit<IFetchedRawCodeReviewResponse, "filteredCount" | "count">,
    RESULT: {
      errorCount: 1,
      pullRequests: [
        {
          approvalTimeInSeconds: 643419,
          authorId: "9e1313a9-2b7c-6556-b441-d1eabfed5d43",
          closedDate: "2024-02-14T11:04:06.3046376Z",
          comments: {
            numberOfMajorComments: 2,
            numberOfNitComments: 1,
            totalComments: 4,
          },
          createdBy: "Developer",
          creationDate: "2024-02-04T10:58:33.4719437Z",
          firstReviewResponseTimeInSeconds: 518639,
          id: 2635,
          mergeTimeInSeconds: 691533,
          reviewerComments: [
            {
              comments: 2,
              reviewer: "Reviewer 1",
            },
            {
              comments: 1,
              reviewer: "Developer",
            },
            {
              comments: 1,
              reviewer: "Reviewer 2",
            },
          ],
          status: "completed",
          tags: [],
          title:
            "2635 - Completed pull request - Multiple reviewers with 1 non required reviewer with approved vote after merging",
          url: "https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2635",
          votes: {
            approved: 1,
            approvedWithSuggestions: 1,
            noVote: 0,
            rejected: 0,
            waitForAuthor: 0,
          },
          votesHistory: {
            approved: 1,
            approvedWithSuggestions: 1,
            noVote: 0,
            rejected: 1,
            waitForAuthor: 1,
          },
          votesHistoryTimeline: [
            {
              author: "Reviewer 1",
              id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-12T11:02:32.32Z",
              vote: "waitForAuthor",
            },
            {
              author: "Reviewer 2",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T11:02:32.32Z",
              vote: "rejected",
            },
            {
              author: "Reviewer 1",
              id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
            {
              author: "Reviewer 2",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T21:42:12.32Z",
              vote: "approvedWithSuggestions",
            },
          ],
          votesTimeline: [
            {
              author: "Reviewer 1",
              id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T15:02:32.32Z",
              vote: "approved",
            },
            {
              author: "Reviewer 2",
              id: "2655af18-ea47-64fa-a782-3c3ccb174079",
              isRequired: true,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-13T21:42:12.32Z",
              vote: "approvedWithSuggestions",
            },
          ],
        },
      ],
    },
  },
  MOCK_3: {
    FILTERS: [
      {
        squadName: "Squad 1",
        developers: [
          {
            id: "9e1313a9-2b7c-6556-b441-d1eabfed5d43",
            isSelected: true,
            name: "Developer 1",
          },
          {
            id: "9e1313b9-2a7c-6556-b441-d1eabfed5d43",
            isSelected: true,
            name: "Developer 2",
          },
        ],
        reviewers: [
          {
            id: "6f96f2d9-f079-65fd-ae3d-0650c193e580",
            isSelected: true,
            name: "Reviewer 1",
          },
          {
            id: "2655af18-ea47-64fa-a782-3c3ccb174079",
            isSelected: true,
            name: "Reviewer 2",
          },
        ],
      },
    ],
    DATA: {
      errorCount: 1,
      pullRequests: [
        {
          authorId: "9e1313a9-2b7c-6556-b441-d1eabfed5d43",
          closedDate: "2024-02-14T11:04:06.3046376Z",
          createdBy: "Developer",
          creationDate: "2024-02-04T10:58:33.4719437Z",
          id: 2635,
          threads: [
            {
              comments: [
                {
                  authorId: "9e1313a9-2b7c-6556-b441-d1eabfed5d43",
                  authorName: "Developer",
                  content:
                    "removed required joi validation for node environment as we are not getting it from .env when we run this this script it throws required error.",
                },
                {
                  authorId: "561b83f4-afcd-6b4a-a398-4a4f5a88d431",
                  authorName: "Reviewer 3",
                  content: "mAjOrLet's use the server-config.js here",
                },
                {
                  authorId: "561b83f4-afcd-6b4a-a398-4a4f5a88d431",
                  authorName: "Reviewer 3",
                  content: "mAjOrLet's use the server-config.js here",
                },
              ],
            },
          ],
          status: "completed",
          tags: [],
          title:
            "2635 - Completed pull request - Multiple reviewers with 1 non required reviewer with approved vote after merging",
          url: "https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2635",
          votesHistoryTimeline: [
            {
              author: "Reviewer 3",
              id: "561b83f4-afcd-6b4a-a398-4a4f5a88d431",
              isRequired: false,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-12T21:02:32.32Z",
              vote: "waitForAuthor",
            },
            {
              author: "Reviewer 3",
              id: "561b83f4-afcd-6b4a-a398-4a4f5a88d431",
              isRequired: false,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-15T21:02:32.32Z",
              vote: "approvedWithSuggestions",
            },
          ],
          votesTimeline: [
            {
              author: "Reviewer 3",
              id: "561b83f4-afcd-6b4a-a398-4a4f5a88d431",
              isRequired: false,
              reviewerAddedTime: "2024-02-04T10:58:33.4719437Z",
              timeOfVote: "2024-02-15T21:02:32.32Z",
              vote: "approvedWithSuggestions",
            },
          ],
        },
      ],
    } as Omit<IFetchedRawCodeReviewResponse, "filteredCount" | "count">,
    RESULT: {
      errorCount: 1,
      pullRequests: [
        {
          approvalTimeInSeconds: null,
          authorId: "9e1313a9-2b7c-6556-b441-d1eabfed5d43",
          closedDate: "2024-02-14T11:04:06.3046376Z",
          comments: {
            numberOfMajorComments: 0,
            numberOfNitComments: 0,
            totalComments: 1,
          },
          createdBy: "Developer",
          creationDate: "2024-02-04T10:58:33.4719437Z",
          firstReviewResponseTimeInSeconds: null,
          id: 2635,
          mergeTimeInSeconds: 691533,
          reviewerComments: [
            {
              comments: 1,
              reviewer: "Developer",
            },
          ],
          status: "completed",
          tags: [],
          title:
            "2635 - Completed pull request - Multiple reviewers with 1 non required reviewer with approved vote after merging",
          url: "https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2635",
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
            noVote: 0,
            rejected: 0,
            waitForAuthor: 0,
          },
          votesHistoryTimeline: [],
          votesTimeline: [],
        },
      ],
    },
  },
};
