import { FC } from 'react';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from '../../services/store';
import { TOrder } from '@utils-types';

const filterOrdersByStatus = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((order) => order.status === status)
    .map((order) => order.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders = useSelector((state) => state.burgerFeed.orders);
  const total = useSelector((state) => state.burgerFeed.total);
  const totalToday = useSelector((state) => state.burgerFeed.totalToday);

  const readyOrders = filterOrdersByStatus(orders, 'done');
  const pendingOrders = filterOrdersByStatus(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={{ total, totalToday }}
    />
  );
};