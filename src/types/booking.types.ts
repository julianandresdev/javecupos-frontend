// src/types/booking.types.ts

export enum BookingStatus {
  PENDING = 'PENDIENTE',
  CONFIRMED = 'CONFIRMADO',
  REJECTED = 'RECHAZADO',
  CANCELLED = 'CANCELADO',
  COMPLETED = 'COMPLETADO',
}

export interface Booking {
  id: number;
  userId: number;
  user?: {
    id: number;
    name: string;
    avatar?: string;
    rate: number;
  };
  cupoId: number;
  cupo?: {
    id: number;
    destino: string;
    horaSalida: Date;
    precio: number;
  };
  asientosReservados: number;
  montoTotal: number;
  estado: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}
