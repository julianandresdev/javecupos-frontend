// src/components/ui/SkeletonLoader.tsx
'use client';

import React from 'react';

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
  );
};

// Skeleton para tarjeta de cupo
export const CupoCardSkeleton: React.FC = () => {
  return (
    <div className="card p-4 space-y-3">
      {/* Header con destino */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-5 w-16" />
      </div>

      {/* Fecha y hora */}
      <Skeleton className="h-4 w-1/2" />

      {/* Precio y asientos */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-7 w-24" />
        <Skeleton className="h-5 w-20" />
      </div>

      {/* Conductor */}
      <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </div>
  );
};

// Skeleton para lista de reservas
export const BookingCardSkeleton: React.FC = () => {
  return (
    <div className="card p-4 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>

      {/* Detalles */}
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-1/2" />

      {/* Footer con conductor */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-8 w-28" />
      </div>
    </div>
  );
};

// Skeleton para perfil de usuario
export const ProfileSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Avatar y nombre */}
      <div className="flex flex-col items-center gap-4">
        <Skeleton className="h-32 w-32 rounded-full" />
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-5 w-32" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="text-center space-y-2">
            <Skeleton className="h-8 w-16 mx-auto" />
            <Skeleton className="h-4 w-20 mx-auto" />
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="card p-6 space-y-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
};

// Skeleton genérico configurable
export const GenericSkeleton: React.FC<{
  lines?: number;
  lineHeight?: string;
  gap?: string;
}> = ({ lines = 3, lineHeight = 'h-4', gap = 'space-y-2' }) => {
  return (
    <div className={gap}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={`${lineHeight} ${i === lines - 1 ? 'w-2/3' : 'w-full'}`} />
      ))}
    </div>
  );
};

// Skeleton para lista de items
export const ListSkeleton: React.FC<{
  count?: number;
  type?: 'cupo' | 'booking' | 'generic';
}> = ({ count = 3, type = 'generic' }) => {
  const SkeletonComponent = {
    cupo: CupoCardSkeleton,
    booking: BookingCardSkeleton,
    generic: () => <div className="card p-4"><GenericSkeleton lines={4} /></div>,
  }[type];

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonComponent key={i} />
      ))}
    </div>
  );
};

export default Skeleton;
