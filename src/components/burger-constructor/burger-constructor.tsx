import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
<<<<<<< HEAD
  removeBurgerIngredient,
  clearBurgerConstructor
} from '../../services/slices/burgerConstructorSlice';
import {
  createBurgerOrder,
  clearBurgerOrder
} from '../../services/slices/burgerOrderSlice';
=======
  removeIngredient,
  clearConstructor
} from '../../services/slices/constructorSlice';
import { createOrder, clearOrder } from '../../services/slices/orderSlice';
>>>>>>> 5613f3f6626cc344f1142a6387d582e391da6776

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

<<<<<<< HEAD
  const currentBun = useSelector(
    (state) => state.burgerConstructor?.bun as TConstructorIngredient | null
  );
  const currentIngredients = useSelector(
=======
  const bun = useSelector(
    (state) => state.burgerConstructor?.bun as TConstructorIngredient | null
  );
  const ingredients = useSelector(
>>>>>>> 5613f3f6626cc344f1142a6387d582e391da6776
    (state) => state.burgerConstructor?.ingredients || []
  );

  const constructorItems = {
<<<<<<< HEAD
    bun: currentBun,
    ingredients: currentIngredients
  };

  const isOrderRequesting = useSelector((state) => state.order.orderRequest);
  const orderDetailsData = useSelector((state) => state.order.orderModalData);
  const currentUser = useSelector((state) => state.user.user);

  const handleOrderClick = () => {
    if (!constructorItems.bun || isOrderRequesting) return;

    if (!currentUser) {
=======
    bun: bun,
    ingredients: ingredients
  };

  const orderRequest = useSelector((state) => state.order.orderRequest);
  const orderModalData = useSelector((state) => state.order.orderModalData);
  const user = useSelector((state) => state.user.user);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
>>>>>>> 5613f3f6626cc344f1142a6387d582e391da6776
      navigate('/login');
      return;
    }

    const ingredientsIds = [
      constructorItems.bun._id,
<<<<<<< HEAD
      ...constructorItems.ingredients.map(
        (item: TConstructorIngredient) => item._id
      ),
      constructorItems.bun._id
    ];

    dispatch(createBurgerOrder(ingredientsIds))
      .unwrap()
      .then(() => {
        dispatch(clearBurgerConstructor());
      });
=======
      ...constructorItems.ingredients.map((i: TConstructorIngredient) => i._id),
      constructorItems.bun._id
    ];
    dispatch(createOrder(ingredientsIds))
      .unwrap()
      .then(() => {
        dispatch(clearConstructor());
      });
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const onDeleteIngredient = (index: number) => {
    dispatch(removeIngredient(index));
>>>>>>> 5613f3f6626cc344f1142a6387d582e391da6776
  };

  const handleCloseOrderModal = () => {
    dispatch(clearBurgerOrder());
  };

  const handleDeleteIngredient = (index: number) => {
    dispatch(removeBurgerIngredient(index));
  };

  const totalPrice = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (sum: number, item: TConstructorIngredient) => sum + item.price,
        0
      ),
    [currentBun, currentIngredients]
  );

  return (
<<<<<<< HEAD
    <div data-testid='burger-constructor'>
      <BurgerConstructorUI
        price={totalPrice}
        orderRequest={isOrderRequesting}
        constructorItems={constructorItems}
        orderModalData={orderDetailsData}
        onOrderClick={handleOrderClick}
        closeOrderModal={handleCloseOrderModal}
        deleteIngredient={handleDeleteIngredient}
      />
    </div>
=======
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      onDeleteIngredient={onDeleteIngredient}
    />
>>>>>>> 5613f3f6626cc344f1142a6387d582e391da6776
  );
};
