// src/lib/api/endpoints.ts
import apiClient from './axios';
import { LoginCredentials, RegisterData, AuthResponse, User } from '../../types/user.types';
import { Cupo } from '../../types/cupo.types';
import { Booking } from '../../types/booking.types';
import { Notification } from '../../types/notification.types';

/**
 * ========================================
 * AUTENTICACIÓN
 * ========================================
 */
export const authAPI = {
  // Login
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  // Registro
  register: async (data: RegisterData): Promise<{ message: string; email: string }> => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },

  // Obtener perfil del usuario autenticado
  getProfile: async (): Promise<User> => {
    const response = await apiClient.get<User>('/auth/profile');
    return response.data;
  },

  // Verificar email
  verifyEmail: async (token: string): Promise<{ message: string; user: User }> => {
    const response = await apiClient.get(`/auth/verify-email?token=${token}`);
    return response.data;
  },

  // Reenviar email de verificación
  resendVerification: async (email: string): Promise<{ message: string }> => {
    const response = await apiClient.post('/auth/resend-verification', { email });
    return response.data;
  },

  // Solicitar recuperación de contraseña
  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const response = await apiClient.post('/auth/forgot-password', { email });
    return response.data;
  },

  // Restablecer contraseña
  resetPassword: async (token: string, newPassword: string): Promise<{ message: string }> => {
    const response = await apiClient.post('/auth/reset-password', { token, newPassword });
    return response.data;
  },

  // Cambiar contraseña autenticado
  changePassword: async (currentPassword: string, newPassword: string): Promise<{ message: string }> => {
    const response = await apiClient.post('/auth/change-password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  },

  // Logout
  logout: async (): Promise<{ message: string }> => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },
};

/**
 * ========================================
 * USUARIOS
 * ========================================
 */
export const usersAPI = {
  getAll: async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>('/users');
    return response.data;
  },

  getById: async (id: number): Promise<User> => {
    const response = await apiClient.get<User>(`/users/${id}`);
    return response.data;
  },

  update: async (id: number, data: Partial<User>): Promise<User> => {
    const response = await apiClient.put<User>(`/users/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<{ message: string }> => {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  },
};

/**
 * ========================================
 * CUPOS
 * ========================================
 */
export const cuposAPI = {
  getAll: async (filters?: any): Promise<Cupo[]> => {
    const response = await apiClient.get<Cupo[]>('/cupos', { params: filters });
    return response.data;
  },

  getById: async (id: number): Promise<Cupo> => {
    const response = await apiClient.get<Cupo>(`/cupos/${id}`);
    return response.data;
  },

  getMyCupos: async (): Promise<Cupo[]> => {
    const response = await apiClient.get<Cupo[]>('/cupos/my-cupos');
    return response.data;
  },

  create: async (data: any): Promise<Cupo> => {
    const response = await apiClient.post<Cupo>('/cupos', data);
    return response.data;
  },

  update: async (id: number, data: any): Promise<Cupo> => {
    const response = await apiClient.put<Cupo>(`/cupos/${id}`, data);
    return response.data;
  },

  cancel: async (id: number): Promise<Cupo> => {
    const response = await apiClient.put<Cupo>(`/cupos/${id}/cancel`);
    return response.data;
  },

  delete: async (id: number): Promise<{ message: string }> => {
    const response = await apiClient.delete(`/cupos/${id}`);
    return response.data;
  },
};

/**
 * ========================================
 * RESERVAS (BOOKINGS)
 * ========================================
 */
export const bookingsAPI = {
  getMyBookings: async (): Promise<Booking[]> => {
    const response = await apiClient.get<Booking[]>('/bookings/mine');
    return response.data;
  },

  getByCupoId: async (cupoId: number): Promise<Booking[]> => {
    const response = await apiClient.get<Booking[]>(`/bookings?cupoId=${cupoId}`);
    return response.data;
  },

  getById: async (id: number): Promise<Booking> => {
    const response = await apiClient.get<Booking>(`/bookings/${id}`);
    return response.data;
  },

  create: async (data: any): Promise<Booking> => {
    const response = await apiClient.post<Booking>('/bookings', data);
    return response.data;
  },

  cancel: async (id: number): Promise<Booking> => {
    const response = await apiClient.put<Booking>(`/bookings/${id}/cancel`);
    return response.data;
  },

  confirm: async (id: number): Promise<Booking> => {
    const response = await apiClient.put<Booking>(`/bookings/${id}/confirm`);
    return response.data;
  },

  reject: async (id: number): Promise<Booking> => {
    const response = await apiClient.put<Booking>(`/bookings/${id}/reject`);
    return response.data;
  },
};

/**
 * ========================================
 * NOTIFICACIONES
 * ========================================
 */
export const notificationsAPI = {
  getMyNotifications: async (): Promise<Notification[]> => {
    const response = await apiClient.get<Notification[]>('/notifications');
    return response.data;
  },

  getPending: async (): Promise<Notification[]> => {
    const response = await apiClient.get<Notification[]>('/notifications/pending');
    return response.data;
  },

  getUnreadCount: async (): Promise<{ count: number }> => {
    const response = await apiClient.get<{ count: number }>('/notifications/unread-count');
    return response.data;
  },

  markAsRead: async (id: number): Promise<Notification> => {
    const response = await apiClient.patch<Notification>(`/notifications/${id}/read`);
    return response.data;
  },

  markAllAsRead: async (): Promise<void> => {
    await apiClient.patch('/notifications/mark-all-read');
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/notifications/${id}`);
  },
};

/**
 * ========================================
 * FAVORITOS
 * ========================================
 */
export const favoritesAPI = {
  getMyFavorites: async (): Promise<Cupo[]> => {
    const response = await apiClient.get<Cupo[]>('/favorites');
    return response.data;
  },

  add: async (cupoId: number): Promise<{ message: string }> => {
    const response = await apiClient.post(`/favorites/${cupoId}`);
    return response.data;
  },

  remove: async (cupoId: number): Promise<{ message: string }> => {
    const response = await apiClient.delete(`/favorites/${cupoId}`);
    return response.data;
  },

  isFavorite: async (cupoId: number): Promise<{ isFavorite: boolean }> => {
    const response = await apiClient.get<{ isFavorite: boolean }>(`/favorites/check/${cupoId}`);
    return response.data;
  },
};

/**
 * ========================================
 * CALIFICACIONES
 * ========================================
 */
export const ratingsAPI = {
  create: async (data: any): Promise<any> => {
    const response = await apiClient.post('/ratings', data);
    return response.data;
  },

  getByUserId: async (userId: number): Promise<any[]> => {
    const response = await apiClient.get<any[]>(`/ratings/user/${userId}`);
    return response.data;
  },

  getMyReceivedRatings: async (): Promise<any[]> => {
    const response = await apiClient.get<any[]>('/ratings/received');
    return response.data;
  },

  getByBookingId: async (bookingId: number): Promise<any> => {
    const response = await apiClient.get(`/ratings/booking/${bookingId}`);
    return response.data;
  },
};
