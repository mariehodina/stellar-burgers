import { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { OrderCardProps } from './type';
import { TIngredient } from '@utils-types';
import { OrderCardUI } from '../ui/order-card';
import { useSelector } from '../../services/store';

const MAX_VISIBLE_INGREDIENTS = 6; 

export const OrderCard: FC<OrderCardProps> = memo(({ order }) => {
  const currentLocation = useLocation(); 
  const ingredients = useSelector((state) => state.ingredients.ingredients);

  const orderDetails = useMemo(() => { 
    if (!ingredients.length) return null;

    const orderIngredients = (order.ingredients || []).reduce( 
      (acc: TIngredient[], ingredientId: string) => { 
        const foundIngredient = ingredients.find((ing) => ing._id === ingredientId); 
        if (foundIngredient) return [...acc, foundIngredient];
        return acc;
      },
      []
    );

    const totalPrice = orderIngredients.reduce( 
      (sum, ingredient) => sum + ingredient.price, 
      0
    );

    const visibleIngredients = orderIngredients.slice(0, MAX_VISIBLE_INGREDIENTS); 
    const remainingCount = 
      orderIngredients.length > MAX_VISIBLE_INGREDIENTS
        ? orderIngredients.length - MAX_VISIBLE_INGREDIENTS
        : 0;

    const orderDate = new Date(order.createdAt); 

    return {
      ...order,
      ingredients: order.ingredients || [],
      ingredientsInfo: orderIngredients, 
      ingredientsToShow: visibleIngredients, 
      remains: remainingCount, 
      total: totalPrice, 
      date: orderDate 
    };
  }, [order, ingredients]);

  if (!orderDetails) return null; 

  return (
    <OrderCardUI
      orderInfo={orderDetails} 
      maxIngredients={MAX_VISIBLE_INGREDIENTS} 
      locationState={{ background: currentLocation }} 
    />
  );
});