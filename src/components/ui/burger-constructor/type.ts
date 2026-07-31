import { TConstructorIngredient } from '@utils-types';

export type BurgerConstructorUIProps = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  price: number;
  orderModalData: { number: number } | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
<<<<<<< HEAD
  deleteIngredient?: (index: number) => void;
=======
  onDeleteIngredient: (index: number) => void;
>>>>>>> 5613f3f6626cc344f1142a6387d582e391da6776
};
