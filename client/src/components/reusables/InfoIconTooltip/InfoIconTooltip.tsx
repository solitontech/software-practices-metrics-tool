import InfoIcon from "@mui/icons-material/Info";
import { Tooltip } from "@mui/material";

import styles from "./InfoIconTooltip.module.scss";

interface IInfoIconTooltipProps {
  content: string;
  size: string;
}

export const InfoIconTooltip = ({ content, size }: IInfoIconTooltipProps) => {
  const title = <span className={styles.toolTip}>{content}</span>;

  return (
    <div className={styles.infoIcon}>
      <Tooltip arrow title={title} data-testid={content}>
        <InfoIcon style={{ fontSize: size }} />
      </Tooltip>
    </div>
  );
};
