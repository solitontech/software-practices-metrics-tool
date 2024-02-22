import { ServerConfiguration } from '../../../../src/configs/server-config.js';

const {
  organization: ORGANIZATION,
  projectName: PROJECT,
  repositoryId: REPOSITORY_ID,
} = ServerConfiguration.versionControl;

export const AZURE_ACTIVE_BRANCHES_RESPONSE = {
  value: [
    {
      repository: {
        id: 'fe7b3b04-e75f-48d5-97be-19759b2f010b',
        name: 'SolitonCentral',
        url: 'https://dev.azure.com/Soliton/66c3016e-9f00-4861-bdd8-81ae4d509c2e/_apis/git/repositories/fe7b3b04-e75f-48d5-97be-19759b2f010b',
        project: {
          id: '66c3016e-9f00-4861-bdd8-81ae4d509c2e',
          name: 'SolitonCentral',
          state: 'unchanged',
          visibility: 'unchanged',
          lastUpdateTime: '0001-01-01T00:00:00',
        },
      },
      pullRequestId: 2749,
      codeReviewId: 2749,
      status: 'active',
      createdBy: {
        displayName: 'Roshana Ananthkumar',
        url: 'https://spsprodcin2.vssps.visualstudio.com/A94933cd1-34bf-45f4-8a18-45cb981e7998/_apis/Identities/a28a5b06-3a22-6ea6-8811-e8d714f18dc6',
        _links: {
          avatar: {
            href: 'https://dev.azure.com/Soliton/_apis/GraphProfile/MemberAvatars/aad.YTI4YTViMDYtM2EyMi03ZWE2LTg4MTEtZThkNzE0ZjE4ZGM2',
          },
        },
        id: 'a28a5b06-3a22-6ea6-8811-e8d714f18dc6',
        uniqueName: 'roshana.ananth@solitontech.com',
        imageUrl: 'https://dev.azure.com/Soliton/_api/_common/identityImage?id=a28a5b06-3a22-6ea6-8811-e8d714f18dc6',
        descriptor: 'aad.YTI4YTViMDYtM2EyMi03ZWE2LTg4MTEtZThkNzE0ZjE4ZGM2',
      },
      creationDate: '2024-02-20T09:22:13.8071555Z',
      title: 'Fix Lint errors in Client',
      description:
        '# Why this change is required\n\nThe lint errors need to be fixed to build the pipeline for the app successfully.\n\n# Describe your changes\n\n# How this change has been tested\n\n# Reference\n\n# Checklist\n\n- [ ] I have performed a self review of my code and intend to submit as such\n- [ ] I have added necessary explanations and inline comments for review\n- [ ] I have considered updating necessary README o',
      sourceRefName: 'refs/heads/users/roshana-ananthkumar/fix-lint-errors',
      targetRefName: 'refs/heads/main',
      mergeStatus: 'succeeded',
      url: 'https://dev.azure.com/Soliton/66c3016e-9f00-4861-bdd8-81ae4d509c2e/_apis/git/repositories/fe7b3b04-e75f-48d5-97be-19759b2f010b/pullRequests/2749',
    },
    {
      repository: {
        id: 'fe7b3b04-e75f-48d5-97be-19759b2f010b',
        name: 'SolitonCentral',
        url: 'https://dev.azure.com/Soliton/66c3016e-9f00-4861-bdd8-81ae4d509c2e/_apis/git/repositories/fe7b3b04-e75f-48d5-97be-19759b2f010b',
        project: {
          id: '66c3016e-9f00-4861-bdd8-81ae4d509c2e',
          name: 'SolitonCentral',
          state: 'unchanged',
          visibility: 'unchanged',
          lastUpdateTime: '0001-01-01T00:00:00',
        },
      },
      pullRequestId: 2740,
      codeReviewId: 2740,
      status: 'active',
      createdBy: {
        displayName: 'Vidhyaprabha Vasudevan',
        url: 'https://spsprodcin2.vssps.visualstudio.com/A94933cd1-34bf-45f4-8a18-45cb981e7998/_apis/Identities/a34858fa-1fb1-66cf-9aa0-f3542725d865',
        _links: {
          avatar: {
            href: 'https://dev.azure.com/Soliton/_apis/GraphProfile/MemberAvatars/aad.YTM0ODU4ZmEtMWZiMS03NmNmLTlhYTAtZjM1NDI3MjVkODY1',
          },
        },
        id: 'a34858fa-1fb1-66cf-9aa0-f3542725d865',
        uniqueName: 'vidhyaprabha.vasudevan@solitontech.com',
        imageUrl: 'https://dev.azure.com/Soliton/_api/_common/identityImage?id=a34858fa-1fb1-66cf-9aa0-f3542725d865',
        descriptor: 'aad.YTM0ODU4ZmEtMWZiMS03NmNmLTlhYTAtZjM1NDI3MjVkODY1',
      },
      creationDate: '2024-02-19T18:39:24.3535603Z',
      title: 'Move version control guidelines to separate folder',
      description:
        '# Why this change is required\n\nAdd more details to version control overview doc to help the teams understand the practice better\n\n# Describe your changes\n\n- Moved the guidelines to separate folder. \n- Added non-negotiable items. \n- Moved repo folder structure template to the same folder and linked it to overview doc\n\n# How this change has been tested\n\nNA\n\n# Reference\n\nNA\n\n# Checklist\n\n- [x] I have',
      sourceRefName: 'refs/heads/users/vidhyaprabha/version-control-overview-doc',
      targetRefName: 'refs/heads/main',
      mergeStatus: 'succeeded',
      url: 'https://dev.azure.com/Soliton/66c3016e-9f00-4861-bdd8-81ae4d509c2e/_apis/git/repositories/fe7b3b04-e75f-48d5-97be-19759b2f010b/pullRequests/2740',
    },
  ],
  count: 2,
};

export const SERVER_ACTIVE_BRANCHES_RESPONSE = {
  count: 2,
  branches: [
    {
      name: 'users/roshana-ananthkumar/fix-lint-errors',
      title: '2749 - Fix Lint errors in Client',
      createdBy: 'Roshana Ananthkumar',
      creationDate: '2024-02-20T09:22:13.8071555Z',
      pullRequestURL: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2749`,
      branchURL: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}?version=GBusers%2Froshana-ananthkumar%2Ffix-lint-errors`,
    },
    {
      branchURL: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}?version=GBusers%2Fvidhyaprabha%2Fversion-control-overview-doc`,
      createdBy: 'Vidhyaprabha Vasudevan',
      creationDate: '2024-02-19T18:39:24.3535603Z',
      name: 'users/vidhyaprabha/version-control-overview-doc',
      pullRequestURL: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2740`,
      title: '2740 - Move version control guidelines to separate folder',
    },
  ],
};
