// src/app/error.tsx
'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console or error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-md w-full text-center">
        {/* Emoji visual */}
        <div className="text-8xl mb-6">😵</div>
        
        {/* Error code */}
        <h1 className="text-6xl font-bold text-red-600 mb-4">500</h1>
        
        {/* Message */}
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          ¡Algo salió mal!
        </h2>
        
        <p className="text-gray-600 mb-6">
          Tuvimos un problema procesando tu solicitud. Nuestro equipo ha sido notificado.
        </p>
        
        {/* Error details (optional, only in development) */}
        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mb-6 text-left bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-xs font-mono text-red-800 break-words">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-red-600 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}
        
        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={reset}
            className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
          >
            Intentar de nuevo
          </button>
          <a
            href="/"
            className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold inline-block"
          >
            Volver al Inicio
          </a>
        </div>
        
        {/* Support info */}
        <p className="text-xs text-gray-500 mt-6">
          Si el problema persiste, contáctanos en{' '}
          <a href="mailto:soporte@javecupos.com" className="text-primary hover:underline">
            soporte@javecupos.com
          </a>
        </p>
      </div>
    </div>
  );
}
