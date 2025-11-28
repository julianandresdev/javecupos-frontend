// src/components/notifications/NotificationPanel.tsx
'use client';

import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { useNotifications } from '../../lib/hooks/useNotifications';
import { Notification } from '../../types/notification.types';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    notifications,
    unreadCount,
    isConnected,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications();

  if (!isOpen) return null;

  const handleNotificationClick = async (notification: Notification) => {
    if (notification.isRead === 'Pendiente') {
      await markAsRead(notification.id);
    }
  };

  const getNotificationIcon = (type: string) => {
    if (type.includes('CONFIRMADO') || type.includes('CONFIRMED')) return '✅';
    if (type.includes('CANCELADO') || type.includes('CANCELLED')) return '❌';
    if (type.includes('CREATED') || type.includes('CREADA')) return '🆕';
    if (type.includes('REMINDER')) return '⏰';
    return '🔔';
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30 z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="bg-primary text-white p-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">Notificaciones</h2>
            <div className="flex items-center gap-2 text-sm mt-1">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`} />
              <span>{isConnected ? 'Conectado' : 'Desconectado'}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-primary-dark transition-colors flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Acciones */}
        {unreadCount > 0 && (
          <div className="p-3 border-b border-gray-200">
            <button
              onClick={markAllAsRead}
              className="text-sm text-primary hover:text-primary-dark font-medium"
            >
              Marcar todas como leídas ({unreadCount})
            </button>
          </div>
        )}

        {/* Lista de notificaciones */}
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <div className="text-6xl mb-4">🔔</div>
              <p className="text-center">No tienes notificaciones</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`p-4 cursor-pointer transition-colors ${
                    notification.isRead === 'Pendiente'
                      ? 'bg-blue-50 hover:bg-blue-100'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Icono */}
                    <div className="text-2xl">{getNotificationIcon(notification.type)}</div>

                    {/* Contenido */}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm mb-1 ${
                        notification.isRead === 'Pendiente' ? 'font-semibold' : 'font-medium'
                      }`}>
                        {notification.type}
                      </p>
                      <p className="text-sm text-gray-600">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {formatDistanceToNow(new Date(notification.createdAt), {
                          addSuffix: true,
                          locale: es,
                        })}
                      </p>
                    </div>

                    {/* Botón eliminar */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>

                    {/* Indicador de no leída */}
                    {notification.isRead === 'Pendiente' && (
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
