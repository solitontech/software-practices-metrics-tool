export const AZURE_ALL_BRANCHES = {
  value: [
    {
      name: 'users/name/feature',
      objectId: '1',
      creator: {},
      url: '',
    },
    {
      name: 'feature/dummy',
      objectId: '2',
      creator: {},
      url: '',
    },
  ],
  count: 2,
};

export const BRANCHES_RESPONSE = {
  branchesFollowingNamingStandard: {
    branches: [
      {
        id: '1',
        name: 'users/name/feature',
        url: 'https://dev.azure.com/Soliton/my_project/_git/my_repository?version=GBusers%2Fname%2Ffeature',
      },
    ],
    count: 1,
  },
  branchesNotFollowingNamingStandard: {
    branches: [
      {
        id: '2',
        name: 'feature/dummy',
        url: 'https://dev.azure.com/Soliton/my_project/_git/my_repository?version=GBfeature%2Fdummy',
      },
    ],
    count: 1,
  },
  branchesURL: 'https://dev.azure.com/Soliton/my_project/_git/my_repository/branches?a=all&_a=all',
  percentageOfBranchesFollowingStandard: '50.00%',
  totalNumberOfBranches: 2,
};
