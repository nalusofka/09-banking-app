import React from "react";
import "./style.scss";
import Title from "../Title";
import Body from "../Body";
import Button from "../Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onConfirm?: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <Title as="h4" color="primary">{title}</Title>
        <br />
        <Body color="primary">{children}</Body>
        <div className="modal-actions">
          <Button className="modal-button" onClick={onClose}>
            Cancelar
          </Button>
          {onConfirm && (
            <Button onClick={onConfirm}>Confirmar</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
