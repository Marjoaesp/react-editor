// src/components/Modal.tsx
import React from 'react';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg max-w-lg w-full relative">
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
