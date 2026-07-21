import { useState, useRef, useEffect, FC, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { TTabMode, TIngredient } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';
import { useSelector } from '../../services/store';

export const BurgerIngredients: FC = () => {
  const ingredientsList = useSelector((state) => state.ingredients.ingredients);
 const buns = useMemo(() => ingredientsList.filter((item: TIngredient) => item.type === 'bun'), [ingredientsList]);
const mains = useMemo(() => ingredientsList.filter((item: TIngredient) => item.type === 'main'), [ingredientsList]);
const sauces = useMemo(() => ingredientsList.filter((item: TIngredient) => item.type === 'sauce'), [ingredientsList]);
  const [activeTab, setActiveTab] = useState<TTabMode>('bun');
  const bunTitleRef = useRef<HTMLHeadingElement>(null);
  const mainTitleRef = useRef<HTMLHeadingElement>(null);
  const saucesTitleRef = useRef<HTMLHeadingElement>(null);
  const [bunsRef, isBunsVisible] = useInView({ threshold: 0 });
  const [mainsRef, isMainsVisible] = useInView({ threshold: 0 });
  const [saucesRef, isSaucesVisible] = useInView({ threshold: 0 });
  

  useEffect(() => {
    if (isBunsVisible) {
      setActiveTab('bun');
    } else if (isSaucesVisible) {
      setActiveTab('sauce');
    } else if (isMainsVisible) {
      setActiveTab('main');
    }
  }, [isBunsVisible, isMainsVisible, isSaucesVisible]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab as TTabMode);
    if (tab === 'bun')
      bunTitleRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main')
      mainTitleRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce')
      saucesTitleRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  

  return (
    <BurgerIngredientsUI
      currentTab={activeTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={bunTitleRef}
      titleMainRef={mainTitleRef}
      titleSaucesRef={saucesTitleRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={handleTabClick}
    />
  );
};
