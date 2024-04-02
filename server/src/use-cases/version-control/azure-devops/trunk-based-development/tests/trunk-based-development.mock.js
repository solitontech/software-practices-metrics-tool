import { ServerConfiguration } from '##/configs/server.config.js';

const {
  organization: ORGANIZATION,
  projectName: PROJECT,
  repositoryId: REPOSITORY_ID,
} = ServerConfiguration.versionControl;

export const AZURE_ALL_BRANCHES_RESPONSE = {
  count: 7,
  value: [
    {
      name: 'refs/heads/25Automation',
      objectId: 'a30a4b19037819eed3ded296ae074f7443f803f2',
      creator: {
        displayName: 'Developer 1',
        url: 'https://spsprodcin2.vssps.visualstudio.com/A64933cd1-34af-45f4-8a18-45cb982e7998/_apis/Identities/d2145d45-4253-6f16-9688-391s21a6f728',
        id: 'a2445d45-4253-6f16-9682-391c21a6f768',
        uniqueName: 'developer.1@solitontech.com',
        imageUrl: `https://dev.azure.com/${ORGANIZATION}/_api/_common/identityImage?id=d2745d45-4253-6f16-9688-391c21a6f768`,
        descriptor: 'aad.ZDI3NDVkNDUtNDI1My03ZiE1LTk2ODgtMzkxYzIxYTZmNzY4',
      },
      url: `https://dev.azure.com/${ORGANIZATION}/66c3016e-9f23-4861-bdd8-81be4d509c2e/_apis/git/repositories/fe7b3b03-e25f-48d5-97be-19759b2f010b/refs?filter=heads%25Automation`,
    },
    {
      name: 'refs/heads/react/starter/code',
      objectId: '736f4f3ec1fc3159534cedc7bc3272dd2f1f7f93',
      creator: {
        displayName: 'Developer 2',
        url: 'https://spsprodcin2.vssps.visualstudio.com/A64933cd1-34af-45f4-8a18-45cb982e7998/_apis/Identities/d2145d45-4253-6f16-9688-391s21a6f728',
        id: 'a2445d45-4253-6f16-9682-391c21a6f768',
        uniqueName: 'developer.2@solitontech.com',
        imageUrl: `https://dev.azure.com/${ORGANIZATION}/_api/_common/identityImage?id=d2745d45-4253-6f16-9688-391c21a6f768`,
        descriptor: 'aad.ZDI3NDVkNDUtNDI1My03ZiE1LTk2ODgtMzkxYzIxYTZmNzY4',
      },
      url: `https://dev.azure.com/${ORGANIZATION}/66c3016e-9f23-4861-bdd8-81be4d509c2e/_apis/git/repositories/fe7b3b03-e25f-48d5-97be-19759b2f010b/refs?filter=heads%react/starter/code`,
    },
    {
      name: 'refs/heads/dev5-code_review_updates',
      objectId: '09e9845ca7ad93abe9c0d5d69fb08d9c1153c1b4',
      creator: {
        displayName: 'Developer 5',
        url: 'https://spsprodcin2.vssps.visualstudio.com/A64933cd1-34af-45f4-8a18-45cb982e7998/_apis/Identities/d2145d45-4253-6f16-9688-391s21a6f728',
        id: 'a2445d45-4253-6f16-9682-391c21a6f768',
        uniqueName: 'developer.5@solitontech.com',
        imageUrl: `https://dev.azure.com/${ORGANIZATION}/_api/_common/identityImage?id=d2745d45-4253-6f16-9688-391c21a6f768`,
        descriptor: 'aad.ZDI3NDVkNDUtNDI1My03ZiE1LTk2ODgtMzkxYzIxYTZmNzY4',
      },
      url: `https://dev.azure.com/${ORGANIZATION}/66c3016e-9f23-4861-bdd8-81be4d509c2e/_apis/git/repositories/fe7b3b03-e25f-48d5-97be-19759b2f010b/refs?filter=heads%25Automation`,
    },
    {
      name: 'refs/heads/user/LV/LabVIEW_VI-Analyzer',
      objectId: 'bf18e47q108e0ebd8319560690c02f9c4424afea',
      creator: {
        displayName: 'Developer 6',
        url: 'https://spsprodcin2.vssps.visualstudio.com/A64933cd1-34af-45f4-8a18-45cb982e7998/_apis/Identities/d2145d45-4253-6f16-9688-391s21a6f728',
        id: 'a2445d45-4253-6f16-9682-391c21a6f768',
        uniqueName: 'developer.6@solitontech.com',
        imageUrl: `https://dev.azure.com/${ORGANIZATION}/_api/_common/identityImage?id=d2745d45-4253-6f16-9688-391c21a6f768`,
        descriptor: 'aad.ZDI3NDVkNDUtNDI1My03ZiE1LTk2ODgtMzkxYzIxYTZmNzY4',
      },
      url: `https://dev.azure.com/${ORGANIZATION}/66c3016e-9f23-4861-bdd8-81be4d509c2e/_apis/git/repositories/fe7b3b03-e25f-48d5-97be-19759b2f010b/refs?filter=heads%25Automation`,
    },
    {
      name: 'refs/heads/users/dev7/21_V_Don_MA-S_Implementation',
      objectId: 'd60f2173617cebfe1a8161ba09cbfb8f48a37d53',
      creator: {
        displayName: 'Developer 7',
        url: 'https://spsprodcin2.vssps.visualstudio.com/A64933cd1-34af-45f4-8a18-45cb982e7998/_apis/Identities/d2145d45-4253-6f16-9688-391s21a6f728',
        id: 'a2445d45-4253-6f16-9682-391c21a6f768',
        uniqueName: 'developer.7@solitontech.com',
        imageUrl: `https://dev.azure.com/${ORGANIZATION}/_api/_common/identityImage?id=d2745d45-4253-6f16-9688-391c21a6f768`,
        descriptor: 'aad.ZDI3NDVkNDUtNDI1My03ZiE1LTk2ODgtMzkxYzIxYTZmNzY4',
      },
      url: `https://dev.azure.com/${ORGANIZATION}/66c3016e-9f23-4861-bdd8-81be4d509c2e/_apis/git/repositories/fe7b3b03-e25f-48d5-97be-19759b2f010b/refs?filter=heads%25Automation`,
    },
    {
      name: 'refs/heads/users/dev8/Add_Project-OverviewDocument',
      objectId: '4c4195893fea95d63236ae3874ba7614d4dbf025',
      creator: {
        displayName: 'Developer 8',
        url: 'https://spsprodcin2.vssps.visualstudio.com/A64933cd1-34af-45f4-8a18-45cb982e7998/_apis/Identities/d2145d45-4253-6f16-9688-391s21a6f728',
        id: 'a2445d45-4253-6f16-9682-391c21a6f768',
        uniqueName: 'developer.8@solitontech.com',
        imageUrl: `https://dev.azure.com/${ORGANIZATION}/_api/_common/identityImage?id=d2745d45-4253-6f16-9688-391c21a6f768`,
        descriptor: 'aad.ZDI3NDVkNDUtNDI1My03ZiE1LTk2ODgtMzkxYzIxYTZmNzY4',
      },
      url: `https://dev.azure.com/${ORGANIZATION}/66c3016e-9f23-4861-bdd8-81be4d509c2e/_apis/git/repositories/fe7b3b03-e25f-48d5-97be-19759b2f010b/refs?filter=heads%25Automation`,
    },
    {
      name: 'refs/heads/users/dev1/clean-code/cheat_sheet',
      objectId: '4b2b9a9fb5ce64024bdf455e675143a29ab4ec32',
      creator: {
        displayName: 'Developer 10',
        url: 'https://spsprodcin2.vssps.visualstudio.com/A64933cd1-34af-45f4-8a18-45cb982e7998/_apis/Identities/d2145d45-4253-6f16-9688-391s21a6f728',
        id: 'a2445d45-4253-6f16-9682-391c21a6f768',
        uniqueName: 'developer.10@solitontech.com',
        imageUrl: `https://dev.azure.com/${ORGANIZATION}/_api/_common/identityImage?id=d2745d45-4253-6f16-9688-391c21a6f768`,
        descriptor: 'aad.ZDI3NDVkNDUtNDI1My03ZiE1LTk2ODgtMzkxYzIxYTZmNzY4',
      },
      url: `https://dev.azure.com/${ORGANIZATION}/66c3016e-9f23-4861-bdd8-81be4d509c2e/_apis/git/repositories/fe7b3b03-e25f-48d5-97be-19759b2f010b/refs?filter=heads%users/dev1/clean-code/cheat_sheet`,
    },
  ],
};

