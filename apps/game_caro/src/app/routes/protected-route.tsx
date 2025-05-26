import { EPagePath } from 'game_caro_package/libs';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from 'game_caro_package/context-api/auth.context';

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to={EPagePath.LOGIN} replace />;
};
