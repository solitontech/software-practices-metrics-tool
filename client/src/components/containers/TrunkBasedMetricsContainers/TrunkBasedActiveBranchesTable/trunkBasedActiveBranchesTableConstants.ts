import { IActiveBranchesTableColumn } from "./trunkBasedActiveBranchesTableTypes";

export const columns: IActiveBranchesTableColumn[] = [
  {
    id: "name",
    label: "Branch Name",
    width: 200,
    align: "left",
  },
  {
    id: "title",
    label: "Pull Request Title",
    width: 200,
    align: "left",
  },
  {
    id: "createdBy",
    label: "Author",
    width: 200,
    align: "left",
  },
  {
    id: "creationDate",
    label: "Creation Date",
    width: 120,
    align: "left",
  },
];
