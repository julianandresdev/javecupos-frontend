// src/app/(main)/publicar/page.tsx (ARCHIVO COMPLETO)
'use client';

import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../../lib/stores/authStore';
import { UserRole } from '../../../types/user.types';
import { CreateCupoForm } from '../../../components/cupos/CreateCupoForm';
import { MyCupoCard } from '../../../components/cupos/MyCupoCard';
import { EditCupoModal } from '../../../components/cupos/EditCupoModal';
import { cuposAPI } from '../../../lib/api/endpoints';
import { Cupo } from '../../../types/cupo.types';
import { CreateCupoFormData, UpdateCupoFormData } from '../../../lib/validations/cupo.validations';
import { useRouter, useSearchParams } from 'next/navigation';

export default function PublicarPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'crear' | 'mis-cupos'>('crear');
  const [misCupos, setMisCupos] = useState<Cupo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCupos, setIsLoadingCupos] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Estados para edición
  const [cupoToEdit, setCupoToEdit] = useState<Cupo | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Verificar que el usuario sea conductor
  useEffect(() => {
    if (user && user.role !== UserRole.DRIVER && user.role !== UserRole.ADMIN) {
      router.push('/cupos');
    }
  }, [user, router]);

  // Manejar tab desde query params
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'mis-cupos') {
      setActiveTab('mis-cupos');
    }
  }, [searchParams]);

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
      alert('Error al cargar tus cupos');
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
      
      // Mostrar mensaje de error más específico
      if (error.response?.data?.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert('Error al crear el cupo. Intenta nuevamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditCupo = (cupo: Cupo) => {
    console.log('Editando cupo:', cupo);
    setCupoToEdit(cupo);
    setIsEditModalOpen(true);
  };

  const handleUpdateCupo = async (cupoId: number, data: UpdateCupoFormData) => {
    try {
      console.log('Actualizando cupo:', cupoId, data);
      
      // Preparar datos para actualización
      const updateData: any = {};
      
      // Solo enviar campos que realmente cambiaron
      if (data.destino !== undefined) updateData.destino = data.destino;
      if (data.descripcion !== undefined) updateData.descripcion = data.descripcion;
      if (data.asientosTotales !== undefined) updateData.asientosTotales = data.asientosTotales;
      if (data.horaSalida !== undefined) updateData.horaSalida = data.horaSalida;
      if (data.horaLlegadaEstimada !== undefined) updateData.horaLlegadaEstimada = data.horaLlegadaEstimada;
      if (data.precio !== undefined) updateData.precio = data.precio;
      if (data.puntoEncuentro !== undefined) updateData.puntoEncuentro = data.puntoEncuentro;
      if (data.telefonoContacto !== undefined) updateData.telefonoContacto = data.telefonoContacto;

      await cuposAPI.update(cupoId, updateData);
      
      // Cerrar modal
      setIsEditModalOpen(false);
      setCupoToEdit(null);
      
      // Mostrar mensaje de éxito
      alert('✅ Cupo actualizado exitosamente');
      
      // Recargar lista de cupos
      await loadMisCupos();
    } catch (error: any) {
      console.error('Error actualizando cupo:', error);
      
      // Mostrar mensaje de error específico
      if (error.response?.data?.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert('Error al actualizar el cupo. Intenta nuevamente.');
      }
      
      // Lanzar error para que el modal sepa que falló
      throw error;
    }
  };

  const handleCancelCupo = async (cupoId: number) => {
    const cupo = misCupos.find((c) => c.id === cupoId);
    
    // Verificar si tiene reservas
    const asientosReservados = cupo ? cupo.asientosTotales - cupo.asientosDisponibles : 0;
    
    let confirmMessage = '¿Estás seguro de cancelar este cupo?';
    if (asientosReservados > 0) {
      confirmMessage = `Este cupo tiene ${asientosReservados} reserva(s). ¿Estás seguro de cancelarlo? Los usuarios serán notificados.`;
    }
    
    if (!confirm(confirmMessage)) {
      return;
    }

    try {
      await cuposAPI.cancel(cupoId);
      alert('✅ Cupo cancelado exitosamente');
      await loadMisCupos();
    } catch (error: any) {
      console.error('Error cancelando cupo:', error);
      
      if (error.response?.data?.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert('Error al cancelar el cupo');
      }
    }
  };

  // Mensaje de éxito al crear
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
              disabled={isLoadingCupos}
              className="px-4 py-2 bg-white border-2 border-primary text-primary rounded-lg hover:bg-primary-light transition-colors disabled:opacity-50"
            >
              🔄 Actualizar
            </button>
          </div>

          {isLoadingCupos ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-gray-600">Cargando cupos...</p>
              </div>
            </div>
          ) : misCupos.length === 0 ? (
            <div className="text-center py-12 card">
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
                  onEdit={() => handleEditCupo(cupo)}
                  onCancel={() => handleCancelCupo(cupo.id)}
                  onViewBookings={() => {
                    router.push(`/publicar/reservas/${cupo.id}`);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal de edición */}
      <EditCupoModal
        cupo={cupoToEdit}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setCupoToEdit(null);
        }}
        onUpdate={handleUpdateCupo}
      />
    </div>
  );
}
