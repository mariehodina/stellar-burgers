import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';

interface IProtectedRouteProps {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
}

export const ProtectedRoute = ({ children, onlyUnAuth = false }: IProtectedRouteProps) => {
  const { isAuth, loading } = useSelector((state) => state.user);
  const location = useLocation();

  if (loading) {
    return null;
  }

  if (onlyUnAuth && isAuth) {
    const from = location.state?.from || '/';
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};