import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

interface Props {
  open: boolean;
  onClose: () => void;
  message: string;
  duration?: number;
}

export const SnackbarMessage = ({ open, onClose, message, duration = 6000 }: Props) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{ marginTop: "120px" }}
    >
      <MuiAlert onClose={onClose} severity="error" sx={{ width: "100%" }}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default SnackbarMessage;
