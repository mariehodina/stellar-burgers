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
import '../../index.css';
import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import { Preloader } from '@ui';
import { ProtectedRoute } from '../protected-route';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  useParams,
  useMatch
} from 'react-router-dom';
import { useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchBurgerIngredients } from '../../services/slices/burgerIngredientsSlice';
import {
  getBurgerUser,
  authBurgerChecked
} from '../../services/slices/burgerUserSlice';
import { getCookie } from '../../utils/cookie';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const modalBackground = location.state?.background;
  const dispatch = useDispatch();

  const orderMatch =
    useMatch('/feed/:number') || useMatch('/profile/orders/:number');
  const orderNumber = orderMatch?.params.number;

  useEffect(() => {
    dispatch(fetchBurgerIngredients());
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      dispatch(getBurgerUser());
    } else {
      dispatch(authBurgerChecked());
    }
  }, [dispatch]);
  //загрузка
  const isLoading = useSelector((state) => state.burgerIngredients.isLoading);
  const errorMessage = useSelector((state) => state.burgerIngredients.error);
  const handleModalClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const OrderModalContent = useMemo(
    () => (
      <Modal onClose={handleModalClose} title={`#${orderNumber}`}>
        <OrderInfo />
      </Modal>
    ),
    [handleModalClose, orderNumber]
  );

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={modalBackground || location}>
        <Route
          path='/'
          element={
            isLoading ? (
              <Preloader />
            ) : errorMessage ? (
              <div
                className={`${styles.error} text text_type_main-medium pt-4`}
              >
                {errorMessage}
              </div>
            ) : (
              <ConstructorPage />
            )
          }
        />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/feed/:number'
          element={
            <div className={styles.detailPageWrap}>
              <OrderInfo />
            </div>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <div className={styles.detailPageWrap}>
              <p className={`text text_type_main-large ${styles.detailHeader}`}>
                Детали ингредиента
              </p>
              <IngredientDetails />
            </div>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <div className={styles.detailPageWrap}>
                <OrderInfo />
              </div>
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {modalBackground && (
        <Routes>
          <Route path='/feed/:number' element={OrderModalContent} />
          <Route
            path='/ingredients/:id'
            element={
              <Modal onClose={handleModalClose} title='Детали ингредиента'>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={<ProtectedRoute>{OrderModalContent}</ProtectedRoute>}
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
