import { IFetchedTrunkMetricsBranch } from "src/fetchers";

export const filterBranches = (searchKeyword: string, branches: IFetchedTrunkMetricsBranch[]) => {
  if (!searchKeyword) {
    return branches;
  }

  const searchTerm = searchKeyword.toLocaleLowerCase();

  return branches.filter(({ name }) => {
    return name.toLocaleLowerCase().includes(searchTerm);
  });
};
