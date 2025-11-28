// src/app/(auth)/reset-password/page.tsx
'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { resetPasswordSchema, ResetPasswordFormData } from '../../../lib/validations/auth.validations';
import { authAPI } from '../../../lib/api/endpoints';

// Componente interno con la lógica
function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      setError('Token de recuperación no válido');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      await authAPI.resetPassword(token, data.password);
      setShowSuccess(true);

      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (err: any) {
      console.error('Error:', err);
      if (err.response?.status === 400) {
        setError('El token es inválido o ha expirado');
      } else {
        setError('Error al cambiar la contraseña. Intenta nuevamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-red-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Token no válido
          </h2>
          <p className="text-gray-600 mb-6">
            El enlace de recuperación no es válido o ha expirado.
          </p>
          <Button onClick={() => router.push('/forgot-password')}>
            Solicitar nuevo enlace
          </Button>
        </div>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-green-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            ¡Contraseña actualizada!
          </h2>
          <p className="text-gray-600 mb-6">
            Tu contraseña ha sido cambiada exitosamente.
            Serás redirigido al inicio de sesión...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">
              Nueva contraseña
            </h1>
            <p className="text-gray-600 mt-2">
              Ingresa tu nueva contraseña
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              {...register('password')}
              type="password"
              label="Nueva contraseña"
              placeholder="••••••••"
              error={errors.password?.message}
            />

            <Input
              {...register('confirmPassword')}
              type="password"
              label="Confirmar nueva contraseña"
              placeholder="••••••••"
              error={errors.confirmPassword?.message}
            />

            <div className="text-xs text-gray-600 space-y-1 bg-gray-50 p-3 rounded-lg">
              <p className="font-medium">La contraseña debe tener:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Mínimo 8 caracteres</li>
                <li>Una letra mayúscula</li>
                <li>Una letra minúscula</li>
                <li>Un número</li>
                <li>Un símbolo</li>
              </ul>
            </div>

            <Button type="submit" isLoading={isLoading}>
              Cambiar contraseña
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Componente principal con Suspense
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
