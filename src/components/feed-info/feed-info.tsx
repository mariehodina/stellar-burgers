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
  const totalOrders = useSelector((state) => state.feed.total); 
  const totalTodayOrders = useSelector((state) => state.feed.totalToday); 
  
  const readyOrders = filterOrdersByStatus(orders, 'done'); 
  const pendingOrders = filterOrdersByStatus(orders, 'pending'); 

  const feedStats = { 
    total: totalOrders, 
    totalToday: totalTodayOrders 
  };

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feedStats} 
    />
  );
};