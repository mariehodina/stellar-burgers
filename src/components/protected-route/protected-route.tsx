import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';

export const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const { isAuth } = useSelector((state) => state.user);
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};