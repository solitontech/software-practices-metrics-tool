import { Chip } from "./interfaces";

export const ALL_CHIPS = "";

export const CHIP: Chip[] = [
  {
    chipLabel: "Start Date",
    placeholder: "Search for start date",
    pullRequestKey: "creationDate",
    chipKey: "startdate",
  },
  {
    chipLabel: "End Date",
    placeholder: "Search for end date",
    pullRequestKey: "closedDate",
    chipKey: "enddate",
  },
  {
    chipLabel: "Title",
    placeholder: "Search for title",
    pullRequestKey: "title",
    chipKey: "title",
  },
  {
    chipLabel: "Tags",
    placeholder: "Search for tags",
    pullRequestKey: "tags",
    chipKey: "tags",
  },
  {
    chipLabel: "Author",
    placeholder: "Search for author",
    pullRequestKey: "createdBy",
    chipKey: "author",
  },
  {
    chipLabel: "Reviewer",
    placeholder: "Search for reviewer",
    pullRequestKey: "votesHistoryTimeline",
    chipKey: "reviewer",
  },
  {
    chipLabel: "Status",
    placeholder: "Search for status",
    pullRequestKey: "status",
    chipKey: "status",
  },
];

export type ChipKey = keyof typeof CHIP;
