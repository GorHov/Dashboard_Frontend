import React, { useRef } from "react";
import "./Modal.scss";
import { useOnClickOutside } from "../../Hooks/useOnClickOutside";

type ModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(modalRef, onClose);

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div ref={modalRef} className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button className="modal__close" onClick={onClose}>
          &times;
        </button>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
