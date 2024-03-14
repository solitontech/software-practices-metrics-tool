export interface ITrunkBasedPullRequestsTableColumn {
  id: "name" | "title" | "creationDate" | "closedDate" | "status";
  label: string;
  width: number;
  align: "center" | "left" | "right";
}
