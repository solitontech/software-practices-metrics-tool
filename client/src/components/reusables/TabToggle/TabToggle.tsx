import React, { MouseEvent } from "react";

import Paper from "@mui/material/Paper";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import styles from "./TabToggle.module.scss";

interface ITabToggleProps {
  selectedTab: string;
  tabs: {
    label: string;
    value: string;
    icon: React.ReactNode;
  }[];
  handleTabChange: (value: string) => void;
}

// TODO: user class instead of inline styles

export const TabToggle = ({ tabs, selectedTab, handleTabChange }: ITabToggleProps) => {
  const handleChange = (_event: MouseEvent, newValue: string | null) => {
    if (newValue) {
      handleTabChange(newValue);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        height: "50px",
      }}
    >
      <ToggleButtonGroup value={selectedTab} exclusive onChange={handleChange}>
        (
        {tabs.map((tab) => {
          return (
            <ToggleButton key={tab.value} value={tab.value}>
              <div className={styles.toggle}>
                <p>{tab.label}</p>
                <div className={styles.icon}>{tab.icon}</div>
              </div>
            </ToggleButton>
          );
        })}
        )
      </ToggleButtonGroup>
    </Paper>
  );
};
