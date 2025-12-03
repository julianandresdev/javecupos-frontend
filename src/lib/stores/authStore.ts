// src/lib/stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserStatus } from '../../types/user.types';

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
  
  // Helpers
  canAccessRoute: () => boolean;
  requiresVerification: () => boolean;
  isActive: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
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
      
      // Helper: Verificar si puede acceder a rutas protegidas
      canAccessRoute: () => {
        const { user, isAuthenticated } = get();
        return isAuthenticated && user !== null && user.status === UserStatus.ACTIVE;
      },
      
      // Helper: Verificar si necesita verificación de email
      requiresVerification: () => {
        const { user } = get();
        return user !== null && user.status === UserStatus.PENDING;
      },
      
      // Helper: Verificar si la cuenta está activa
      isActive: () => {
        const { user } = get();
        return user !== null && user.status === UserStatus.ACTIVE;
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
