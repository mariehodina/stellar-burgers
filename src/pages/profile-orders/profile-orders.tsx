import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
<<<<<<< HEAD
import { getBurgerOrders } from '../../services/slices/burgerArchiveSlice';
=======
import { getOrders } from '../../services/slices/ordersSlice';
>>>>>>> 5613f3f6626cc344f1142a6387d582e391da6776
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
<<<<<<< HEAD
  const { orders, isOrdersLoading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getBurgerOrders());
  }, [dispatch]);

  if (isOrdersLoading) {
=======
  const { orders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  if (loading) {
>>>>>>> 5613f3f6626cc344f1142a6387d582e391da6776
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
