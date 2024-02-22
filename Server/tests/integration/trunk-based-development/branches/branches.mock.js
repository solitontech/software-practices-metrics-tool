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
        _links: {
          avatar: {
            href: 'https://dev.azure.com/Soliton/_apis/GraphProfile/MemberAvatars/aad.ZDI3NDVkNDUtNDI1My03ZjE2LTk1ODftMzkxYzIxYTZmNzY4',
          },
        },
        id: 'a2445d45-4253-6f16-9682-391c21a6f768',
        uniqueName: 'developer.1@solitontech.com',
        imageUrl: 'https://dev.azure.com/Soliton/_api/_common/identityImage?id=d2745d45-4253-6f16-9688-391c21a6f768',
        descriptor: 'aad.ZDI3NDVkNDUtNDI1My03ZiE1LTk2ODgtMzkxYzIxYTZmNzY4',
      },
      url: 'https://dev.azure.com/Soliton/66c3016e-9f23-4861-bdd8-81be4d509c2e/_apis/git/repositories/fe7b3b03-e25f-48d5-97be-19759b2f010b/refs?filter=heads%25Automation',
    },
    {
      name: 'refs/heads/development',
      objectId: 'gg241820aa025c3af63c4aa990f35bfd31f3eac2',
      creator: {
        displayName: 'Developer 2',
        url: 'https://spsprodcin2.vssps.visualstudio.com/A64933cd1-34af-45f4-8a18-45cb982e7998/_apis/Identities/d2145d45-4253-6f16-9688-391s21a6f728',
        _links: {
          avatar: {
            href: 'https://dev.azure.com/Soliton/_apis/GraphProfile/MemberAvatars/aad.ZDI3NDVkNDUtNDI1My03ZjE2LTk1ODftMzkxYzIxYTZmNzY4',
          },
        },
        id: 'a2445d45-4253-6f16-9682-391c21a6f768',
        uniqueName: 'developer.2@solitontech.com',
        imageUrl: 'https://dev.azure.com/Soliton/_api/_common/identityImage?id=d2745d45-4253-6f16-9688-391c21a6f768',
        descriptor: 'aad.ZDI3NDVkNDUtNDI1My03ZiE1LTk2ODgtMzkxYzIxYTZmNzY4',
      },
      url: 'https://dev.azure.com/Soliton/66c3016e-9f23-4861-bdd8-81be4d509c2e/_apis/git/repositories/fe7b3b03-e25f-48d5-97be-19759b2f010b/refs?filter=heads%25Automation',
    },
    {
      name: 'refs/heads/main',
      objectId: '29625befc34389d0404ce4b8a29bf3f7d96d1235',
      creator: {
        displayName: 'Developer 3',
        url: 'https://spsprodcin2.vssps.visualstudio.com/A64933cd1-34af-45f4-8a18-45cb982e7998/_apis/Identities/d2145d45-4253-6f16-9688-391s21a6f728',
        _links: {
          avatar: {
            href: 'https://dev.azure.com/Soliton/_apis/GraphProfile/MemberAvatars/aad.ZDI3NDVkNDUtNDI1My03ZjE2LTk1ODftMzkxYzIxYTZmNzY4',
          },
        },
        id: 'a2445d45-4253-6f16-9682-391c21a6f768',
        uniqueName: 'developer.3@solitontech.com',
        imageUrl: 'https://dev.azure.com/Soliton/_api/_common/identityImage?id=d2745d45-4253-6f16-9688-391c21a6f768',
        descriptor: 'aad.ZDI3NDVkNDUtNDI1My03ZiE1LTk2ODgtMzkxYzIxYTZmNzY4',
      },
      url: 'https://dev.azure.com/Soliton/66c3016e-9f23-4861-bdd8-81be4d509c2e/_apis/git/repositories/fe7b3b03-e25f-48d5-97be-19759b2f010b/refs?filter=heads%25Automation',
    },
    {
      name: 'refs/heads/react-starter-code',
      objectId: '736f4f3ec1fc3159534cedc7bc3272dd2f1f7f93',
      creator: {
        displayName: 'Developer 4',
        url: 'https://spsprodcin2.vssps.visualstudio.com/A64933cd1-34af-45f4-8a18-45cb982e7998/_apis/Identities/d2145d45-4253-6f16-9688-391s21a6f728',
        _links: {
          avatar: {
            href: 'https://dev.azure.com/Soliton/_apis/GraphProfile/MemberAvatars/aad.ZDI3NDVkNDUtNDI1My03ZjE2LTk1ODftMzkxYzIxYTZmNzY4',
          },
        },
        id: 'a2445d45-4253-6f16-9682-391c21a6f768',
        uniqueName: 'developer.4@solitontech.com',
        imageUrl: 'https://dev.azure.com/Soliton/_api/_common/identityImage?id=d2745d45-4253-6f16-9688-391c21a6f768',
        descriptor: 'aad.ZDI3NDVkNDUtNDI1My03ZiE1LTk2ODgtMzkxYzIxYTZmNzY4',
      },
      url: 'https://dev.azure.com/Soliton/66c3016e-9f23-4861-bdd8-81be4d509c2e/_apis/git/repositories/fe7b3b03-e25f-48d5-97be-19759b2f010b/refs?filter=heads%25Automation',
    },
    {
      name: 'refs/heads/dev5_code_review_updates',
      objectId: '09e9845ca7ad93abe9c0d5d69fb08d9c1153c1b4',
      creator: {
        displayName: 'Developer 5',
        url: 'https://spsprodcin2.vssps.visualstudio.com/A64933cd1-34af-45f4-8a18-45cb982e7998/_apis/Identities/d2145d45-4253-6f16-9688-391s21a6f728',
        _links: {
          avatar: {
            href: 'https://dev.azure.com/Soliton/_apis/GraphProfile/MemberAvatars/aad.ZDI3NDVkNDUtNDI1My03ZjE2LTk1ODftMzkxYzIxYTZmNzY4',
          },
        },
        id: 'a2445d45-4253-6f16-9682-391c21a6f768',
        uniqueName: 'developer.5@solitontech.com',
        imageUrl: 'https://dev.azure.com/Soliton/_api/_common/identityImage?id=d2745d45-4253-6f16-9688-391c21a6f768',
        descriptor: 'aad.ZDI3NDVkNDUtNDI1My03ZiE1LTk2ODgtMzkxYzIxYTZmNzY4',
      },
      url: 'https://dev.azure.com/Soliton/66c3016e-9f23-4861-bdd8-81be4d509c2e/_apis/git/repositories/fe7b3b03-e25f-48d5-97be-19759b2f010b/refs?filter=heads%25Automation',
    },
    {
      name: 'refs/heads/user/LV/LabVIEW_VI_Analyzer',
      objectId: 'bf18e47q108e0ebd8319560690c02f9c4424afea',
      creator: {
        displayName: 'Developer 6',
        url: 'https://spsprodcin2.vssps.visualstudio.com/A64933cd1-34af-45f4-8a18-45cb982e7998/_apis/Identities/d2145d45-4253-6f16-9688-391s21a6f728',
        _links: {
          avatar: {
            href: 'https://dev.azure.com/Soliton/_apis/GraphProfile/MemberAvatars/aad.ZDI3NDVkNDUtNDI1My03ZjE2LTk1ODftMzkxYzIxYTZmNzY4',
          },
        },
        id: 'a2445d45-4253-6f16-9682-391c21a6f768',
        uniqueName: 'developer.6@solitontech.com',
        imageUrl: 'https://dev.azure.com/Soliton/_api/_common/identityImage?id=d2745d45-4253-6f16-9688-391c21a6f768',
        descriptor: 'aad.ZDI3NDVkNDUtNDI1My03ZiE1LTk2ODgtMzkxYzIxYTZmNzY4',
      },
      url: 'https://dev.azure.com/Soliton/66c3016e-9f23-4861-bdd8-81be4d509c2e/_apis/git/repositories/fe7b3b03-e25f-48d5-97be-19759b2f010b/refs?filter=heads%25Automation',
    },
    {
      name: 'refs/heads/user/dev7/21110_MDV_Dragon_MAVIS_Implementation',
      objectId: 'd60f2173617cebfe1a8161ba09cbfb8f48a37d53',
      creator: {
        displayName: 'Developer 7',
        url: 'https://spsprodcin2.vssps.visualstudio.com/A64933cd1-34af-45f4-8a18-45cb982e7998/_apis/Identities/d2145d45-4253-6f16-9688-391s21a6f728',
        _links: {
          avatar: {
            href: 'https://dev.azure.com/Soliton/_apis/GraphProfile/MemberAvatars/aad.ZDI3NDVkNDUtNDI1My03ZjE2LTk1ODftMzkxYzIxYTZmNzY4',
          },
        },
        id: 'a2445d45-4253-6f16-9682-391c21a6f768',
        uniqueName: 'developer.7@solitontech.com',
        imageUrl: 'https://dev.azure.com/Soliton/_api/_common/identityImage?id=d2745d45-4253-6f16-9688-391c21a6f768',
        descriptor: 'aad.ZDI3NDVkNDUtNDI1My03ZiE1LTk2ODgtMzkxYzIxYTZmNzY4',
      },
      url: 'https://dev.azure.com/Soliton/66c3016e-9f23-4861-bdd8-81be4d509c2e/_apis/git/repositories/fe7b3b03-e25f-48d5-97be-19759b2f010b/refs?filter=heads%25Automation',
    },
    {
      name: 'refs/heads/user/dev8/AddProjectOverviewDocument',
      objectId: '4c4195893fea95d63236ae3874ba7614d4dbf025',
      creator: {
        displayName: 'Developer 8',
        url: 'https://spsprodcin2.vssps.visualstudio.com/A64933cd1-34af-45f4-8a18-45cb982e7998/_apis/Identities/d2145d45-4253-6f16-9688-391s21a6f728',
        _links: {
          avatar: {
            href: 'https://dev.azure.com/Soliton/_apis/GraphProfile/MemberAvatars/aad.ZDI3NDVkNDUtNDI1My03ZjE2LTk1ODftMzkxYzIxYTZmNzY4',
          },
        },
        id: 'a2445d45-4253-6f16-9682-391c21a6f768',
        uniqueName: 'developer.8@solitontech.com',
        imageUrl: 'https://dev.azure.com/Soliton/_api/_common/identityImage?id=d2745d45-4253-6f16-9688-391c21a6f768',
        descriptor: 'aad.ZDI3NDVkNDUtNDI1My03ZiE1LTk2ODgtMzkxYzIxYTZmNzY4',
      },
      url: 'https://dev.azure.com/Soliton/66c3016e-9f23-4861-bdd8-81be4d509c2e/_apis/git/repositories/fe7b3b03-e25f-48d5-97be-19759b2f010b/refs?filter=heads%25Automation',
    },
    {
      name: 'refs/heads/user/dev9/20526_Alps_SensART',
      objectId: '2e125aebdf1bfc352b429411f27d3a0c7cd1f9ee',
      creator: {
        displayName: 'Developer 9',
        url: 'https://spsprodcin2.vssps.visualstudio.com/A64933cd1-34af-45f4-8a18-45cb982e7998/_apis/Identities/d2145d45-4253-6f16-9688-391s21a6f728',
        _links: {
          avatar: {
            href: 'https://dev.azure.com/Soliton/_apis/GraphProfile/MemberAvatars/aad.ZDI3NDVkNDUtNDI1My03ZjE2LTk1ODftMzkxYzIxYTZmNzY4',
          },
        },
        id: 'a2445d45-4253-6f16-9682-391c21a6f768',
        uniqueName: 'developer.9@solitontech.com',
        imageUrl: 'https://dev.azure.com/Soliton/_api/_common/identityImage?id=d2745d45-4253-6f16-9688-391c21a6f768',
        descriptor: 'aad.ZDI3NDVkNDUtNDI1My03ZiE1LTk2ODgtMzkxYzIxYTZmNzY4',
      },
      url: 'https://dev.azure.com/Soliton/66c3016e-9f23-4861-bdd8-81be4d509c2e/_apis/git/repositories/fe7b3b03-e25f-48d5-97be-19759b2f010b/refs?filter=heads%25Automation',
    },
    {
      name: 'refs/heads/users/dev1/clean-code-cheatsheet',
      objectId: '4b2b9a9fb5ce64024bdf455e675143a29ab4ec32',
      creator: {
        displayName: 'Developer 10',
        url: 'https://spsprodcin2.vssps.visualstudio.com/A64933cd1-34af-45f4-8a18-45cb982e7998/_apis/Identities/d2145d45-4253-6f16-9688-391s21a6f728',
        _links: {
          avatar: {
            href: 'https://dev.azure.com/Soliton/_apis/GraphProfile/MemberAvatars/aad.ZDI3NDVkNDUtNDI1My03ZjE2LTk1ODftMzkxYzIxYTZmNzY4',
          },
        },
        id: 'a2445d45-4253-6f16-9682-391c21a6f768',
        uniqueName: 'developer.10@solitontech.com',
        imageUrl: 'https://dev.azure.com/Soliton/_api/_common/identityImage?id=d2745d45-4253-6f16-9688-391c21a6f768',
        descriptor: 'aad.ZDI3NDVkNDUtNDI1My03ZiE1LTk2ODgtMzkxYzIxYTZmNzY4',
      },
      url: 'https://dev.azure.com/Soliton/66c3016e-9f23-4861-bdd8-81be4d509c2e/_apis/git/repositories/fe7b3b03-e25f-48d5-97be-19759b2f010b/refs?filter=heads%25Automation',
    },
    {
      name: 'refs/heads/users/dev2/project-overview',
      objectId: '47i56ed4e1c687c38356f51a80911087072cb469',
      creator: {
        displayName: 'Developer 11',
        url: 'https://spsprodcin2.vssps.visualstudio.com/A64933cd1-34af-45f4-8a18-45cb982e7998/_apis/Identities/d2145d45-4253-6f16-9688-391s21a6f728',
        _links: {
          avatar: {
            href: 'https://dev.azure.com/Soliton/_apis/GraphProfile/MemberAvatars/aad.ZDI3NDVkNDUtNDI1My03ZjE2LTk1ODftMzkxYzIxYTZmNzY4',
          },
        },
        id: 'a2445d45-4253-6f16-9682-391c21a6f768',
        uniqueName: 'developer.11@solitontech.com',
        imageUrl: 'https://dev.azure.com/Soliton/_api/_common/identityImage?id=d2745d45-4253-6f16-9688-391c21a6f768',
        descriptor: 'aad.ZDI3NDVkNDUtNDI1My03ZiE1LTk2ODgtMzkxYzIxYTZmNzY4',
      },
      url: 'https://dev.azure.com/Soliton/66c3016e-9f23-4861-bdd8-81be4d509c2e/_apis/git/repositories/fe7b3b03-e25f-48d5-97be-19759b2f010b/refs?filter=heads%25Automation',
    },
    {
      name: 'refs/heads/users/dev2/taf-project-overview',
      objectId: '56304e0df690193b784c4f6997bd42051117d459',
      creator: {
        displayName: 'Developer 12',
        url: 'https://spsprodcin2.vssps.visualstudio.com/A64933cd1-34af-45f4-8a18-45cb982e7998/_apis/Identities/d2145d45-4253-6f16-9688-391s21a6f728',
        _links: {
          avatar: {
            href: 'https://dev.azure.com/Soliton/_apis/GraphProfile/MemberAvatars/aad.ZDI3NDVkNDUtNDI1My03ZjE2LTk1ODftMzkxYzIxYTZmNzY4',
          },
        },
        id: 'a2445d45-4253-6f16-9682-391c21a6f768',
        uniqueName: 'developer.12@solitontech.com',
        imageUrl: 'https://dev.azure.com/Soliton/_api/_common/identityImage?id=d2745d45-4253-6f16-9688-391c21a6f768',
        descriptor: 'aad.ZDI3NDVkNDUtNDI1My03ZiE1LTk2ODgtMzkxYzIxYTZmNzY4',
      },
      url: 'https://dev.azure.com/Soliton/66c3016e-9f23-4861-bdd8-81be4d509c2e/_apis/git/repositories/fe7b3b03-e25f-48d5-97be-19759b2f010b/refs?filter=heads%25Automation',
    },
    {
      name: 'refs/heads/users/dev3/software-practice-skills',
      objectId: '45bd0e9a01fbcbcaa36785c214327ac116540518',
      creator: {
        displayName: 'Developer 13',
        url: 'https://spsprodcin2.vssps.visualstudio.com/A64933cd1-34af-45f4-8a18-45cb982e7998/_apis/Identities/d2145d45-4253-6f16-9688-391s21a6f728',
        _links: {
          avatar: {
            href: 'https://dev.azure.com/Soliton/_apis/GraphProfile/MemberAvatars/aad.ZDI3NDVkNDUtNDI1My03ZjE2LTk1ODftMzkxYzIxYTZmNzY4',
          },
        },
        id: 'a2445d45-4253-6f16-9682-391c21a6f768',
        uniqueName: 'developer.13@solitontech.com',
        imageUrl: 'https://dev.azure.com/Soliton/_api/_common/identityImage?id=d2745d45-4253-6f16-9688-391c21a6f768',
        descriptor: 'aad.ZDI3NDVkNDUtNDI1My03ZiE1LTk2ODgtMzkxYzIxYTZmNzY4',
      },
      url: 'https://dev.azure.com/Soliton/66c3016e-9f23-4861-bdd8-81be4d509c2e/_apis/git/repositories/fe7b3b03-e25f-48d5-97be-19759b2f010b/refs?filter=heads%25Automation',
    },
    {
      name: 'refs/heads/users/dev3/soliton-tech-practices',
      objectId: '248c1e11d2ae0f64dfe04d834022595f0fce6e5c',
      creator: {
        displayName: 'Developer 14',
        url: 'https://spsprodcin2.vssps.visualstudio.com/A64933cd1-34af-45f4-8a18-45cb982e7998/_apis/Identities/d2145d45-4253-6f16-9688-391s21a6f728',
        _links: {
          avatar: {
            href: 'https://dev.azure.com/Soliton/_apis/GraphProfile/MemberAvatars/aad.ZDI3NDVkNDUtNDI1My03ZjE2LTk1ODftMzkxYzIxYTZmNzY4',
          },
        },
        id: 'a2445d45-4253-6f16-9682-391c21a6f768',
        uniqueName: 'developer.14@solitontech.com',
        imageUrl: 'https://dev.azure.com/Soliton/_api/_common/identityImage?id=d2745d45-4253-6f16-9688-391c21a6f768',
        descriptor: 'aad.ZDI3NDVkNDUtNDI1My03ZiE1LTk2ODgtMzkxYzIxYTZmNzY4',
      },
      url: 'https://dev.azure.com/Soliton/66c3016e-9f23-4861-bdd8-81be4d509c2e/_apis/git/repositories/fe7b3b03-e25f-48d5-97be-19759b2f010b/refs?filter=heads%25Automation',
    },
    {
      name: 'refs/heads/dev10_ADI_LabVIEWSTS',
      objectId: 'ab181650b0742eb2d6a15ae58f4c2ef4314a2ec5',
      creator: {
        displayName: 'Developer 15',
        url: 'https://spsprodcin2.vssps.visualstudio.com/A64933cd1-34af-45f4-8a18-45cb982e7998/_apis/Identities/d2145d45-4253-6f16-9688-391s21a6f728',
        _links: {
          avatar: {
            href: 'https://dev.azure.com/Soliton/_apis/GraphProfile/MemberAvatars/aad.ZDI3NDVkNDUtNDI1My03ZjE2LTk1ODftMzkxYzIxYTZmNzY4',
          },
        },
        id: 'a2445d45-4253-6f16-9682-391c21a6f768',
        uniqueName: 'developer.15@solitontech.com',
        imageUrl: 'https://dev.azure.com/Soliton/_api/_common/identityImage?id=d2745d45-4253-6f16-9688-391c21a6f768',
        descriptor: 'aad.ZDI3NDVkNDUtNDI1My03ZiE1LTk2ODgtMzkxYzIxYTZmNzY4',
      },
      url: 'https://dev.azure.com/Soliton/66c3016e-9f23-4861-bdd8-81be4d509c2e/_apis/git/repositories/fe7b3b03-e25f-48d5-97be-19759b2f010b/refs?filter=heads%25Automation',
    },
  ],
  count: 15,
};

