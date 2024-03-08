import { formatDate } from "../../../../utils/formatTimeUtils";
import { IActiveBranch } from "../TrunkBasedMetricsTiles/interfaces";

export function filterActiveBranches(branches: IActiveBranch[], searchTerm: string): IActiveBranch[] {
  return branches.filter((row) => {
    const normalizedSearchTerm = searchTerm.toLocaleLowerCase();

    const { title, creationDate, name, createdBy } = row;

    const formattedCreationDate = formatDate(creationDate);

    return (
      title.toLowerCase().includes(normalizedSearchTerm) ||
      creationDate.toLowerCase().includes(normalizedSearchTerm) ||
      formattedCreationDate.toLowerCase().includes(normalizedSearchTerm) ||
      createdBy.toLowerCase().includes(normalizedSearchTerm) ||
      name.toLowerCase().includes(normalizedSearchTerm)
    );
  });
}
