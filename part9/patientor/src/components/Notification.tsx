import { useEffect } from "react";
import { Alert, AlertTitle } from "@mui/material";
import { Message } from "../types";

export interface NotificationProps {
  message: Message,
  setMessage: (message: Message) => void
}

export default function Notification({ message, setMessage }: NotificationProps) {

  useEffect(() => {
    if (message.value) {
      const timer = setTimeout(() => {
        setMessage({ value: '', type: 'success' });
      }, 15000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [message, setMessage]);

  if (!message.value) {
    return null;
  }

  return (
    <Alert severity={message.type} onClose={() => setMessage({ value: '', type: 'success' })}>
      <AlertTitle>{message.type.charAt(0).toUpperCase() + message.type.slice(1)}</AlertTitle>
      {message.value}
    </Alert>
  );
}
