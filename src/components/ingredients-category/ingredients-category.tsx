import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { useSelector } from '../../services/store';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const constructorState = useSelector((state) => state.burgerConstructor); 

  const ingredientCounters = useMemo(() => { 
    const { bun, ingredients: constructorIngredients } = constructorState; 
    const counters: { [key: string]: number } = {};
    
    constructorIngredients.forEach((ingredient: TIngredient) => { 
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });
    
    if (bun) counters[bun._id] = 2;
    return counters;
  }, [constructorState]); 

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientCounters} 
      ref={ref}
    />
  );
});