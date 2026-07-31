import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
<<<<<<< HEAD
  ({ ingredient, index, totalItems, delete: onDelete }) => {
=======
  ({ ingredient, index, totalItems, onDelete }) => {
>>>>>>> 5613f3f6626cc344f1142a6387d582e391da6776
    const handleMoveDown = () => {};
    const handleMoveUp = () => {};
<<<<<<< HEAD
=======

>>>>>>> 5613f3f6626cc344f1142a6387d582e391da6776
    const handleClose = () => {
      if (onDelete) {
        onDelete(index);
      }
    };
<<<<<<< HEAD
=======

>>>>>>> 5613f3f6626cc344f1142a6387d582e391da6776
    return (
      <li data-testid='constructor-item'>
        <BurgerConstructorElementUI
          ingredient={ingredient}
          index={index}
          totalItems={totalItems}
          handleMoveUp={handleMoveUp}
          handleMoveDown={handleMoveDown}
          handleClose={handleClose}
        />
      </li>
    );
  }
);
