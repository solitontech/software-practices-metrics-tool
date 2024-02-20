import { IColumn } from "./interfaces";

export const BASE_PERCENTAGE = 100;
export const COMPLETED = "completed";

export const columns: readonly IColumn[] = [
  {
    id: "creationDate",
    label: "Start Date",
    width: 150,
    align: "left",
  },
  {
    id: "closedDate",
    label: "End Date",
    width: 150,
    align: "left",
  },
  {
    id: "name",
    label: "Branch Name",
    width: 300,
    align: "left",
  },
  {
    id: "title",
    label: "Pull Request Title",
    width: 300,
    align: "left",
  },
  {
    id: "status",
    label: "Status",
    width: 200,
    align: "left",
  },
];
