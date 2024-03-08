import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import styles from "./DialogBox.module.scss";

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  content: React.ReactNode;
  minWidth: string;
}

export const DialogBox = ({ open, onClose, children, content, minWidth }: Props) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        style: {
          minWidth: minWidth,
        },
      }}
    >
      <DialogTitle id="alert-dialog-title" className={styles.dialogTitle}>
        <div className={styles.title}>{children}</div>
        <div className={styles.closeButton}>
          <CloseIcon onClick={onClose} />
        </div>
      </DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions className={styles.dialogActions}>
        <Button onClick={onClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
