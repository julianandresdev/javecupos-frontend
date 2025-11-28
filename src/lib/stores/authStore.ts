// src/lib/stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../../types/user.types';

interface AuthState {
  // Estado
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;

  // Acciones
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  setAccessToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Estado inicial
      user: null,
      accessToken: null,
      isAuthenticated: false,

      // Login: guardar token y usuario
      login: (token: string, user: User) => {
        localStorage.setItem('access_token', token);
        set({
          accessToken: token,
          user,
          isAuthenticated: true,
        });
      },

      // Logout: limpiar todo
      logout: () => {
        localStorage.removeItem('access_token');
        set({
          accessToken: null,
          user: null,
          isAuthenticated: false,
        });
      },

      // Actualizar datos del usuario
      updateUser: (userData: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },

      // Actualizar solo el token
      setAccessToken: (token: string) => {
        localStorage.setItem('access_token', token);
        set({ accessToken: token });
      },
    }),
    {
      name: 'auth-storage', // Nombre en localStorage
      partialize: (state) => ({
        // Solo persistir el usuario, no el token (por seguridad)
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
