import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch, useSelector } from '../../services/store';
import { addIngredient } from '../../services/slices/constructorSlice';

// interface TBurgerIngredientProps {
//   ingredient: TIngredient;
//   count: number;
// }

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    
    const { bun, ingredients } = useSelector((state) => state.burgerConstructor);
    
    const realCount = ingredient.type === 'bun' 
      ? bun?._id === ingredient._id ? 2 : 0
      : ingredients.filter((i) => i._id === ingredient._id).length;

    const handleAdd = () => {
      dispatch(addIngredient(ingredient));
    };

    return (
        <BurgerIngredientUI
          ingredient={ingredient}
          count={realCount}
          locationState={{ background: location }}
          handleAdd={handleAdd}
        />
    );
  }
);