export interface IData {
  author: string;
  time: Date;
  vote: string;
}

export interface IColumn {
  id: "author" | "time" | "vote";
  label: string;
  width?: number;
  align?: "center" | "left" | "right";
}

export interface IVotesLabel {
  approved: string;
  rejected: string;
  approvedWithSuggestions: string;
  waitForAuthor: string;
  noVote: string;
}
