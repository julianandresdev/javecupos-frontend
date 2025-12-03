// src/app/(main)/terminos/page.tsx
export default function TerminosPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Términos y Condiciones
        </h1>
        
        <p className="text-sm text-gray-500 mb-8">
          Última actualización: Diciembre 2, 2025
        </p>

        <div className="prose prose-sm max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              1. Aceptación de los Términos
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Al acceder y utilizar la plataforma JaveCupos, usted acepta estar sujeto a estos
              Términos y Condiciones, todas las leyes y regulaciones aplicables, y acepta que es
              responsable del cumplimiento de todas las leyes locales aplicables.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              2. Descripción del Servicio
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              JaveCupos es una plataforma que conecta conductores que ofrecen cupos en sus vehículos
              con pasajeros que buscan transporte compartido. JaveCupos actúa únicamente como
              intermediario y no es responsable directo del servicio de transporte.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>La plataforma permite publicar y buscar cupos disponibles</li>
              <li>Facilita la comunicación entre conductores y pasajeros</li>
              <li>No garantiza la disponibilidad de cupos en ningún momento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              3. Registro y Cuenta de Usuario
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Para utilizar ciertos servicios de la plataforma, debe registrarse y crear una cuenta:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Debe proporcionar información veraz, precisa y completa</li>
              <li>Es responsable de mantener la confidencialidad de su contraseña</li>
              <li>Debe ser mayor de 18 años para registrarse</li>
              <li>Notificar inmediatamente cualquier uso no autorizado de su cuenta</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              4. Responsabilidades del Conductor
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Si usted publica cupos como conductor, se compromete a:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Tener licencia de conducción vigente y válida</li>
              <li>Mantener el vehículo en condiciones seguras y óptimas</li>
              <li>Contar con SOAT y demás documentos legales requeridos</li>
              <li>Respetar los horarios y puntos de encuentro acordados</li>
              <li>Proporcionar información veraz sobre los cupos disponibles</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              5. Responsabilidades del Pasajero
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Si usted reserva cupos como pasajero, se compromete a:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Presentarse puntualmente en el punto de encuentro acordado</li>
              <li>Respetar las normas de convivencia durante el viaje</li>
              <li>Pagar el monto acordado por el cupo</li>
              <li>Cancelar con anticipación si no puede asistir al viaje</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              6. Pagos y Tarifas
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Los pagos por los cupos se realizan directamente entre conductor y pasajero.
              JaveCupos no procesa pagos ni cobra comisiones en la versión actual de la plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              7. Cancelaciones
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Consulte nuestra{' '}
              <a href="/cancelacion" className="text-primary hover:underline font-medium">
                Política de Cancelación
              </a>{' '}
              para información detallada sobre las reglas de cancelación.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              8. Limitación de Responsabilidad
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              JaveCupos no se hace responsable de:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Accidentes o incidentes durante los viajes</li>
              <li>Pérdida o daño de pertenencias</li>
              <li>Incumplimiento de acuerdos entre conductor y pasajero</li>
              <li>Veracidad de la información proporcionada por los usuarios</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              9. Suspensión y Terminación
            </h2>
            <p className="text-gray-600 leading-relaxed">
              JaveCupos se reserva el derecho de suspender o terminar su cuenta si se detecta
              incumplimiento de estos términos, comportamiento inapropiado o actividad fraudulenta.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              10. Modificaciones
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Nos reservamos el derecho de modificar estos términos en cualquier momento.
              Los cambios entrarán en vigencia inmediatamente después de su publicación en la plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              11. Contacto
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Si tiene preguntas sobre estos Términos y Condiciones, puede contactarnos en:{' '}
              <a href="mailto:legal@javecupos.com" className="text-primary hover:underline font-medium">
                legal@javecupos.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
