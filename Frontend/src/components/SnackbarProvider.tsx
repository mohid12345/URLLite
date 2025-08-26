import React, { createContext, useContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";

type SnackbarContextType = {
  showMessage: (msg: string) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const useSnackbar = () => {
  const ctx = useContext(SnackbarContext);
  if (!ctx) throw new Error("useSnackbar must be used inside SnackbarProvider");
  return ctx;
};

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const showMessage = (msg: string) => {
    setMessage(msg);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        message={message}
        action={
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
        }
      />
    </SnackbarContext.Provider>
  );
};
