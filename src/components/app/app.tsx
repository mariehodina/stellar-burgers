import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingredientSlice';
import { checkAuth } from '../../services/slices/userSlice';
import { AppHeader, Modal, IngredientDetails, OrderInfo, ProtectedRoute } from '@components';
import { Preloader } from '@ui';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404,
} from '@pages';
import styles from './app.module.css';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state?.background;
  const { loading } = useSelector((state) => state.ingredients);

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading) {
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
        <Route path="/" element={<ConstructorPage />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/profile/orders" element={<ProtectedRoute><ProfileOrders /></ProtectedRoute>} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route path="/ingredients/:id" element={<Modal title="Детали ингредиента"><IngredientDetails /></Modal>} />
          <Route path="/feed/:number" element={<Modal><OrderInfo /></Modal>} />
          <Route path="/profile/orders/:number" element={<ProtectedRoute><Modal><OrderInfo /></Modal></ProtectedRoute>} />
        </Routes>
      )}
    </div>
  );
}

export default App;