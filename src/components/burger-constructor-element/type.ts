import { TConstructorIngredient } from '@utils-types';

export type BurgerConstructorElementProps = {
  ingredient: TConstructorIngredient;
  index: number;
  totalItems: number;
<<<<<<< HEAD
  delete?: (index: number) => void;
=======
  onDelete: (index: number) => void;
>>>>>>> 5613f3f6626cc344f1142a6387d582e391da6776
};
