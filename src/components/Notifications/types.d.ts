export interface NotificationsContextProviderProps {
  children: React.ReactNode;
}

export interface NotificationsContextValue {
  alertMessage: string;
  setAlertMessage: (message: string) => void;
}
