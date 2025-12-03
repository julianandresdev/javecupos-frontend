// src/components/ui/Toast.tsx
'use client';

import React, { useEffect, useState } from 'react';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  message: string;
  variant: ToastVariant;
  duration?: number;
}

export interface ToastProps {
  message: string;
  variant: ToastVariant;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, variant, onClose, duration = 5000 }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onClose, 300); // Wait for exit animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 300);
  };

  const variantStyles = {
    success: {
      bg: 'bg-green-50 border-green-500',
      icon: '✓',
      iconBg: 'bg-green-500',
      text: 'text-green-800',
    },
    error: {
      bg: 'bg-red-50 border-red-500',
      icon: '✕',
      iconBg: 'bg-red-500',
      text: 'text-red-800',
    },
    warning: {
      bg: 'bg-yellow-50 border-yellow-500',
      icon: '⚠',
      iconBg: 'bg-yellow-500',
      text: 'text-yellow-800',
    },
    info: {
      bg: 'bg-blue-50 border-blue-500',
      icon: 'ℹ',
      iconBg: 'bg-blue-500',
      text: 'text-blue-800',
    },
  };

  const style = variantStyles[variant];

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg border-l-4 shadow-lg min-w-[300px] max-w-md ${style.bg} ${
        isExiting ? 'animate-slideOutRight' : 'animate-slideInRight'
      }`}
    >
      {/* Icon */}
      <div className={`flex-shrink-0 w-6 h-6 rounded-full ${style.iconBg} flex items-center justify-center text-white text-sm font-bold`}>
        {style.icon}
      </div>

      {/* Message */}
      <p className={`flex-1 text-sm font-medium ${style.text}`}>{message}</p>

      {/* Close button */}
      <button
        onClick={handleClose}
        className={`flex-shrink-0 ${style.text} hover:opacity-70 transition-opacity`}
        aria-label="Cerrar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

// Toast Container Component
export const ToastContainer: React.FC<{ toasts: ToastMessage[]; onRemove: (id: string) => void }> = ({
  toasts,
  onRemove,
}) => {
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast
            message={toast.message}
            variant={toast.variant}
            duration={toast.duration}
            onClose={() => onRemove(toast.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default Toast;
