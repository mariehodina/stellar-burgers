import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
<<<<<<< HEAD
import { fetchBurgerFeeds } from '../../services/slices/burgerFeedSlice';
=======
import { getFeeds } from '../../services/slices/feedSlice';
>>>>>>> 5613f3f6626cc344f1142a6387d582e391da6776

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.feed.orders);

  useEffect(() => {
<<<<<<< HEAD
    dispatch(fetchBurgerFeeds());
=======
    dispatch(getFeeds());
>>>>>>> 5613f3f6626cc344f1142a6387d582e391da6776
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }
<<<<<<< HEAD
  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => dispatch(fetchBurgerFeeds())}
    />
  );
=======
  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeeds())} />;
>>>>>>> 5613f3f6626cc344f1142a6387d582e391da6776
};
