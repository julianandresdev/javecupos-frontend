// src/lib/hooks/useNotifications.ts
'use client';

import { useEffect } from 'react';
import { useAuthStore } from '../../lib/stores/authStore';
import { useNotificationStore } from '../../lib/stores/notificationStore';
import { socketManager } from '../../lib/api/socket';
import { notificationsAPI } from '../../lib/api/endpoints';
import type { Notification } from '../../types/notification.types';

export const useNotifications = () => {
  const { user, isAuthenticated } = useAuthStore();
  const {
    notifications,
    unreadCount,
    isConnected,
    setNotifications,
    addNotification,
    markAsRead,
    setConnected,
    clearAll,
  } = useNotificationStore();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      clearAll();
      socketManager.disconnect();
      return;
    }

    // Conectar socket
    socketManager.connect(user.id);

    // Cargar notificaciones iniciales
    loadNotifications();

    // Listeners de socket
    const handleConnect = () => {
      console.log('✅ Notificaciones conectadas');
      setConnected(true);
    };

    const handleDisconnect = () => {
      console.log('❌ Notificaciones desconectadas');
      setConnected(false);
    };

    const handleNewNotification = (notification: Notification) => {
      console.log('📩 Nueva notificación:', notification);
      addNotification(notification);
      
      // Mostrar notificación del navegador (si tiene permisos)
      if (Notification.permission === 'granted') {
        new Notification('JaveCupos', {
          body: notification.message,
          icon: '/icons/icon-192x192.png',
        });
      }
    };

    const handlePendingNotifications = (pendingNotifications: Notification[]) => {
      console.log('📬 Notificaciones pendientes:', pendingNotifications.length);
      if (pendingNotifications.length > 0) {
        setNotifications([...pendingNotifications, ...notifications]);
      }
    };

    const handleNotificationRead = (data: { notificationId: number; success: boolean }) => {
      if (data.success) {
        markAsRead(data.notificationId);
      }
    };

    // Agregar listeners
    socketManager.on('connect', handleConnect);
    socketManager.on('disconnect', handleDisconnect);
    socketManager.on('new-notification', handleNewNotification);
    socketManager.on('pending-notifications', handlePendingNotifications);
    socketManager.on('notification-read', handleNotificationRead);

    // Cleanup
    return () => {
      socketManager.off('connect', handleConnect);
      socketManager.off('disconnect', handleDisconnect);
      socketManager.off('new-notification', handleNewNotification);
      socketManager.off('pending-notifications', handlePendingNotifications);
      socketManager.off('notification-read', handleNotificationRead);
    };
  }, [isAuthenticated, user]);

  const loadNotifications = async () => {
    try {
      const data = await notificationsAPI.getMyNotifications();
      setNotifications(data);
    } catch (error) {
      console.error('Error cargando notificaciones:', error);
    }
  };

  const handleMarkAsRead = async (notificationId: number) => {
    try {
      // Optimistic update
      markAsRead(notificationId);
      
      // Enviar por socket
      socketManager.emit('mark-as-read', { notificationId });
      
      // También por HTTP por si falla el socket
      await notificationsAPI.markAsRead(notificationId);
    } catch (error) {
      console.error('Error marcando notificación como leída:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationsAPI.markAllAsRead();
      await loadNotifications();
    } catch (error) {
      console.error('Error marcando todas como leídas:', error);
    }
  };

  const handleDeleteNotification = async (notificationId: number) => {
    try {
      await notificationsAPI.delete(notificationId);
      await loadNotifications();
    } catch (error) {
      console.error('Error eliminando notificación:', error);
    }
  };

  const requestPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return Notification.permission === 'granted';
  };

  return {
    notifications,
    unreadCount,
    isConnected,
    loadNotifications,
    markAsRead: handleMarkAsRead,
    markAllAsRead: handleMarkAllAsRead,
    deleteNotification: handleDeleteNotification,
    requestPermission,
  };
};
