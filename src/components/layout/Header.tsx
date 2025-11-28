// src/components/layout/Header.tsx (actualizar)
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../lib/stores/authStore';
import { useNotifications } from '../../lib/hooks/useNotifications';
import { NotificationPanel } from '../../components/notifications/NotificationPanel';
import { NotificationToast } from '../../components/notifications/NotificationToast';
import { authAPI } from '../../lib/api/endpoints';
import { Notification } from '../../types/notification.types';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { unreadCount, notifications, requestPermission } = useNotifications();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [toastNotification, setToastNotification] = useState<Notification | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const prevNotificationsRef = useRef<Notification[]>([]);

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Detectar nuevas notificaciones para mostrar toast
  useEffect(() => {
    const prevNotifications = prevNotificationsRef.current;
    
    if (notifications.length > prevNotifications.length) {
      const newNotification = notifications[0];
      if (newNotification && !prevNotifications.find((n) => n.id === newNotification.id)) {
        setToastNotification(newNotification);
      }
    }
    
    prevNotificationsRef.current = notifications;
  }, [notifications]);

  // Solicitar permisos de notificaciones al montar
  useEffect(() => {
    requestPermission();
  }, []);

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      logout();
      router.push('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      logout();
      router.push('/login');
    }
  };

  return (
    <>
      <header className="bg-primary text-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Título */}
          <h1 className="text-xl font-bold">{title}</h1>

          {/* Botones de acción */}
          <div className="flex items-center gap-3">
            {/* Botón de notificaciones */}
            <button
              onClick={() => setIsNotificationPanelOpen(true)}
              className="relative w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
              
              {/* Badge de contador */}
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Avatar y menú */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center font-semibold hover:bg-gray-100 transition-colors"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  user?.name?.charAt(0).toUpperCase() || 'U'
                )}
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2 text-gray-800">
                  {/* Info del usuario */}
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="font-semibold">{user?.name}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                    <span className="inline-block mt-1 px-2 py-1 bg-primary text-white text-xs rounded-full">
                      {user?.role}
                    </span>
                  </div>

                  {/* Opciones del menú */}
                  <button
                    onClick={() => {
                      router.push('/profile');
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    👤 Ver perfil
                  </button>

                  <button
                    onClick={() => {
                      router.push('/profile/bookings');
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    📋 Mis reservas
                  </button>

                  <div className="border-t border-gray-200 my-2"></div>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 transition-colors"
                  >
                    🚪 Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Panel de notificaciones */}
      <NotificationPanel
        isOpen={isNotificationPanelOpen}
        onClose={() => setIsNotificationPanelOpen(false)}
      />

      {/* Toast de nueva notificación */}
      {toastNotification && (
        <NotificationToast
          notification={toastNotification}
          onClose={() => setToastNotification(null)}
        />
      )}
    </>
  );
};
