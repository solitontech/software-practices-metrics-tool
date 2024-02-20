import { CustomSortingIcon } from "./CustomSortingIcon";
import { IColumn } from "./interfaces";
import { CustomFilterIcon } from "./VotesFilter/CustomFilterIcon";

export const columns: readonly IColumn[] = [
  {
    id: "startDate",
    label: "Start Date",
    minWidth: 98,
    align: "left",
  },
  {
    id: "endDate",
    label: "End Date",
    minWidth: 98,
    align: "left",
  },
  {
    id: "title",
    label: "Title",
    minWidth: 340,
    align: "left",
  },
  {
    id: "tags",
    label: "Tags",
    minWidth: 150,
    align: "left",
  },
  {
    id: "createdBy",
    label: "Author",
    minWidth: 150,
    align: "left",
  },
  {
    id: "comments",
    label: "Comments",
    minWidth: 150,
    align: "left",
    action: CustomSortingIcon,
  },
  {
    id: "votesHistory",
    label: "Votes History",
    minWidth: 155,
    align: "center",
    action: CustomFilterIcon,
  },
  {
    id: "votes",
    label: "Current Votes",
    minWidth: 180,
    align: "center",
    action: CustomFilterIcon,
  },
  {
    id: "firstReviewResponseTimeInSeconds",
    label: "First Review Response Time",
    align: "left",
    minWidth: 160,
    action: CustomSortingIcon,
  },
  {
    id: "approvalTimeInSeconds",
    label: "Approval Time",
    align: "left",
    minWidth: 135,
    action: CustomSortingIcon,
  },
  {
    id: "mergeTimeInSeconds",
    label: "Merge Time",
    align: "left",
    minWidth: 120,
    action: CustomSortingIcon,
  },
  {
    id: "status",
    label: "Status",
    align: "left",
    minWidth: 120,
  },
];

export const sortMap = {
  asc: "asc",
  desc: "desc",
  noSort: " noSort",
};
