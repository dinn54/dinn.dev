"use client";
import { createPortal } from "react-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
const Toast = ({
  open,
  setOpen,
  message,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message?: string;
}) => {
  return (
    <>
      {
        // open &&
        createPortal(
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={open}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
            sx={{ mt: "5rem", color: "#6a7de7" }}
          >
            <Alert
              onClose={() => setOpen(false)}
              severity="info"
              variant="filled"
              sx={{ width: "100%" }}
            >
              {message}
            </Alert>
          </Snackbar>,
          document.body,
        )
      }
    </>
  );
};

export default Toast;
