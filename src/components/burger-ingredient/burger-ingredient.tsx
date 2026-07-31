import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch, useSelector } from '../../services/store';
import { addBurgerIngredient } from '../../services/slices/burgerConstructorSlice';
import { TConstructorIngredient } from '@utils-types';

<<<<<<< HEAD
export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count: propCount }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const constructorState = useSelector((state) => state.burgerConstructor);

    const count =
      propCount !== undefined
        ? propCount
        : ingredient.type === 'bun'
          ? constructorState?.bun?._id === ingredient._id
            ? 2
            : 0
          : (constructorState?.ingredients || []).filter(
              (item: TConstructorIngredient) => item._id === ingredient._id
            ).length;

    const handleAdd = () => {
      dispatch(addBurgerIngredient(ingredient));
=======
import { useDispatch, useSelector } from '../../services/store';
import { addIngredient } from '../../services/slices/constructorSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const constructorState = useSelector((state) => state.burgerConstructor);
    const count =
      ingredient.type === 'bun'
        ? constructorState?.bun?._id === ingredient._id
          ? 2
          : 0
        : (constructorState?.ingredients || []).filter(
            (i) => i._id === ingredient._id
          ).length;

    const handleAdd = () => {
      dispatch(addIngredient(ingredient));
>>>>>>> 5613f3f6626cc344f1142a6387d582e391da6776
    };

    return (
      <div data-testid={`ingredient-${ingredient._id}`}>
        <BurgerIngredientUI
          ingredient={ingredient}
          count={count}
          locationState={{ background: location }}
          handleAdd={handleAdd}
        />
      </div>
    );
  }
);
