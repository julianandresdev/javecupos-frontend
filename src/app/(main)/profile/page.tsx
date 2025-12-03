// src/app/(main)/profile/page.tsx
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '../../../lib/stores/authStore';
import { usersAPI, authAPI } from '../../../lib/api/endpoints';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import {
  updateProfileSchema,
  UpdateProfileFormData,
  changePasswordSchema,
  ChangePasswordFormData,
} from '../../../lib/validations/profile.validations';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const { user, updateUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'info' | 'password'>('info');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Formulario de información personal
  const {
    register: registerInfo,
    handleSubmit: handleSubmitInfo,
    formState: { errors: errorsInfo },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name || '',
      phone: user?.phone || '',
      age: user?.age || 18,
      avatar: user?.avatar || '',
    },
  });

  // Formulario de cambio de contraseña
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPassword,
    formState: { errors: errorsPassword },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmitInfo = async (data: UpdateProfileFormData) => {
    if (!user) return;

    try {
      setIsLoading(true);
      setSuccessMessage('');
      setErrorMessage('');

      const updatedUser = await usersAPI.update(user.id, data);
      updateUser(updatedUser);
      
      setSuccessMessage('Perfil actualizado exitosamente');
      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error: any) {
      console.error('Error actualizando perfil:', error);
      setErrorMessage('Error al actualizar el perfil');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitPassword = async (data: ChangePasswordFormData) => {
    try {
      setIsLoadingPassword(true);
      setSuccessMessage('');
      setErrorMessage('');

      // Llamar al endpoint real de cambio de contraseña
      await authAPI.changePassword(data.currentPassword, data.newPassword);

      setSuccessMessage('Contraseña actualizada exitosamente');
      resetPassword();
      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error: any) {
      console.error('Error cambiando contraseña:', error);

      const status = error.response?.status;
      const message = error.response?.data?.message;

      if (status === 400 || status === 401) {
        // Errores típicos de validación o contraseña actual incorrecta
        setErrorMessage(message || 'La contraseña actual es incorrecta');
      } else {
        setErrorMessage('Error al cambiar la contraseña. Intenta nuevamente.');
      }
    } finally {
      setIsLoadingPassword(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header del perfil */}
      <div className="card mb-6">
        <div className="flex items-center gap-6">
          {/* Avatar grande */}
          <div className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center text-4xl font-bold">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              user.name.charAt(0).toUpperCase()
            )}
          </div>

          {/* Info básica */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="px-3 py-1 bg-primary text-white text-sm rounded-full font-medium capitalize">
                {user.role}
              </span>
              <div className="flex items-center gap-1">
                <span>⭐</span>
                <span className="font-semibold">{user.rate}/5</span>
              </div>
            </div>
          </div>

          {/* Botón de reservas */}
          <button
            onClick={() => router.push('/profile/bookings')}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
          >
            📋 Mis reservas
          </button>
        </div>
      </div>

      {/* Mensajes de éxito/error */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          {successMessage}
        </div>
      )}
      
      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {errorMessage}
        </div>
      )}

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('info')}
            className={`pb-3 px-4 font-medium transition-colors border-b-2 ${
              activeTab === 'info'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            📝 Información personal
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`pb-3 px-4 font-medium transition-colors border-b-2 ${
              activeTab === 'password'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            🔒 Cambiar contraseña
          </button>
        </div>
      </div>

      {/* Contenido según tab */}
      {activeTab === 'info' && (
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Editar información personal
          </h2>

          <form onSubmit={handleSubmitInfo(onSubmitInfo)} className="space-y-4">
            <Input
              {...registerInfo('name')}
              type="text"
              label="Nombre completo"
              error={errorsInfo.name?.message}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                {...registerInfo('phone')}
                type="tel"
                label="Teléfono"
                error={errorsInfo.phone?.message}
              />

              <Input
                {...registerInfo('age', { valueAsNumber: true })}
                type="number"
                label="Edad"
                error={errorsInfo.age?.message}
              />
            </div>

            <Input
              {...registerInfo('avatar')}
              type="url"
              label="URL del avatar (opcional)"
              placeholder="https://ejemplo.com/mi-foto.jpg"
              error={errorsInfo.avatar?.message}
            />

            {/* Info no editable */}
            <div className="border-t pt-4 mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Correo electrónico:</span>
                <span className="font-medium">{user.email}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Estado:</span>
                <span className="font-medium capitalize">{user.status}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Miembro desde:</span>
                <span className="font-medium">
                  {new Date(user.createdAt).toLocaleDateString('es-CO')}
                </span>
              </div>
            </div>

            <Button type="submit" isLoading={isLoading}>
              Guardar cambios
            </Button>
          </form>
        </div>
      )}

      {activeTab === 'password' && (
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Cambiar contraseña
          </h2>

          <form onSubmit={handleSubmitPassword(onSubmitPassword)} className="space-y-4">
            <Input
              {...registerPassword('currentPassword')}
              type="password"
              label="Contraseña actual"
              error={errorsPassword.currentPassword?.message}
            />

            <Input
              {...registerPassword('newPassword')}
              type="password"
              label="Nueva contraseña"
              error={errorsPassword.newPassword?.message}
            />

            <Input
              {...registerPassword('confirmPassword')}
              type="password"
              label="Confirmar nueva contraseña"
              error={errorsPassword.confirmPassword?.message}
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

            <Button type="submit" isLoading={isLoadingPassword}>
              Cambiar contraseña
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
