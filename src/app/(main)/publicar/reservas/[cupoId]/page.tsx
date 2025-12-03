// src/app/(main)/publicar/reservas/[cupoId]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { bookingsAPI, cuposAPI } from '../../../../../lib/api/endpoints';
import { Booking } from '../../../../../types/booking.types';
import { Cupo } from '../../../../../types/cupo.types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Button } from '../../../../../components/ui/Button';

export default function ReservasCupoPage() {
  const params = useParams();
  const router = useRouter();
  const cupoId = Number(params.cupoId);

  const [cupo, setCupo] = useState<Cupo | null>(null);
  const [reservas, setReservas] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [cupoId]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [cupoData, reservasData] = await Promise.all([
        cuposAPI.getById(cupoId),
        bookingsAPI.getByCupoId(cupoId),
      ]);
      setCupo(cupoData);
      setReservas(reservasData);
    } catch (error) {
      console.error('Error cargando datos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = async (bookingId: number) => {
    if (!confirm('¿Confirmar esta reserva?')) return;

    try {
      await bookingsAPI.confirm(bookingId);
      alert('Reserva confirmada');
      loadData();
    } catch (error) {
      console.error('Error:', error);
      alert('Error al confirmar reserva');
    }
  };

  const handleReject = async (bookingId: number) => {
    if (!confirm('¿Rechazar esta reserva?')) return;

    try {
      await bookingsAPI.reject(bookingId);
      alert('Reserva rechazada');
      loadData();
    } catch (error) {
      console.error('Error:', error);
      alert('Error al rechazar reserva');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!cupo) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Cupo no encontrado</p>
        <button
          onClick={() => router.back()}
          className="mt-4 text-primary hover:text-primary-dark"
        >
          ← Volver
        </button>
      </div>
    );
  }

  // Colores de estado
  const estadoColors = {
    'PENDIENTE': 'bg-yellow-100 text-yellow-800 border-yellow-300',
    'CONFIRMADO': 'bg-green-100 text-green-800 border-green-300',
    'RECHAZADO': 'bg-red-100 text-red-800 border-red-300',
    'CANCELADO': 'bg-gray-100 text-gray-800 border-gray-300',
    'COMPLETADO': 'bg-blue-100 text-blue-800 border-blue-300',
  };

  return (
    <div>
      {/* Header */}
      <button
        onClick={() => router.push('/publicar?tab=mis-cupos')}
        className="mb-4 text-primary hover:text-primary-dark flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Volver a mis cupos
      </button>

      {/* Info del cupo */}
      <div className="card mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Reservas del cupo
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Destino</p>
            <p className="font-semibold">{cupo.destino}</p>
          </div>
          <div>
            <p className="text-gray-600">Fecha</p>
            <p className="font-semibold">
              {format(new Date(cupo.horaSalida), 'dd/MM/yyyy HH:mm')}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Asientos</p>
            <p className="font-semibold">
              {cupo.asientosDisponibles}/{cupo.asientosTotales}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Precio</p>
            <p className="font-semibold">${cupo.precio.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Lista de reservas */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Reservas recibidas ({reservas.length})
      </h2>

      {reservas.length === 0 ? (
        <div className="text-center py-12 card">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            No hay reservas aún
          </h3>
          <p className="text-gray-600">
            Cuando alguien reserve, aparecerá aquí
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reservas.map((reserva) => (
            <div key={reserva.id} className="card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  {/* Avatar del usuario */}
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                    {reserva.user?.avatar ? (
                      <img
                        src={reserva.user.avatar}
                        alt={reserva.user.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      reserva.user?.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  
                  {/* Info del usuario */}
                  <div>
                    <h3 className="font-semibold text-lg">{reserva.user?.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <span>⭐</span>
                      <span>{reserva.user?.rate}/5</span>
                    </div>
                  </div>
                </div>

                {/* Badge de estado */}
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${estadoColors[reserva.estado]}`}>
                  {reserva.estado}
                </span>
              </div>

              {/* Detalles de la reserva */}
              <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-gray-600">Asientos</p>
                  <p className="font-semibold">{reserva.asientosReservados}</p>
                </div>
                <div>
                  <p className="text-gray-600">Monto total</p>
                  <p className="font-semibold text-primary">
                    ${reserva.montoTotal.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Fecha reserva</p>
                  <p className="font-semibold">
                    {format(new Date(reserva.createdAt), 'dd/MM/yyyy', { locale: es })}
                  </p>
                </div>
              </div>

              {/* Acciones */}
              {reserva.estado === 'PENDIENTE' && (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleConfirm(reserva.id)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                  >
                    ✓ Confirmar
                  </button>
                  <button
                    onClick={() => handleReject(reserva.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                  >
                    ✗ Rechazar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
