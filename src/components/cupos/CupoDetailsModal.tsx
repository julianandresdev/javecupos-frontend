'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Cupo } from '../../types/cupo.types';
import { Button } from '../../components/ui/Button';

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
  const [asientosSeleccionados, setAsientosSeleccionados] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (!isOpen || !cupo) return null;

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
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold">
                {cupo.conductor.avatar ? (
                  <img src={cupo.conductor.avatar} alt={cupo.conductor.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  cupo.conductor.name.charAt(0).toUpperCase()
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{cupo.conductor.name}</h3>
                <div className="flex items-center gap-1 text-yellow-500">
                  <span>⭐</span>
                  <span className="text-gray-600">{cupo.conductor.rate}/5</span>
                </div>
              </div>
              {cupo.conductor.phone && (
                <a
                  href={`tel:${cupo.conductor.phone}`}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  📞 Llamar
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

          {/* Selección de asientos */}
          {cupo.asientosDisponibles > 0 && (
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
        </div>

        {/* Footer con botones */}
        <div className="p-6 bg-gray-50 rounded-b-2xl space-y-3">
          {cupo.asientosDisponibles > 0 ? (
            <Button onClick={handleReservar} isLoading={isLoading}>
              Confirmar reserva
            </Button>
          ) : (
            <div className="text-center py-4">
              <p className="text-red-600 font-semibold">
                No hay asientos disponibles
              </p>
            </div>
          )}
          <Button variant="secondary" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
};
