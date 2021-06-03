import React, { useContext, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {
  NotificationsContextProviderProps,
  NotificationsContextValue,
} from "./types";

const NotificationsContext = React.createContext({});

export const useNotifications = () => {
  const { setAlertMessage } = useContext(
    NotificationsContext
  ) as NotificationsContextValue;
  return setAlertMessage;
};

export const NotificationsProvider: React.FC<NotificationsContextProviderProps> =
  ({ children }) => {
    const [alertMessage, setAlertMessage] = useState("");

    const handleAlertClose = () => setAlertMessage("");

    return (
      <NotificationsContext.Provider value={{ alertMessage, setAlertMessage }}>
        {children}
        <Snackbar
          open={!!alertMessage}
          autoHideDuration={2000}
          onClose={handleAlertClose}
        >
          <Alert severity="error">{alertMessage}</Alert>
        </Snackbar>
      </NotificationsContext.Provider>
    );
  };
