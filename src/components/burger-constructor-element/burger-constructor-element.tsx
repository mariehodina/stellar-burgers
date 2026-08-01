import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems, delete: onDelete }) => {
    const handleMoveDown = () => {};
    const handleMoveUp = () => {};
    const handleClose = () => {
      if (onDelete) {
        onDelete(index);
      }
    };

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
