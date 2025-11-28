// src/app/(main)/profile/bookings/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { bookingsAPI } from '../../../../lib/api/endpoints';
import { Booking, BookingStatus } from '../../../../types/booking.types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<BookingStatus | 'TODAS'>('TODAS');

  useEffect(() => {
    loadBookings();
  }, []);

  useEffect(() => {
    if (filter === 'TODAS') {
      setFilteredBookings(bookings);
    } else {
      setFilteredBookings(bookings.filter((b) => b.estado === filter));
    }
  }, [filter, bookings]);

  const loadBookings = async () => {
    try {
      setIsLoading(true);
      const data = await bookingsAPI.getMyBookings();
      setBookings(data);
      setFilteredBookings(data);
    } catch (error) {
      console.error('Error cargando reservas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async (bookingId: number) => {
    if (!confirm('¿Cancelar esta reserva?')) return;

    try {
      await bookingsAPI.cancel(bookingId);
      alert('Reserva cancelada');
      loadBookings();
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cancelar reserva');
    }
  };

  const estadoColors = {
    'PENDIENTE': 'bg-yellow-100 text-yellow-800 border-yellow-300',
    'CONFIRMADO': 'bg-green-100 text-green-800 border-green-300',
    'RECHAZADO': 'bg-red-100 text-red-800 border-red-300',
    'CANCELADO': 'bg-gray-100 text-gray-800 border-gray-300',
    'COMPLETADO': 'bg-blue-100 text-blue-800 border-blue-300',
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Mis Reservas</h1>
        <p className="text-gray-600">
          {bookings.length} {bookings.length === 1 ? 'reserva' : 'reservas'} en total
        </p>
      </div>

      {/* Filtros */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {['TODAS', 'PENDIENTE', 'CONFIRMADO', 'RECHAZADO', 'CANCELADO', 'COMPLETADO'].map((estado) => (
          <button
            key={estado}
            onClick={() => setFilter(estado as any)}
            className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
              filter === estado
                ? 'bg-primary text-white'
                : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-primary'
            }`}
          >
            {estado}
          </button>
        ))}
      </div>

      {/* Lista de reservas */}
      {filteredBookings.length === 0 ? (
        <div className="text-center py-12 card">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            No hay reservas
          </h3>
          <p className="text-gray-600">
            {filter === 'TODAS'
              ? 'Aún no has hecho ninguna reserva'
              : `No tienes reservas con estado ${filter}`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="card">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">
                    {booking.cupo?.destino}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {booking.cupo?.horaSalida &&
                      format(new Date(booking.cupo.horaSalida), "EEEE dd 'de' MMMM, HH:mm 'hrs'", { locale: es })}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${estadoColors[booking.estado]}`}>
                  {booking.estado}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-gray-600">Asientos</p>
                  <p className="font-semibold">{booking.asientosReservados}</p>
                </div>
                <div>
                  <p className="text-gray-600">Precio unitario</p>
                  <p className="font-semibold">${booking.cupo?.precio.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Total pagado</p>
                  <p className="font-semibold text-primary">
                    ${booking.montoTotal.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                <p>Reservado el: {format(new Date(booking.createdAt), "dd/MM/yyyy 'a las' HH:mm", { locale: es })}</p>
              </div>

              {/* Botón de cancelar (solo para pendientes o confirmadas) */}
              {(booking.estado === 'PENDIENTE' || booking.estado === 'CONFIRMADO') && (
                <button
                  onClick={() => handleCancel(booking.id)}
                  className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                >
                  Cancelar reserva
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
