import InfoIcon from "@mui/icons-material/Info";
import { Tooltip, Typography } from "@mui/material";

import styles from "./InfoIconTooltip.module.scss";

interface Props {
  content: string;
  size: string;
}

export const InfoIconTooltip = ({ content, size }: Props) => {
  return (
    <div className={styles.infoIcon}>
      <Tooltip
        title={<Typography className={styles.toolTip}>{content}</Typography>}
        arrow
      >
        <InfoIcon style={{ fontSize: size }} />
      </Tooltip>
    </div>
  );
};
