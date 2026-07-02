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

  const currentBun = useSelector((state) => state.burgerConstructor?.bun as TConstructorIngredient | null);
  const currentIngredients = useSelector((state) => state.burgerConstructor?.ingredients || []);

  const constructorItems = {
    bun: currentBun,
    ingredients: currentIngredients,
  };

  const isOrderRequesting = useSelector((state) => state.order.orderRequest);
  const orderDetailsData = useSelector((state) => state.order.orderModalData);
  const currentUser = useSelector((state) => state.user.user);

  const handleOrderClick = () => {
    if (!constructorItems.bun || isOrderRequesting) return;

    if (!currentUser) {
      navigate('/login');
      return;
    }

    const ingredientsIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item: TConstructorIngredient) => item._id),
      constructorItems.bun._id
    ];
    dispatch(createOrder(ingredientsIds))
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

  const totalPrice = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (sum: number, item: TConstructorIngredient) => sum + item.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={totalPrice}
      orderRequest={isOrderRequesting}
      constructorItems={constructorItems}
      orderModalData={orderDetailsData}
      onOrderClick={handleOrderClick}
      closeOrderModal={handleCloseOrderModal}
      deleteIngredient={handleDeleteIngredient}
    />
  );
};