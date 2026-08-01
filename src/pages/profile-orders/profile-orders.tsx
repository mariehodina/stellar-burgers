import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getBurgerOrders } from '../../services/slices/burgerArchiveSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { orders, isOrdersLoading } = useSelector((state) => state.burgerOrders);

  useEffect(() => {
    dispatch(getBurgerOrders());
  }, [dispatch]);

  if (isOrdersLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};