import React from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative bg-white rounded-xl shadow-lg max-w-2xl w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black text-2xl font-bold hover:text-gray-600"
          aria-label="Fechar"
        >
          ×
        </button>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}