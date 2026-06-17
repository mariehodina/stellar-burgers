import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { BurgerConstructorUI } from '@ui';
import { TConstructorIngredient } from '@utils-types';
import { createOrder, clearOrder } from '../../services/slices/orderSlice';
import { deleteIngredient, resetConstructor } from '../../services/slices/constructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  } = useSelector((state) => ({
    bun: state.burgerConstructor?.bun as TConstructorIngredient | null,
    ingredients: state.burgerConstructor?.ingredients || []
  }));

  const isOrderRequesting = useSelector((state) => state.order.orderRequest);
  const orderDetails = useSelector((state) => state.order.orderModalData);
  const currentUser = useSelector((state) => state.user.user);

  const handleOrderClick = () => {
    if (!constructorItems.bun || isOrderRequesting) return;

    if (!currentUser) {
      navigate('/login');
      return;
    }

    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((i: TConstructorIngredient) => i._id),
      constructorItems.bun._id
    ];
    dispatch(createOrder(ingredientIds))
      .unwrap()
      .then(() => {
        dispatch(resetConstructor());
      });
  };

  const handleCloseOrderModal = () => {
    dispatch(clearOrder());
  };

  const handleDeleteIngredient = (index: number) => {
    dispatch(deleteIngredient(index));
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={isOrderRequesting}
      constructorItems={constructorItems}
      orderModalData={orderDetails}
      onOrderClick={handleOrderClick}
      closeOrderModal={handleCloseOrderModal}
      deleteIngredient={handleDeleteIngredient}
    />
  );
};