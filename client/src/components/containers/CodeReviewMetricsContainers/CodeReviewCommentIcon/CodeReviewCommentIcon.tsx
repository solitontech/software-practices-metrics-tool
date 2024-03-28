import { memo } from "react";

import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import clsx from "clsx";

import styles from "./CodeReviewCommentIcon.module.scss";

interface ICodeReviewCommentIconProps {
  total: number;
  nit: number;
  major: number;
  reviewerComments: string;
  className?: string;
}

export const CodeReviewCommentIcon = memo((props: ICodeReviewCommentIconProps) => {
  const { total, nit, major, reviewerComments, className } = props;

  const title = `${reviewerComments} NIT - ${nit} | MAJOR - ${major} | GENERAL - ${total - (nit + major)} `;

  return (
    <div className={clsx(styles.container, className)} title={title}>
      <QuestionAnswerOutlinedIcon className={styles.icon} />
      <p>{total}</p>
    </div>
  );
});

CodeReviewCommentIcon.displayName = "CodeReviewCommentIcon";
