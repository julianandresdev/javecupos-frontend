'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Cupo } from '../../types/cupo.types';
import { Button } from '../../components/ui/Button';

import { useAuthStore } from '../../lib/stores/authStore';

interface CupoDetailsModalProps {
  cupo: Cupo | null;
  isOpen: boolean;
  onClose: () => void;
  onReservar: (cupoId: number, asientos: number) => Promise<void>;
}

export const CupoDetailsModal: React.FC<CupoDetailsModalProps> = ({
  cupo,
  isOpen,
  onClose,
  onReservar,
}) => {
  const { user } = useAuthStore();
  const [asientosSeleccionados, setAsientosSeleccionados] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (!isOpen || !cupo) return null;

  const isOwner = user?.id === cupo.conductorId;

  const handleReservar = async () => {
    try {
      setIsLoading(true);
      await onReservar(cupo.id, asientosSeleccionados);
      setShowConfirmation(true);
      
      // Cerrar modal después de 2 segundos
      setTimeout(() => {
        setShowConfirmation(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error al reservar:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fechaSalida = new Date(cupo.horaSalida);
  const montoTotal = cupo.precio * asientosSeleccionados;

  // Si se muestra confirmación
  if (showConfirmation) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-green-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            ¡Reserva creada!
          </h3>
          <p className="text-gray-600">
            El conductor confirmará tu reserva pronto.
            Te notificaremos cuando esté lista.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-primary text-white p-6 rounded-t-2xl flex justify-between items-center">
          <h2 className="text-2xl font-bold">Detalles del cupo</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-primary-dark transition-colors flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-6">
          {/* Información del conductor */}
          {cupo.conductor && (
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold border-2 border-white shadow-sm">
                {cupo.conductor.avatar ? (
                  <img src={cupo.conductor.avatar} alt={cupo.conductor.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  cupo.conductor.name.charAt(0).toUpperCase()
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{cupo.conductor.name}</h3>
                <div className="flex items-center gap-1 mt-0.5">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-4 h-4 ${i < Math.round(cupo.conductor!.rate) ? 'text-yellow-400' : 'text-gray-300'}`}>
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 font-medium ml-1">
                    ({cupo.conductor.rate}/5)
                  </span>
                </div>
              </div>
              {cupo.conductor.phone && (
                <a
                  href={`tel:${cupo.conductor.phone}`}
                  className="p-2.5 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-white transition-all duration-200"
                  title="Llamar conductor"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                  </svg>
                </a>
              )}
            </div>
          )}

          {/* Detalles del viaje */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Destino</p>
                <p className="font-semibold text-lg">{cupo.destino}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Punto de encuentro</p>
                <p className="font-semibold">{cupo.puntoEncuentro}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Hora de salida</p>
                <p className="font-semibold text-lg">
                  {format(fechaSalida, "HH:mm 'hrs'", { locale: es })}
                </p>
                <p className="text-sm text-gray-500">
                  {format(fechaSalida, "EEEE, dd 'de' MMMM", { locale: es })}
                </p>
              </div>
              {cupo.horaLlegadaEstimada && (
                <div>
                  <p className="text-sm text-gray-600">Llegada estimada</p>
                  <p className="font-semibold text-lg">
                    {format(new Date(cupo.horaLlegadaEstimada), "HH:mm 'hrs'", { locale: es })}
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Asientos disponibles</p>
                <p className="font-semibold text-lg">
                  {cupo.asientosDisponibles} de {cupo.asientosTotales}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Precio por asiento</p>
                <p className="font-semibold text-2xl text-primary">
                  ${cupo.precio.toLocaleString()}
                </p>
              </div>
            </div>

            {cupo.descripcion && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Descripción</p>
                <p className="text-gray-800">{cupo.descripcion}</p>
              </div>
            )}

            {cupo.telefonoContacto && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Contacto</p>
                <p className="font-semibold">{cupo.telefonoContacto}</p>
              </div>
            )}
          </div>

          {/* Selección de asientos - Solo si NO es el dueño */}
          {!isOwner && cupo.asientosDisponibles > 0 && (
            <div className="border-t pt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ¿Cuántos asientos deseas reservar?
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setAsientosSeleccionados(Math.max(1, asientosSeleccionados - 1))}
                  className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors flex items-center justify-center font-bold"
                  disabled={asientosSeleccionados <= 1}
                >
                  −
                </button>
                <span className="text-2xl font-bold w-12 text-center">
                  {asientosSeleccionados}
                </span>
                <button
                  onClick={() => setAsientosSeleccionados(Math.min(cupo.asientosDisponibles, asientosSeleccionados + 1))}
                  className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors flex items-center justify-center font-bold"
                  disabled={asientosSeleccionados >= cupo.asientosDisponibles}
                >
                  +
                </button>
              </div>

              {/* Monto total */}
              <div className="mt-4 p-4 bg-primary-light rounded-lg flex justify-between items-center">
                <span className="font-semibold">Total a pagar:</span>
                <span className="text-2xl font-bold text-primary">
                  ${montoTotal.toLocaleString()}
                </span>
              </div>
            </div>
          )}
          
          {/* Mensaje para el dueño */}
          {isOwner && (
            <div className="border-t pt-6 text-center">
              <div className="p-4 bg-blue-50 text-blue-800 rounded-lg">
                <p className="font-medium">Este es tu cupo publicado</p>
                <p className="text-sm mt-1">Puedes gestionar tus reservas desde el panel de "Mis Cupos"</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer con botones */}
        <div className="p-6 bg-gray-50 rounded-b-2xl space-y-3">
          {!isOwner && (
            cupo.asientosDisponibles > 0 ? (
              <Button onClick={handleReservar} isLoading={isLoading}>
                Confirmar reserva
              </Button>
            ) : (
              <div className="text-center py-4">
                <p className="text-red-600 font-semibold">
                  No hay asientos disponibles
                </p>
              </div>
            )
          )}
          <Button variant="secondary" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
};
