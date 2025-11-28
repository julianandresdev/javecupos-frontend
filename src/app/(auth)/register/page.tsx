// src/app/(auth)/register/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { registerSchema, RegisterFormData } from '../../../lib/validations/auth.validations';
import { authAPI } from '../../../lib/api/endpoints';
import { UserRole } from '../../../types/user.types';

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: UserRole.USER,
    },
  });

  const selectedRole = watch('role');

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      setError('');

      // Remover confirmPassword antes de enviar
      const { confirmPassword, ...registerData } = data;

      // Llamar al endpoint de registro
      const response = await authAPI.register(registerData);

      // Mostrar mensaje de éxito
      setRegisteredEmail(response.email);
      setShowSuccess(true);

      // Redirigir al login después de 3 segundos
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (err: any) {
      console.error('Error en registro:', err);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.status === 400) {
        setError('Ya existe una cuenta con este correo electrónico');
      } else {
        setError('Error al crear la cuenta. Intenta nuevamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Si el registro fue exitoso, mostrar mensaje
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
            ¡Registro exitoso!
          </h2>
          <p className="text-gray-600 mb-4">
            Hemos enviado un correo de verificación a:
          </p>
          <p className="font-semibold text-primary mb-6">{registeredEmail}</p>
          <p className="text-sm text-gray-500">
            Por favor verifica tu correo antes de iniciar sesión.
            Serás redirigido al login en unos segundos...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Título */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Crear cuenta</h1>
            <p className="text-gray-600 mt-2">Únete a la comunidad de JaveCupos</p>
          </div>

          {/* Mensaje de error */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Nombre */}
            <Input
              {...register('name')}
              type="text"
              label="Nombre completo"
              placeholder="Juan Pérez"
              error={errors.name?.message}
            />

            {/* Email y Teléfono en grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                {...register('email')}
                type="email"
                label="Correo electrónico"
                placeholder="ejemplo@correo.com"
                error={errors.email?.message}
              />

              <Input
                {...register('phone')}
                type="tel"
                label="Teléfono"
                placeholder="3001234567"
                error={errors.phone?.message}
              />
            </div>

            {/* Edad */}
            <Input
              {...register('age', { valueAsNumber: true })}
              type="number"
              label="Edad"
              placeholder="18"
              error={errors.age?.message}
            />

            {/* Rol (Radio buttons) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ¿Cómo quieres usar JaveCupos?
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedRole === UserRole.USER
                    ? 'border-primary bg-primary-light'
                    : 'border-gray-300 hover:border-gray-400'
                }`}>
                  <input
                    type="radio"
                    {...register('role')}
                    value={UserRole.USER}
                    className="sr-only"
                  />
                  <div className="flex-1">
                    <div className="text-2xl mb-1">🧑</div>
                    <div className="font-semibold">Pasajero</div>
                    <div className="text-sm text-gray-600">Buscar cupos</div>
                  </div>
                  {selectedRole === UserRole.USER && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary absolute top-2 right-2">
                      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                  )}
                </label>

                <label className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedRole === UserRole.DRIVER
                    ? 'border-primary bg-primary-light'
                    : 'border-gray-300 hover:border-gray-400'
                }`}>
                  <input
                    type="radio"
                    {...register('role')}
                    value={UserRole.DRIVER}
                    className="sr-only"
                  />
                  <div className="flex-1">
                    <div className="text-2xl mb-1">🚗</div>
                    <div className="font-semibold">Conductor</div>
                    <div className="text-sm text-gray-600">Ofrecer cupos</div>
                  </div>
                  {selectedRole === UserRole.DRIVER && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary absolute top-2 right-2">
                      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                  )}
                </label>
              </div>
              {errors.role && (
                <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>
              )}
            </div>

            {/* Avatar (opcional) */}
            <Input
              {...register('avatar')}
              type="url"
              label="URL del avatar (opcional)"
              placeholder="https://ejemplo.com/mi-foto.jpg"
              error={errors.avatar?.message}
            />

            {/* Contraseñas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                {...register('password')}
                type="password"
                label="Contraseña"
                placeholder="••••••••"
                error={errors.password?.message}
              />

              <Input
                {...register('confirmPassword')}
                type="password"
                label="Confirmar contraseña"
                placeholder="••••••••"
                error={errors.confirmPassword?.message}
              />
            </div>

            {/* Indicador de fortaleza de contraseña */}
            <div className="text-xs text-gray-600 space-y-1">
              <p className="font-medium">La contraseña debe tener:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Mínimo 8 caracteres</li>
                <li>Una letra mayúscula</li>
                <li>Una letra minúscula</li>
                <li>Un número</li>
                <li>Un símbolo (!@#$%...)</li>
              </ul>
            </div>

            {/* Términos y condiciones */}
            <div className="flex items-start">
              <input
                type="checkbox"
                required
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary mt-1"
              />
              <label className="ml-2 text-sm text-gray-600">
                Acepto los{' '}
                <a href="#" className="text-primary hover:text-primary-dark">
                  Términos y Condiciones
                </a>{' '}
                y la{' '}
                <a href="#" className="text-primary hover:text-primary-dark">
                  Política de Privacidad
                </a>
              </label>
            </div>

            {/* Botón de submit */}
            <Button type="submit" isLoading={isLoading}>
              Crear cuenta
            </Button>
          </form>

          {/* Link a login */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              ¿Ya tienes cuenta?{' '}
              <Link href="/login" className="text-primary hover:text-primary-dark font-semibold">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
