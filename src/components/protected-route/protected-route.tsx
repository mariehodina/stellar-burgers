import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';

interface IProtectedRouteProps {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
}

export const ProtectedRoute = ({ children, onlyUnAuth = false }: IProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.user);
  const location = useLocation();

  if (isLoading) {
    return null;
  }

  if (onlyUnAuth && isAuthenticated) {
    const from = location.state?.from || '/';
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};