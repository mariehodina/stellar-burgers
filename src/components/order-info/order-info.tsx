import { FC, useMemo, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchOrderByNumber,
  clearCurrentOrder
} from '../../services/slices/orderSlice';

export const OrderInfo: FC = () => {
  const { number: orderNumber } = useParams();
  const dispatch = useDispatch();
  const currentOrder = useSelector((state) => state.order.currentOrder);
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const isLoading = useSelector((state) => state.order.isLoading);  // ← изменили

  useEffect(() => {
    if (orderNumber) {
      dispatch(fetchOrderByNumber(Number(orderNumber)));
    }
    return () => {
      dispatch(clearCurrentOrder());
    };
  }, [dispatch, orderNumber]);

  const orderDetails = useMemo(() => {
    if (!currentOrder || !ingredients.length || !currentOrder.ingredients)
      return null;

    const orderDate = new Date(currentOrder.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsWithCount: TIngredientsWithCount =
      currentOrder.ingredients.reduce(
        (acc: TIngredientsWithCount, ingredientId: string) => {
          if (!acc[ingredientId]) {
            const foundIngredient = ingredients.find(
              (ing: TIngredient) => ing._id === ingredientId
            );
            if (foundIngredient) {
              acc[ingredientId] = {
                ...foundIngredient,
                count: 1
              };
            }
          } else {
            acc[ingredientId].count++;
          }
          return acc;
        },
        {}
      );

    const totalPrice = Object.values(ingredientsWithCount).reduce(
      (sum: number, item: TIngredient & { count: number }) =>
        sum + item.price * item.count,
      0
    );

    const { ingredients: _, ...orderWithoutIngredients } = currentOrder;

    return {
      ...orderWithoutIngredients,
      ingredients: currentOrder.ingredients,
      ingredientsInfo: ingredientsWithCount,
      date: orderDate,
      total: totalPrice
    };
  }, [currentOrder, ingredients]);

  if (!orderDetails) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderDetails} />;
};