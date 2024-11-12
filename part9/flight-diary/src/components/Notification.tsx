import { useEffect } from "react";
import { Message } from "../types";

const Notification = ( { message, setMessage }: { message: Message, setMessage: (message: Message) => void}) => {
  const { value, type } = message;

  const style = {
    color: type === 'success' ? 'green' : 'red',
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage({ value: '', type: 'success' });
    }, 5000);

    return () => {
      clearTimeout(timer);
    }
  }, [message, setMessage]);

  if (!value) {
    return null;
  }

  return (
    <div className={type} style={style}>
      {value}
    </div>
  );


}

export default Notification