export const SERVER_BRANCHES_RESPONSE = {
  branchesFollowingNamingStandard: {
    branches: [
      {
        id: '4b2b9a9fb5ce64024bdf455e675143a29ab4ec32',
        name: 'users/dev1/clean-code-cheatsheet',
        url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}?version=GBusers%2Fdev1%2Fclean-code-cheatsheet`,
      },
      {
        id: '47i56ed4e1c687c38356f51a80911087072cb469',
        name: 'users/dev2/project-overview',
        url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}?version=GBusers%2Fdev2%2Fproject-overview`,
      },
      {
        id: '56304e0df690193b784c4f6997bd42051117d459',
        name: 'users/dev2/taf-project-overview',
        url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}?version=GBusers%2Fdev2%2Ftaf-project-overview`,
      },
      {
        id: '45bd0e9a01fbcbcaa36785c214327ac116540518',
        name: 'users/dev3/software-practice-skills',
        url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}?version=GBusers%2Fdev3%2Fsoftware-practice-skills`,
      },
      {
        id: '248c1e11d2ae0f64dfe04d834022595f0fce6e5c',
        name: 'users/dev3/soliton-tech-practices',
        url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}?version=GBusers%2Fdev3%2Fsoliton-tech-practices`,
      },
    ],
    count: 5,
  },
  branchesNotFollowingNamingStandard: {
    branches: [
      {
        id: 'a30a4b19037819eed3ded296ae074f7443f803f2',
        name: '25Automation',
        url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}?version=GB25Automation`,
      },
      {
        id: 'gg241820aa025c3af63c4aa990f35bfd31f3eac2',
        name: 'development',
        url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}?version=GBdevelopment`,
      },
      {
        id: '29625befc34389d0404ce4b8a29bf3f7d96d1235',
        name: 'main',
        url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}?version=GBmain`,
      },
      {
        id: '736f4f3ec1fc3159534cedc7bc3272dd2f1f7f93',
        name: 'react-starter-code',
        url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}?version=GBreact-starter-code`,
      },
      {
        id: '09e9845ca7ad93abe9c0d5d69fb08d9c1153c1b4',
        name: 'dev5_code_review_updates',
        url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}?version=GBdev5_code_review_updates`,
      },
      {
        id: 'bf18e47q108e0ebd8319560690c02f9c4424afea',
        name: 'user/LV/LabVIEW_VI_Analyzer',
        url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}?version=GBuser%2FLV%2FLabVIEW_VI_Analyzer`,
      },
      {
        id: 'd60f2173617cebfe1a8161ba09cbfb8f48a37d53',
        name: 'user/dev7/21110_MDV_Dragon_MAVIS_Implementation',
        url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}?version=GBuser%2Fdev7%2F21110_MDV_Dragon_MAVIS_Implementation`,
      },
      {
        id: '4c4195893fea95d63236ae3874ba7614d4dbf025',
        name: 'user/dev8/AddProjectOverviewDocument',
        url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}?version=GBuser%2Fdev8%2FAddProjectOverviewDocument`,
      },
      {
        id: '2e125aebdf1bfc352b429411f27d3a0c7cd1f9ee',
        name: 'user/dev9/20526_Alps_SensART',
        url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}?version=GBuser%2Fdev9%2F20526_Alps_SensART`,
      },
      {
        id: 'ab181650b0742eb2d6a15ae58f4c2ef4314a2ec5',
        name: 'dev10_ADI_LabVIEWSTS',
        url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}?version=GBdev10_ADI_LabVIEWSTS`,
      },
    ],
    count: 10,
  },
  branchesURL: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/branches?a=all&_a=all`,
  percentageOfBranchesFollowingStandard: '33.33%',
  totalNumberOfBranches: 15,
};
