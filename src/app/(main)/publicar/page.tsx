// src/app/(main)/publicar/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../../lib/stores/authStore';
import { UserRole } from '../../../types/user.types';
import { CreateCupoForm } from '../../../components/cupos/CreateCupoForm';
import { MyCupoCard } from '../../../components/cupos/MyCupoCard';
import { cuposAPI } from '../../../lib/api/endpoints';
import { Cupo } from '../../../types/cupo.types';
import { CreateCupoFormData } from '../../../lib/validations/cupo.validations';
import { useRouter } from 'next/navigation';

export default function PublicarPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'crear' | 'mis-cupos'>('crear');
  const [misCupos, setMisCupos] = useState<Cupo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCupos, setIsLoadingCupos] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Verificar que el usuario sea conductor
  useEffect(() => {
    if (user && user.role !== UserRole.DRIVER && user.role !== UserRole.ADMIN) {
      router.push('/cupos');
    }
  }, [user, router]);

  // Cargar mis cupos
  useEffect(() => {
    if (activeTab === 'mis-cupos') {
      loadMisCupos();
    }
  }, [activeTab]);

  const loadMisCupos = async () => {
    try {
      setIsLoadingCupos(true);
      const data = await cuposAPI.getMyCupos();
      setMisCupos(data);
    } catch (error) {
      console.error('Error cargando cupos:', error);
    } finally {
      setIsLoadingCupos(false);
    }
  };

  const handleCreateCupo = async (data: CreateCupoFormData) => {
    try {
      setIsLoading(true);

      // Preparar datos
      const cupoData = {
        ...data,
        asientosDisponibles: data.asientosTotales, // Inicialmente todos disponibles
      };

      await cuposAPI.create(cupoData);
      
      setShowSuccess(true);
      
      // Cambiar a la pestaña de mis cupos después de 2 segundos
      setTimeout(() => {
        setShowSuccess(false);
        setActiveTab('mis-cupos');
      }, 2000);
    } catch (error: any) {
      console.error('Error creando cupo:', error);
      alert('Error al crear el cupo. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelCupo = async (cupoId: number) => {
    if (!confirm('¿Estás seguro de cancelar este cupo? Esta acción no se puede deshacer.')) {
      return;
    }

    try {
      await cuposAPI.cancel(cupoId);
      alert('Cupo cancelado exitosamente');
      loadMisCupos();
    } catch (error) {
      console.error('Error cancelando cupo:', error);
      alert('Error al cancelar el cupo');
    }
  };

  // Mensaje de éxito
  if (showSuccess) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-green-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            ¡Cupo publicado!
          </h2>
          <p className="text-gray-600">
            Tu cupo ya está visible para los usuarios
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('crear')}
            className={`pb-3 px-4 font-medium transition-colors border-b-2 ${
              activeTab === 'crear'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            ➕ Crear nuevo cupo
          </button>
          <button
            onClick={() => setActiveTab('mis-cupos')}
            className={`pb-3 px-4 font-medium transition-colors border-b-2 ${
              activeTab === 'mis-cupos'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            📋 Mis cupos publicados
          </button>
        </div>
      </div>

      {/* Contenido según tab */}
      {activeTab === 'crear' && (
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Publicar nuevo cupo
          </h2>
          <p className="text-gray-600 mb-6">
            Completa la información del viaje que vas a realizar
          </p>
          <div className="card">
            <CreateCupoForm onSubmit={handleCreateCupo} isLoading={isLoading} />
          </div>
        </div>
      )}

      {activeTab === 'mis-cupos' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Mis cupos publicados</h2>
              <p className="text-gray-600 text-sm">
                {misCupos.length} {misCupos.length === 1 ? 'cupo' : 'cupos'}
              </p>
            </div>
            <button
              onClick={loadMisCupos}
              className="px-4 py-2 bg-white border-2 border-primary text-primary rounded-lg hover:bg-primary-light transition-colors"
            >
              🔄 Actualizar
            </button>
          </div>

          {isLoadingCupos ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : misCupos.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🚗</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                No has publicado cupos aún
              </h3>
              <p className="text-gray-600 mb-6">
                Crea tu primer cupo en la pestaña "Crear nuevo cupo"
              </p>
              <button
                onClick={() => setActiveTab('crear')}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                Crear cupo
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {misCupos.map((cupo) => (
                <MyCupoCard
                  key={cupo.id}
                  cupo={cupo}
                  onEdit={() => {
                    // Por ahora solo mostrar alerta
                    alert('Funcionalidad de editar próximamente');
                  }}
                  onCancel={() => handleCancelCupo(cupo.id)}
                  onViewBookings={() => {
                    // Redirigir a reservas (implementaremos después)
                    router.push(`/publicar/reservas/${cupo.id}`);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
