import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Crear instancia de Axios
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Para enviar cookies (refresh token)
});

// Interceptor de REQUEST: Agregar access token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Obtener el token del localStorage
    const token = localStorage.getItem('access_token');
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de RESPONSE: Manejar errores y refresh token
apiClient.interceptors.response.use(
  (response) => {
    // Si la respuesta es exitosa, retornarla directamente
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Si el error es 401 (no autorizado) y no es un retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Intentar refrescar el token
        // El refresh token está en las cookies (httpOnly), se envía automáticamente
        const response = await axios.post(
          `${API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = response.data.access_token;

        // Guardar el nuevo access token
        localStorage.setItem('access_token', newAccessToken);

        // Actualizar el header de la petición original
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Reintentar la petición original
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Si el refresh falla, limpiar todo y redirigir al login
        localStorage.removeItem('access_token');
        
        // Redirigir al login (solo en el navegador)
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
