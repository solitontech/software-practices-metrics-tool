import InfoIcon from "@mui/icons-material/Info";
import { Tooltip } from "@mui/material";
import clsx from "clsx";

import styles from "./InfoIconTooltip.module.scss";

interface IInfoIconTooltipProps {
  content: string;
  className?: string;
}

export const InfoIconTooltip = ({ content, className }: IInfoIconTooltipProps) => {
  const title = <span className={styles.toolTip}>{content}</span>;

  return (
    <span className={styles.infoIconContainer}>
      <Tooltip arrow title={title} data-testid={content}>
        <InfoIcon className={clsx(styles.infoIcon, className)} />
      </Tooltip>
    </span>
  );
};
