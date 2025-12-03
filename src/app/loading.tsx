export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700">Cargando...</h2>
        <p className="text-gray-500">Preparando tu viaje</p>
      </div>
    </div>
  );
}
