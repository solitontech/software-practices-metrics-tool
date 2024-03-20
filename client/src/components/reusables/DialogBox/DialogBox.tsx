import { useId } from "react";

import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import styles from "./DialogBox.module.scss";

interface IDialogBoxProps {
  isOpen: boolean;
  handleClose: () => void;
  title: React.ReactNode | string;
  children: React.ReactNode;
  dialogClassName: string;
}

export const DialogBox = ({ isOpen, handleClose, children, title, dialogClassName: dialogStyles }: IDialogBoxProps) => {
  const id = useId();

  return (
    <Dialog
      aria-labelledby={id}
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        className: `${dialogStyles} ${styles.dialog}`,
      }}
    >
      <DialogTitle id={id} className={styles.titleContainer}>
        <h5 className={styles.title}>{title}</h5>
        <button className={styles.closeButton}>
          <CloseIcon onClick={handleClose} />
        </button>
      </DialogTitle>

      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
