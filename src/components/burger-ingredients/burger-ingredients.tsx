import { FC, useState } from 'react';
import { useSelector } from '../../services/store';
import { TTabMode, TIngredient } from '@utils-types';

// Временно используем простой div вместо BurgerIngredientsUI
export const BurgerIngredients: FC = () => {
  const [currentTab] = useState<TTabMode>('bun');
  const { items } = useSelector((state) => state.ingredients) as { items: TIngredient[] };

  const buns = items.filter((item: TIngredient) => item.type === 'bun');
  const mains = items.filter((item: TIngredient) => item.type === 'main');
  const sauces = items.filter((item: TIngredient) => item.type === 'sauce');

  return (
    <div>
      <h2>Булки: {buns.length}</h2>
      <h2>Начинки: {mains.length}</h2>
      <h2>Соусы: {sauces.length}</h2>
    </div>
  );
};