
export enum NotificationType {
  BOOKING_CREATED = 'Reserva creada',
  BOOKING_CONFIRMED = 'Reserva confirmada',
  BOOKING_CANCELLED = 'Reserva cancelada',
  CUPO_CREATED = 'Cupo creado',
  CUPO_CANCELLED = 'Cupo cancelado',
  // ... otros tipos del enum del backend
}

export enum NotificationStatus {
  PENDING = 'Pendiente',
  READ = 'Leida',
}

export interface Notification {
  id: number;
  userId: number;
  type: NotificationType;
  message: string;
  isRead: NotificationStatus;
  createdAt: Date;
  updatedAt: Date;
}
