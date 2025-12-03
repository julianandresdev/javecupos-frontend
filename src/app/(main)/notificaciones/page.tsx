// src/app/(main)/notificaciones/page.tsx
'use client';

import React, { useState } from 'react';
import { useNotifications } from '../../../lib/hooks/useNotifications';

type TabType = 'all' | 'unread' | 'reservas' | 'cupos' | 'sistema';

export default function NotificationsPage() {
  const {
    notifications,
    isLoading,
    markAsRead,
    markAllAsRead,/** */
    deleteNotification,
  } = useNotifications();

  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');

  // Filter notifications by tab
  const filteredByTab = notifications.filter((notif) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notif.isRead;
    if (activeTab === 'reservas') return notif.type.includes('RESERVA') || notif.type.includes('BOOKING');
    if (activeTab === 'cupos') return notif.type.includes('CUPO');
    if (activeTab === 'sistema') return notif.type.includes('SISTEMA') || notif.type.includes('ACCOUNT');
    return true;
  });

  // Filter by date
  const filteredNotifications = filteredByTab.filter((notif) => {
    if (dateFilter === 'all') return true;
    const notifDate = new Date(notif.createdAt);
    const now = new Date();
    const dayMs = 24 * 60 * 60 * 1000;

    if (dateFilter === 'today') {
      return now.getTime() - notifDate.getTime() < dayMs;
    }
    if (dateFilter === 'week') {
      return now.getTime() - notifDate.getTime() < 7 * dayMs;
    }
    if (dateFilter === 'month') {
      return now.getTime() - notifDate.getTime() < 30 * dayMs;
    }
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAsRead = async (id: number) => {
    await markAsRead(id);
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('¿Estás seguro de eliminar esta notificación?');
    if (confirmed) {
      await deleteNotification(id);
    }
  };

  const getNotificationIcon = (tipo: string) => {
    if (tipo.includes('RESERVA') || tipo.includes('BOOKING')) return '📋';
    if (tipo.includes('CUPO')) return '🚗';
    if (tipo.includes('SISTEMA') || tipo.includes('ACCOUNT')) return '⚙️';
    return '🔔';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando notificaciones...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Notificaciones</h1>
          <p className="text-gray-600 text-sm">
            {unreadCount > 0 ? `${unreadCount} sin leer` : 'Todas leídas'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 text-sm border-2 border-primary text-primary rounded-lg hover:bg-primary-light transition-colors"
          >
            Marcar todas como leídas
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200 overflow-x-auto">
        <div className="flex gap-4 min-w-max">
          {[
            { key: 'all' as TabType, label: 'Todas', count: notifications.length },
            { key: 'unread' as TabType, label: 'No leídas', count: unreadCount },
            { key: 'reservas' as TabType, label: 'Reservas' },
            { key: 'cupos' as TabType, label: 'Cupos' },
            { key: 'sistema' as TabType, label: 'Sistema' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-3 px-4 font-medium transition-colors border-b-2 whitespace-nowrap ${
                activeTab === tab.key
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-primary text-white text-xs rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Date filter */}
      <div className="mb-6">
        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value as any)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">Todas las fechas</option>
          <option value="today">Hoy</option>
          <option value="week">Última semana</option>
          <option value="month">Último mes</option>
        </select>
      </div>

      {/* Notifications list */}
      {filteredNotifications.length === 0 ? (
        <div className="text-center py-12 card">
          <div className="text-6xl mb-4">🔕</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            No hay notificaciones
          </h3>
          <p className="text-gray-600">
            {activeTab === 'unread'
              ? 'No tienes notificaciones sin leer'
              : 'No hay notificaciones en esta categoría'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`card transition-all ${
                !notif.isRead  ? 'bg-primary-light border-l-4 border-primary' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="text-3xl flex-shrink-0">
                  {getNotificationIcon(notif.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold mb-1 ${!notif.isRead ? 'text-gray-800' : 'text-gray-600'}`}>
                    {notif.message}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{notif.message}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(notif.createdAt).toLocaleString('es-CO', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {!notif.isRead && (
                    <button
                      onClick={() => handleMarkAsRead(notif.id)}
                      className="p-2 text-primary hover:bg-primary-light rounded-lg transition-colors"
                      title="Marcar como leída"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(notif.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Eliminar"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
