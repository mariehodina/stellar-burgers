import { FC, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { BurgerIngredientUI } from '@ui';
import { TIngredient } from '@utils-types';
import { addIngredient } from '../../services/slices/constructorSlice';

interface TBurgerIngredientProps {
  ingredient: TIngredient;
  count: number;
}

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
      <Link
        to={`/ingredients/${ingredient._id}`}
        state={{ background: location }}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <BurgerIngredientUI
          ingredient={ingredient}
          count={realCount}
          locationState={{ background: location }}
          handleAdd={handleAdd}
        />
      </Link>
    );
  }
);