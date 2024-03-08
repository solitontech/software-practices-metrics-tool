import { IBranchInfo } from "../TrunkBasedMetricsTiles/interfaces";

export const filterBranches = (branches: IBranchInfo[], searchTerm: string): IBranchInfo[] => {
  const normalizedSearchTerm = searchTerm.toLocaleLowerCase();

  return branches.filter(({ name }) => {
    return name.toLocaleLowerCase().includes(normalizedSearchTerm);
  });
};
