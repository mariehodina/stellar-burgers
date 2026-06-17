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
    const currentLocation = useLocation();
    
    const { bun, ingredients } = useSelector((state) => state.burgerConstructor);
    
    const actualCount = ingredient.type === 'bun' 
      ? bun?._id === ingredient._id ? 2 : 0
      : ingredients.filter((item) => item._id === ingredient._id).length;

    const handleAddIngredient = () => {
      dispatch(addIngredient(ingredient));
    };

    return (
        <BurgerIngredientUI
          ingredient={ingredient}
          count={actualCount}
          locationState={{ background: currentLocation }}
          handleAdd={handleAddIngredient}
        />
    );
  }
);