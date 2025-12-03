// src/app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light to-primary p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-md w-full text-center">
        {/* Emoji visual */}
        <div className="text-8xl mb-6">🚗💨</div>
        
        {/* Error code */}
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        
        {/* Message */}
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          ¡Oops! Página no encontrada
        </h2>
        
        <p className="text-gray-600 mb-8">
          Parece que este cupo ya salió. La página que buscas no existe o fue movida.
        </p>
        
        {/* Suggestions */}
        <div className="space-y-3 mb-8">
          <div className="text-left bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-700 mb-2">
              ¿Qué puedes hacer?
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Verifica la URL que ingresaste</li>
              <li>• Regresa a la página principal</li>
              <li>• Explora los cupos disponibles</li>
            </ul>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold"
          >
            Ir al Inicio
          </Link>
          <Link
            href="/cupos"
            className="flex-1 px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary-light transition-colors font-semibold"
          >
            Ver Cupos
          </Link>
        </div>
      </div>
    </div>
  );
}
