import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, { toggleButtonGroupClasses } from "@mui/material/ToggleButtonGroup";

import { IMetricsView } from "./interfaces";
import styles from "./MetricsToggleTab.module.scss";

interface Props<T> {
  metricsViews: IMetricsView<T>[];
  selectedView: T;
  onViewChange: (newView: T) => void;
}

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    margin: theme.spacing(0.5),
    borderRadius: theme.shape.borderRadius,
  },
}));

export const MetricsToggleTab = <T,>({ metricsViews, selectedView, onViewChange }: Props<T>) => {
  const handleViewChange = (_event: React.MouseEvent<HTMLElement>, newValue: T | null) => {
    if (newValue) {
      onViewChange(newValue);
    }
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          border: (theme) => `1px solid ${theme.palette.divider}`,
          flexWrap: "wrap",
          width: "fit-content",
        }}
      >
        <StyledToggleButtonGroup value={selectedView} exclusive onChange={handleViewChange}>
          (
          {metricsViews.map((view) => {
            return (
              <ToggleButton key={view.value as string} value={view.value as string}>
                <div className={styles.toggle}>
                  {view.displayName} {view.icon}
                </div>
              </ToggleButton>
            );
          })}
          )
        </StyledToggleButtonGroup>
      </Paper>
    </>
  );
};
