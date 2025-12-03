// src/components/ui/ConfirmDialog.tsx
'use client';

import React, { useState } from 'react';
import { Modal } from './Modal';

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'normal' | 'warning' | 'danger';
  requireConfirmation?: boolean; // Checkbox "Estoy seguro"
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'normal',
  requireConfirmation = false,
}) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (requireConfirmation && !isConfirmed) {
      return;
    }

    setIsLoading(true);
    try {
      await onConfirm();
      onClose();
      setIsConfirmed(false);
    } catch (error) {
      console.error('Error en confirmación:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setIsConfirmed(false);
      onClose();
    }
  };

  const variantStyles = {
    normal: {
      icon: '❓',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      button: 'bg-blue-600 hover:bg-blue-700',
    },
    warning: {
      icon: '⚠️',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      button: 'bg-yellow-600 hover:bg-yellow-700',
    },
    danger: {
      icon: '🗑️',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      button: 'bg-red-600 hover:bg-red-700',
    },
  };

  const style = variantStyles[variant];

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="sm" showCloseButton={false}>
      <div className="text-center">
        {/* Icon */}
        <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full ${style.iconBg} mb-4`}>
          <span className="text-3xl">{style.icon}</span>
        </div>

        {/* Title */}
        <h3 className={`text-lg font-bold mb-2 ${variant === 'danger' ? 'text-red-600' : 'text-gray-800'}`}>
          {title}
        </h3>

        {/* Message */}
        <p className="text-gray-600 mb-4">{message}</p>

        {/* Checkbox de confirmación para acciones peligrosas */}
        {requireConfirmation && (
          <div className="mb-4 text-left">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isConfirmed}
                onChange={(e) => setIsConfirmed(e.target.checked)}
                className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                disabled={isLoading}
              />
              <span className="text-sm text-gray-700">
                Estoy seguro de realizar esta acción
              </span>
            </label>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading || (requireConfirmation && !isConfirmed)}
            className={`px-4 py-2 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${style.button}`}
          >
            {isLoading && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            )}
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};
