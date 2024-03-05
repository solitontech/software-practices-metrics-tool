import { ServerConfiguration } from '../../../../src/configs/server.config.js';

const {
  organization: ORGANIZATION,
  projectName: PROJECT,
  repositoryId: REPOSITORY_ID,
} = ServerConfiguration.versionControl;

export const AZURE_ACTIVE_BRANCHES_RESPONSE = {
  value: [
    {
      repository: {
        id: 'fe7b3b04-e75f-48d5-97be-19759b2b020a',
        name: 'Organization',
        url: 'https://dev.azure.com/Soliton/66c2016w-9f00-4861-bdd8-81ae4d509a2f/_apis/git/repositories/fe7b3b04-e75f-48d5-97be-19759b2b020a',
        project: {
          id: '66c2016w-9f00-4861-bdd8-81ae4d509a2f',
          name: 'Project',
          state: 'unchanged',
          visibility: 'unchanged',
          lastUpdateTime: '0001-01-01T00:00:00',
        },
      },
      pullRequestId: 2749,
      codeReviewId: 2749,
      status: 'active',
      createdBy: {
        displayName: 'Developer 1',
        url: 'https://spsprodcin2.vssps.visualstudio.com/A94933cd1-34bf-45f4-8a18-45cb981e7998/_apis/Identities/b12c5b06-3a22-6ea6-8811-e8d714f18dc6',
        _links: {
          avatar: {
            href: 'https://dev.azure.com/Soliton/_apis/GraphProfile/MemberAvatars/aad.YTI4YTViMDYtM2EyMi03ZWE2LTg4MTEtZThkNzE0ZjE4ZGM2',
          },
        },
        id: 'b12c5b06-3a22-6ea6-8811-e8d714f18dc6',
        uniqueName: 'dev.1@company.com',
        imageUrl: 'https://dev.azure.com/Soliton/_api/_common/identityImage?id=b12c5b06-3a22-6ea6-8811-e8d714f18dc6',
        descriptor: 'aad.YTI4YTViMDYtM2EyMi03ZWE2LTg4MTEtZThkNzE0ZjE4ZGM2',
      },
      creationDate: '2024-02-20T09:22:13.8071555Z',
      title: 'Fix Lint errors in Client',
      description: ' Description of the PR',
      sourceRefName: 'refs/heads/users/dev1/fix-lint-errors',
      targetRefName: 'refs/heads/main',
      mergeStatus: 'succeeded',
      url: 'https://dev.azure.com/Soliton/66c2016w-9f00-4861-bdd8-81ae4d509a2f/_apis/git/repositories/fe7b3b04-e75f-48d5-97be-19759b2b020a/pullRequests/2749',
    },
    {
      repository: {
        id: 'fe7b3b04-e75f-48d5-97be-19759b2b020a',
        name: 'Organization',
        url: 'https://dev.azure.com/Soliton/66c2016w-9f00-4861-bdd8-81ae4d509a2f/_apis/git/repositories/fe7b3b04-e75f-48d5-97be-19759b2b020a',
        project: {
          id: '66c2016w-9f00-4861-bdd8-81ae4d509a2f',
          name: 'Project',
          state: 'unchanged',
          visibility: 'unchanged',
          lastUpdateTime: '0001-01-01T00:00:00',
        },
      },
      pullRequestId: 2740,
      codeReviewId: 2740,
      status: 'active',
      createdBy: {
        displayName: 'Developer 2',
        url: 'https://spsprodcin2.vssps.visualstudio.com/A94933cd1-34bf-45f4-8a18-45cb981e7998/_apis/Identities/c34858fa-1fb1-66cf-9aa0-f3542725d865',
        _links: {
          avatar: {
            href: 'https://dev.azure.com/Soliton/_apis/GraphProfile/MemberAvatars/aad.YTM0ODU4ZmEtMWZiMS03NmNmLTlhYTAtZjM1NDI3MjVkODY1',
          },
        },
        id: 'c34858fa-1fb1-66cf-9aa0-f3542725d865',
        uniqueName: 'dev.2@company.com',
        imageUrl: 'https://dev.azure.com/Soliton/_api/_common/identityImage?id=c34858fa-1fb1-66cf-9aa0-f3542725d865',
        descriptor: 'aad.YTM0ODU4ZmEtMWZiMS03NmNmLTlhYTAtZjM1NDI3MjVkODY1',
      },
      creationDate: '2024-02-19T18:39:24.3535603Z',
      title: 'Move version control guidelines to separate folder',
      description: 'Description of the PR',
      sourceRefName: 'refs/heads/users/dev/version-control-overview-doc',
      targetRefName: 'refs/heads/main',
      mergeStatus: 'succeeded',
      url: 'https://dev.azure.com/Soliton/66c2016w-9f00-4861-bdd8-81ae4d509a2f/_apis/git/repositories/fe7b3b04-e75f-48d5-97be-19759b2b020a/pullRequests/2740',
    },
  ],
  count: 2,
};

export const SERVER_ACTIVE_BRANCHES_RESPONSE = {
  count: 2,
  branches: [
    {
      name: 'users/dev1/fix-lint-errors',
      title: '2749 - Fix Lint errors in Client',
      createdBy: 'Developer 1',
      creationDate: '2024-02-20T09:22:13.8071555Z',
      pullRequestURL: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2749`,
      branchURL: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}?version=GBusers%2Fdev1%2Ffix-lint-errors`,
    },
    {
      branchURL: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}?version=GBusers%2Fdev%2Fversion-control-overview-doc`,
      createdBy: 'Developer 2',
      creationDate: '2024-02-19T18:39:24.3535603Z',
      name: 'users/dev/version-control-overview-doc',
      pullRequestURL: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2740`,
      title: '2740 - Move version control guidelines to separate folder',
    },
  ],
};
