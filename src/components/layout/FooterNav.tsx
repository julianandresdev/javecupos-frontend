// src/components/layout/FooterNav.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '../../lib/stores/authStore';
import { UserRole } from '../../types/user.types';

export const FooterNav: React.FC = () => {
  const pathname = usePathname();
  const { user } = useAuthStore();

  const isActive = (path: string) => pathname.startsWith(path);

  // Solo mostrar "Publicar" si el usuario es conductor
  const showPublicar = user?.role === UserRole.DRIVER || user?.role === UserRole.ADMIN;

  return (
    <footer className="bg-primary text-white shadow-lg fixed bottom-0 left-0 right-0 z-50">
      <nav className="container mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {/* Botón Cupos */}
          <Link
            href="/cupos"
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              isActive('/cupos') ? 'bg-primary-dark' : 'hover:bg-primary-dark'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
            <span className="text-xs mt-1">Cupos</span>
          </Link>

          {/* Botón Publicar (solo para conductores) */}
          {showPublicar && (
            <Link
              href="/publicar"
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive('/publicar') ? 'bg-primary-dark' : 'hover:bg-primary-dark'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              <span className="text-xs mt-1">Publicar</span>
            </Link>
          )}

          {/* Botón Chat */}
          <Link
            href="/chat"
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              isActive('/chat') ? 'bg-primary-dark' : 'hover:bg-primary-dark'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg>
            <span className="text-xs mt-1">Chat</span>
          </Link>
        </div>
      </nav>
    </footer>
  );
};
