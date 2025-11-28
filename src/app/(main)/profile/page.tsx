// src/app/(main)/profile/page.tsx
'use client';

import React from 'react';
import { useAuthStore } from '../../../lib/stores/authStore';

export default function ProfilePage() {
  const { user } = useAuthStore();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Mi Perfil</h2>
      
      <div className="card space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              user?.name?.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold">{user?.name}</h3>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Teléfono:</span>
            <span className="font-medium">{user?.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Edad:</span>
            <span className="font-medium">{user?.age} años</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Rol:</span>
            <span className="font-medium capitalize">{user?.role}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Calificación:</span>
            <span className="font-medium">⭐ {user?.rate}/5</span>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-4">
        Funcionalidad de edición próximamente
      </p>
    </div>
  );
}
