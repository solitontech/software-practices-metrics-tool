import { ServerConfiguration } from '../../../../src/configs/server-config.js';

const {
  organization: ORGANIZATION,
  projectName: PROJECT,
  repositoryId: REPOSITORY_ID,
} = ServerConfiguration.versionControl;

export const AZURE_ALL_BRANCHES_RESPONSE = {
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
  count: 7,
};

export const SERVER_BRANCHES_RESPONSE = {
  branchesFollowingNamingStandard: {
    branches: [
      {
        id: 'd60f2173617cebfe1a8161ba09cbfb8f48a37d53',
        name: 'users/dev7/21_V_Don_MA-S_Implementation',
        url: 'https://dev.azure.com/Soliton/my_project/_git/my_repository?version=GBusers%2Fdev7%2F21_V_Don_MA-S_Implementation',
      },
      {
        id: '4c4195893fea95d63236ae3874ba7614d4dbf025',
        name: 'users/dev8/Add_Project-OverviewDocument',
        url: 'https://dev.azure.com/Soliton/my_project/_git/my_repository?version=GBusers%2Fdev8%2FAdd_Project-OverviewDocument',
      },
    ],
    count: 2,
  },
  branchesNotFollowingNamingStandard: {
    branches: [
      {
        id: 'a30a4b19037819eed3ded296ae074f7443f803f2',
        name: '25Automation',
        url: 'https://dev.azure.com/Soliton/my_project/_git/my_repository?version=GB25Automation',
      },
      {
        id: '736f4f3ec1fc3159534cedc7bc3272dd2f1f7f93',
        name: 'react/starter/code',
        url: 'https://dev.azure.com/Soliton/my_project/_git/my_repository?version=GBreact%2Fstarter%2Fcode',
      },
      {
        id: '09e9845ca7ad93abe9c0d5d69fb08d9c1153c1b4',
        name: 'dev5-code_review_updates',
        url: 'https://dev.azure.com/Soliton/my_project/_git/my_repository?version=GBdev5-code_review_updates',
      },
      {
        id: 'bf18e47q108e0ebd8319560690c02f9c4424afea',
        name: 'user/LV/LabVIEW_VI-Analyzer',
        url: 'https://dev.azure.com/Soliton/my_project/_git/my_repository?version=GBuser%2FLV%2FLabVIEW_VI-Analyzer',
      },
      {
        id: '4b2b9a9fb5ce64024bdf455e675143a29ab4ec32',
        name: 'users/dev1/clean-code/cheat_sheet',
        url: 'https://dev.azure.com/Soliton/my_project/_git/my_repository?version=GBusers%2Fdev1%2Fclean-code%2Fcheat_sheet',
      },
    ],
    count: 5,
  },
  branchesURL: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/branches?a=all&_a=all`,
  percentageOfBranchesFollowingStandard: '28.57%',
  totalNumberOfBranches: 7,
};
