import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { checkAuth } from '../../services/slices/userSlice';
import { AppHeader } from '@components';
import { Preloader } from '@ui';
import { ProtectedRoute } from '../protected-route/protected-route';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import styles from './app.module.css';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state?.background;
  const { loading } = useSelector((state) => state.ingredients);
  const { loading: userLoading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading || userLoading) {
    return (
      <div className={styles.app}>
        <AppHeader />
        <Preloader />
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<ProtectedRoute onlyUnAuth><Login /></ProtectedRoute>} />
        <Route path='/register' element={<ProtectedRoute onlyUnAuth><Register /></ProtectedRoute>} />
        <Route path='/forgot-password' element={<ProtectedRoute onlyUnAuth><ForgotPassword /></ProtectedRoute>} />
        <Route path='/reset-password' element={<ProtectedRoute onlyUnAuth><ResetPassword /></ProtectedRoute>} />
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path='/profile/orders' element={<ProtectedRoute><ProfileOrders /></ProtectedRoute>} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </div>
  );
}

export default App;