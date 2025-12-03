// src/components/notifications/NotificationToast.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Notification } from '../../types/notification.types';

interface NotificationToastProps {
  notification: Notification;
  onClose: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  notification,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animación de entrada
    setTimeout(() => setIsVisible(true), 10);

    // Auto-cerrar después de 5 segundos
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Esperar animación de salida
  };

  // Iconos según tipo
  const getIcon = () => {
    const type = notification.type;
    
    if (type.includes('CONFIRMADO') || type.includes('CONFIRMED')) {
      return '✅';
    }
    if (type.includes('CANCELADO') || type.includes('CANCELLED')) {
      return '❌';
    }
    if (type.includes('CREATED') || type.includes('CREADA')) {
      return '🆕';
    }
    if (type.includes('REMINDER')) {
      return '⏰';
    }
    return '🔔';
  };

  return (
    <div
      className={`fixed top-24 right-4 max-w-sm w-full bg-white rounded-lg shadow-2xl border-2 border-primary overflow-hidden transition-all duration-300 z-50 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      {/* Barra de progreso */}
      <div className="h-1 bg-primary-light">
        <div
          className="h-full bg-primary transition-all duration-[5000ms] ease-linear"
          style={{ width: isVisible ? '0%' : '100%' }}
        />
      </div>

      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Icono */}
          <div className="text-2xl">{getIcon()}</div>

          {/* Contenido */}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-800 text-sm">
              {notification.type}
            </p>
            <p className="text-gray-600 text-sm mt-1">
              {notification.message}
            </p>
          </div>

          {/* Botón cerrar */}
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
