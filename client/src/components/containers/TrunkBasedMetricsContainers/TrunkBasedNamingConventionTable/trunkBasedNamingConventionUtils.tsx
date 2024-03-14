import { IFetchedTrunkMetricsBranch } from "src/fetchers";

export const filterBranches = (searchKeyword: string, branches: IFetchedTrunkMetricsBranch[]) => {
  const searchTerm = searchKeyword.toLocaleLowerCase();

  return branches.filter(({ name }) => {
    return name.toLocaleLowerCase().includes(searchTerm);
  });
};
