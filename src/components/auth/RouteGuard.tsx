// src/components/auth/RouteGuard.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../lib/stores/authStore';
import { UserStatus } from '@/src/types/user.types';

interface RouteGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireVerified?: boolean;
  allowedRoles?: string[];
  redirectTo?: string;
}

export const RouteGuard: React.FC<RouteGuardProps> = ({
  children,
  requireAuth = true,
  requireVerified = false,
  allowedRoles = [],
  redirectTo = '/login',
}) => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Check authentication
    if (requireAuth && !isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    // Check if user exists (should exist if authenticated)
    if (!user && isAuthenticated) {
      return; // Loading user data
    }

    // Check email verification
    if (requireVerified && user && user.status !== UserStatus.ACTIVE) {
      if (user.status === UserStatus.PENDING) {
        router.push('/verify-email');
        return;
      }
      if (user.status === UserStatus.INACTIVE) {
        // User account is inactive
        router.push('/account-inactive');
        return;
      }
    }

    // Check allowed roles
    if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
      router.push('/unauthorized');
      return;
    }
  }, [user, isAuthenticated, requireAuth, requireVerified, allowedRoles, redirectTo, router]);

  // Show loading state while checking auth
  if (requireAuth && !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Render children if all checks pass
  return <>{children}</>;
};

export default RouteGuard;
