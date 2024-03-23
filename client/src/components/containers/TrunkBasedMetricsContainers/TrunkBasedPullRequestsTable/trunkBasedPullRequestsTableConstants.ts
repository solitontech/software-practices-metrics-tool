import { ITrunkBasedPullRequestsTableColumn } from "./trunkBasedPullRequestsTableTypes";

export const tableColumns: ITrunkBasedPullRequestsTableColumn[] = [
  {
    id: "creationDate",
    label: "Start Date",
    width: 110,
    align: "left",
  },
  {
    id: "closedDate",
    label: "End Date",
    width: 110,
    align: "left",
  },
  {
    id: "name",
    label: "Branch Name",
    width: 430,
    align: "left",
  },
  {
    id: "title",
    label: "Pull Request Title",
    width: 430,
    align: "left",
  },
  {
    id: "status",
    label: "Status",
    width: 200,
    align: "left",
  },
];
