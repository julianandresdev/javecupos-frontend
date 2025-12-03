// src/app/(main)/privacidad/page.tsx
export default function PrivacidadPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Política de Privacidad
        </h1>
        
        <p className="text-sm text-gray-500 mb-8">
          Última actualización: Diciembre 2, 2025
        </p>

        <div className="prose prose-sm max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              1. Información que Recopilamos
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              En JaveCupos recopilamos diferentes tipos de información para brindarle un mejor servicio:
            </p>
            
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Información de Registro
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>Nombre completo</li>
              <li>Dirección de correo electrónico</li>
              <li>Número de teléfono</li>
              <li>Edad</li>
              <li>Fotografía de perfil (opcional)</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Información de Uso
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>Cupos publicados y reservas realizadas</li>
              <li>Historial de viajes</li>
              <li>Calificaciones y reseñas</li>
              <li>Mensajes y comunicaciones dentro de la plataforma</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Información Técnica
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Dirección IP</li>
              <li>Tipo de navegador y dispositivo</li>
              <li>Páginas visitadas y tiempo de permanencia</li>
              <li>Cookies y tecnologías similares</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              2. Cómo Utilizamos su Información
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Utilizamos la información recopilada para:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Facilitar la conexión entre conductores y pasajeros</li>
              <li>Procesar y gestionar reservas</li>
              <li>enviar notificaciones importantes sobre sus viajes</li>
              <li>Mejorar la seguridad y prevenir fraudes</li>
              <li>Personalizar su experiencia en la plataforma</li>
              <li>Analizar el uso de la plataforma para mejoras</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              3. Compartir Información
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Compartimos su información limitadamente en las siguientes situaciones:
            </p>
            
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Con Otros Usuarios
            </h3>
            <p className="text-gray-600 leading-relaxed mb-3">
              Cuando reserva un cupo o publica uno, cierta información (nombre, foto, calificación)
              se comparte con el conductor o pasajero correspondiente.
            </p>

            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Con Proveedores de Servicios
            </h3>
            <p className="text-gray-600 leading-relaxed mb-3">
              Podemos compartir información con terceros que nos ayudan a operar la plataforma
              (hosting, análisis, soporte al cliente).
            </p>

            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Por Razones Legales
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Si es requerido por ley, orden judicial o proceso legal.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              4. Sus Derechos
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Usted tiene derecho a:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Acceder a su información personal</li>
              <li>Corregir datos inexactos o incompletos</li>
              <li>Solicitar la eliminación de su información</li>
              <li>Oponerse al procesamiento de sus datos</li>
              <li>Solicitar la portabilidad de sus datos</li>
              <li>Retirar su consentimiento en cualquier momento</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              Para ejercer estos derechos, contáctenos en{' '}
              <a href="mailto:privacidad@javecupos.com" className="text-primary hover:underline font-medium">
                privacidad@javecupos.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              5. Seguridad de los Datos
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Implementamos medidas de seguridad técnicas y organizativas para proteger su
              información contra acceso no autorizado, alteración, divulgación o destrucción.
              Sin embargo, ningún método de transmisión por Internet es 100% seguro.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              6. Cookies
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Utilizamos cookies y tecnologías similares para mejorar su experiencia, analizar
              el uso de la plataforma y personalizar el contenido. Puede configurar su navegador
              para rechazar cookies, aunque esto puede afectar la funcionalidad de la plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              7. Menores de Edad
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Nuestro servicio no está dirigido a menores de 18 años. No recopilamos
              intencionalmente información personal de menores.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              8. Cambios a esta Política
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Podemos actualizar esta Política de Privacidad ocasionalmente. Le notificaremos
              sobre cambios significativos publicando la nueva política en esta página y
              actualizando la fecha de "Última actualización".
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              9. Contacto
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Si tiene preguntas sobre esta Política de Privacidad, puede contactarnos en:{' '}
              <a href="mailto:privacidad@javecupos.com" className="text-primary hover:underline font-medium">
                privacidad@javecupos.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
