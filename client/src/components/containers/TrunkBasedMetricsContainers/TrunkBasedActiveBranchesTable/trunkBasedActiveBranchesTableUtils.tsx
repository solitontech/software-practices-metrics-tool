import { IFetchedTrunkBasedActiveBranch } from "src/fetchers/fetchers";
import { formatDate } from "src/utils/utils";

export function filterActiveBranches(searchKeyword: string, branches: IFetchedTrunkBasedActiveBranch[]) {
  if (!searchKeyword) {
    return branches;
  }

  const searchTerm = searchKeyword.toLocaleLowerCase();

  return branches.filter(({ title, creationDate, name, createdBy }) => {
    const formattedCreationDate = formatDate(creationDate);

    return (
      title.toLocaleLowerCase().includes(searchTerm) ||
      creationDate.toLocaleLowerCase().includes(searchTerm) ||
      formattedCreationDate.toLocaleLowerCase().includes(searchTerm) ||
      createdBy.toLocaleLowerCase().includes(searchTerm) ||
      name.toLocaleLowerCase().includes(searchTerm)
    );
  });
}
