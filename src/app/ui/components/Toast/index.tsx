import React from "react";
import "./style.scss";

type ToastProps = {
  message: string;
  type: "success" | "error";
  onClose: () => void;
};

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  return (
    <div className={`toast toast--${type}`} onClick={onClose}>
      <p>{message}</p>
    </div>
  );
};

export default Toast;
