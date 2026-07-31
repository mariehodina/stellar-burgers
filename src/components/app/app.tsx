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
<<<<<<< HEAD
import '../../index.css';
=======

>>>>>>> 5613f3f6626cc344f1142a6387d582e391da6776
import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import { Preloader } from '@ui';
import { ProtectedRoute } from '../protected-route';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
<<<<<<< HEAD
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
=======
  useParams
} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import { getUser, authChecked } from '../../services/slices/userSlice';
>>>>>>> 5613f3f6626cc344f1142a6387d582e391da6776
import { getCookie } from '../../utils/cookie';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
<<<<<<< HEAD
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

  const isLoading = useSelector((state) => state.ingredients.isLoading);
  const errorMessage = useSelector((state) => state.ingredients.error);

  const handleModalClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const OrderModalContent = useMemo(() => {
    return (
      <Modal onClose={handleModalClose} title={`#${orderNumber}`}>
        <OrderInfo />
      </Modal>
    );
  }, [handleModalClose, orderNumber]);
=======
  const background = location.state?.background;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());

    const token = getCookie('accessToken');
    if (token) {
      dispatch(getUser());
    } else {
      dispatch(authChecked());
    }
  }, [dispatch]);

  const isLoading = useSelector((state) => state.ingredients.loading);
  const error = useSelector((state) => state.ingredients.error);

  const handleModalClose = () => {
    navigate(-1);
  };

  const OrderModal = () => {
    const { number } = useParams();
    return (
      <Modal onClose={handleModalClose} title={`#${number}`}>
        <OrderInfo />
      </Modal>
    );
  };
>>>>>>> 5613f3f6626cc344f1142a6387d582e391da6776

  return (
    <div className={styles.app}>
      <AppHeader />
<<<<<<< HEAD
      <Routes location={modalBackground || location}>
=======
      <Routes location={background || location}>
>>>>>>> 5613f3f6626cc344f1142a6387d582e391da6776
        <Route
          path='/'
          element={
            isLoading ? (
              <Preloader />
<<<<<<< HEAD
            ) : errorMessage ? (
              <div
                className={`${styles.error} text text_type_main-medium pt-4`}
              >
                {errorMessage}
=======
            ) : error ? (
              <div
                className={`${styles.error} text text_type_main-medium pt-4`}
              >
                {error}
>>>>>>> 5613f3f6626cc344f1142a6387d582e391da6776
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

<<<<<<< HEAD
      {modalBackground && (
        <Routes>
          <Route path='/feed/:number' element={OrderModalContent} />
=======
      {background && (
        <Routes>
          <Route path='/feed/:number' element={<OrderModal />} />
>>>>>>> 5613f3f6626cc344f1142a6387d582e391da6776
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
<<<<<<< HEAD
            element={<ProtectedRoute>{OrderModalContent}</ProtectedRoute>}
=======
            element={
              <ProtectedRoute>
                <OrderModal />
              </ProtectedRoute>
            }
>>>>>>> 5613f3f6626cc344f1142a6387d582e391da6776
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
