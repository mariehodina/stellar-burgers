import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch, useSelector } from '../../services/store';
import { addBurgerIngredient } from '../../services/burgerSlices/burgerConstructorSlice';
import { TConstructorIngredient } from '@utils-types';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count: propCount }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const constructorState = useSelector((state) => state.burgerConstructor);
    
    const count = propCount !== undefined ? propCount :
      ingredient.type === 'bun'
        ? constructorState?.bun?._id === ingredient._id
          ? 2
          : 0
        : (constructorState?.ingredients || []).filter(
            (item: TConstructorIngredient) => item._id === ingredient._id
          ).length;

    const handleAdd = () => {
      dispatch(addBurgerIngredient(ingredient));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);