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
import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import { Preloader } from '@ui';
import { ProtectedRoute } from '../protected-route';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchBurgerIngredients } from '../../services/slices/burgerIngredientsSlice';
import { getBurgerUser } from '../../services/slices/burgerUserSlice';
import { getCookie } from '../../utils/cookie';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const modalBackground = location.state?.background;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBurgerIngredients());
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      dispatch(getBurgerUser());
    }
  }, [dispatch]);

  const isIngredientsLoading = useSelector(
    (state) => state.ingredients.isLoading
  );
  const ingredientsError = useSelector((state) => state.ingredients.error);

  const handleModalClose = () => {
    navigate(-1);
  };

  const OrderModal = () => {
    const { number: orderNumber } = useParams();
    return (
      <Modal onClose={handleModalClose} title={`#${orderNumber}`}>
        <OrderInfo />
      </Modal>
    );
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={modalBackground || location}>
        <Route
          path='/'
          element={
            isIngredientsLoading ? (
              <Preloader />
            ) : ingredientsError ? (
              <div
                className={`${styles.error} text text_type_main-medium pt-4`}
              >
                {ingredientsError}
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
          <Route path='/feed/:number' element={<OrderModal />} />
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
            element={
              <ProtectedRoute>
                <OrderModal />
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
