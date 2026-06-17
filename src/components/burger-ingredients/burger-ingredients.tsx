import { FC, useState, useRef, useEffect } from 'react';
import { useSelector } from '../../services/store';
import { BurgerIngredientsUI } from '@ui';
import { useInView } from 'react-intersection-observer';
import { TTabMode, TIngredient } from '@utils-types';

export const BurgerIngredients: FC = () => {
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const buns = ingredients.filter((item) => item.type === 'bun');
  const mains = ingredients.filter((item) => item.type === 'main');
  const sauces = ingredients.filter((item) => item.type === 'sauce');

  const [activeTab, setActiveTab] = useState<TTabMode>('bun');
  const bunTitleRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sauceTitleRef = useRef<HTMLHeadingElement>(null);

  const [bunSectionRef, isBunVisible] = useInView({
    threshold: 0
  });

  const [mainSectionRef, isMainVisible] = useInView({
    threshold: 0
  });

  const [sauceSectionRef, isSauceVisible] = useInView({
    threshold: 0
  });

useEffect(() => {
  const tabMap = {
    bun: isBunVisible,
    sauce: isSauceVisible,
    main: isMainVisible
  };
  
  const activeTab = Object.entries(tabMap).find(([, isVisible]) => isVisible)?.[0];
  
  if (activeTab) {
    setActiveTab(activeTab as TTabMode);
  }
}, [isBunVisible, isMainVisible, isSauceVisible]);

  const onTabClick = (tab: string) => {
    setActiveTab(tab as TTabMode);
    if (tab === 'bun')
      bunTitleRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main')
      titleRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce')
      sauceTitleRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <BurgerIngredientsUI
      currentTab={activeTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={bunTitleRef}
      titleMainRef={titleRef}
      titleSaucesRef={sauceTitleRef}
      bunsRef={bunSectionRef}
      mainsRef={mainSectionRef}
      saucesRef={sauceSectionRef}
      onTabClick={onTabClick}
    />
  );
};