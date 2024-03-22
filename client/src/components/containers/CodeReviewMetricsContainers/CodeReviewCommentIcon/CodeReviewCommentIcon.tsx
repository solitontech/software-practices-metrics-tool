import { memo } from "react";

import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";

import styles from "./CodeReviewCommentIcon.module.scss";

interface ICodeReviewCommentIconProps {
  total: number;
  nit: number;
  major: number;
  reviewerComments: string;
}

export const CodeReviewCommentIcon = memo(({ total, nit, major, reviewerComments }: ICodeReviewCommentIconProps) => {
  const title = `${reviewerComments} NIT - ${nit} | MAJOR - ${major} | GENERAL - ${total - (nit + major)} `;
  return (
    <div className={styles.container} title={title}>
      <QuestionAnswerOutlinedIcon className={styles.icon} />
      <p>{total}</p>
    </div>
  );
});

CodeReviewCommentIcon.displayName = "CodeReviewCommentIcon";
