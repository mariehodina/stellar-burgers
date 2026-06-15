import { FC, useState, useRef } from 'react';
import { useSelector } from '../../services/store';
import { BurgerIngredientsUI } from '@ui';
import { TTabMode, TIngredient } from '@utils-types';

export const BurgerIngredients: FC = () => {
  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const { items } = useSelector((state) => state.ingredients) as { items: TIngredient[] };
  
  const buns = items.filter((item: TIngredient) => item.type === 'bun');
  const mains = items.filter((item: TIngredient) => item.type === 'main');
  const sauces = items.filter((item: TIngredient) => item.type === 'sauce');

  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const bunsRef = (node?: Element | null) => {};
  const mainsRef = (node?: Element | null) => {};
  const saucesRef = (node?: Element | null) => {};

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
  };

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};