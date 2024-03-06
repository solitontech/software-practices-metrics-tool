import {
  IActiveBranches,
  ITotalBranches,
} from "../../../../../../src/components/containers/TrunkBasedMetricsContainers/TrunkBasedMetricsTiles/interfaces";

export const BRANCHES: ITotalBranches = {
  branchesURL: "mockURL",
  totalNumberOfBranches: 10,
  percentageOfBranchesFollowingStandard: "50%",
  branchesFollowingNamingStandard: {
    count: 3,
    branches: [
      {
        id: "42662132be45a414915197ad4ea009cc40e45669",
        name: "users/Kaya/20_Pokmon_FY2_CW",
        url: "https://dev.azure.com/Soliton/SolitonCentral/_git/SolitonCentral?version=GBusers%2FKaya%2F20_Pokmon_FY2_CW",
      },
      {
        id: "6377bd4e19a9caf5c0be5be819ed63e47b1ea7ff",
        name: "users/Mohan/rypto8",
        url: "https://dev.azure.com/Soliton/SolitonCentral/_git/SolitonCentral?version=GBusers%2FMohan%2Frypto8",
      },
      {
        id: "2a7826ee62073d20433e32ac1fa38c17de1b660a",
        name: "users/Nish/rypto7",
        url: "https://dev.azure.com/Soliton/SolitonCentral/_git/SolitonCentral?version=GBusers%2FNish%2Frypto7",
      },
    ],
  },
  branchesNotFollowingNamingStandard: {
    count: 2,
    branches: [
      {
        id: "b31b4b19037819eed7ded296ae074f7443f803f3",
        name: "20Bis2Automation",
        url: "https://dev.azure.com/Soliton/SolitonCentral/_git/SolitonCentral?version=GB20Bis2Automation",
      },
      {
        id: "ff34130aa025c3af63c4aa990f35bfd31f3eac2",
        name: "development",
        url: "https://dev.azure.com/Soliton/SolitonCentral/_git/SolitonCentral?version=GBdevelopment",
      },
    ],
  },
};

export const ACTIVE_BRANCHES: IActiveBranches = {
  count: 2,
  branches: [
    {
      name: "branch1",
      title: "pull request 1",
      creationDate: "2021-06-01",
      createdBy: "user1",
      pullRequestURL: "mockURL",
      branchURL: "mockURL",
    },
    {
      name: "branch2",
      title: "pull request 2",
      creationDate: "2021-06-02",
      createdBy: "user2",
      pullRequestURL: "mockURL",
      branchURL: "mockURL",
    },
  ],
};
