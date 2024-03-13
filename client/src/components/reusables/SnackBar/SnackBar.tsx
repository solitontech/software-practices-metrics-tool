import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

interface ISnackBarProps {
  isOpen: boolean;
  handleClose: () => void;
  message: string;
  duration?: number;
  marginTop?: string;
  severity?: "error" | "warning" | "info" | "success";
  anchorOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  };
}

export const SnackBar = ({
  isOpen,
  handleClose,
  message,
  duration = 6000,
  marginTop = "100px",
  severity = "error",
  anchorOrigin = { vertical: "top", horizontal: "center" },
}: ISnackBarProps) => {
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
      sx={{ marginTop }}
    >
      <MuiAlert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};
