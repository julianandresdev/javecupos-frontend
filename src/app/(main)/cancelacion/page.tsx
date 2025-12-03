// src/app/(main)/cancelacion/page.tsx
export default function CancelacionPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Política de Cancelación
        </h1>
        
        <p className="text-sm text-gray-500 mb-8">
          Última actualización: Diciembre 2, 2025
        </p>

        <div className="prose prose-sm max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              1. Cancelación por el Pasajero
            </h2>
            
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Reservas Pendientes de Confirmación
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Las reservas en estado PENDIENTE pueden cancelarse en cualquier momento sin penalización,
              ya que el conductor aún no ha confirmado el cupo.
            </p>

            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Reservas Confirmadas
            </h3>
            <p className="text-gray-600 leading-relaxed mb-3">
              Para reservas en estado CONFIRMADO, aplicamos las siguientes reglas:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>
                <strong>Más de 24 horas antes del viaje:</strong> Cancelación gratuita.
                El conductor será notificado de inmediato.
              </li>
              <li>
                <strong>Entre 12 y 24 horas antes:</strong> Se recomienda coordinar directamente
                con el conductor. Puede aplicar penalización según acuerdo mutuo.
              </li>
              <li>
                <strong>Menos de 12 horas antes:</strong> Penalización significativa.
                Se recomienda avisar al conductor de inmediato por respeto.
              </li>
              <li>
                <strong>No presentarse (No-Show):</strong> Se registrará en su perfil y puede
                afectar su calificación y capacidad de hacer futuras reservas.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              2. Cancelación por el Conductor
            </h2>
            
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Rechazar Reservas Pendientes
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Los conductores pueden rechazar reservas PENDIENTES en cualquier momento,
              proporcionando idealmente una razón al pasajero.
            </p>

            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Cancelar Cupo Completo
            </h3>
            <p className="text-gray-600 leading-relaxed mb-3">
              Si un conductor cancela un cupo con reservas CONFIRMADAS:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>
                <strong>Más de 24 horas antes:</strong> Permitido con notificación automática
                a todos los pasajeros afectados.
              </li>
              <li>
                <strong>Menos de 24 horas:</strong> Solo en casos de emergencia justificada.
                Puede afectar la calificación del conductor.
              </li>
              <li>
                <strong>Cancelaciones frecuentes:</strong> Pueden resultar en suspensión temporal
                o permanente de la cuenta.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              3. Cómo Cancelar
            </h2>
            
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Para Pasajeros
            </h3>
            <p className="text-gray-600 leading-relaxed mb-3">
              Para cancelar una reserva:
            </p>
            <ol className="list-decimal list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>Vaya a "Mis Reservas" en el menú principal</li>
              <li>Seleccione la reserva que desea cancelar</li>
              <li>Haga clic en "Cancelar Reserva"</li>
              <li>Confirme la cancelación y seleccione un motivo</li>
              <li>El conductor recibirá una notificación inmediata</li>
            </ol>

            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Para Conductores
            </h3>
            <p className="text-gray-600 leading-relaxed mb-3">
              Para cancelar un cupo:
            </p>
            <ol className="list-decimal list-inside text-gray-600 space-y-2 ml-4">
              <li>Vaya a "Mis Cupos" en el menú principal</li>
              <li>Seleccione el cupo que desea cancelar</li>
              <li>Haga clic en "Cancelar Cupo"</li>
              <li>Confirme la cancelación y proporcione una razón</li>
              <li>Todos los pasajeros con reservas confirmadas serán notificados</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              4. Reembolsos
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Actualmente, JaveCupos no procesa pagos directamente. Los acuerdos de reembolso
              o compensación deben coordinarse directamente entre conductor y pasajero según
              las siguientes recomendaciones:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Cancelación del conductor: Se recomienda reembolso completo al pasajero</li>
              <li>Cancelación del pasajero con más de 24h: Se recomienda reembolso completo</li>
              <li>Cancelación tardía del pasajero: El conductor puede retener parte del pago</li>
              <li>No-show del pasajero: El conductor puede retener el pago completo</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              5. Casos Especiales
            </h2>
            
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Emergencias y Fuerza Mayor
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              En casos de emergencia médica, accidentes, condiciones climáticas extremas u
              otros eventos de fuerza mayor, se permite la cancelación sin penalización,
              presentando evidencia correspondiente.
            </p>

            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Problemas de Seguridad
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Si un pasajero o conductor siente que su seguridad está en riesgo, puede cancelar
              en cualquier momento sin penalización, reportando la situación al equipo de JaveCupos.
            </p>

            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Modificación del Cupo
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Si el conductor modifica significativamente los detalles del cupo (hora, punto de
              encuentro, precio) después de confirmar reservas, los pasajeros afectados tienen
              derecho a cancelar sin penalización.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              6. Impacto en el Perfil
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Las cancelaciones afectan la estadística de "Tasa de Cancelación" en el perfil
              del usuario:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Tasa &#62; 30%: Advertencia visible en el perfil</li>
              <li>Tasa &#62; 50%: Restricciones temporales en la plataforma</li>
              <li>Múltiples no-shows: Posible suspensión de cuenta</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              7. Excepciones
            </h2>
            <p className="text-gray-600 leading-relaxed">
              JaveCupos se reserva el derecho de hacer excepciones a esta política en circunstancias
              extraordinarias, evaluando caso por caso.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              8. Contacto
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Si tiene dudas sobre esta política o necesita reportar un problema con una cancelación,
              contáctenos en:{' '}
              <a href="mailto:soporte@javecupos.com" className="text-primary hover:underline font-medium">
                soporte@javecupos.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
