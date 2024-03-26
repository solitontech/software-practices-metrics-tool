import { IActiveBranchesTableColumn } from "./trunkBasedActiveBranchesTableTypes";

export const columns: IActiveBranchesTableColumn[] = [
  {
    id: "name",
    label: "Branch Name",
    width: 275,
    align: "left",
  },
  {
    id: "title",
    label: "Pull Request Title",
    width: 275,
    align: "left",
  },
  {
    id: "createdBy",
    label: "Author",
    width: 185,
    align: "left",
  },
  {
    id: "creationDate",
    label: "Creation Date",
    width: 170,
    align: "left",
  },
];
