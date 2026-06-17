import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const { id: ingredientId } = useParams(); 
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const selectedIngredient = ingredients.find( 
    (ingredient) => ingredient._id === ingredientId 
  );

  if (!selectedIngredient) { 
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={selectedIngredient} />; 
};