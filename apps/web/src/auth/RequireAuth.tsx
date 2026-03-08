import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext.js';
import type { ReactElement } from 'react';

export function RequireAuth({ children }: { children: ReactElement }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <p>Checking session...</p>;

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
