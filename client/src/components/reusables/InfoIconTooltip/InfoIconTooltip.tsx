import InfoIcon from "@mui/icons-material/Info";
import { Tooltip } from "@mui/material";

import styles from "./InfoIconTooltip.module.scss";

interface IInfoIconTooltipProps {
  content: string;
  iconClassName?: string;
}

export const InfoIconTooltip = ({
  content,
  iconClassName: infoIconStyles = styles.infoIcon,
}: IInfoIconTooltipProps) => {
  const title = <span className={styles.toolTip}>{content}</span>;

  return (
    <span className={styles.infoIconContainer}>
      <Tooltip arrow title={title} data-testid={content}>
        <InfoIcon className={infoIconStyles} />
      </Tooltip>
    </span>
  );
};
