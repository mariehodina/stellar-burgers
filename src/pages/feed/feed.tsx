import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchBurgerFeeds } from '../../services/slices/burgerFeedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.burgerFeed);

  useEffect(() => {
    dispatch(fetchBurgerFeeds());
  }, [dispatch]);

  if (isLoading || !orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => dispatch(fetchBurgerFeeds())}
    />
  );
};