export const SERVER_ALL_BRANCHES_RESPONSE = {
  totalNumberOfBranches: 7,
  percentageOfBranchesFollowingStandard: '28.57%',
  branchesURL: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/branches?a=all&_a=all`,
  branchesFollowingNamingStandard: {
    count: 2,
    branches: [
      {
        id: 'd60f2173617cebfe1a8161ba09cbfb8f48a37d53',
        name: 'users/dev7/21_V_Don_MA-S_Implementation',
        url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}?version=GBusers%2Fdev7%2F21_V_Don_MA-S_Implementation`,
      },
      {
        id: '4c4195893fea95d63236ae3874ba7614d4dbf025',
        name: 'users/dev8/Add_Project-OverviewDocument',
        url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}?version=GBusers%2Fdev8%2FAdd_Project-OverviewDocument`,
      },
    ],
  },
  branchesNotFollowingNamingStandard: {
    count: 5,
    branches: [
      {
        id: 'a30a4b19037819eed3ded296ae074f7443f803f2',
        name: '25Automation',
        url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}?version=GB25Automation`,
      },
      {
        id: '736f4f3ec1fc3159534cedc7bc3272dd2f1f7f93',
        name: 'react/starter/code',
        url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}?version=GBreact%2Fstarter%2Fcode`,
      },
      {
        id: '09e9845ca7ad93abe9c0d5d69fb08d9c1153c1b4',
        name: 'dev5-code_review_updates',
        url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}?version=GBdev5-code_review_updates`,
      },
      {
        id: 'bf18e47q108e0ebd8319560690c02f9c4424afea',
        name: 'user/LV/LabVIEW_VI-Analyzer',
        url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}?version=GBuser%2FLV%2FLabVIEW_VI-Analyzer`,
      },
      {
        id: '4b2b9a9fb5ce64024bdf455e675143a29ab4ec32',
        name: 'users/dev1/clean-code/cheat_sheet',
        url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}?version=GBusers%2Fdev1%2Fclean-code%2Fcheat_sheet`,
      },
    ],
  },
};

