'use client';

import React from 'react';

export default function ChatPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="max-w-md text-center">
        {/* Icono animado */}
        <div className="relative mb-8">
          <div className="animate-bounce">
            <div className="text-8xl">💬</div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-primary opacity-20 rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Título */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Chat en Tiempo Real
        </h2>

        {/* Descripción */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          Muy pronto podrás chatear directamente con conductores y pasajeros
          para coordinar los detalles de tu viaje.
        </p>

        {/* Features próximos */}
        <div className="bg-primary-light rounded-lg p-6 text-left mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">
            Características próximamente:
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Mensajería instantánea en tiempo real</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Notificaciones de nuevos mensajes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Historial de conversaciones</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Chat grupal por viaje</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Compartir ubicación en tiempo real</span>
            </li>
          </ul>
        </div>

        {/* Estado */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
          <div className="animate-pulse">🚧</div>
          <span>En desarrollo</span>
        </div>

        {/* Timeline estimado (opcional) */}
        <p className="text-xs text-gray-500 mt-6">
          Estimado de lanzamiento: Próximamente
        </p>
      </div>
    </div>
  );
}
