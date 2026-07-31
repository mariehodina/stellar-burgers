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
  const orders = useSelector((state) => state.feed.orders);
<<<<<<< HEAD
  const totalOrders = useSelector((state) => state.feed.total);
  const totalTodayOrders = useSelector((state) => state.feed.totalToday);

  const readyOrders = filterOrdersByStatus(orders, 'done');
  const pendingOrders = filterOrdersByStatus(orders, 'pending');

  const feedStats = {
    total: totalOrders,
    totalToday: totalTodayOrders
  };
=======
  const total = useSelector((state) => state.feed.total);
  const totalToday = useSelector((state) => state.feed.totalToday);
  const feed = {};

  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');
>>>>>>> 5613f3f6626cc344f1142a6387d582e391da6776

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
<<<<<<< HEAD
      feed={feedStats}
=======
      feed={{ total, totalToday }}
>>>>>>> 5613f3f6626cc344f1142a6387d582e391da6776
    />
  );
};
