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
  const bun = useSelector((state) => state.burgerConstructor?.bun as TConstructorIngredient | null);
  const ingredients = useSelector((state) => state.burgerConstructor?.ingredients || []);
  const orderRequest = useSelector((state) => state.order.isOrderRequesting);
  const orderModalData = useSelector((state) => state.order.orderDetails);
  const user = useSelector((state) => state.user.user);
  const constructorItems = {
    bun: bun,
    ingredients: ingredients,
  };

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      navigate('/login');
      return;
    }

    const ingredientsIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((i: TConstructorIngredient) => i._id),
      constructorItems.bun._id
    ];
    dispatch(createOrder(ingredientsIds))
      .unwrap()
      .then(() => {
        dispatch(resetConstructor());
      });
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const onDeleteIngredient = (index: number) => {
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
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      deleteIngredient={onDeleteIngredient}
    />
  );
};