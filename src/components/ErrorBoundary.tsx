// src/components/ErrorBoundary.tsx
'use client';

import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl w-full">
            {/* Icon */}
            <div className="text-center mb-6">
              <div className="text-8xl mb-4">💥</div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                ¡Algo salió mal!
              </h1>
              <p className="text-gray-600">
                La aplicación encontró un error inesperado
              </p>
            </div>

            {/* Error details in development */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-red-800 mb-2">
                  Detalles del Error (solo visible en desarrollo):
                </h3>
                <pre className="text-xs text-red-700 overflow-auto max-h-48 whitespace-pre-wrap break-words">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={this.handleReset}
                className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold"
              >
                Intentar de nuevo
              </button>
              <button
                onClick={this.handleReload}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                Recargar página
              </button>
              <a
                href="/"
                className="flex-1 px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary-light transition-colors font-semibold text-center"
              >
                Ir al Inicio
              </a>
            </div>

            {/* Support info */}
            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600 mb-2">
                Si el problema persiste, por favor contáctanos
              </p>
              <a
                href="mailto:soporte@javecupos.com"
                className="text-primary hover:underline font-medium"
              >
                soporte@javecupos.com
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
