// src/app/(auth)/verify-email/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { authAPI } from '../../../lib/api/endpoints';
import { Button } from '../../../components/ui/Button';

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Token de verificación no proporcionado');
        return;
      }

      try {
        const response = await authAPI.verifyEmail(token);
        setStatus('success');
        setMessage(response.message);
        setUserEmail(response.user.email);
      } catch (error: any) {
        setStatus('error');
        if (error.response?.status === 400) {
          setMessage('El token es inválido o ha expirado');
        } else {
          setMessage('Error al verificar el correo. Intenta nuevamente.');
        }
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        {status === 'loading' && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Verificando tu correo...
            </h2>
            <p className="text-gray-600">Por favor espera un momento</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              ¡Correo verificado!
            </h2>
            <p className="text-gray-600 mb-4">{message}</p>
            {userEmail && (
              <p className="text-sm text-gray-500 mb-6">
                Cuenta: <span className="font-semibold">{userEmail}</span>
              </p>
            )}
            <Button onClick={() => router.push('/login')}>
              Ir al inicio de sesión
            </Button>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-red-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Error al verificar
            </h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="space-y-3">
              <Link href="/login">
                <Button variant="primary">Volver al inicio de sesión</Button>
              </Link>
              <p className="text-sm text-gray-600">
                ¿Necesitas un nuevo email de verificación?{' '}
                <Link href="/resend-verification" className="text-primary hover:text-primary-dark font-semibold">
                  Reenviar correo
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