export const AZURE_COUNT_ZERO_RESPONSE = {
  value: [],
  count: 0,
};

export const SERVER_COUNT_ZERO_ALL_BRANCHES_RESPONSE = {
  branchesURL: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/branches?a=all&_a=all`,
  totalNumberOfBranches: 0,
  percentageOfBranchesFollowingStandard: '0%',
  branchesFollowingNamingStandard: { count: 0, branches: [] },
  branchesNotFollowingNamingStandard: { count: 0, branches: [] },
};

export const AZURE_ACTIVE_BRANCHES_RESPONSE = {
  count: 2,
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

export const SERVER_COUNT_ZERO_ACTIVE_BRANCHES_RESPONSE = {
  count: 0,
  branches: [],
};

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

export const SERVER_COUNT_ZERO_PULL_REQUESTS_RESPONSE = {
  count: 0,
  pullRequests: [],
};

export const AZURE_TRUNK_BRANCH_COMMITS_RESPONSE = {
  count: 3,
  value: [
    {
      commitId: '991b959a426c231b88e8a27de428252d0934f22a',
      author: {
        name: 'Developer 1',
        email: 'dev1@company.com',
        date: '2024-02-06T14:42:24Z',
      },
      committer: {
        name: 'Developer 1',
        email: 'dev1@company.com',
        date: '2024-02-06T14:42:24Z',
      },
      comment: 'This is a merge commit',
      commentTruncated: true,
      changeCounts: {
        Add: 1,
        Edit: 26,
        Delete: 0,
      },
      url: 'https://dev.azure.com/Organization/66c3016e-9f00-4861-bdd8-81ae4d509c2e/_apis/git/repositories/fe7b3b04-e75f-48d5-97be-19759b2f010b/commits/991b959a426c231b88e8a27de428252d0934f22a',
      remoteUrl:
        'https://dev.azure.com/Organization/Project/_git/Repository/commit/991b959a426c231b88e8a27de428252d0934f22a',
    },
    {
      commitId: '5747f0d8e98c818228c4841a4916d2ab478c4b82',
      author: {
        name: 'Developer 2',
        email: 'dev2@company.com',
        date: '2024-02-06T14:12:37Z',
      },
      committer: {
        name: 'Developer 2',
        email: 'dev2@company.com',
        date: '2024-02-06T14:12:37Z',
      },
      comment: 'This is a merge commit',
      commentTruncated: true,
      changeCounts: {
        Add: 0,
        Edit: 1,
        Delete: 0,
      },
      url: 'https://dev.azure.com/Organization/66c3016e-9f00-4861-bdd8-81ae4d509c2e/_apis/git/repositories/fe7b3b04-e75f-48d5-97be-19759b2f010b/commits/5747f0d8e98c818228c4841a4916d2ab478c4b82',
      remoteUrl:
        'https://dev.azure.com/Organization/Project/_git/Repository/commit/5747f0d8e98c818228c4841a4916d2ab478c4b82',
    },
    {
      commitId: '1fc4e66cc22a1661136895ebdc7e340ee8bfdc6b',
      author: {
        name: 'Developer 2',
        email: 'dev2@company.com',
        date: '2024-02-06T14:12:09Z',
      },
      committer: {
        name: 'Developer 2',
        email: 'dev2@company.com',
        date: '2024-02-06T14:12:09Z',
      },
      comment: 'This is a merge commit',
      commentTruncated: true,
      changeCounts: {
        Add: 0,
        Edit: 1,
        Delete: 0,
      },
      url: 'https://dev.azure.com/Organization/66c3016e-9f00-4861-bdd8-81ae4d509c2e/_apis/git/repositories/fe7b3b04-e75f-48d5-97be-19759b2f010b/commits/1fc4e66cc22a1661136895ebdc7e340ee8bfdc6b',
      remoteUrl:
        'https://dev.azure.com/Organization/Project/_git/Repository/commit/1fc4e66cc22a1661136895ebdc7e340ee8bfdc6b',
    },
  ],
};

export const SERVER_TRUNK_BRANCH_COMMITS_RESPONSE = {
  count: 3,
  commits: [
    {
      author: {
        date: '2024-02-06T14:42:24Z',
        email: 'dev1@company.com',
        name: 'Developer 1',
      },
      comment: 'This is a merge commit',
      id: '991b959a426c231b88e8a27de428252d0934f22a',
    },
    {
      author: {
        date: '2024-02-06T14:12:37Z',
        email: 'dev2@company.com',
        name: 'Developer 2',
      },
      comment: 'This is a merge commit',
      id: '5747f0d8e98c818228c4841a4916d2ab478c4b82',
    },
    {
      author: {
        date: '2024-02-06T14:12:09Z',
        email: 'dev2@company.com',
        name: 'Developer 2',
      },
      comment: 'This is a merge commit',
      id: '1fc4e66cc22a1661136895ebdc7e340ee8bfdc6b',
    },
  ],
};

export const SERVER_COUNT_ZERO_TRUNK_BRANCH_COMMITS_RESPONSE = {
  count: 0,
  commits: [],
};
