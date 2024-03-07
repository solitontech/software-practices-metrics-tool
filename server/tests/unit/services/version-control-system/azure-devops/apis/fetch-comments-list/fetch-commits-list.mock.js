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
