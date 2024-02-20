import { memo } from "react";

import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";

import styles from "./CodeReviewMetricsTable.module.scss";

interface Props {
  total: number;
  nit: number;
  major: number;
  reviewerComments: string;
}

export const CustomCommentIcon = memo(
  ({ total, nit, major, reviewerComments }: Props) => {
    return (
      <div
        className={styles.comments}
        title={`${reviewerComments} NIT - ${nit} | MAJOR - ${major} | GENERAL - ${
          total - (nit + major)
        } `}
      >
        <QuestionAnswerOutlinedIcon className={styles.icon} />
        <div>{total}</div>
      </div>
    );
  },
);

CustomCommentIcon.displayName = "CustomCommentIcon";
