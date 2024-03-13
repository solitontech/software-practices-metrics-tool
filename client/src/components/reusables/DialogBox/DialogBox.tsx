import { useId } from "react";

import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import styles from "./DialogBox.module.scss";

interface IDialogBoxProps {
  isOpen: boolean;
  handleClose: () => void;
  title: React.ReactNode | string;
  children: React.ReactNode;
  width: string;
}

export const DialogBox = ({ isOpen, handleClose, children, title, width }: IDialogBoxProps) => {
  const id = useId();

  return (
    <Dialog
      aria-labelledby={id}
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        style: {
          minWidth: width,
        },
      }}
    >
      <DialogTitle id={id} className={styles.titleContainer}>
        <h5 className={styles.title}>{title}</h5>
        <button className={styles.closeButton}>
          <CloseIcon onClick={handleClose} />
        </button>
      </DialogTitle>

      <DialogContent>{children}</DialogContent>

      <DialogActions className={styles.actions}>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
