'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Header } from '../../components/layout/Header';
import { FooterNav } from '../../components/layout/FooterNav';
import { useAuthStore } from '../../lib/stores/authStore';
import { authAPI } from '../../lib/api/endpoints';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user, login } = useAuthStore();

  // Verificar autenticación al cargar
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');

      if (!token) {
        router.push('/login');
        return;
      }

      // Si hay token pero no hay usuario en el store, obtener perfil
      if (!user) {
        try {
          const profile = await authAPI.getProfile();
          login(token, profile);
        } catch (error) {
          console.error('Error al obtener perfil:', error);
          router.push('/login');
        }
      }
    };

    checkAuth();
  }, [isAuthenticated, user, router, login]);

  // Mostrar loading mientras verifica autenticación
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  // Determinar el título del header según la ruta
  const getTitle = () => {
    if (pathname.startsWith('/cupos')) return 'Cupos y convenios';
    if (pathname.startsWith('/publicar')) return 'Publicar cupo';
    if (pathname.startsWith('/chat')) return 'Chat';
    if (pathname.startsWith('/profile')) return 'Mi perfil';
    return 'JaveCupos';
  };

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Header title={getTitle()} />
      
      {/* Contenido principal con padding para header y footer */}
      <main className="flex-1 container mx-auto px-4 py-6 pb-20">
        {children}
      </main>

      <FooterNav />
    </div>
  );
}
