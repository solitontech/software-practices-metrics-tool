import { ServerConfiguration } from '../../../../src/configs/server.config.js';

const {
  organization: ORGANIZATION,
  projectName: PROJECT,
  repositoryId: REPOSITORY_ID,
} = ServerConfiguration.versionControl;

export const AZURE_PULL_REQUESTS_RESPONSE = {
  count: 3,
  value: [
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
      status: 'active',
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
      title: 'Azure active pull request',
      description: 'This is description of the pull request',
      sourceRefName: 'refs/heads/users/dev/branch-name-one',
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
      ],
      labels: [
        {
          id: 'f886f8f7-5d76-4498-9aa0-944f0f1b9557',
          name: 'Documentation',
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
      title: 'Azure completed pull request',
      description: 'This is description of the pull request',
      sourceRefName: 'refs/heads/users/dev/branch-name-two',
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
      ],
      labels: [
        {
          id: 'f886f8f7-5d76-4498-9aa0-944f0f1b9557',
          name: 'Documentation',
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
      status: 'abandoned',
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
      title: 'Azure abandoned pull request',
      description: 'This is description of the pull request',
      sourceRefName: 'refs/heads/users/dev/branch-name-three',
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
    },
  ],
};

export const SERVER_PULL_REQUESTS_RESPONSE = {
  count: 3,
  pullRequests: [
    {
      branchURL: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}?version=GBusers%2Fdev%2Fbranch-name-one`,
      closedDate: null,
      creationDate: '2024-02-12T10:58:33.4719437Z',
      name: 'users/dev/branch-name-one',
      pullRequestURL: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2627`,
      status: 'active',
      title: '2627 - Azure active pull request',
    },
    {
      branchURL: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}?version=GBusers%2Fdev%2Fbranch-name-two`,
      closedDate: '2024-02-12T11:04:06.3046376Z',
      creationDate: '2024-02-12T10:58:33.4719437Z',
      name: 'users/dev/branch-name-two',
      pullRequestURL: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2627`,
      status: 'completed',
      title: '2627 - Azure completed pull request',
    },
    {
      branchURL: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}?version=GBusers%2Fdev%2Fbranch-name-three`,
      closedDate: '2024-02-12T11:04:06.3046376Z',
      creationDate: '2024-02-12T10:58:33.4719437Z',
      name: 'users/dev/branch-name-three',
      pullRequestURL: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2627`,
      status: 'abandoned',
      title: '2627 - Azure abandoned pull request',
    },
  ],
};
