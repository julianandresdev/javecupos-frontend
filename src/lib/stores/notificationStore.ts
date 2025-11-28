// src/lib/stores/notificationStore.ts
import { create } from 'zustand';
import { Notification } from '../../types/notification.types';

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isConnected: boolean;

  // Acciones
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  markAsRead: (notificationId: number) => void;
  markAllAsRead: () => void;
  removeNotification: (notificationId: number) => void;
  setUnreadCount: (count: number) => void;
  setConnected: (connected: boolean) => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,
  isConnected: false,

  setNotifications: (notifications) =>
    set({
      notifications,
      unreadCount: notifications.filter((n) => n.isRead === 'Pendiente').length,
    }),

  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: notification.isRead === 'Pendiente' ? state.unreadCount + 1 : state.unreadCount,
    })),

  markAsRead: (notificationId) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === notificationId ? { ...n, isRead: 'Leida' } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    })),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: 'Leida' })),
      unreadCount: 0,
    })),

  removeNotification: (notificationId) =>
    set((state) => {
      const notification = state.notifications.find((n) => n.id === notificationId);
      const wasUnread = notification?.isRead === 'Pendiente';
      
      return {
        notifications: state.notifications.filter((n) => n.id !== notificationId),
        unreadCount: wasUnread ? Math.max(0, state.unreadCount - 1) : state.unreadCount,
      };
    }),

  setUnreadCount: (count) => set({ unreadCount: count }),

  setConnected: (connected) => set({ isConnected: connected }),

  clearAll: () =>
    set({
      notifications: [],
      unreadCount: 0,
      isConnected: false,
    }),
}));
