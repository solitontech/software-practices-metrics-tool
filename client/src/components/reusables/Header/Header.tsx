import React from "react";

import { Typography } from "@mui/material";

import styles from "./Header.module.scss";

interface Props {
  id?: string;
  pageHeader: string;
  searchBox?: React.ReactNode;
  filter?: React.ReactNode;
  searchDialogBox?: React.ReactNode;
}

export const Header = ({ id, pageHeader, searchBox, filter, searchDialogBox }: Props) => {
  return (
    <div className={styles.heading}>
      <Typography className={`${styles.labelHeader} `}>{pageHeader}</Typography>
      <div className={styles.actions}>
        {searchBox && (
          <div className={styles.searchBox} id={id}>
            {searchBox}
            {searchDialogBox && searchDialogBox}
          </div>
        )}
        {filter && <>{filter}</>}
      </div>
    </div>
  );
};
