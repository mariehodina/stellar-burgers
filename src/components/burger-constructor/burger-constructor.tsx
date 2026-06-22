import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { deleteIngredient, resetConstructor } from '../../services/slices/constructorSlice';
import { createOrder, clearOrder } from '../../services/slices/orderSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bun = useSelector((state) => state.burgerConstructor?.bun as TConstructorIngredient | null);
  const ingredients = useSelector((state) => state.burgerConstructor?.ingredients || []);

  const constructorItems = {
    bun: bun,
    ingredients: ingredients,
  };

  // Исправлено: используем правильные названия полей из orderSlice
  const orderRequest = useSelector((state) => state.order.isOrderRequesting);
  const orderModalData = useSelector((state) => state.order.orderDetails);
  const user = useSelector((state) => state.user.user);

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