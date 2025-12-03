// src/app/(main)/configuracion/page.tsx
'use client';

import React, { useState } from 'react';
import { useAuthStore } from '../../../lib/stores/authStore';
import { authAPI } from '../../../lib/api/endpoints';

type TabType = 'seguridad' | 'privacidad' | 'notificaciones' | 'cuenta';

export default function ConfiguracionPage() {
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState<TabType>('seguridad');

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Privacy settings
  const [showPhone, setShowPhone] = useState(true);
  const [showAge, setShowAge] = useState(true);

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [inAppNotifications, setInAppNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage('');

    if (newPassword !== confirmPassword) {
      setPasswordMessage('Las contraseñas no coinciden');
      return;
    }

    try {
      setIsChangingPassword(true);
      await authAPI.changePassword(currentPassword, newPassword);
      setPasswordMessage('✓ Contraseña actualizada exitosamente');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      setPasswordMessage(
        error.response?.data?.message || 'Error al cambiar la contraseña'
      );
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleSavePrivacy = () => {
    // TODO: Implement save privacy settings
    alert('Configuración de privacidad guardada (función pendiente de backend)');
  };

  const handleSaveNotifications = () => {
    // TODO: Implement save notification preferences
    alert('Preferencias de notificaciones guardadas (función pendiente de backend)');
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      '¿Estás ABSOLUTAMENTE SEGURO de que quieres eliminar tu cuenta? Esta acción NO se puede deshacer y perderás todos tus datos.'
    );

    if (!confirmed) return;

    const doubleConfirm = window.confirm(
      'ÚLTIMA ADVERTENCIA: Tu cuenta y todos tus datos serán eliminados permanentemente. ¿Continuar?'
    );

    if (doubleConfirm) {
      // TODO: Implement account deletion
      alert('Función de eliminación de cuenta pendiente de implementación en backend');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Configuración</h1>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200 overflow-x-auto">
        <div className="flex gap-4 min-w-max">
          {[
            { key: 'seguridad' as TabType, label: '🔒 Seguridad', icon: '🔒' },
            { key: 'privacidad' as TabType, label: '👁️ Privacidad', icon: '👁️' },
            { key: 'notificaciones' as TabType, label: '🔔 Notificaciones', icon: '🔔' },
            { key: 'cuenta' as TabType, label: '⚙️ Cuenta', icon: '⚙️' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-3 px-4 font-medium transition-colors border-b-2 whitespace-nowrap ${
                activeTab === tab.key
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="card">
        {/* Seguridad Tab */}
        {activeTab === 'seguridad' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Cambiar Contraseña
            </h2>

            <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña Actual *
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="input-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nueva Contraseña *
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="input-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar Nueva Contraseña *
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="input-primary"
                />
              </div>

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

              {passwordMessage && (
                <div
                  className={`p-3 rounded-lg text-sm ${
                    passwordMessage.startsWith('✓')
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  {passwordMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isChangingPassword}
                className="btn-primary"
              >
                {isChangingPassword ? 'Cambiando...' : 'Cambiar Contraseña'}
              </button>
            </form>
          </div>
        )}

        {/* Privacidad Tab */}
        {activeTab === 'privacidad' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Configuración de Privacidad
            </h2>

            <div className="space-y-6 max-w-2xl">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">Mostrar teléfono</p>
                  <p className="text-sm text-gray-600">
                    Permitir que otros usuarios vean tu número de teléfono
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showPhone}
                    onChange={(e) => setShowPhone(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">Mostrar edad</p>
                  <p className="text-sm text-gray-600">
                    Mostrar tu edad en tu perfil público
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showAge}
                    onChange={(e) => setShowAge(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <button onClick={handleSavePrivacy} className="btn-primary">
                Guardar Configuración
              </button>
            </div>
          </div>
        )}

        {/* Notificaciones Tab */}
        {activeTab === 'notificaciones' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Preferencias de Notificaciones
            </h2>

            <div className="space-y-6 max-w-2xl">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">Notificaciones por Email</p>
                  <p className="text-sm text-gray-600">
                    Recibir notificaciones importantes por correo electrónico
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">Notificaciones Push</p>
                  <p className="text-sm text-gray-600">
                    Recibir notificaciones push del navegador
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pushNotifications}
                    onChange={(e) => setPushNotifications(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">Notificaciones In-App</p>
                  <p className="text-sm text-gray-600">
                    Mostrar notificaciones mientras usas la aplicación
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inAppNotifications}
                    onChange={(e) => setInAppNotifications(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">Sonido</p>
                  <p className="text-sm text-gray-600">
                    Reproducir sonido al recibir notificaciones
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={soundEnabled}
                    onChange={(e) => setSoundEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <button onClick={handleSaveNotifications} className="btn-primary">
                Guardar Preferencias
              </button>
            </div>
          </div>
        )}

        {/* Cuenta Tab */}
        {activeTab === 'cuenta' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Gestión de Cuenta
            </h2>

            <div className="space-y-6">
              {/* Account info */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Información de la Cuenta
                </h3>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-600">
                    <span className="font-medium">Email:</span> {user?.email}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Estado:</span>{' '}
                    <span className="capitalize">{user?.status}</span>
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Miembro desde:</span>{' '}
                    {user?.createdAt && new Date(user.createdAt).toLocaleDateString('es-CO')}
                  </p>
                </div>
              </div>

              {/* Danger zone */}
              <div className="border-2 border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-600 mb-4">
                  Zona Peligrosa
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      Eliminar Cuenta
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor
                      está seguro.
                    </p>
                    <button
                      onClick={handleDeleteAccount}
                      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                    >
                      Eliminar mi cuenta
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
